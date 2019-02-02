import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100%;
  justify-content: space-between;
  padding: 1em;
  box-sizing: border-box;
  
  .content {
    //padding: 15px;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em;
  }
`
