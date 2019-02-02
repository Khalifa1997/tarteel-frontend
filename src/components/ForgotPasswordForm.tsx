import React from 'react';
import Input from "./Input";
import FooterButton from "./FooterButton";
import styled from "styled-components";
import FormErrorMessage from "./FormErrorMessage";

interface IProps {
    handleReset(username: string): Promise<void>;
}

interface IState {
  isLoading: boolean;
  username: string;
  errorMessage: string;
}

class ForgotPasswordForm extends React.Component<IProps, IState> {
  state = {
    errorMessage: '',
    isLoading: false,
    username: '',
  }
  handleReset = () => {
    this.setState({
      isLoading: true,
      errorMessage: '',
    });
    this.props.handleReset(this.state.username)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
        .catch((e: string) => {
          this.setState({
            errorMessage: e,
            isLoading: false,
          });
        })
  }
  handleChange = (e: any) => {
    // debounced input only accepts target doesn't accept currentTarget.
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const errorMessage = this.state.errorMessage ? 'Error' : '';
    return (
      <Container>
        <h2>Reset Your Password</h2>
        <div className="form">
          <Input
            type={'text'}
            placeholder={'Email/Username'}
            name={'username'}
            label={'Email/Username'}
            onChange={this.handleChange}
            debounce={true}
          />
          <FooterButton
            isLoading={this.state.isLoading}
            afterLoadingMessage={errorMessage}
            onClick={this.handleReset}
          >
              <span>
                reset
              </span>
          </FooterButton>
          <FormErrorMessage message={this.state.errorMessage} />
        </div>
      </Container>
    )
  }
}

const Container = styled.div`

  h2 {
    text-align: center;
  }
  .form {
  justify-content: center;
  align-items: center;
  display: flex;
  flex-flow: column;
  position: relative;
  top: 2em;
  }
`;

export default ForgotPasswordForm;
