import { m } from 'framer-motion';

const variants = {
  initial: {
    pathLength: 0,
    pathOffset: 1,
  },
  animate: {
    pathLength: 1,
    pathOffset: 2,
  },
};

const Mousey = ({ onClick }) => {
  return (
    <m.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      className="w-6 md:w-12 svg-stroke absolute left-1/2 -translate-x-1/2 bottom-16 cursor-pointer"
      onClick={onClick}
    >
      <m.path
        d="M 80 0 L 40 40 L 0 0"
        variants={variants}
        className="fill-transparent"
        initial="initial"
        transition={{
          default: { duration: 0.5, ease: 'easeInOut' },
          delay: 1,
        }}
        animate="animate"
        viewport={{ once: true }}
      />
    </m.svg>
  );
};

export default Mousey;
