import styled from "styled-components";

export const Container = styled.div`
  padding: 1em;
  height: 100%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  
  .content {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
  .mobile-app-banner {
    width: 100%;
    position: relative;
  }
  .background-logo{
    position: absolute;
    left: 0;
    top: -10px;
    width: 100%;
    height: auto;
    z-index: -1;
    opacity: 0.07;
    transform: scaleX(0.8) scaleY(0.75);
  }
  .mobile-page-text {
    text-align: center;
    color: #485364;
    margin: 5em 0;
    
    h1 {
      font-size: 18pt;
    }
    
    p {
      margin-top: 2em;
    }
  }
  .mobile-buttons {
    text-align: center;
    display: flex;
    justify-content: center;
    
    a {
      text-decoration: none;
      border: 2px solid #5fc49e;
      border-radius: 5px;
      padding: 10px;
      margin: 0 1em;
      color: #5fc49e;
      font-size: 14pt;
      font-weight: 500;
      width: 100px;
      display: flex;
      text-align: center;
      justify-content: center;
      
      p {
        margin: 0;
        line-height: 28px;
      }
      img {
        width: 25px;
        height: 25px;
        margin: 0 5px;
      }
    }
  }
  footer {
    display: flex;
    justify-content: center;
    margin-top: 2em;
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em;
    
    .content {
      display: flex;
      flex-flow: column;
      justify-content: center;
    }
    
    .background-logo {
      width: 150%;
      left: -25%;
    }
    
    .mobile-page-text {
      font-size: 16pt;
      padding: 0 1em;
      margin: 1em 0;
       
      h1 {
        font-size: 1.2em;
      }
      p {
        font-size: 14px;
      }
    }
  }
`

