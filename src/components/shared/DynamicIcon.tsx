'use client';

import {
  Globe,
  Smartphone,
  Cloud,
  BrainCircuit,
  LineChart,
  Palette,
  Lightbulb,
  Award,
  Handshake,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Cloud,
  BrainCircuit,
  LineChart,
  Palette,
  Lightbulb,
  Award,
  Handshake,
  TrendingUp,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}
