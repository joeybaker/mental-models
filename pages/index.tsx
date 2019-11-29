import React, { useEffect } from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Router from 'next/router'
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
    Router.replace(href, href, {shallow: true})
  }, [])

  return <ThoughtPage title={title} notes={notes} id={id} />
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
