import * as React from 'react'
import App from 'next/app'
import { createGlobalStyle } from 'styled-components'
import Head from 'next/head'
import LoadingBar from '../components/LoadingBar'
import axios from 'axios'
import { SWRConfig } from 'swr'
import LoadingContext from '../components/LoadingContext'
import Router from 'next/router'

const GlobalStyles = createGlobalStyle`
  * {
      box-sizing: border-box;
  }

  :root {
    --backgroundColor-default: white;
    --backgroundColor-offset: #eee;
    --color-hairline: #ccc;
    --color-default: #111;
    --color-offset: #444;
    --color-accent: #000;
    --color-disabled: #999;
    --golden-ratio: 1.61803;
    --fontSize-default: 18px;
    --lineHeight-default: var(--golden-ratio);
    --backgroundColor-loadingBar: rgba(55, 130, 250, .9);
  }

  @media(prefers-color-scheme: dark) {
    :root {
      --backgroundColor-default: black;
      --backgroundColor-offset: #222;
      --color-hairline: #555;
      --color-default: #ccc;
      --color-offset: #999;
      --color-accent: #fff;
      --color-disabled: #444;
      --backgroundColor-loadingBar: rgba(55, 130, 250, .5);
    }

    a {
      color: var(--color-default);
      :hover, :focus {
        color: var(--color-accent);
      }
      :active {
        color: var(--color-offset);
      }
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

// wait for a bit before showing the bar; if we can do things quickly, there's
// no need to show the bar
const WAIT_MS = 100

export default class Weader extends App {
  state = { isLoading: false }
  startTimeout: number | void = undefined
  loadingCount = 0

  componentDidMount() {
    Router.events.on('routeChangeStart', this.setLoading)
    Router.events.on('routeChangeComplete', this.unsetLoading)
    return () => {}
  }

  componentWillUnmount() {
    if (this.startTimeout) clearTimeout(this.startTimeout)
    Router.events.off('routeChangeStart', this.setLoading)
    Router.events.off('routeChangeComplete', this.unsetLoading)
  }

  setLoading = () => {
    ++this.loadingCount
    if (this.startTimeout) return
    this.startTimeout = setTimeout(
      () => this.setState({ isLoading: true }),
      WAIT_MS,
    )
  }

  unsetLoading = () => {
    --this.loadingCount
    if (this.loadingCount > 0) return
    if (this.startTimeout) this.startTimeout = clearTimeout(this.startTimeout)
    this.setState({ isLoading: false })
  }

  fetcher = async (url: string) => {
    // only load this lib on the client; the server doesn't need this
    const { cacheGet } = await import('swr/esm/config')
    const cached = cacheGet(url)
    // bail early; the data will never change
    if (cached) return cached
    else this.setLoading()
    const { data } = await axios.get(url)
    this.unsetLoading()
    return data
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <GlobalStyles />
        <Head>
          <title>Mental Models</title>
        </Head>
        <LoadingContext.Provider value={this.state.isLoading}>
          <LoadingBar />
          <SWRConfig
            value={{
              fetcher: this.fetcher,
              loadingTimeout: 100,
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </LoadingContext.Provider>
      </>
    )
  }
}
