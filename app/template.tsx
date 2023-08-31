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
  const handleScroll = () => {
    setVisible(
      document.body.scrollHeight < window.scrollY + 1.5 * window.innerHeight,
    );
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
      {children}
    </LazyMotion>
  );
}
