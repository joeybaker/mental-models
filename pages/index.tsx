import React, { useEffect } from 'react'
import axios from 'axios'
import { NextPage } from 'next'
import Router from 'next/router'
import Id from './t/[id]'

type IndexProps = {
  title: string,
  notes: string,
  id: number,
}

const Index: NextPage<IndexProps> = ({ title, notes, id }) => {
  useEffect(() => {
    // update with the id of the shown mental model
    Router.replace(`/t/${id}`)
  }, [])

  return <Id title={title} notes={notes} id={id} />
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
