'use client';

import { motion } from 'framer-motion';
import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showNotifications?: boolean;
  showSearch?: boolean;
  showProfile?: boolean;
}

export function Header({ 
  title = 'CollabCraft',
  showNotifications = true,
  showSearch = true,
  showProfile = true 
}: HeaderProps) {
  return (
    <motion.header
      className="glass-effect border-b border-white/10 px-4 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>

        <div className="flex items-center space-x-3">
          {showSearch && (
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
              <Search className="w-5 h-5 text-white/70" />
            </button>
          )}
          
          {showNotifications && (
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 relative">
              <Bell className="w-5 h-5 text-white/70" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          )}
          
          {showProfile && (
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200">
              <User className="w-5 h-5 text-white/70" />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
