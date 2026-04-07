import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';

// Initialize rate limiter only if Upstash credentials are configured
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        }),
        limiter: Ratelimit.slidingWindow(3, '60 s'),
        analytics: true,
      })
    : null;

// Initialize Resend only if API key is configured
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    // Rate limiting
    if (ratelimit) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
      const { success, remaining } = await ratelimit.limit(ip);

      if (!success) {
        return NextResponse.json(
          { success: false, message: 'Too many requests. Please try again later.' },
          {
            status: 429,
            headers: { 'X-RateLimit-Remaining': String(remaining) },
          }
        );
      }
    }

    const body = await request.json();

    // Honeypot check — bots fill this in, real users don't
    if (body._honey) {
      // Silently accept to not tip off bots
      return NextResponse.json({ success: true });
    }

    // Validate with Zod
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      }
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors },
        { status: 400 }
      );
    }

    const { name, email, company, phone, service, budget, message } = result.data;

    // Send email via Resend
    if (resend) {
      const emailTo = process.env.CONTACT_EMAIL_TO || 'info@takamul.sa';
      const emailFrom = process.env.CONTACT_EMAIL_FROM || 'noreply@takamul.sa';

      await resend.emails.send({
        from: `Takamul Contact Form <${emailFrom}>`,
        to: [emailTo],
        replyTo: email,
        subject: `New Contact: ${name}${company ? ` — ${company}` : ''}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
            ${company ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Company</td><td style="padding:8px;border-bottom:1px solid #eee;">${company}</td></tr>` : ''}
            ${phone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone}</td></tr>` : ''}
            ${service ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${service}</td></tr>` : ''}
            ${budget ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Budget</td><td style="padding:8px;border-bottom:1px solid #eee;">${budget}</td></tr>` : ''}
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;">${message.replace(/\n/g, '<br>')}</td></tr>
          </table>
        `,
      });
    } else {
      // Fallback: log to console in development
      console.log('Contact form submission:', result.data);
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
