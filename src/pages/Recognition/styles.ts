import styled, {keyframes} from 'styled-components';


const spin = keyframes`
  0% {transform:rotate(0deg);}
  50% {transform:rotate(180deg);}
  100% {transform:rotate(360deg);}
`;


export const Container = styled.div`
  display: flex;
  padding: 1em;
  box-sizing: border-box;
  flex-flow: column;
  height: 100%;
  position: relative;
  text-align: center;
  
  .not-supported {
    margin-top: 5em;
    color: gray;
  }
  
  .content {
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: space-evenly;
    align-items: center;
    
    a {
      color: ${props => props.theme.colors.linkColor}
    }
    
    .status {
      color: #848484;
      font-size: 22px;
    }
    .words {
      span {
        font-size: 24px;
      }
    }
    .mic {
      margin: 0;
      color: #fff;
      
      .spin {
        svg {
          animation: 800ms ${spin} infinite ;
          transform-origin: center;
        }
      }
    }
    .iqra {
      position: absolute;
      bottom: 1em;
      right: 0;
    }
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    .content {
      .splittable {
        display: flex;
        flex-flow: column;
      }
      .iqra {
        right: 10px;
      }
    }
  }
`;
