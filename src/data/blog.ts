export interface BlogPost {
  id: string;
  slug: string;
  image: string;
  date: string;
  readTime: number;
  tags: string[];
}

// Blog post metadata — actual content will come from MDX or CMS later
export const blogPosts: BlogPost[] = [
  {
    id: 'future-of-web-development',
    slug: 'future-of-web-development',
    image: '/images/blog/web-dev.jpg',
    date: '2024-12-15',
    readTime: 8,
    tags: ['web', 'technology'],
  },
  {
    id: 'digital-transformation-guide',
    slug: 'digital-transformation-guide',
    image: '/images/blog/digital-transformation.jpg',
    date: '2024-11-28',
    readTime: 12,
    tags: ['strategy', 'business'],
  },
  {
    id: 'cloud-migration-best-practices',
    slug: 'cloud-migration-best-practices',
    image: '/images/blog/cloud.jpg',
    date: '2024-11-10',
    readTime: 10,
    tags: ['cloud', 'infrastructure'],
  },
];
