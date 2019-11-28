import React from 'react'
import styled from 'styled-components'
import Markdown from 'react-markdown'

const Box = styled.article`
  --fontSize-min: 20px;
  --fontWidth-max: 50ch;
  --fontSize-dynamic: 4;

  flex: 2 1 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const Body = styled.div`
  word-break: break-word;
  line-height: 1.5;

  /* ensure text is easy to scan */
  max-width: var(--fontWidth-max);
`

const Thought = ({ title, notes }: { title: string, notes: string }) => {
  return (
    <Box>
      <Title>{title}</Title>
      <Body>
        <Markdown source={notes} />
      </Body>
    </Box>
  )
}

export default Thought
