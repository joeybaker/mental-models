import React from 'react'
import type { Metadata } from 'next'
import { getPost } from '@/app/api/thought'
import Link from 'next/link'
import styles from './layout.module.css'
import Nav from './nav'

type Props = {
  params: {
    id: string
  }
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const post = getPost({ id })

  return {
    title: post.title,
  }
}

export default async function Thought({ params: { id }, children }: Props) {
  const today = getPost()
  const isToday = `${today.id}` === id

  return (
    <main className={styles.container}>
      {!isToday && (
        <Link href="/" className={styles.today}>
          Today&rsquo;s Thought
        </Link>
      )}
      {children}
      <Nav id={parseInt(id, 10)} />
    </main>
  )
}
