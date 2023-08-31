import { m } from 'framer-motion';

import './mousey.css';

const Mousey = ({ onClick, delay = 0 }) => {
  return (
    <m.div
      className="scroll-downs"
      onClick={onClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay }}
      viewport={{ once: true }}
    >
      <div className="mousey">
        <div className="scroller"></div>
      </div>
    </m.div>
  );
};

export default Mousey;
