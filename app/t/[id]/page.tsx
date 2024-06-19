import React from 'react'
import Markdown from 'react-markdown'
import { getPost } from '@/app/api/thought/route'
import styles from './page.module.css'
import { redirect } from 'next/navigation'

export default function Thought({
  params: { id },
}: {
  params: { id: string }
}) {
  const { title, notes, id: postId } = getPost({ id })
  if (id !== `${postId}`) redirect(`/t/${postId}`)

  return (
    <article className={styles.box}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>
        <Markdown>{notes}</Markdown>
      </div>
    </article>
  )
}
