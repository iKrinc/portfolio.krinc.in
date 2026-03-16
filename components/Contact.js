'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Heart } from 'lucide-react';

export default function Contact({ data }) {
  const contactLinks = [
    {
      label: 'EMAIL',
      value: data.email,
      link: `mailto:${data.email}`,
      icon: Mail,
      displayValue: data.email
    },
    {
      label: 'GITHUB',
      value: data.github,
      link: `https://${data.github}`,
      icon: Github,
      displayValue: '@iKrinc'
    },
    {
      label: 'LINKEDIN',
      value: data.linkedin,
      link: `https://${data.linkedin}`,
      icon: Linkedin,
      displayValue: 'srinivas-krishna-s-k'
    },
    {
      label: 'SPONSOR',
      value: data.sponsor,
      link: `https://${data.sponsor}`,
      icon: Heart,
      displayValue: 'sponsors/iKrinc'
    }
  ];

  return (
    <section id="uplink" className="contact-section min-h-screen relative flex items-center justify-center px-4 md:px-8" style={{ background: 'linear-gradient(to bottom, #0a0a0a, #1a1420, #0a0a0a)' }}>
      <div className="contact-content relative z-10 text-center max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-orange-500/60 text-xs tracking-widest mb-4">[ ESTABLISH CONTACT ]</div>
          <h2 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 font-mono">
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">CONNECT</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 mb-10 md:mb-14 font-mono max-w-xl mx-auto">
            Open to collaborations, freelance work, or just a good conversation about dev and games.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {contactLinks.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={i}
                href={contact.link}
                target={contact.label === 'EMAIL' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="interactive group relative border-2 border-orange-500/30 bg-black/40 hover:border-orange-500 hover:bg-orange-500/5 transition-all duration-300 overflow-hidden"
                style={{ minHeight: '130px' }}
              >
                {/* Default state */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="text-[10px] md:text-xs text-gray-500 mb-3 font-mono uppercase tracking-widest">
                    {contact.label}
                  </div>
                  <Icon
                    className={`w-7 h-7 md:w-9 md:h-9 ${contact.label === 'SPONSOR' ? 'text-pink-500' : 'text-orange-500'}`}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Hover state */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 md:p-5 bg-orange-500/5 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300">
                  <div className="text-[10px] md:text-xs text-gray-400 mb-2 font-mono uppercase tracking-widest">
                    {contact.label}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${contact.label === 'SPONSOR' ? 'text-pink-500' : 'text-orange-500'}`}
                      strokeWidth={1.5}
                    />
                    <div className="text-xs md:text-sm text-orange-400 font-mono break-all text-center leading-tight">
                      {contact.displayValue}
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-600 font-mono">
                    {contact.label === 'EMAIL' ? 'send mail' : contact.label === 'SPONSOR' ? 'support me' : 'open profile'}
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
