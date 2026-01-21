'use client'

import contactDataImport from '@/data/contact.json'
import type { ContactData } from '@/lib/types'

const contactData = contactDataImport as ContactData

export function Footer() {
  // TODO: Framer Motion - fade in on scroll

  if (!contactData.footer) return null

  return (
    <footer
      className="footer"
      style={{
        position: 'relative',
        minHeight: '50vh',
        width: '100%',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '200px 2rem 4rem',
        textAlign: 'center',
      }}
    >
      {/* Copyright text */}
      <p
        style={{
          fontSize: '12px',
          fontFamily: 'monospace',
          opacity: 0.4,
          marginBottom: '1rem',
        }}
      >
        {contactData.footer.text}
      </p>

      {/* Links */}
      {contactData.footer.links && (
        <div style={{ display: 'flex', gap: '2rem' }}>
          {contactData.footer.links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12px',
                fontFamily: 'monospace',
                opacity: 0.4,
                textDecoration: 'underline',
                color: 'white',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </footer>
  )
}
