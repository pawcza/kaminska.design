import { AnimatePresence, m } from 'framer-motion';

const innerVariants = {
  initial: {
    pathLength: 1,
    pathOffset: 1,
  },
  animate: {
    pathLength: 1,
    pathOffset: 2,
  },
  exit: {
    pathLength: 0,
    pathOffset: 1,
  },
};

const outerVariants = {
  initial: {
    y: 200,
  },
  animate: {
    y: 0,
  },
  exit: {
    x: 200,
  },
};

export const GoTop = ({ visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="p-4 fixed right-2 bottom-2 cursor-pointer -rotate-45 z-50 backdrop-grayscale bg-[rgba(255,255,255,.75)] md:bg-transparent"
          variants={outerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            y: { duration: 0.5, ease: [0.1, 0.8, 0, 1] },
            x: { duration: 0.5, ease: [1, 0, 0.8, 0.1] },
          }}
        >
          <m.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 80 80"
            className="w-6 md:w-12 svg-stroke -mb-2"
            onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
          >
            <m.path
              d="M 80 40 L 40 0 L 0 40"
              variants={innerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                default: { duration: 0.5, ease: 'easeInOut' },
              }}
              className="fill-transparent"
            />
          </m.svg>
        </m.div>
      )}
    </AnimatePresence>
  );
};
