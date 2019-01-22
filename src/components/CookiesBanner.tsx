import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';

import T from './T';
import KEYS from "../locale/keys";
import ReduxState from "../types/GlobalState";
import {withCookies} from "react-cookie";
import {BrowserView} from "react-device-detect";

interface IProps {
  cookies: any;
}

const CookiesBanner = (props: IProps) => {
  const handleGotIt = () => {
    props.cookies.set('cookiesPermission', true);
  }
  return (
    !props.cookies.get('cookiesPermission') ?
      <Container>
        <div className={'text'}>
          <p>
            We use cookies to ensure you have the best browsing experience on our website.
            <BrowserView>
              By using our site, you acknowledge that you have read and understood our
            </BrowserView>
          </p>

          <Link to="/cookie">
            Cookie Policy
          </Link>
          &
          <Link to="/privacy">
            Privacy Policy
          </Link>
        </div>
        <button onClick={handleGotIt}>
          Got it!
        </button>
      </Container>
        :
        null
  )
}

const Container = styled.div`
  display: flex;
  background-color: #3C3E4B;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1em;
  
  .text {
    color: #fff;
    margin: 0 1em;
    padding: 0 1em;
    text-align: center;
    line-height: 20px;
    
    a {
      margin: 0 1em;
      color: #fff;
      text-decoration: underline;
    }
  }
  
  button {
    background-color: #A1EA67;
    border-radius: 5px;
    width: 150px;
    font-size: 16px;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm }px) {
    padding: 10px;
    
    .text {
      font-size: 12px;
      padding: 0;
    }
    
  }
`;


export default withCookies(CookiesBanner);
