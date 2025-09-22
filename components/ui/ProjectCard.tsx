'use client';

import { Project } from '@/lib/types';
import { motion } from 'framer-motion';
import { Calendar, Users, Tag, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  variant?: 'base' | 'details';
  onClick?: () => void;
  className?: string;
}

export function ProjectCard({ 
  project, 
  variant = 'base', 
  onClick,
  className = '' 
}: ProjectCardProps) {
  const statusColors = {
    draft: 'bg-yellow-500/20 text-yellow-300',
    active: 'bg-green-500/20 text-green-300',
    completed: 'bg-blue-500/20 text-blue-300',
    paused: 'bg-gray-500/20 text-gray-300',
  };

  return (
    <motion.div
      className={`glass-effect rounded-lg p-6 text-white cursor-pointer ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{project.projectName}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <ArrowRight className="w-5 h-5 text-white/60" />
      </div>

      {/* Description */}
      <p className="text-white/80 text-sm mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Required Roles */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white/90 mb-2">Looking for</h4>
        <div className="flex flex-wrap gap-2">
          {project.requiredRoles.slice(0, 3).map((role, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium"
            >
              {role}
            </span>
          ))}
          {project.requiredRoles.length > 3 && (
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">
              +{project.requiredRoles.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center px-2 py-1 bg-white/10 rounded text-xs text-white/70"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-white/70">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{formatDate(project.createdAt)}</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{project.collaborators.length} collaborators</span>
        </div>
      </div>

      {/* Goals for details variant */}
      {variant === 'details' && project.goals.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-sm font-medium text-white/90 mb-2">Goals</h4>
          <ul className="space-y-1">
            {project.goals.map((goal, index) => (
              <li key={index} className="text-sm text-white/80 flex items-start">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {goal}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
