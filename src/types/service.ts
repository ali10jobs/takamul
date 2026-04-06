import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  slug: string;
  icon: LucideIcon;
  image: string;
  tags: string[];
}
