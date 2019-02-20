import React from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";

import {withCookies} from "react-cookie";
import {BrowserView} from "react-device-detect";
import KEYS from "../locale/keys";
import ReduxState from "../types/GlobalState";
import T from './T';

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
            <T id={KEYS.COOKIES_NOTICE_MESSAGE_1} />
            <BrowserView>
              <T id={KEYS.COOKIES_NOTICE_MESSAGE_2} />
            </BrowserView>
          </p>

          <Link to="/cookie">
            <T id={KEYS.COOKIE_POLICY_LINK_TEXT} />
          </Link>
          &
          <Link to="/privacy">
            <T id={KEYS.PRIVACY_POLICY_LINK_TEXT} />
          </Link>
        </div>
        <button onClick={handleGotIt}>
          <T id={KEYS.COOKIES_BUTTON_TEXT} />
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
