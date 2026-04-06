export const siteConfig = {
  name: 'Takamul Smart Technology',
  nameAr: 'تكامل للتقنية الذكية',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://takamul.sa',
  email: 'info@takamul.sa',
  phone: '+966 XX XXX XXXX',
  address: 'Riyadh, Saudi Arabia',
  social: {
    twitter: 'https://twitter.com/takamul',
    linkedin: 'https://linkedin.com/company/takamul',
    github: 'https://github.com/takamul',
  },
} as const;
