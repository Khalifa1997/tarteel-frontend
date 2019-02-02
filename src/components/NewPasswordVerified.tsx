import React from 'react';
import styled from "styled-components";
import {checkmarkCircled} from 'react-icons-kit/ionicons/checkmarkCircled'
import Icon from "react-icons-kit";
import {Link} from "react-router-dom";

class NewPasswordVerified extends React.Component {
  render() {
    return (
      <Container>
        <Icon className={'icon'} icon={checkmarkCircled} size={100} />
        <p>
          Your New Password has been set, you can start using it to log in now.
        </p>
        <Link to={'/login'} >
          Login Now ?
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
