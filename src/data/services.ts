import { Globe, Smartphone, Cloud, BrainCircuit, LineChart, Palette } from 'lucide-react';
import type { Service } from '@/types/service';

export const services: Service[] = [
  {
    id: 'web-development',
    slug: 'web-development',
    icon: Globe,
    image: '/images/services/web-development.jpg',
    tags: ['frontend', 'backend', 'fullstack'],
  },
  {
    id: 'mobile-development',
    slug: 'mobile-development',
    icon: Smartphone,
    image: '/images/services/mobile-development.jpg',
    tags: ['ios', 'android', 'cross-platform'],
  },
  {
    id: 'cloud-solutions',
    slug: 'cloud-solutions',
    icon: Cloud,
    image: '/images/services/cloud-solutions.jpg',
    tags: ['aws', 'azure', 'gcp', 'infrastructure'],
  },
  {
    id: 'ai-ml',
    slug: 'ai-ml',
    icon: BrainCircuit,
    image: '/images/services/ai-ml.jpg',
    tags: ['ai', 'machine-learning', 'automation'],
  },
  {
    id: 'digital-strategy',
    slug: 'digital-strategy',
    icon: LineChart,
    image: '/images/services/digital-strategy.jpg',
    tags: ['strategy', 'consulting', 'transformation'],
  },
  {
    id: 'ui-ux-design',
    slug: 'ui-ux-design',
    icon: Palette,
    image: '/images/services/ui-ux-design.jpg',
    tags: ['design', 'ux', 'ui', 'research'],
  },
];
