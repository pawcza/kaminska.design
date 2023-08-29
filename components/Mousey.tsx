import { m } from 'framer-motion';

import './mousey.css';

const Mousey = ({ onClick }) => {
  return (
    <m.div
      className="scroll-downs"
      onClick={onClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <div className="mousey">
        <div className="scroller"></div>
      </div>
    </m.div>
  );
};

export default Mousey;
