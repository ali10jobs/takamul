import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';

export async function POST(request: Request) {
  try {
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

    // TODO: Add Upstash rate limiting when UPSTASH_REDIS_REST_URL is configured
    // TODO: Send email via Resend when RESEND_API_KEY is configured

    // For now, log the submission (in production, this would send an email)
    console.log('Contact form submission:', result.data);

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
