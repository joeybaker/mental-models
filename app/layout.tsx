import React from 'react'
import type { Metadata, Viewport } from 'next'
import './global.css'

export const metadata: Metadata = {
  title: 'Mental Models',
  description: 'A mental model a day',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
