import { getPost } from '../route'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } },
) {
  if (id == null) return new NextResponse('id required', { status: 400 })
  const item = getPost({ id })
  if (item == null) return new NextResponse('Nothing found', { status: 404 })
  return NextResponse.json(item)
}
