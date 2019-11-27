import React from 'react'
import axios from 'axios'
import Thought from './thought'
import { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  flex-direction: column;

  /* fill the height of the screen, but allow for scrolling with min if we have a tiny screen */
  min-height: fill-available;
`

const NavButton = styled.a`
  padding: 0.5em;
  text-decoration: none;
  opacity: 0.5;
  color: var(--color-offset);
  font-size: 2rem;

  :hover {
    opacity: 1;
  }

  :active {
    opacity: 0.8;
  }
`

const PrevNavButton = styled(NavButton)``

const NextNavButton = styled(NavButton)``

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`

type IdProps = {
  title: string,
  notes: string,
  id: number,
}

const Id: NextPage<IdProps> = ({ title, notes, id }) => {
  return (
    <Container>
      <Thought title={title} notes={notes} />
      <Nav>
        <Link href="/[id]" as={`/${id - 1}`} passHref>
          <PrevNavButton>←</PrevNavButton>
        </Link>
        <Link href="/[id]" as={`/${id + 1}`} passHref>
          <NextNavButton>→</NextNavButton>
        </Link>
      </Nav>
    </Container>
  )
}

Id.getInitialProps = async ({ req, query }) => {
  const { id } = query
  if (Array.isArray(id)) throw new Error('invalid id')
  if (req) {
    const { serverDefault } = await import('./api/item')
    return serverDefault({ id })
  }
  try {
    const { data } = await axios.get(`/api/item?id=${id}`)
    return data
  } catch (e) {
    console.error(e)
  }
}
export default Id
