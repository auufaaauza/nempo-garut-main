import React, { type FC, type ReactNode } from 'react';
import { motion } from 'framer-motion';

// 1. Definisikan interface untuk props
interface PageLayoutProps {
  children: ReactNode;
}

// 2. Terapkan tipe pada komponen
const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

export default PageLayout;