import React from 'react'
import axios from 'axios'
import Thought from '../../components/Thought'
import { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import Head from 'next/head'

const Container = styled.main`
  display: flex;
  flex-direction: column;

  /* fill the height of the screen, but allow for scrolling with min if we have a tiny screen */
  min-height: fill-available;
`

const Nav = styled.nav`
  --opacity-default: 0.3;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavButton = styled.a`
  padding: 0.5em;
  text-decoration: none;
  opacity: var(--opacity-default);
  color: var(--color-offset);
  font-size: 2rem;
  will-change: transform;
  transition: 50ms transform;

  :hover, :focus {
    opacity: 1;
    transform: translateY(-0.1em) scale(1.05);
  }

  :active {
    opacity: 0.8;
    transform: translateY(-0.1em) scale(1);
  }
`

const PrevNavButton = styled(NavButton)``

const NextNavButton = styled(NavButton)``

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 400;

  opacity: var(--opacity-default);
`

type IdProps = {
  title: string,
  notes: string,
  id: number,
}

const Id: NextPage<IdProps> = ({ title, notes, id }) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={`${title} Mental Model`} />
        <meta property="og:url" content={`/${id}`} />
        <meta property="og:description" content="A new mental model every day." />
        <meta property="og:site_name" content="Mental Models" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <Thought title={title} notes={notes} />
      <Nav>
        <Link href="/t/[id]" as={`/t/${id - 1}`} passHref>
          <PrevNavButton rel="previous">←</PrevNavButton>
        </Link>
        <Title title="A new mental model every day. By Joey Baker.">Mental Models</Title>
        <Link href="/t/[id]" as={`/t/${id + 1}`} passHref>
          <NextNavButton rel="next">→</NextNavButton>
        </Link>
      </Nav>
    </Container>
  )
}

Id.getInitialProps = async ({ req, query }) => {
  const { id } = query
  if (Array.isArray(id)) throw new Error('invalid id')
  if (req) {
    const { serverDefault } = await import('../api/item')
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
