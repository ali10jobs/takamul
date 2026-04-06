const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.takamul.sa';

export const endpoints = {
  contact: `${BASE_URL}/contact`,
  services: `${BASE_URL}/services`,
  caseStudies: `${BASE_URL}/case-studies`,
  blog: `${BASE_URL}/blog`,
  newsletter: `${BASE_URL}/newsletter`,
} as const;
