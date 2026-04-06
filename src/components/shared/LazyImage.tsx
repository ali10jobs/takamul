'use client';

import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface LazyImageProps extends Omit<ImageProps, 'placeholder'> {
  className?: string;
  containerClassName?: string;
}

export function LazyImage({ className, containerClassName, alt, ...props }: LazyImageProps) {
  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      <Image
        className={cn('object-cover', className)}
        alt={alt}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4="
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
}
