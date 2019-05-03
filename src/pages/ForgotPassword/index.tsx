import React from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { History } from 'history';

import Navbar from '../../components/Navbar';
import VerifyPassword from '../../components/VerifyPassword';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import NewPasswordVerified from '../../components/NewPasswordVerified';

interface IProps {
  history: History;
}

interface IState {
  showVerification: boolean;
  showVerified: boolean;
  destination: string;
  username: string;
}

class ForgotPassword extends React.Component<IProps, IState> {
  state = {
    showVerification: false,
    showVerified: false,
    destination: '',
    username: '',
  };
  handleReset = (username: string) => {
    return Auth.forgotPassword(username).then(data => {
      this.setState({
        showVerification: true,
        destination: data.Destination,
        username,
      });
    });
  };
  handleNewPassword = (code: string, newPassword: string) => {
    // Collect confirmation code and new password, then
    return Auth.forgotPasswordSubmit(this.state.username, code, newPassword)
      .then(data => {
        this.setState({
          showVerification: false,
          showVerified: true,
        });
      })
      .catch(err => console.log('err: ', err));
  };
  handleChange = (e: any) => {
    // debounced input only accepts target doesn't accept currentTarget.
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <Container>
        <Navbar />
        <div className="content">
          {this.state.showVerification ? (
            <VerifyPassword
              handleSubmit={this.handleNewPassword}
              destination={this.state.destination}
            />
          ) : this.state.showVerified ? (
            <NewPasswordVerified />
          ) : (
            <ForgotPasswordForm handleReset={this.handleReset} />
          )}
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  padding: 1em;
  display: flex;
  flex-flow: column;
  height: 100%;
  box-sizing: border-box;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    flex: 1;
  }
`;

export default ForgotPassword;
