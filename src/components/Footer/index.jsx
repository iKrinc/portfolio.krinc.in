import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Srinivas Krishna S K. All rights reserved.</p>
        <div className="footer-social-links">
          <a href="https://www.linkedin.com/in/srinivas-krishna-s-k" target="_blank" rel="noreferrer" className="linkedin-icon">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/KrishnaKrinc" target="_blank" rel="noreferrer" className="github-icon">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;