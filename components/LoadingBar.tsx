import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import styled from 'styled-components'

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--backgroundColor-loadingBar);
`

// wait for a bit before showing the bar; if we can do things quickly, there's
// no need to show the bar
const WAIT_MS = 100

const LoadingBar = () => {
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    let startTimeout: number | void
    const start = () => {
      if (startTimeout) clearTimeout(startTimeout)
      startTimeout = setTimeout(() => setIsLoading(true), WAIT_MS)
    }
    const end = () => {
      if (startTimeout) startTimeout = clearTimeout(startTimeout)
      setIsLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
    }
  }, [])

  return isLoading ? <Bar /> : null
}

export default LoadingBar
