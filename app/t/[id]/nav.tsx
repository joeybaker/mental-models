'use client'

import React from 'react'
import Link from 'next/link'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/navigation'
import styles from './nav.module.css'

export default function Nav({ id }: { id: number }) {
  const router = useRouter()

  const nextUrl = `/t/${id + 1}`
  const prevUrl = `/t/${id - 1}`
  const handlers = useSwipeable({
    onSwipedLeft: () => router.push(nextUrl),
    onSwipedRight: () => router.push(prevUrl),
    onSwipedDown: () => router.push(prevUrl),
    onSwipedUp: () => router.push(prevUrl),
  })

  return (
    <nav className={styles.nav} {...handlers}>
      <Link
        href={prevUrl}
        className={styles.navButton}
        rel="previous"
        scroll={false}
      >
        ←
      </Link>
      <h1
        className={styles.title}
        title="A new mental model every day. By Joey Baker."
      >
        Mental Models
      </h1>
      <Link
        href={nextUrl}
        className={styles.navButton}
        rel="next"
        scroll={false}
      >
        →
      </Link>
    </nav>
  )
}
