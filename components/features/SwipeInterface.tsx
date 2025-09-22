'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { User } from '@/lib/types';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { getRandomUsers } from '@/lib/mock-data';
import { Heart, X, RotateCcw } from 'lucide-react';

interface SwipeInterfaceProps {
  onMatch?: (user: User) => void;
  onPass?: (user: User) => void;
}

export function SwipeInterface({ onMatch, onPass }: SwipeInterfaceProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading users
    const loadUsers = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers(getRandomUsers(10));
      setIsLoading(false);
    };

    loadUsers();
  }, []);

  const handleSwipe = (direction: 'left' | 'right', user: User) => {
    if (direction === 'right') {
      onMatch?.(user);
    } else {
      onPass?.(user);
    }
    
    setCurrentIndex(prev => prev + 1);
  };

  const handleDragEnd = (event: any, info: PanInfo, user: User) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      handleSwipe('right', user);
    } else if (info.offset.x < -threshold) {
      handleSwipe('left', user);
    }
  };

  const currentUser = users[currentIndex];
  const nextUser = users[currentIndex + 1];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="glass-effect rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Finding collaborators...</p>
        </div>
      </div>
    );
  }

  if (currentIndex >= users.length) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="glass-effect rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            No more collaborators!
          </h3>
          <p className="text-white/70 mb-6">
            Check back later for more potential matches.
          </p>
          <button
            onClick={() => {
              setUsers(getRandomUsers(10));
              setCurrentIndex(0);
            }}
            className="flex items-center space-x-2 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 w-full max-w-sm mx-auto">
      <AnimatePresence>
        {/* Next card (background) */}
        {nextUser && (
          <motion.div
            key={`next-${nextUser.userId}`}
            className="absolute inset-0"
            initial={{ scale: 0.95, opacity: 0.5 }}
            animate={{ scale: 0.95, opacity: 0.5 }}
            style={{ zIndex: 1 }}
          >
            <ProfileCard user={nextUser} variant="swipable" />
          </motion.div>
        )}

        {/* Current card (foreground) */}
        {currentUser && (
          <motion.div
            key={`current-${currentUser.userId}`}
            className="absolute inset-0"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(event, info) => handleDragEnd(event, info, currentUser)}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              x: 0,
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.3 }
            }}
            style={{ zIndex: 2 }}
            whileDrag={{ scale: 1.05 }}
          >
            <ProfileCard 
              user={currentUser} 
              variant="swipable"
              onSwipe={(action) => handleSwipe(action === 'like' ? 'right' : 'left', currentUser)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-6">
        <motion.button
          className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => currentUser && handleSwipe('left', currentUser)}
        >
          <X className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full flex items-center justify-center text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => currentUser && handleSwipe('right', currentUser)}
        >
          <Heart className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
}
