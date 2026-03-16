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
  title: 'Srinivas Krishna | Frontend Engineer',
  description: 'Frontend engineer by profession, versatile developer by passion. Building scalable UI systems, motion-enhanced interfaces, and open-source tools.',
  keywords: ['Frontend Engineer', 'React Developer', 'Next.js', 'TypeScript', 'UI Engineer', 'Open Source', 'Portfolio', 'Srinivas Krishna'],
  authors: [{ name: 'Srinivas Krishna S K' }],
  openGraph: {
    title: 'Srinivas Krishna | Frontend Engineer',
    description: 'Frontend engineer by profession, versatile developer by passion. Building scalable UI systems, motion-enhanced interfaces, and open-source tools.',
    url: 'https://portfolio.krinc.in',
    siteName: 'Srinivas Krishna Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srinivas Krishna | Frontend Engineer',
    description: 'Frontend engineer by profession, versatile developer by passion.',
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