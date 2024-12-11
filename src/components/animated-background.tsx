'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,180,0.15)_0%,rgba(255,255,255,0)_70%)]"
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
        className="absolute left-[10%] md:top-[30%] top-[50%] w-[400px] h-[400px] rounded-full bg-[#FF8C66] blur-[80px] md:opacity-30 opacity-20"
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
        className="absolute left-[25%] md:top-[60%] top-[80%] w-[200px] h-[200px] rounded-full bg-[#FF8C66] blur-[60px] md:opacity-20 opacity-10"
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