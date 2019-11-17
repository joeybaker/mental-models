import * as React from 'react'
import App from 'next/app'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
      box-sizing: border-box;
  }

  :root {
    --backgroundColor-default: white;
    --backgroundColor-offset: #eee;
    --color-hairline: #ccc;
    --color-default: #000;
    --color-offset: #444;
    --color-disabled: #999;
    --golden-ratio: 1.61803;
    --fontSize-default: 18px;
    --lineHeight-default: var(--golden-ratio);
  }

  @media(prefers-color-scheme: dark) {
    :root {
      --backgroundColor-default: black;
      --backgroundColor-offset: #222;
      --color-hairline: #555;
      --color-default: #ccc
      --color-offset: #999;
      --color-disabled: #444;
    }

    a {
      color: var(--color-default);
    }

    img {
      opacity: 0.6;
      filter: grayscale();
    }
  }

  html {
    font-size: var(--fontSize-default);
    background: var(--backgroundColor-default);
    color: var(--color-default);
  }

  body {
    padding: 0;
    margin: 0;

    /* System Fonts as used by Medium and WordPress */
    font-family: -apple-system, -system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }

  /* default font size * 100% / dynamic font size = min width of
   * screen where dynamic font size will actually increase the font
   * size */
  @media (min-width: calc(1800px /1.3)) {
    html {
      font-size: 1.3vw;
    }
  }
`

export default class Weader extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <GlobalStyles />
        <Component {...pageProps} />
      </>
    )
  }
}
