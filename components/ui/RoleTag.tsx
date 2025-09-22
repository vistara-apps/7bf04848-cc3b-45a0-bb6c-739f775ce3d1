'use client';

import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';

interface RoleTagProps {
  role: string;
  variant?: 'required' | 'filled';
  onClick?: () => void;
  className?: string;
}

export function RoleTag({ 
  role, 
  variant = 'required', 
  onClick,
  className = '' 
}: RoleTagProps) {
  const variants = {
    required: 'bg-red-500/20 text-red-300 border-red-500/30',
    filled: 'bg-green-500/20 text-green-300 border-green-500/30',
  };

  const icons = {
    required: <Plus className="w-3 h-3" />,
    filled: <Check className="w-3 h-3" />,
  };

  return (
    <motion.button
      className={`
        flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm font-medium
        transition-all duration-200 hover:scale-105
        ${variants[variant]} ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {icons[variant]}
      <span>{role}</span>
    </motion.button>
  );
}
