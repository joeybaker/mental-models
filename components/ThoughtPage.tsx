import React from 'react'
import Thought from './Thought'
import { NextPage } from 'next'
import Link from 'next/link'
import styled from 'styled-components'
import Head from 'next/head'
import { useSwipeable } from 'react-swipeable'
import Router from 'next/router'

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

  :hover,
  :focus {
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

const Today = styled.a`
  align-self: center;
  padding: 1em;
  color: var(--color-offset);
  font-size: 0.8em;
  text-decoration: none;
  opacity: 0.5;
  border-radius: 0 2px 2px 0;
  transform: translateY(-0.2em);
  will-change: transform, background-color;
  transition: transform 100ms, background-color 50ms;

  :hover {
    background-color: var(--backgroundColor-offset);
    color: var(--color-default);
    transform: translateY(0);
  }
`

type ThoughtPageProps = {
  title: string
  notes: string
  id: number
  isToday?: boolean
}

const navHref = '/t/[id]'
const ThoughtPage: NextPage<ThoughtPageProps> = ({
  title,
  notes,
  id,
  isToday,
  isLoading,
}) => {
  const nextUrl = `/t/${id + 1}`
  const prevUrl = `/t/${id - 1}`
  const handlers = useSwipeable({
    onSwipedLeft: () => Router.push(nextUrl),
    onSwipedRight: () => Router.push(prevUrl),
    onSwipedDown: () => Router.push(prevUrl),
    onSwipedUp: () => Router.push(prevUrl),
  })

  return (
    <Container {...handlers}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={`${title} Mental Model`} />
        <meta property="og:url" content={`/${id}`} />
        <meta
          property="og:description"
          content="A new mental model every day."
        />
        <meta property="og:site_name" content="Mental Models" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <Thought title={title} notes={notes} />
      {!isToday && (
        <Link href="/" passHref>
          <Today>Today's Thought</Today>
        </Link>
      )}
      <Nav>
        <Link href={navHref} as={prevUrl} passHref>
          <PrevNavButton rel="previous">←</PrevNavButton>
        </Link>
        <Title title="A new mental model every day. By Joey Baker.">
          Mental Models
        </Title>
        <Link href={navHref} as={nextUrl} passHref>
          <NextNavButton rel="next">→</NextNavButton>
        </Link>
      </Nav>
    </Container>
  )
}

export default ThoughtPage
