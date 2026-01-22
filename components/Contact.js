'use client';

import { motion } from 'framer-motion';

export default function Contact({ data }) {
  const contactLinks = [
    { label: 'COMMS', value: data.email, link: `mailto:${data.email}` },
    { label: 'NETWORK', value: data.github, link: `https://${data.github}` },
    { label: 'ALLIANCE', value: data.linkedin, link: `https://${data.linkedin}` }
  ];

  return (
    <section id="uplink" className="contact-section min-h-screen relative flex items-center justify-center px-4 md:px-8" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1420, #0a0a0a)' }}>
      <div className="contact-content relative z-10 text-center max-w-4xl">
        <h2 className="text-5xl md:text-8xl font-bold mb-6 md:mb-8 font-mono">
          ESTABLISH <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">UPLINK</span>
        </h2>
        <p className="text-lg md:text-2xl text-gray-400 mb-8 md:mb-12 font-mono px-4">Ready for deployment on your next operation</p>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {contactLinks.map((contact, i) => (
            <motion.a 
              key={i} 
              href={contact.link} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: '#f97316' }} 
              className="interactive block p-6 md:p-8 border-2 border-orange-500/30 bg-black/40 transition-all group"
            >
              <div className="text-xs md:text-sm text-gray-500 mb-2 font-mono uppercase">{contact.label}</div>
              <div className="text-sm md:text-lg text-orange-500 font-mono break-all">{contact.value}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
