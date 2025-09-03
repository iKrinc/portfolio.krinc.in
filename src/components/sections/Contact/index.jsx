import React from 'react';
import { motion } from 'framer-motion';
import './contact.scss';

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>Get In Touch</h2>
        <p>I'm currently looking for new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
        <a href="mailto:srinivaskrishnask2002@gmail.com" className="contact-button">Say Hello</a>
      </motion.div>
    </section>
  );
};

export default Contact;