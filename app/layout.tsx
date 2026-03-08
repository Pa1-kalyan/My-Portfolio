import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pavan\'s Portfolio',
  icons: {
    icon: './favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
