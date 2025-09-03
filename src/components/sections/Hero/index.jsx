import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./hero.scss";
import profilePhoto from "../../../../assets/Profile/Srinivas_Krishna_Photo.jpg";
import resume from "../../../../assets/Resume/Srinivas_Krishna_SK_Resume.pdf";

const Hero = ({ setShowNameInHeader }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNameInHeader(!entry.isIntersecting);
      },
      { threshold: 0.7 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [setShowNameInHeader]);

  return (
    <section className="hero-container" ref={heroRef}>
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="hero-text">
          <h1 className="hero-title">Srinivas Krishna S K</h1>
          <p className="hero-subtitle">Frontend Developer</p>
          <div className="hero-social-links">
            <a
              href="https://www.linkedin.com/in/srinivas-krishna-s-k"
              target="_blank"
              rel="noreferrer"
              className="linkedin-icon"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/KrishnaKrinc"
              target="_blank"
              rel="noreferrer"
              className="github-icon"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
          <a href={resume} download className="cta-button">
            Download CV
          </a>
        </div>
        <div className="hero-image">
          <motion.img
            src={profilePhoto}
            alt="Srinivas Krishna S K"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
