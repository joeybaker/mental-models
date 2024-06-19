import { NextResponse, NextRequest } from 'next/server'
import { getPost } from '@/app/api/thought/route'

export function middleware(request: NextRequest) {
  if (request.url.includes('/t/')) return NextResponse.next()

  return NextResponse.redirect(new URL(`/t/${getPost().id}`, request.url))
}

export const config = {
  matcher: '/',
}
