import React from 'react';
import {BrowserView, MobileView} from "react-device-detect";
import {Icon} from "react-icons-kit";
import {close as closeIcon} from 'react-icons-kit/ionicons/close'
import styled from "styled-components";
import classNames from 'classnames';

import config from '../../config';
import {withCookies} from "react-cookie";

interface IProps {
  onClose(): void;
  message?: string;
}

const RecordingError = (props: IProps) => {
  const classes = classNames({
    rtl: props.cookies.get('currentLocale') || 'en',
  })
  return (
    <Container >
      <MobileView>
        <div className="close" onClick={props.onClose}>
          <Icon icon={closeIcon} />
        </div>
        <p>It doesn't look like you have microphone permissions enabled. Get a better experience on mobile!</p>
        <a href={config('androidAppLink')}>Android</a>
        <a href={config('IOSAppLink')}>iOS</a>
      </MobileView>
      <BrowserView>
        <div className="close" onClick={props.onClose}>
          <Icon icon={closeIcon} />
        </div>
        <div className={`msg ${classes}`}>
          {
            !props.message ?
                'To upload recordings, please enable microphone access, or use a different browser.'
              :
                props.message
          }
        </div>
      </BrowserView>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 1em 0;
  color: #fff;
  margin: 10px 10px 20px 10px;
  background: rebeccapurple;
  border-radius: 15px;
  z-index: 5;
  
  .close {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  .msg {
    margin: 1em 10px;
    
    &.rtl {
      direction: rtl;
    }
  }
  a {
    color: #fff;
    text-decoration: none;
    border: 1px solid #fff;
    border-radius: 3px;
    padding: 7px 10px;
    display: inline-block;
    margin: 0 5px;
  }
`

export default withCookies(RecordingError);