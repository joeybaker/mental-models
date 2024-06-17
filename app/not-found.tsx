import styles from './not-found.module.css'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1>404</h1>
      <p>
        Whoops… page not found.
        <br />
        <Link href="/">Go Home</Link>.
      </p>
    </main>
  )
}
