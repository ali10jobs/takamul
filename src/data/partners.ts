export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export const partners: Partner[] = [
  { id: 'aws', name: 'Amazon Web Services', logo: '/images/partners/aws.svg' },
  { id: 'google-cloud', name: 'Google Cloud', logo: '/images/partners/google-cloud.svg' },
  { id: 'microsoft-azure', name: 'Microsoft Azure', logo: '/images/partners/azure.svg' },
  { id: 'vercel', name: 'Vercel', logo: '/images/partners/vercel.svg' },
  { id: 'stripe', name: 'Stripe', logo: '/images/partners/stripe.svg' },
  { id: 'cloudflare', name: 'Cloudflare', logo: '/images/partners/cloudflare.svg' },
];
