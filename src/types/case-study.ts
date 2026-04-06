export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  image: string;
  tags: string[];
  metrics: CaseStudyMetric[];
}
