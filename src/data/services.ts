import type { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    iconName: 'Globe',
    image: '/images/services/web-development.jpg',
    tags: ['frontend', 'backend', 'fullstack'],
  },
  {
    id: 'mobile-development',
    slug: 'mobile-development',
    iconName: 'Smartphone',
    image: '/images/services/mobile-development.jpg',
    tags: ['ios', 'android', 'cross-platform'],
  },
  {
    id: 'cloud-solutions',
    slug: 'cloud-solutions',
    iconName: 'Cloud',
    image: '/images/services/cloud-solutions.jpg',
    tags: ['aws', 'azure', 'gcp', 'infrastructure'],
  },
  {
    id: 'ai-ml',
    slug: 'ai-ml',
    iconName: 'BrainCircuit',
    image: '/images/services/ai-ml.jpg',
    tags: ['ai', 'machine-learning', 'automation'],
  },
  {
    id: 'digital-strategy',
    slug: 'digital-strategy',
    iconName: 'LineChart',
    image: '/images/services/digital-strategy.jpg',
    tags: ['strategy', 'consulting', 'transformation'],
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    iconName: 'Palette',
    image: '/images/services/ui-ux-design.jpg',
    tags: ['design', 'ux', 'ui', 'research'],
  },
];
