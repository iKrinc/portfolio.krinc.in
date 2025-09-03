import React from 'react';
import { motion } from 'framer-motion';
import './about.scss';

const About = () => {
  return (
    <section id="about" className="about-section">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2>About Me</h2>
        <p>
          I'm a frontend developer with 2+ years of experience shipping responsive, accessible web and mobile apps.
          My core stack is React, React Native, Redux, and Next.js. I thrive under pressure—solving critical bugs
          and unblocking teams on tight timelines—while keeping code clean, modular, and testable.
        </p>
        <p>
          I code in “vibe” mode: staying in flow, pairing effectively, and turning ideas into working UI quickly.
          I use AI-assisted tools such as Gemini CLI, Cursor, and Windsurf to scaffold, review, and accelerate tasks,
          which reduces repetitive work and lowers the chance of simple bugs.
        </p>
        <p>
          I'm also exploring Unity and Unreal Engine to grow into game dev and AR/VR domains — my long-term goal
          is to be a versatile "knowledge wizard" across frontend, games, and immersive tech.
        </p>
      </motion.div>
    </section>
  );
};

export default About;