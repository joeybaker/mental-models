import React from 'react'
import useSWR from 'swr'
import ThoughtPage from '../../components/ThoughtPage'
import { NextPage } from 'next'

type IdProps = {
  title: string
  notes: string
  id: number
}

const Id: NextPage<IdProps> = props => {
  const { data, isValidating } = useSWR(
    () => (!props.title ? '/api/thought?id=' + props.id : null),
    { initialData: props },
  )
  const isLoading = !data || (isValidating && !data.title)
  const { title, notes, id } = isLoading ? props : (data as IdProps)
  return <ThoughtPage title={title} notes={notes} id={id} />
}

Id.getInitialProps = async ({ req, query }) => {
  const { id } = query
  if (Array.isArray(id)) throw new Error('invalid id')
  if (req) {
    const { serverDefault } = await import('../api/thought')
    return serverDefault({ id })
  }
  return { title: '', notes: '', id: parseInt(id, 10) }
}
export default Id
