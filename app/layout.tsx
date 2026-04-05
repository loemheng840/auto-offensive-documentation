import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Khmer } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-google-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-hackdaddy',
});

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ['khmer'],
  variable: '--font-noto-khmer',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Complete documentation and guides',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: 'https://api.iconify.design/lucide:file-text.svg?color=%2318181b',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: 'https://api.iconify.design/lucide:file-text.svg?color=%23fafafa',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: 'https://api.iconify.design/lucide:file-text.svg?color=%2318181b',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${notoSansKhmer.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}
