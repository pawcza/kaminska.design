'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

import { GoTop } from '@/components/GoTop/GoTop';

export default function DefaultTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [backgroundSize, setBackgroundSize] = useState<string>('');
  const [size, setSize] = useState(0);
  const handleScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = winScroll / height;
    setVisible(scrolled > 0.3);
    setBackgroundSize(`${30 * scrolled + 32}px ${30 * scrolled + 32}px`);
    setSize(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <GoTop visible={visible} />
      <div className="body-background" style={{ backgroundSize }} />
      <div className="fixed top-0 h-1 bg-gray-300 w-full md:w-[calc(50%-4rem)] z-50 left-1/2 -translate-x-1/2">
        <div
          className="bg-[rgba(0,0,0,.8)] w-full h-full origin-left"
          style={{ transform: `scaleX(${size})` }}
        />
      </div>
      {children}
    </LazyMotion>
  );
}
