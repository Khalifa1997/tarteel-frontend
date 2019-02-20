import React from 'react';
import styled from "styled-components";
import {checkmarkCircled} from 'react-icons-kit/ionicons/checkmarkCircled'
import Icon from "react-icons-kit";
import {Link} from "react-router-dom";
import { KEY } from 'redux-pack';
import KEYS from '../locale/keys';
import T from './T';

class NewPasswordVerified extends React.Component {
  render() {
    return (
      <Container>
        <Icon className={'icon'} icon={checkmarkCircled} size={100} />
        <p>
          <T id={KEYS.NEW_PASSSWORD_VERIFY_LOGIN_MESSAGE} />
        </p>
        <Link to={'/login'} >
          <T id={KEYS.NEW_PASSSWORD_VERIFY_LOGIN_BUTTON} />
        </Link>
      </Container>
    )
  }
}

const Container = styled.div`
  text-align: center;

  p {
    margin: 2em 0;
  }
  .icon {
    color: ${props => props.theme.colors.linkColor};
  }
`;

export default NewPasswordVerified;
