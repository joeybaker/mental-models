import { NextApiRequest, NextApiResponse } from 'next'
import data from '../../data.js'

const oneDayMS = 1000 * 60 * 60 * 24
const getUTCDayOfYear = (now = new Date()) => {
  const yearStart = new Date(now.getUTCFullYear(), 0, 0)
  const diffMS = now.valueOf() - yearStart.valueOf()
  return Math.round(diffMS / oneDayMS)
}

const getItem = (id: number | string) => {
  const index = typeof id === 'string' ? parseInt(id, 10) : id
  return { id: index, ...data[index] }
}

const MAX_DAYS = 365
const START_YEAR = 2019
const getItemForDayOfYear = (dayOfYear = getUTCDayOfYear()) => {
  const total = data.length
  const currentYear = new Date().getUTCFullYear()
  const extraYears = Math.floor(total / MAX_DAYS)
  const additionalYears = (currentYear - START_YEAR) % extraYears
  const additionalDays = additionalYears * MAX_DAYS
  const index = dayOfYear + additionalDays

  return getItem(index)
}

export const serverDefault = (
  { id }: { id: number | string | undefined } = { id: undefined },
) => {
  return id != null && id !== '' ? getItem(id) : getItemForDayOfYear()
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (Array.isArray(id)) return res.status(400)
  const item = serverDefault({ id })
  if (!item) return res.status(404).end()
  res.status(200).json(item)
}
