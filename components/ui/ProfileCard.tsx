'use client';

import { User } from '@/lib/types';
import { motion } from 'framer-motion';
import { MapPin, Star, Users } from 'lucide-react';
import Image from 'next/image';

interface ProfileCardProps {
  user: User;
  variant?: 'base' | 'swipable';
  onSwipe?: (action: 'like' | 'pass') => void;
  className?: string;
}

export function ProfileCard({ 
  user, 
  variant = 'base', 
  onSwipe,
  className = '' 
}: ProfileCardProps) {
  const handleSwipe = (action: 'like' | 'pass') => {
    onSwipe?.(action);
  };

  return (
    <motion.div
      className={`glass-effect rounded-lg p-6 text-white ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: variant === 'swipable' ? 1.02 : 1 }}
    >
      {/* Header with avatar and basic info */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative">
          <Image
            src={user.profilePicUrl}
            alt={user.displayName}
            width={64}
            height={64}
            className="rounded-full border-2 border-white/20"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{user.displayName}</h3>
          <p className="text-white/70 text-sm">{user.collaborationStyle}</p>
          {user.location && (
            <div className="flex items-center text-white/60 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {user.location}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-white/80 text-sm mb-4 leading-relaxed">
          {user.bio}
        </p>
      )}

      {/* Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white/90 mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {user.skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {user.skills.length > 4 && (
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/60">
              +{user.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-white/70 mb-4">
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-1" />
          <span>{user.projectsCreated} created</span>
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          <span>{user.projectsJoined} joined</span>
        </div>
      </div>

      {/* Action buttons for swipable variant */}
      {variant === 'swipable' && (
        <div className="flex space-x-3">
          <button
            onClick={() => handleSwipe('pass')}
            className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors duration-200"
          >
            Pass
          </button>
          <button
            onClick={() => handleSwipe('like')}
            className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg font-medium transition-all duration-200"
          >
            Collaborate
          </button>
        </div>
      )}
    </motion.div>
  );
}
