import { motion } from 'framer-motion';

import './mousey.css';

const Mousey = ({ onClick }) => {
  return (
    <motion.div
      className="scroll-downs"
      onClick={onClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <div className="mousey">
        <div className="scroller"></div>
      </div>
    </motion.div>
  );
};

export default Mousey;
