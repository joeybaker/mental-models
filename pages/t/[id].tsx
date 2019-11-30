import React from 'react'
import axios from 'axios'
import useSWR from 'swr'
import ThoughtPage from '../../components/ThoughtPage'
import { NextPage } from 'next'

type IdProps = {
  title: string,
  notes: string,
  id: number,
}

const Id: NextPage<IdProps> = (props) => {
  const {data, isValidating} = useSWR(() => !props.title ? '/api/thought?id=' + props.id : null, u => axios.get(u).then(({data}) => data), {initialData: props})
  const isLoading = !data || isValidating
  const { title, notes, id } = isLoading ?  props : data
  return <ThoughtPage title={title} notes={notes} id={id} isLoading={isLoading} />
}

Id.getInitialProps = async ({ req, query }) => {
  const { id } = query
  if (Array.isArray(id)) throw new Error('invalid id')
  if (req) {
    const { serverDefault } = await import('../api/thought')
    return serverDefault({ id })
  }
  return {title: '', notes: '', id: parseInt(id, 10)}
}
export default Id
