import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const LanguagePicker = () => {
  return (
    <Container>
      <a href={`?lang=en`}>
        English
      </a>
      &nbsp; | &nbsp;
      <a href={`?lang=ar`}>
        العربية
      </a>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;

  a {
    cursor: pointer;
    transition: 0.15s;
    color: #485364;

    &:hover {
      color: ${props => props.theme.colors.linkColor}
    }
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm }px) {
  
  }
`


export default LanguagePicker;
