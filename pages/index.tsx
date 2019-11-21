import React from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'
import data from '../data.js'
import seedRandom from 'seed-random'

const Box = styled.article`
  --fontSize-min: 20px;
  --fontWidth-max: 50ch;
  --fontSize-dynamic: 4;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* fill the height of the screen, but allow for scrolling with min if we have a tiny screen */
  min-height: 100vh;
  min-height: -moz-available;
  min-height: -webkit-fill-available;
  min-height: fill-available;

  padding: 1em;

  @media screen and (orientation: portrait) {
    font-size: calc(1vw * var(--fontSize-dynamic));
  }
  @media screen and (orientation: portrait) and (max-width: 400px) {
    font-size: var(--fontSize-min);
  }

  @media screen and (orientation: landscape) {
    font-size: calc(1vh * var(--fontSize-dynamic));
  }
  @media screen and (orientation: landscape) and (max-height: 400px) {
    font-size: var(--fontSize-min);
  }
`

const Title = styled.h2`
  margin-bottom: calc(var(--golden-ratio) * 0.1em);
  font-size: 2em;

  /* ensure text is easy to scan */
  max-width: var(--fontWidth-max);
`

const Body = styled.p`
  word-break: break-word;

  /* ensure text is easy to scan */
  max-width: var(--fontWidth-max);
`

export default () => {
  const total = data.length
  const now = new Date()
  const date = '' + now.getUTCFullYear() + now.getUTCMonth() + now.getUTCDay()
  const random = seedRandom(date)()
  const index = Math.floor(random * total)
  const item = data[index]
  return (
    <Box>
      <Title>{item.title}</Title>
      <Body>
        <Markdown source={item.notes} />
      </Body>
    </Box>
  )
}
