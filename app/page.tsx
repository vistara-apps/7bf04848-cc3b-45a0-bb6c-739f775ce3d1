'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { SwipeInterface } from '@/components/features/SwipeInterface';
import { ProjectCreator } from '@/components/features/ProjectCreator';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ActionChip } from '@/components/ui/ActionChip';
import { User, Project } from '@/lib/types';
import { mockProjects } from '@/lib/mock-data';
import { Plus, Users, Briefcase, Heart } from 'lucide-react';

type ViewMode = 'discover' | 'projects' | 'create-project' | 'matches';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('discover');
  const [matches, setMatches] = useState<User[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>(mockProjects);

  const handleMatch = (user: User) => {
    setMatches(prev => [...prev, user]);
    // Show success notification or animation
    console.log('Matched with:', user.displayName);
  };

  const handlePass = (user: User) => {
    console.log('Passed on:', user.displayName);
  };

  const handleCreateProject = (projectData: Partial<Project>) => {
    const newProject: Project = {
      projectId: Date.now().toString(),
      projectName: projectData.projectName || '',
      description: projectData.description || '',
      goals: projectData.goals || [],
      requiredRoles: projectData.requiredRoles || [],
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 'current-user',
      collaborators: [],
      tags: projectData.tags || [],
    };

    setUserProjects(prev => [newProject, ...prev]);
    setViewMode('projects');
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'discover':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                Discover Collaborators
              </h2>
              <p className="text-white/70">
                Swipe right to connect with potential project partners
              </p>
            </div>
            <SwipeInterface onMatch={handleMatch} onPass={handlePass} />
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Your Projects</h2>
              <ActionChip
                label="New Project"
                icon={Plus}
                onClick={() => setViewMode('create-project')}
              />
            </div>
            
            <div className="grid gap-4">
              {userProjects.map((project) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  variant="details"
                  onClick={() => console.log('View project:', project.projectName)}
                />
              ))}
            </div>

            {userProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="glass-effect rounded-lg p-8">
                  <Briefcase className="w-12 h-12 text-white/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No projects yet
                  </h3>
                  <p className="text-white/70 mb-6">
                    Create your first project to start collaborating
                  </p>
                  <ActionChip
                    label="Create Project"
                    icon={Plus}
                    onClick={() => setViewMode('create-project')}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'create-project':
        return (
          <ProjectCreator
            onSave={handleCreateProject}
            onCancel={() => setViewMode('projects')}
          />
        );

      case 'matches':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Your Matches</h2>
            
            {matches.length > 0 ? (
              <div className="grid gap-4">
                {matches.map((user) => (
                  <div key={user.userId} className="glass-effect rounded-lg p-4 text-white">
                    <div className="flex items-center space-x-4">
                      <img
                        src={user.profilePicUrl}
                        alt={user.displayName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.displayName}</h3>
                        <p className="text-white/70 text-sm">{user.collaborationStyle}</p>
                      </div>
                      <ActionChip
                        label="Message"
                        variant="primary"
                        onClick={() => console.log('Message:', user.displayName)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="glass-effect rounded-lg p-8">
                  <Heart className="w-12 h-12 text-white/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No matches yet
                  </h3>
                  <p className="text-white/70 mb-6">
                    Start swiping to find your perfect collaborators
                  </p>
                  <ActionChip
                    label="Discover People"
                    onClick={() => setViewMode('discover')}
                  />
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main className="container max-w-screen-lg px-4 mx-auto py-6">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 glass-effect border-t border-white/10 px-4 py-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="flex items-center justify-around max-w-screen-lg mx-auto">
          <button
            onClick={() => setViewMode('discover')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
              viewMode === 'discover' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-medium">Discover</span>
          </button>

          <button
            onClick={() => setViewMode('projects')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 ${
              viewMode === 'projects' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs font-medium">Projects</span>
          </button>

          <button
            onClick={() => setViewMode('matches')}
            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200 relative ${
              viewMode === 'matches' ? 'text-primary' : 'text-white/60 hover:text-white'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs font-medium">Matches</span>
            {matches.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{matches.length}</span>
              </div>
            )}
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
