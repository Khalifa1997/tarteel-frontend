import React from 'react';
import styled from "styled-components";

const ModalClose = styled.div`
  background-color: black;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  position: absolute;
  top: -10px;
  right: -10px;
  z-index: 5;
  color: ${ props => props.theme.colors.white };
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  .icon {
    margin-bottom: 3px;
  }
`

export default ModalClose
