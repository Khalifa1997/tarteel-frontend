import styled from "styled-components";

const NoteButton  = styled.div`
  color: #a5aab2;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  margin: 0 2em;
  
  &:hover {
    color: #5EC49E;
  }
  &.previous {
    position: absolute;
    top: 50%;
    left: -125px;
    margin: 0;
    transform: translateY(-50%);
  }
  &.next {
    position: absolute;
    top: 50%;
    right: -100px;
    margin: 0;
    transform: translateY(-50%);
  }
  &.previous-ayah {
    margin-top: 1em;
  }
  
  @media screen and (max-height: ${props => props.theme.breakpoints.sm}px) { 
    font-size: 14px;
  }   
`

export default NoteButton;
