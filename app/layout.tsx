import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  // Overridden by NEXT_PUBLIC_SITE_URL on Vercel; localhost keeps dev builds quiet.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'p-money · paid in pons',
  description:
    'A tax on every trade buys $pons on the open market and pushes it to holder wallets. No staking. No claiming. No lockups.',
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: 'p-money · paid in pons',
    description: 'Hold p-money. Get paid pons. Payouts every 15 minutes.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: '#f4f2ed', fontFamily: "'Space Grotesk',Helvetica,sans-serif", overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  );
}
