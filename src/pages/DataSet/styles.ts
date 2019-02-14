import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  box-sizing: border-box;
  flex-flow: column;
  padding: 1em;
  
  .content {
    padding: 1em;
    padding-top: 10vh;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    flex-flow: column;
    
    h1, h2, p, ul {
      margin-bottom: 25px;
    }
    a {
      text-decoration: underline; 
    }
    ul {
      padding-left: 25px;
    }
    .recordings {
      display: flex;
      flex-flow: column;
      
      audio {
        margin: 10px 0;
      }
    }
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    .content {
      padding-top: 5vh;
      
      h1, h2 {
        font-size: 20px;
      }
      
      .recordings {
        audio {
          width: 100%;
        }
      }
    }
    
  }
`;
