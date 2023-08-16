import { AnimatePresence, motion, useDomEvent } from 'framer-motion';
import NextImage from 'next/image';
import { useEffect, useRef, useState } from 'react';

const transition = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
};
const Image = ({
  src,
  key,
  alt,
}: {
  src: string;
  key: string;
  alt?: string;
}) => {
  const [isOpen, setOpen] = useState(false);
  const [finishedAnimation, setFinishedAnimation] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFinishedAnimation(true);
      }, 500);
    } else {
      setFinishedAnimation(false);
    }
  }, [isOpen]);
  useDomEvent(useRef(window), 'scroll', () => isOpen && setOpen(false));

  return (
    <div
      className={`${
        isOpen
          ? 'flex justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-full w-full cursor-zoom-out'
          : 'cursor-zoom-in'
      } ${finishedAnimation ? '' : 'z-50'}`}
    >
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="shade"
            transition={transition}
            className="h-full w-full bg-black fixed left-0 -top-[1px] z-0"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        key={key}
        transition={transition}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onClick={() => setOpen(!isOpen)}
        layout={true}
        className={`relative overflow-hidden ${
          isOpen ? 'z-10 max-h-[90%] max-w-[80%]' : ''
        }`}
      >
        <NextImage
          alt={alt || ''}
          src={`${src}/m/`}
          objectFit="contain"
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }}
        />
      </motion.div>
    </div>
  );
};

export default Image;
