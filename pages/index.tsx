import React, { useEffect } from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import ThoughtPage from '../components/ThoughtPage'

type IndexProps = {
  title: string,
  notes: string,
  id: number,
}

const Index: NextPage<IndexProps> = ({ title, notes, id }) => {
  useEffect(() => {
    const href = `/t/${id}`
    // update with the id of the shown mental model
    // Router.replace(href, href, {shallow: true})
    // use the baked in browser method instead of Router so that we don't
    // trigger a next.js page reload
    if (window.history) history.replaceState(null, '', href)
  }, [])

  return <ThoughtPage title={title} notes={notes} id={id} isToday />
}

Index.getInitialProps = async ({ req }) => {
  if (req) {
    const { serverDefault } = await import('./api/thought')
    return serverDefault()
  }
  try {
    const { data } = await axios.get('/api/thought')
    return data
  } catch (e) {
    console.error(e)
  }
}
export default Index
