import styled from "styled-components";

export const Container = styled.div`
  //padding: 1em 3em;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  min-height: 100%;
  
  .content {
    //padding: 15px;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em;
  }
`
