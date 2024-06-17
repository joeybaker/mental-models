import React from 'react'
import Markdown from 'react-markdown'
import { getPost } from '@/app/api/thought'
import styles from './page.module.css'

export default function Thought({
  params: { id },
}: {
  params: { id: string }
}) {
  const { title, notes } = getPost({ id })

  return (
    <article className={styles.box}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.body}>
        <Markdown>{notes}</Markdown>
      </div>
    </article>
  )
}
