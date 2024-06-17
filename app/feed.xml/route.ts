import { getPost } from '@/app/api/thought'
import markdownToHtml from '@/lib/markdown-to-html'
import RSS from 'rss'
import { metadata } from '@/app/layout'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const host = req.headers.get('x-forwarded-host')
  const protocol = req.headers.get('x-forwarded-proto')
  const domain = `${protocol}://${host}`
  const feed = new RSS({
    title: `${metadata.title ?? 'Mental Models'}`,
    description: metadata.description ?? 'A mental model a day',
    generator: '',
    feed_url: `${domain}/feed.xml`,
    site_url: domain,
    image_url: '',
    language: 'en-US',
    ttl: 60,
  })
  const today = getPost()
  const todayIndex = today.id
  const currentDate = new Date()
  const posts: [any?] = []
  for (let i = 0; i <= 30; i++) {
    const date = currentDate.setDate(currentDate.getDate() - i)
    posts.push({ ...getPost({ id: todayIndex - i }), date })
  }

  await Promise.all(
    posts.map(async (post) => {
      feed.item({
        title: post.title,
        description: await markdownToHtml(post.notes),
        url: `${domain}/t/${post.id}`,
        date: post.date,
        guid: post.id,
      })
    }),
  )

  return new Response(feed.xml())
}
