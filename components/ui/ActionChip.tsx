'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ActionChipProps {
  label: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'destructive';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function ActionChip({ 
  label, 
  icon: Icon, 
  variant = 'primary', 
  onClick,
  disabled = false,
  className = '' 
}: ActionChipProps) {
  const variants = {
    primary: 'bg-primary hover:bg-primary/80 text-white',
    secondary: 'bg-white/20 hover:bg-white/30 text-white',
    destructive: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <motion.button
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </motion.button>
  );
}
