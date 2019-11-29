import React from 'react'
import axios from 'axios'
import ThoughtPage from '../../components/ThoughtPage'
import { NextPage } from 'next'

type IdProps = {
  title: string,
  notes: string,
  id: number,
}

const Id: NextPage<IdProps> = ({ title, notes, id }) => {
  return <ThoughtPage title={title} notes={notes} id={id} />
}

Id.getInitialProps = async ({ req, query }) => {
  const { id } = query
  if (Array.isArray(id)) throw new Error('invalid id')
  if (req) {
    const { serverDefault } = await import('../api/thought')
    return serverDefault({ id })
  }
  try {
    const { data } = await axios.get(`/api/thought?id=${id}`)
    return data
  } catch (e) {
    console.error(e)
  }
}
export default Id
