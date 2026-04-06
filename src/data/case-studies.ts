import type { CaseStudy } from '@/types/case-study';

export const caseStudies: CaseStudy[] = [
  {
    id: 'fintech-platform',
    slug: 'fintech-platform',
    client: 'Leading Financial Institution',
    image: '/images/case-studies/fintech-platform.jpg',
    tags: ['fintech', 'backend', 'infrastructure'],
    metrics: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Faster Processing', value: '60%' },
      { label: 'Transactions/Day', value: '2M+' },
    ],
  },
  {
    id: 'healthcare-portal',
    slug: 'healthcare-portal',
    client: 'Major Hospital Network',
    image: '/images/case-studies/healthcare-portal.jpg',
    tags: ['healthcare', 'fullstack', 'design'],
    metrics: [
      { label: 'Patients Served', value: '500K+' },
      { label: 'User Satisfaction', value: '94%' },
      { label: 'Digital Adoption', value: '78%' },
    ],
  },
  {
    id: 'ecommerce-revamp',
    slug: 'ecommerce-revamp',
    client: 'Major Retail Platform',
    image: '/images/case-studies/ecommerce-revamp.jpg',
    tags: ['ecommerce', 'frontend', 'performance'],
    metrics: [
      { label: 'Faster Page Loads', value: '3x' },
      { label: 'Conversion Increase', value: '45%' },
      { label: 'Core Web Vitals', value: '200%' },
    ],
  },
  {
    id: 'smart-logistics',
    slug: 'smart-logistics',
    client: 'National Logistics Company',
    image: '/images/case-studies/smart-logistics.jpg',
    tags: ['logistics', 'ai', 'dashboard'],
    metrics: [
      { label: 'Delivery Time Reduction', value: '35%' },
      { label: 'Cost Savings', value: '25%' },
      { label: 'Routes Optimized', value: '10K+' },
    ],
  },
];
