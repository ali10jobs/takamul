export interface NavItem {
  id: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { id: 'home', href: '/' },
  { id: 'about', href: '/about' },
  { id: 'services', href: '/services' },
  { id: 'caseStudies', href: '/case-studies' },
  { id: 'blog', href: '/blog' },
  { id: 'contact', href: '/contact' },
];
