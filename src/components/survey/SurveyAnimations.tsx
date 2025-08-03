'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// 上品なアニメーションバリアント定義
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -10,
  },
};

export const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.8,
};

export const staggerContainer = {
  initial: {},
  in: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const fadeInUp = {
  initial: {
    y: 15,
    opacity: 0,
  },
  in: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const gentleFadeIn = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const subtleSlide = {
  initial: {
    x: 20,
    opacity: 0,
  },
  in: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const progressBarVariants = {
  initial: {
    width: '0%',
  },
  animate: (width: string) => ({
    width: width,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  }),
};

// ページラッパーコンポーネント
interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export const PageWrapper = ({ children, className = '' }: PageWrapperProps) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className={className}
  >
    {children}
  </motion.div>
);

// スタガーコンテナコンポーネント
export const StaggerContainer = ({ children, className = '' }: PageWrapperProps) => (
  <motion.div
    initial="initial"
    animate="in"
    variants={staggerContainer}
    className={className}
  >
    {children}
  </motion.div>
);

// 上品なボタンアニメーション
export const ButtonMotion = motion.button;
export const buttonVariants = {
  idle: {
    opacity: 1,
    y: 0,
  },
  hover: {
    opacity: 0.9,
    y: -1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  tap: {
    opacity: 0.8,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
}; 