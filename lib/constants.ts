export const SKILL_CATEGORIES = {
  DESIGN: 'Design',
  DEVELOPMENT: 'Development',
  MARKETING: 'Marketing',
  BUSINESS: 'Business',
  CONTENT: 'Content',
  DATA: 'Data',
} as const;

export const COLLABORATION_STYLES = [
  'Remote-first',
  'In-person preferred',
  'Flexible',
  'Async communication',
  'Real-time collaboration',
] as const;

export const PROJECT_STATUSES = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PAUSED: 'paused',
} as const;

export const COMMON_SKILLS = [
  // Design
  'UI/UX Design',
  'Graphic Design',
  'Product Design',
  'Brand Design',
  'Illustration',
  
  // Development
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Mobile Development',
  'Blockchain Development',
  
  // Marketing
  'Digital Marketing',
  'Content Marketing',
  'Social Media',
  'SEO/SEM',
  'Growth Hacking',
  
  // Business
  'Product Management',
  'Business Strategy',
  'Sales',
  'Operations',
  'Finance',
  
  // Content
  'Copywriting',
  'Technical Writing',
  'Video Production',
  'Photography',
  'Podcasting',
  
  // Data
  'Data Analysis',
  'Data Science',
  'Machine Learning',
  'Research',
  'Analytics',
] as const;

export const REQUIRED_ROLES = [
  'Project Lead',
  'Technical Lead',
  'Designer',
  'Developer',
  'Marketer',
  'Content Creator',
  'Business Analyst',
  'QA Tester',
  'Community Manager',
] as const;
