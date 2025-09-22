'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import { COMMON_SKILLS, REQUIRED_ROLES } from '@/lib/constants';
import { ActionChip } from '@/components/ui/ActionChip';
import { Plus, X, Save } from 'lucide-react';

interface ProjectCreatorProps {
  onSave?: (project: Partial<Project>) => void;
  onCancel?: () => void;
}

export function ProjectCreator({ onSave, onCancel }: ProjectCreatorProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    goals: [''],
    requiredRoles: [] as string[],
    tags: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData(prev => ({ ...prev, goals: newGoals }));
  };

  const addGoal = () => {
    setFormData(prev => ({ ...prev, goals: [...prev.goals, ''] }));
  };

  const removeGoal = (index: number) => {
    const newGoals = formData.goals.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, goals: newGoals }));
  };

  const toggleRole = (role: string) => {
    const newRoles = formData.requiredRoles.includes(role)
      ? formData.requiredRoles.filter(r => r !== role)
      : [...formData.requiredRoles, role];
    setFormData(prev => ({ ...prev, requiredRoles: newRoles }));
  };

  const toggleTag = (tag: string) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter(t => t !== tag)
      : [...formData.tags, tag];
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectData: Partial<Project> = {
        ...formData,
        goals: formData.goals.filter(goal => goal.trim() !== ''),
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      onSave?.(projectData);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="glass-effect rounded-lg p-6 text-white max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Create New Project</h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Project Name</label>
          <input
            type="text"
            value={formData.projectName}
            onChange={(e) => handleInputChange('projectName', e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-white/50"
            placeholder="Enter your project name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-white/50 resize-none"
            placeholder="Describe your project and what you're trying to build"
            required
          />
        </div>

        {/* Goals */}
        <div>
          <label className="block text-sm font-medium mb-2">Project Goals</label>
          <div className="space-y-3">
            {formData.goals.map((goal, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => handleGoalChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-white/50"
                  placeholder="Enter a project goal"
                />
                {formData.goals.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGoal(index)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addGoal}
              className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>

        {/* Required Roles */}
        <div>
          <label className="block text-sm font-medium mb-2">Required Roles</label>
          <div className="flex flex-wrap gap-2">
            {REQUIRED_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.requiredRoles.includes(role)
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {['web-app', 'mobile', 'ai', 'blockchain', 'social', 'productivity', 'gaming', 'fintech'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  formData.tags.includes(tag)
                    ? 'bg-accent text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4 pt-4">
          <ActionChip
            label="Cancel"
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
          />
          <ActionChip
            label={isSubmitting ? "Creating..." : "Create Project"}
            icon={Save}
            variant="primary"
            disabled={isSubmitting || !formData.projectName || !formData.description}
            className="flex-1"
          />
        </div>
      </form>
    </motion.div>
  );
}
