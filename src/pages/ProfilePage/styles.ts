import styled from "styled-components";

export const Container = styled.div`
  padding: 1em 3em;
  color: #485364;
  
  .content {
    width: 65%;
    margin: auto;
    margin-top: 2em;
    
    a {
      text-decoration: underline;
    }
  }
  h1 {
    margin-bottom: 1em;
    font-weight: 500;
  }
  .profile-link {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2em 0;
    
    .link {
      display: inline-block;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 2px #ccc;
      transition: all .5s ease;
      position: relative;
      font-size: 14px;
      color: #474747;
      margin: 7px;
      text-align: left;
      padding: 1em 10em;
    
      a {
        
      }
    }
  }
  
  table.recitations {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0 3em 0;
    
    a {
      margin: 0 5px;  
    }
  }
    
  table.recitations td, #customers th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  table.recitations tr:nth-child(even){
    background-color: #f2f2f2;
  }
  
  table.recitations tr:hover {
    background-color: #ddd;
  }
  
  table.recitations th {
    padding: 12px;
    text-align: left;
    background-color: #5fc49e;
    color: white;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em;
    
    .content {
      width: 100%;
      margin-bottom: 3em;
      
      .profile-link {
        .link {
          padding: 1em 3em;
        }
      }
      
    }
  }
`;
