import React from 'react';
import { motion } from 'framer-motion';
import './loader.scss';
import MobiusLoader from '../../../assets/Loaders/MobiusLoader.gif';

const Loader = () => {
  return (
    <motion.div
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={MobiusLoader} alt="Loading..." className="loader-gif" />
    </motion.div>
  );
};

export default Loader;
