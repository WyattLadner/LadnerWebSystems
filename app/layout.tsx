import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Ladner Web Systems | Websites & Lead Capture Systems',
  description:
    'Web systems that help local businesses capture more leads. We build websites, quote request systems, and appointment-request workflows.',
  icons: {
    icon: '/Ladner_Systems_Logo_favicon_ready.png',
    shortcut: '/Ladner_Systems_Logo_favicon_ready.png',
    apple: '/Ladner_Systems_Logo_favicon_ready.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="font-sans antialiased relative min-h-screen bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
