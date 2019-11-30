import React, { useEffect } from 'react'
import useSWR from 'swr'
import { NextPage } from 'next'
import ThoughtPage from '../components/ThoughtPage'

type IndexProps = {
  title: string
  notes: string
  id: number
}

const isServer = typeof window === 'undefined'
const setCache = async (data: IndexProps) => {
  if (data.id === -1 || isServer) return
  const { cacheSet } = await import('swr/esm/config')
  cacheSet('/api/thought?id=' + data.id, data)
}
const Index: NextPage<IndexProps> = props => {
  const { data, isValidating } = useSWR(
    () => (!props.title ? '/api/thought' : null),
    { initialData: props },
  )
  const isLoading = !data || (isValidating && !data.title)
  const { title, notes, id } = isLoading ? props : (data as IndexProps)

  // prime the swr cache
  setCache({ title, notes, id })

  useEffect(() => {
    const href = `/t/${id}`
    // update with the id of the shown mental model
    // Router.replace(href, href, {shallow: true})
    // use the baked in browser method instead of Router so that we don't
    // trigger a next.js page reload
    if (window.history) history.replaceState(null, '', href)
  }, [id])

  return <ThoughtPage title={title} notes={notes} id={id} isToday />
}

Index.getInitialProps = async ({ req }) => {
  if (req) {
    const { serverDefault } = await import('./api/thought')
    return serverDefault()
  }
  return { title: '', notes: '', id: -1 }
}
export default Index
