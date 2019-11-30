import React, { useEffect } from 'react'
import axios from 'axios'
import useSWR from 'swr'
import { NextPage } from 'next'
import ThoughtPage from '../components/ThoughtPage'

type IndexProps = {
  title: string
  notes: string
  id: number
}

const Index: NextPage<IndexProps> = props => {
  const { data, isValidating } = useSWR(
    () => (!props.title ? '/api/thought' : null),
    u => axios.get(u).then(({ data }) => data),
    { initialData: props },
  )
  const isLoading = !data || isValidating
  const { title, notes, id } = isLoading ? props : data

  useEffect(() => {
    const href = `/t/${id}`
    // update with the id of the shown mental model
    // Router.replace(href, href, {shallow: true})
    // use the baked in browser method instead of Router so that we don't
    // trigger a next.js page reload
    if (window.history) history.replaceState(null, '', href)
  }, [id])

  return (
    <ThoughtPage
      title={title}
      notes={notes}
      id={id}
      isToday
      isLoading={isLoading}
    />
  )
}

Index.getInitialProps = async ({ req }) => {
  if (req) {
    const { serverDefault } = await import('./api/thought')
    return serverDefault()
  }
  return { title: '', notes: '', id: -1 }
}
export default Index
