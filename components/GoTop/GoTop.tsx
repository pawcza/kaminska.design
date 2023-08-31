import { AnimatePresence, m } from 'framer-motion';

const variants = {
  initial: {
    y: 200,
    pathLength: 0,
    pathOffset: 1,
    fill: 'rgba(255,255,255,0)',
  },
  animate: {
    y: 0,
    pathLength: 1,
    pathOffset: 2,
    fill: 'rgb(255,255,255)',
  },
  exit: {
    x: 200,
    pathLength: 0,
    pathOffset: 1,
    fill: 'rgba(255,255,255,0)',
  },
};

export const GoTop = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <m.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 160 160"
          className="gotop"
          onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
        >
          <m.path
            d="M 80 0 L 160 160 L 120 160 L 80 80 L 40 160 L 0 160 L 80 0"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              default: { duration: 0.5, ease: 'easeInOut' },
              y: { duration: 0.5, ease: [0.1, 0.8, 0, 1] },
              x: { duration: 0.5, ease: [1, 0, 0.8, 0.1] },
            }}
          />
        </m.svg>
      )}
    </AnimatePresence>
  );
};
