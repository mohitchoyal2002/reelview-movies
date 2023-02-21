import React from 'react'
import styled from 'styled-components'

function Error() {
  return (
    <Container>
      <h1>404, Page Not Found</h1>
    </Container>
  )
}

export default Error

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`