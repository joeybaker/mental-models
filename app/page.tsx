import { getPost } from '@/app/api/thought/route'
import { redirect } from 'next/navigation'

export default async function Home() {
  const today = getPost()
  redirect(`/t/${today.id}`)
}
