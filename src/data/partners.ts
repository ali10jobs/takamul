export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export const partners: Partner[] = [
  { id: 'aws', name: 'Amazon Web Services', logo: '/images/partners/new/aws.png' },
  { id: 'google-cloud', name: 'Google Cloud', logo: '/images/partners/new/google-cloud.png' },
  { id: 'microsoft-azure', name: 'Microsoft Azure', logo: '/images/partners/new/azure.png' },
  { id: 'vercel', name: 'Vercel', logo: '/images/partners/new/vercel.png' },
  { id: 'stripe', name: 'Stripe', logo: '/images/partners/new/stripe.png' },
  { id: 'cloudflare', name: 'Cloudflare', logo: '/images/partners/new/cloudflare.png' },
];
