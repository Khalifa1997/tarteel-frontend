import React from 'react';
import styled from 'styled-components';

import Input from './Input';
import FooterButton from './FooterButton';
import FormErrorMessage from './FormErrorMessage';
import KEYS from '../locale/keys';
import T from './T';

interface IProps {
  destination: string;
  handleSubmit(code: string, newPassword: string): Promise<void>;
}

interface IState {
  code: string;
  newPassword: string;
  errorMessage: string;
  isLoading: boolean;
}

class VerifyPassword extends React.Component<IProps, IState> {
  state = {
    code: '',
    newPassword: '',
    errorMessage: '',
    isLoading: false,
  };
  handleChange = e => {
    // debounced input only accepts target doesn't accept currentTarget.
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleReset = () => {
    this.setState({
      isLoading: true,
      errorMessage: '',
    });
    this.props
      .handleSubmit(this.state.code, this.state.newPassword)
      .then(() => {
        this.setState({
          isLoading: false,
        });
      })
      .catch((e: Error) => {
        this.setState({
          errorMessage: e.message,
          isLoading: false,
        });
      });
  };
  render() {
    return (
      <Container>
        <h2>
          <T id={KEYS.VERIFY_PASSWORD_TITLE} />
        </h2>
        <p>
          <T id={KEYS.VERIFY_PASSWORD_MESSAGE} />
          {this.props.destination}
        </p>
        <div className="form">
          <Input
            type={'text'}
            placeholder={'Verification Code'}
            name={'code'}
            label={<T id={KEYS.VERIFY_PASSWORD_VERIFICATION_CODE_LABEL} />}
            onChange={this.handleChange}
            debounce={true}
          />
          <Input
            type={'text'}
            placeholder={'New Password'}
            name={'newPassword'}
            label={<T id={KEYS.VERIFY_PASSWORD_NEW_PASSWORD_LABEL} />}
            onChange={this.handleChange}
            debounce={true}
          />
          <FooterButton onClick={this.handleReset}>
            <span>
              <T id={KEYS.VERIFY_PASSWORD_BUTTON} />
            </span>
          </FooterButton>
          <FormErrorMessage message={this.state.errorMessage} />
        </div>
      </Container>
    );
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

export default VerifyPassword;
