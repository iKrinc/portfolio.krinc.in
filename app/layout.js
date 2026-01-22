import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  title: 'OPERATOR | Motion-First Portfolio',
  description: 'Interactive developer portfolio with high-performance UI systems and motion-driven experiences.',
  keywords: ['Frontend Engineer', 'Motion Specialist', 'UI Architect', 'GSAP', 'Next.js', 'React', 'Portfolio'],
  authors: [{ name: 'Operator' }],
  openGraph: {
    title: 'OPERATOR | Motion-First Portfolio',
    description: 'High-performance UI systems and motion-driven interfaces.',
    url: 'https://portfolio.krinc.in',
    siteName: 'Operator Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPERATOR | Motion-First Portfolio',
    description: 'High-performance UI systems and motion-driven interfaces.',
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased selection:bg-orange-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}