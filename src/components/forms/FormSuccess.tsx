'use client';

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface FormSuccessProps {
  title: string;
  message: string;
}

export function FormSuccess({ title, message }: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center py-12 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        className="mb-6 inline-flex rounded-full bg-green-100 p-4 dark:bg-green-900/30"
      >
        <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
      </motion.div>
      <h3 className="text-foreground mb-2 text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground max-w-md">{message}</p>
    </motion.div>
  );
}
