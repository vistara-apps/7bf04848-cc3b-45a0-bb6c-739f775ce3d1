import { User, Project } from './types';
import { generateAvatarUrl } from './utils';

export const mockUsers: User[] = [
  {
    userId: '1',
    displayName: 'Marcus Chen',
    profilePicUrl: generateAvatarUrl('Marcus Chen'),
    skills: ['UI/UX Design', 'Product Design', 'Figma', 'User Research'],
    collaborationStyle: 'Remote-first',
    projectsCreated: 3,
    projectsJoined: 7,
    bio: 'Product designer with 5+ years experience. Love creating intuitive user experiences.',
    location: 'San Francisco, CA',
  },
  {
    userId: '2',
    displayName: 'Sarah Kim',
    profilePicUrl: generateAvatarUrl('Sarah Kim'),
    skills: ['Frontend Development', 'React', 'TypeScript', 'Next.js'],
    collaborationStyle: 'Flexible',
    projectsCreated: 2,
    projectsJoined: 5,
    bio: 'Frontend developer passionate about building beautiful, performant web apps.',
    location: 'Austin, TX',
  },
  {
    userId: '3',
    displayName: 'Alex Rivera',
    profilePicUrl: generateAvatarUrl('Alex Rivera'),
    skills: ['Digital Marketing', 'Content Strategy', 'SEO', 'Social Media'],
    collaborationStyle: 'Real-time collaboration',
    projectsCreated: 4,
    projectsJoined: 6,
    bio: 'Growth marketer helping startups scale. Expert in content and community building.',
    location: 'New York, NY',
  },
  {
    userId: '4',
    displayName: 'Maya Patel',
    profilePicUrl: generateAvatarUrl('Maya Patel'),
    skills: ['Backend Development', 'Node.js', 'Python', 'Database Design'],
    collaborationStyle: 'Async communication',
    projectsCreated: 1,
    projectsJoined: 4,
    bio: 'Full-stack engineer with expertise in scalable backend systems.',
    location: 'Seattle, WA',
  },
  {
    userId: '5',
    displayName: 'Jordan Smith',
    profilePicUrl: generateAvatarUrl('Jordan Smith'),
    skills: ['Product Management', 'Business Strategy', 'Data Analysis'],
    collaborationStyle: 'In-person preferred',
    projectsCreated: 5,
    projectsJoined: 3,
    bio: 'Product manager with a passion for turning ideas into successful products.',
    location: 'Los Angeles, CA',
  },
];

export const mockProjects: Project[] = [
  {
    projectId: '1',
    projectName: 'EcoTrack',
    description: 'A mobile app to help users track their carbon footprint and discover eco-friendly alternatives.',
    goals: ['Launch MVP', 'Acquire 1000 users', 'Partner with eco brands'],
    requiredRoles: ['Mobile Developer', 'UI/UX Designer', 'Marketing Lead'],
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    ownerId: '1',
    collaborators: [mockUsers[0], mockUsers[1]],
    tags: ['sustainability', 'mobile', 'social-impact'],
  },
  {
    projectId: '2',
    projectName: 'CreatorHub',
    description: 'A platform connecting content creators with brands for authentic partnerships.',
    goals: ['Build MVP', 'Onboard 50 creators', 'Secure first brand partnerships'],
    requiredRoles: ['Full Stack Developer', 'Community Manager', 'Business Development'],
    status: 'draft',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    ownerId: '3',
    collaborators: [mockUsers[2]],
    tags: ['creator-economy', 'marketplace', 'web-platform'],
  },
];

export function getMockUserById(userId: string): User | undefined {
  return mockUsers.find(user => user.userId === userId);
}

export function getMockProjectById(projectId: string): Project | undefined {
  return mockProjects.find(project => project.projectId === projectId);
}

export function getRandomUsers(count: number, excludeIds: string[] = []): User[] {
  const availableUsers = mockUsers.filter(user => !excludeIds.includes(user.userId));
  const shuffled = [...availableUsers].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
