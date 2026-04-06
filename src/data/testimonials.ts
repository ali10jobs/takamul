export interface Testimonial {
  id: string;
  quote: string;
  quoteAr: string;
  author: string;
  role: string;
  roleAr: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      'Takamul transformed our entire digital infrastructure. Their team delivered a solution that exceeded our expectations in both quality and timeline.',
    quoteAr:
      'قام تكامل بتحويل بنيتنا التحتية الرقمية بالكامل. قدم فريقهم حلاً فاق توقعاتنا في الجودة والجدول الزمني.',
    author: 'Ahmed Al-Rashid',
    role: 'CTO',
    roleAr: 'المدير التقني',
    company: 'National Finance Group',
  },
  {
    id: 'testimonial-2',
    quote:
      'The level of technical expertise and attention to detail was remarkable. Our platform performance improved by 300% after the migration.',
    quoteAr:
      'مستوى الخبرة التقنية والاهتمام بالتفاصيل كان مذهلاً. تحسن أداء منصتنا بنسبة 300% بعد الترحيل.',
    author: 'Sara Al-Fahad',
    role: 'VP of Engineering',
    roleAr: 'نائبة رئيس الهندسة',
    company: 'HealthBridge Systems',
  },
  {
    id: 'testimonial-3',
    quote:
      'Working with Takamul felt like having an in-house team. They understood our business needs and delivered a solution that drives real results.',
    quoteAr:
      'العمل مع تكامل كان كأن لدينا فريق داخلي. فهموا احتياجات أعمالنا وقدموا حلاً يحقق نتائج حقيقية.',
    author: 'Khalid Al-Mutairi',
    role: 'CEO',
    roleAr: 'الرئيس التنفيذي',
    company: 'Swift Logistics',
  },
];
