'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact({ data }) {
  const contactLinks = [
    {
      label: 'COMMS',
      value: data.email,
      link: `mailto:${data.email}`,
      icon: Mail,
      displayValue: 'Mail Me'
    },
    {
      label: 'NETWORK',
      value: data.github,
      link: `https://${data.github}`,
      icon: Github,
      displayValue: data.github.replace('github.com/', '')
    },
    {
      label: 'ALLIANCE',
      value: data.linkedin,
      link: `https://${data.linkedin}`,
      icon: Linkedin,
      displayValue: data.linkedin.replace('linkedin.com/in/', '')
    }
  ];

  return (
    <section id="uplink" className="contact-section min-h-screen relative flex items-center justify-center px-4 md:px-8" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1420, #0a0a0a)' }}>
      <div className="contact-content relative z-10 text-center max-w-4xl w-full">
        <h2 className="text-5xl md:text-8xl font-bold mb-6 md:mb-8 font-mono">
          ESTABLISH <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">UPLINK</span>
        </h2>
        <p className="text-lg md:text-2xl text-gray-400 mb-8 md:mb-12 font-mono px-4">Ready for deployment on your next operation</p>

        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {contactLinks.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={i}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="interactive group relative border-2 border-orange-500/30 bg-black/40 transition-all overflow-hidden"
                style={{
                  minHeight: '120px',
                }}
              >
                {/* Default state - Icon only */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="text-xs md:text-sm text-gray-500 mb-3 font-mono uppercase tracking-wider">
                    {contact.label}
                  </div>
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-orange-500" strokeWidth={1.5} />
                </div>

                {/* Hover state - Full content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 bg-orange-500/5 border-2 border-orange-500 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300">
                  <div className="text-xs md:text-sm text-gray-400 mb-2 font-mono uppercase tracking-wider">
                    {contact.label}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-orange-500 flex-shrink-0" strokeWidth={1.5} />
                    <div className="text-sm md:text-base text-orange-500 font-mono break-all text-center">
                      {contact.displayValue}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    Click to {contact.label === 'COMMS' ? 'send' : 'visit'}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
