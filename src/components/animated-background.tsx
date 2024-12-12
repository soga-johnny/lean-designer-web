'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export const AnimatedBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden">
      <motion.div
        className={`absolute top-0 left-0 w-full h-full ${
          isDark 
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(75,53,58,0.15)_0%,rgba(0,0,0,0)_70%)]'
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,180,0.15)_0%,rgba(255,255,255,0)_70%)]'
        }`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className={`absolute left-[10%] md:top-[30%] top-[50%] w-[400px] h-[400px] rounded-full ${
          isDark 
            ? 'bg-glow-dark md:opacity-20 opacity-10'
            : 'bg-[#FF8C66] md:opacity-30 opacity-20'
        } blur-[80px]`}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute left-[25%] md:top-[60%] top-[80%] w-[200px] h-[200px] rounded-full ${
          isDark 
            ? 'bg-glow-dark md:opacity-10 opacity-5'
            : 'bg-[#FF8C66] md:opacity-20 opacity-10'
        } blur-[60px]`}
        animate={{
          y: [10, -10, 10],
          x: [5, -5, 5],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}; 