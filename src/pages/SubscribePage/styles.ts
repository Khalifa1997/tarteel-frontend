import styled from "styled-components";

export const Container = styled.div`
  padding: 1em;
  color: #485364;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
  
  .content {
    width: 75%;
    margin: auto;
    margin-top: 1em;
    flex: 1;
    
    
    h1 {
      font-weight: 500;
    }
    .subtitle {
      margin: 2em 0;
    }
    #mc_embed_signup {
      margin-bottom: 3em;
      #mc_embed_signup_scroll {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
      }
      .button {
        margin-top: 1em;
        background-color: #5ec49e !important;
      }
    }
    footer {
      margin: 2em 0;
    }
    #share {
      margin-top: 2em;
      
      .resp-sharing-button__link {
        display: inline-block;
        text-decoration: none;
        color: #fff;
        margin: 0.5em;
      }
      
      .resp-sharing-button {
        border-radius: 5px;
        transition: 25ms ease-out;
        padding: 0.5em 0.75em;
      }
      
      .resp-sharing-button--twitter {
        background-color: #55acee;
      }
      
      .resp-sharing-button--twitter:hover {
        background-color: #2795e9;
      }
      
      .resp-sharing-button--facebook {
        background-color: #3b5998;
      }
      
      .resp-sharing-button--facebook:hover {
        background-color: #2d4373;
      }
      
      .resp-sharing-button--linkedin {
        background-color: #0077b5;
      }
      
      .resp-sharing-button--linkedin:hover {
        background-color: #046293;
      }
    }
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em;
    
    .content {
      width: 100%;
      margin-bottom: 3em;
      
      
      ul {
        list-style-type: none;
      }
    }
  }
`
