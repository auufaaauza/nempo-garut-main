import React, { useRef } from 'react';
import type { FC } from 'react'; // RefObject tidak perlu diimpor lagi
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxCardImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

const ParallaxCardImage: FC<ParallaxCardImageProps> = ({ 
  src, 
  alt, 
  className, 
  imageClassName 
}) => {
  // 1. Pengetikan useRef yang lebih ringkas dan modern
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  // Logika parallax tetap sama karena sudah efisien
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <div
      ref={ref}
      className={cn('relative w-full aspect-square overflow-hidden', className)}
    >
      <motion.img
        src={src}
        alt={alt}
        className={cn('absolute inset-0 w-full h-full object-cover object-center', imageClassName)}
        style={{ y }}
      />
    </div>
  );
};

// 2. Gunakan React.memo untuk mencegah render yang tidak perlu
export default React.memo(ParallaxCardImage);