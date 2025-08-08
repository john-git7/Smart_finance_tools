import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://smartfinancetools.vercel.app'), // change to your domain
  title: {
    default: 'Smart Finance Tools',
    template: '%s | Smart Finance Tools',
  },
  description: 'Free and easy calculators for mortgages, investments, savings goals, and retirement planning.',
  keywords: ['finance tools', 'mortgage calculator', 'investment calculator', 'savings planner', 'retirement calculator'],
  authors: [{ name: 'Blazer', url: 'https://smartfinancetools.vercel.app' }],
  openGraph: {
    title: 'Smart Finance Tools',
    description: 'Calculate your mortgage, investments, and savings easily.',
    url: 'https://smartfinancetools.vercel.app',
    siteName: 'SmartFinanceTools',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Finance Tools',
    description: 'Handy financial calculators in your browser.',
    site: '@yourtwitter',
    creator: '@yourtwitter',
    images: ['/og-image.png'],
  },
};


export default function RootLayout({ children }) {
  const setInitialTheme = `
    (function () {
      try {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (_) {}
    })();
  `;

  return (
    <html lang="en">
      <head>
         <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Smart Finance Tools",
    "url": "https://smartfinancetools.vercel.app/",
    "applicationCategory": "FinanceApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  })
}} />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}