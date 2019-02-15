import React from 'react';
import styled from "styled-components";
import { Auth } from 'aws-amplify';
import {History} from "history";
import {withRouter} from "react-router";

import Input from "./Input";
import FooterButton from "./FooterButton";
import NoteButton from "./NoteButton";
import FormErrorMessage from "./FormErrorMessage";

interface IProps {
  history: History;
}

interface IState {
  username: string;
  password: string;
  errorMessage: string;
  [x: string]: any;
}

class LoginForm extends React.Component<IProps, IState> {
  state = {
    errorMessage: '',
    username: '',
    password: '',
    idLoading: false,
  }
  handleLogin = async () => {
    this.setState({ isLoading: true });
    const validationData: string[] = [];
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      if (user.challengeName === 'SMS_MFA' ||
        user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        // You need to get the code from the UI inputs
        // and then trigger the following function with a button click
        const code = getCodeFromUserInput();
        // If MFA is enabled, sign-in should be confirmed with the confirmation code
        const loggedUser = await Auth.confirmSignIn(
          user,   // Return object from Auth.signIn()
          code,   // Confirmation code
          mfaType, // MFA Type e.g. SMS, TOTP.
        );
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
        // You need to get the new password and required attributes from the UI inputs
        // and then trigger the following function with a button click
        // For example, the email and phone_number are required attributes
        const { username, email, phone_number } = getInfoFromUserInput();
        const loggedUser = await Auth.completeNewPassword(
          user,               // the Cognito User Object
          newPassword,       // the new password
          // OPTIONAL, the required attributes
          {
            email,
            phone_number,
          },
        );
      } else if (user.challengeName === 'MFA_SETUP') {
        // This happens when the MFA method is TOTP
        // The user needs to setup the TOTP before using it
        // More info please check the Enabling MFA part
        Auth.setupTOTP(user);
      } else {
        // The user directly signs in
        console.log(user);
        this.setState({ isLoading: false });
      }
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
        // The error happens if the user didn't finish the confirmation step when signing up
        // In this case you need to resend the code and confirm the user
        // About how to resend the code and confirm the user, please check the signUp part
      } else if (err.code === 'PasswordResetRequiredException') {
        // The error happens when the password is reset in the Cognito console
        // In this case you need to call forgotPassword to reset the password
        // Please check the Forgot Password part.
      } else {
        console.log(err);
      }
    }

  }
  handleInputChange = (e: any) => {
    // debounced input only accepts target doesn't accept currentTarget.
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  render() {
    return (
      <Container>
        <div className="form">
          <Input
            type="text"
            placeholder={'e.g. Mohamed'}
            label={'Email/Username'}
            name={'username'}
            onChange={this.handleInputChange}
            debounce={true}
          />
          <Input
            type="password"
            placeholder={'Type your Password'}
            label={'Password'}
            name={'password'}
            onChange={this.handleInputChange}
            debounce={true}
          />
          <FormErrorMessage message={this.state.errorMessage}/>
          <FooterButton
            className={'submit'}
            isLoading={this.state.isLoading}
            onClick={this.handleLogin}
          >
            <span>
              Login
            </span>
          </FooterButton>
        </div>

        <NoteButton
          className={'note-button'}
          onClick={this.props.handleToggle} >
            Don't have an account? Register
        </NoteButton>
        <NoteButton
          className={'note-button'}
          onClick={() => this.props.history.push('/forgot_password')} >
            Forgot password ?
        </NoteButton>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  
  .form {
    width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
  }
  
  .submit {
    margin-top: 1em;
  }
  
  .note-button {
    font-size: 14px;
    text-decoration: underline;
    color: #485364;
    margin-top: 1em;
  }
`

export default withRouter(LoginForm);