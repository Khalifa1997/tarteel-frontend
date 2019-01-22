import styled from "styled-components";

export const Container = styled.div`
  padding: 1em 3em;
  color: #485364;
  
  .header {
    display: flex;
    flex-flow: column;
    justify-content: center; 
    align-items: center;
    
    .progress-counter {
      margin-top: 5em;
      margin-bottom: 2em;
      width: 200px;
      height: 200px;
      position: relative;
      
      .counter-text {
        position: absolute;
        top: 60%;
        left: 50%;
        min-width: 125px;
        transform: translateX(-50%);
        font-weight: bold;
        color: #7a7e7b;
        text-align: center;
      }
    }
  }
  
  
  .content {
    padding: 0 3em;     
    width: 75%;
    margin: auto;
    
    .core-text {
      margin-top: 5em;
      line-height: 22px;
      
      h2 {
        margin: 20px 0;
      }
      
      .list {
        margin-top: 1em;
      }
      
    }
  }
  
  
  footer {
    margin: 5em 0 ;
    text-align: center;
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 10px;
    overflow-x: hidden;
    
    .content {
      width: 100%;
      margin-bottom: 3em;
      padding: 0;
      
      canvas, .canvas-container {
        max-width: 300px;
        margin: auto;
      }
      
      p, ul {
        width: 90%;
      }
    }
  }
`
