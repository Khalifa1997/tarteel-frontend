import React from 'react';
import styled from "styled-components";
import { Auth } from 'aws-amplify'

import Input from "./Input";
import FooterButton from './FooterButton'
import NoteButton from './NoteButton'
import FormErrorMessage from "./FormErrorMessage";


interface IProps {
  handleToggle(): void;
}

interface IState {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  errorMessage: string;
  isLoading: boolean;
  [x: string]: any;
}

class SignupForm extends React.Component<IProps, IState> {
  state  = {
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    errorMessage: '',
    isLoading: false,
  }
  handleSignUp = () => {
    this.setState({ isLoading: true });
    const userData = {
      username: this.state.username,
      password: this.state.password,
      attributes: {
        'email': this.state.email,
        // 'phoneNumber': this.state.userData.phoneNumber,
      },
      validationData: [], // optional
    }
    Auth.signUp(userData)
      .then(user => {
        console.log('registration succeed', user);
        this.setState({ isLoading: false });
      })
      .catch((e: Error) => {
        this.setState({
          errorMessage: e.message,
          isLoading: false,
        });
      })
  }
  handleInputChange = (e: any) => {
    // debounced input only accepts target doesn't accept currentTarget.
    const name: string = e.target.getAttribute('name');
    const value: any = e.target.value;
    this.setState({
      [name]: value,
    })
  }
  render() {
    return (
      <Container>
        <div className="form">
          <Input
            type="text"
            placeholder={'e.g. Mohamed'}
            label={'Username'}
            name={'username'}
            onChange={this.handleInputChange}
            debounce={true}
          />
          <Input
            type="text"
            placeholder={'e.g. Mohamed@example.com'}
            label={'Email Address'}
            name={'email'}
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
          <Input
            type="text"
            name={'phoneNumber'}
            placeholder={'(555) 555-5555'}
            label={'Phone Number'}
            onChange={this.handleInputChange}
            debounce={true}
          />
          <FormErrorMessage message={this.state.errorMessage}/>
          <FooterButton
            className={'submit'}
            isLoading={this.state.isLoading}
            onClick={this.handleSignUp}
          >
            <span>
              Register
            </span>
          </FooterButton>
        </div>


        <NoteButton
          className={'note-button'}
          onClick={this.props.handleToggle} >
          Already have an account? Login
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

export default SignupForm;
