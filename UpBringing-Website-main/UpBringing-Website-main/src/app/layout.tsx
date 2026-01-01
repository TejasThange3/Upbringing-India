import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Upbringing Technologies - Engineering Reliable Industrial Solutions',
  description: 'Delivering precision-engineered solutions for industrial and technological excellence. Trusted partners in vacuum systems, industrial equipment, and automation solutions.',
  keywords: 'industrial solutions, vacuum systems, automation, engineering, manufacturing, Upbringing Technologies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

