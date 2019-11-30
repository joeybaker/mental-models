import React, { useContext } from 'react'
import styled from 'styled-components'
import LoadingContext from './LoadingContext'

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--backgroundColor-loadingBar);
`

const LoadingBar = () => {
  const isLoading = useContext(LoadingContext)

  return isLoading ? <Bar /> : null
}

export default LoadingBar
