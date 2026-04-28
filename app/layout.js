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
  title: 'Srinivas Krishna | Frontend Developer & Client Liaison',
  description: '3-year frontend developer (React · React Native · Flutter · Next.js) with a client-facing track record — resolving production issues live, coordinating API integrations, and building open-source tools.',
  keywords: ['Frontend Developer', 'React Developer', 'Next.js', 'TypeScript', 'React Native', 'Flutter', 'Client Liaison', 'Open Source', 'Portfolio', 'Srinivas Krishna'],
  authors: [{ name: 'Srinivas Krishna S K' }],
  openGraph: {
    title: 'Srinivas Krishna | Frontend Developer & Client Liaison',
    description: '3-year frontend developer with a client-facing track record in React, React Native, Flutter, and Next.js. Resolves production issues live and builds open-source tools.',
    url: 'https://portfolio.krinc.in',
    siteName: 'Srinivas Krishna Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srinivas Krishna | Frontend Developer & Client Liaison',
    description: '3-year frontend developer with a client-facing track record in React, React Native, Flutter, and Next.js.',
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