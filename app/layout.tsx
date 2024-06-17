import React from 'react'
import type { Metadata, Viewport } from 'next'
import './global.css'

const title = 'Mental Models'
export const metadata: Metadata = {
  title,
  description: 'A mental model a day',
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title }],
    },
  },
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
