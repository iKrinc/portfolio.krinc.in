import React from "react";
import { motion } from "framer-motion";
import "./skills.scss";

const skills = {
  core_frontend: [
    "React",
    "Next.js (SSR/ISR, routing, performance)",
    "Redux Toolkit / RTK Query",
    "React Native",
    "JavaScript (ES6+)",
    "TypeScript (working knowledge)",
    "HTML5 / Semantic markup",
    "CSS3 / SASS / LESS",
  ],
  testing_quality: [
    "Jest",
    "React Testing Library",
    "Cypress (E2E)",
    "Storybook (component docs & visual checks)",
    "Accessibility (WCAG basics, ARIA, keyboard flows)",
    "Performance (Lighthouse, Core Web Vitals)",
  ],
  workflow_acceleration: [
    '"Vibe coding" (flow, rapid prototyping)',
    "Gemini CLI, Cursor, Windsurf (AI-assisted coding & reviews)",
    "ESLint, Prettier, Husky (pre-commit)",
    "Git & CI/CD pipelines",
    "Agile (estimation, refinement, sprints, retros)",
  ],
  design_UX: [
    "Component architecture & design tokens",
    "Responsive layouts & cross-browser/device QA",
    "Usability patterns, error/empty states",
  ],
  game_AR_VR: ["Unity", "Unreal Engine (learning)"],
  soft_skills: [
    "Problem solving under pressure",
    "Communication with cross-functional teams",
    "Leadership & mentoring (led a 12-member team)",
    "Adaptability & fast learning",
  ],
};

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2>My Skills</h2>
      <div className="skills-grid">
        {Object.keys(skills).map((category, i) => (
          <motion.div
            className="skill-category"
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <h3>{category.replace(/_/g, " ")}</h3>
            <ul>
              {skills[category].map((skill, j) => (
                <li key={j}>{skill}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
