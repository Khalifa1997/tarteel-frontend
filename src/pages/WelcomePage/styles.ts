import styled from "styled-components";

export const Container = styled.div`
  padding: 10px 3em;
    
  .content {
    display: flex;
    flex-flow: column;
    width: 65%;
    margin: auto;
    color: #485364;
    
    a {
      text-decoration: underline;
    }
    
    .banner {
      height: 6em;
      width: 6em;
      margin-bottom: -2em;
      margin: auto;
      
      img {
        height: 100%;
        width: 100%;
      }
    }
    
    .core-text {
      margin-top: 2em;
      
      h3 {
        margin-bottom: 1em;        
      }
      
      p {
        margin-bottom: 1em; 
      }
      
      ul {
        padding-left: 35px;
        margin-bottom: 1.5em;
        
        li {
          margin: 10px 0;
        }
      }
    }
  }
  
  footer {
    margin-top: 1em;
    display: flex;
    justify-content: center;
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 10px 1em;
      
    .content {
      width: 100%;
      margin-bottom: 2em;
    }
  
  }
`
