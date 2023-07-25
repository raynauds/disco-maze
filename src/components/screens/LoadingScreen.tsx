import { styled } from "styled-components"

export const LoadingScreen = () => {
  return <LoadingContainer>Loading...</LoadingContainer>
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
