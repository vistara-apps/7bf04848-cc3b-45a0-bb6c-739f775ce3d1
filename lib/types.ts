export interface User {
  userId: string;
  displayName: string;
  profilePicUrl: string;
  skills: string[];
  collaborationStyle: string;
  projectsCreated: number;
  projectsJoined: number;
  bio?: string;
  location?: string;
}

export interface Project {
  projectId: string;
  projectName: string;
  description: string;
  goals: string[];
  requiredRoles: string[];
  status: 'draft' | 'active' | 'completed' | 'paused';
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  collaborators: User[];
  tags: string[];
}

export interface SkillTag {
  skillId: string;
  skillName: string;
  category: string;
}

export interface ProjectVersion {
  versionId: string;
  projectId: string;
  versionNumber: string;
  changes: string;
  commitMessage: string;
  authorId: string;
  createdAt: Date;
}

export interface CollaborationRequest {
  requestId: string;
  fromUserId: string;
  toUserId: string;
  projectId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export type SwipeAction = 'like' | 'pass';

export interface MatchResult {
  matched: boolean;
  user: User;
  mutualInterest?: boolean;
}
