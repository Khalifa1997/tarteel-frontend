import styled, {keyframes} from "styled-components";


const ani = keyframes`
  0 { background-color : #bf9999 }
  50% { background-color : #af7070 }
  100% { background-color : #bf9999 }
`

const RecordingButton = styled.div`
  height: 50px;
  width: 50px;
  background-color: #5ec49e;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 2em;
  
  &.recording {
    animation: ${ani} 1.7s infinite
  }
  
  .icon {
    color: ${props => props.theme.colors.white}
  }
  &.retry {
    background-color: #19213b;
    width: 60px;
    height: 60px;
    color: ${props => props.theme.colors.white};
    
    .icon {
      height: 85%;
      margin-top: 5px;
    }
    p {
      font-size: 12px;
      text-align: center;
      margin: 0;
      position: relative;
      bottom: 8px;
    }
  }
  
  // Special styling for very small screens like IPhone 5s and SE
  @media screen and (max-height: ${props => props.theme.breakpoints.sm}px) { 
    height: 35px;
    width: 35px;
    
    svg {
      height: 25px;
      width: 25px;
    }
  }
`

export default RecordingButton;
