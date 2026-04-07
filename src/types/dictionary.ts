/**
 * Typed dictionary structure — mirrors en.json / ar.json
 * Both dictionaries MUST conform to this type.
 * If a key is missing in either file, TypeScript will catch it at compile time.
 */
export interface Dictionary {
  common: {
    nav: {
      home: string;
      about: string;
      services: string;
      caseStudies: string;
      blog: string;
      contact: string;
    };
    footer: {
      description: string;
      quickLinks: string;
      contactUs: string;
      followUs: string;
      rights: string;
      privacy: string;
      terms: string;
    };
    cta: {
      getStarted: string;
      learnMore: string;
      contactUs: string;
      viewProject: string;
      readMore: string;
      sendMessage: string;
      previous: string;
      next: string;
    };
    language: {
      switchTo: string;
      current: string;
    };
    theme: {
      light: string;
      dark: string;
      system: string;
    };
    cookie: {
      message: string;
      accept: string;
      decline: string;
    };
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      cta: string;
      ctaSecondary: string;
    };
    values: {
      eyebrow: string;
      title: string;
      subtitle: string;
      items: Record<
        string,
        {
          title: string;
          description: string;
        }
      >;
    };
    services: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    caseStudies: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    testimonials: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    partners: {
      title: string;
    };
    ctaSection: {
      title: string;
      subtitle: string;
    };
  };
  about: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    story: {
      title: string;
      content: string;
    };
    mission: {
      title: string;
      content: string;
    };
    vision: {
      title: string;
      content: string;
    };
    team: {
      title: string;
      subtitle: string;
    };
  };
  services: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    items: Record<
      string,
      {
        title: string;
        excerpt: string;
        description: string;
      }
    >;
  };
  caseStudies: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    filterAll: string;
    items: Record<
      string,
      {
        title: string;
        excerpt: string;
        description: string;
      }
    >;
  };
  contact: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      company: string;
      companyPlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      service: string;
      servicePlaceholder: string;
      budget: string;
      budgetPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      step1Title: string;
      step2Title: string;
      step3Title: string;
      review: string;
      submit: string;
      sending: string;
      success: {
        title: string;
        message: string;
      };
      errors: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
      };
    };
    info: {
      address: string;
      email: string;
      phone: string;
    };
  };
  blog: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
    };
    readTime: string;
    publishedOn: string;
    items: Record<
      string,
      {
        title: string;
        excerpt: string;
        content: string;
      }
    >;
  };
  privacy: {
    hero: {
      title: string;
      subtitle: string;
    };
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
  terms: {
    hero: {
      title: string;
      subtitle: string;
    };
    lastUpdated: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
  notFound: {
    title: string;
    message: string;
    backHome: string;
  };
  error: {
    title: string;
    message: string;
    retry: string;
  };
}
