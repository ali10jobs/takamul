import React from 'react';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  })),
  usePathname: jest.fn(() => '/en'),
  useParams: jest.fn(() => ({ locale: 'en' })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  redirect: jest.fn(),
  notFound: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
    return <a {...props}>{children}</a>;
  },
}));

// Mock motion/react to avoid animation issues in tests
jest.mock('motion/react', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        if (typeof prop === 'string') {
          const MotionComponent = ({
            children,
            ...props
          }: {
            children?: React.ReactNode;
            [key: string]: unknown;
          }) => {
            const {
              variants,
              initial,
              animate,
              exit,
              whileHover,
              whileTap,
              whileInView,
              transition,
              ...rest
            } = props;
            void variants;
            void initial;
            void animate;
            void exit;
            void whileHover;
            void whileTap;
            void whileInView;
            void transition;
            return (
              <div data-testid={`motion-${String(prop)}`} {...rest}>
                {children}
              </div>
            );
          };
          MotionComponent.displayName = `Motion.${String(prop)}`;
          return MotionComponent;
        }
        return undefined;
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useMotionValue: jest.fn(() => ({ get: () => 0, set: jest.fn() })),
  useTransform: jest.fn(() => ({ get: () => 0, set: jest.fn() })),
  useAnimation: jest.fn(() => ({ start: jest.fn(), stop: jest.fn() })),
  useInView: jest.fn(() => true),
}));
