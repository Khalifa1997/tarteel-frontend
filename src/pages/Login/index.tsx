import React from 'react';
import styled from 'styled-components';

import LoginForm from '../../components/LoginForm';
import SignupForm from '../../components/SignupForm';

import Navbar from '../../components/Navbar';

interface IProps {}

interface IState {
  isLogin: boolean;
}

class Login extends React.Component<IProps, IState> {
  state = {
    isLogin: true,
  };
  handleToggle = () => {
    this.setState((state, props) => {
      return {
        isLogin: !state.isLogin,
      };
    });
  };
  render() {
    return (
      <Container>
        <Navbar />
        <div className="content">
          {this.state.isLogin ? (
            <LoginForm handleToggle={this.handleToggle} />
          ) : (
            <SignupForm handleToggle={this.handleToggle} />
          )}
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
  padding: 1em;
  box-sizing: border-box;

  .content {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }
`;

export default Login;
