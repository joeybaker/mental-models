import React from 'react'
import Markdown from 'react-markdown'
import { getPost } from '@/app/api/thought'
import styles from './page.module.css'

export default function Thought({
  params: { id },
}: {
  params: { id: string }
}) {
  // TODO: loading state as a client component
  const isLoading = false
  const { title, notes } = getPost({ id })

  return (
    <article className={styles.box}>
      {isLoading ? (
        <h2 className={styles.titleLoading}>
          &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#8199;&emsp;
          &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
        </h2>
      ) : (
        <h2 className={styles.title}>{title}</h2>
      )}
      {isLoading ? (
        <div className={styles.bodyLoading}>
          &#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&ensp;&#9608;&#9608;
        </div>
      ) : (
        <div className={styles.body}>
          <Markdown>{notes}</Markdown>
        </div>
      )}
    </article>
  )
}
