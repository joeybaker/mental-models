import { getPost } from '@/app/api/thought'
import { redirect } from 'next/navigation'

export default async function Home() {
  const today = getPost()
  redirect(`/t/${today.id}`)
}
