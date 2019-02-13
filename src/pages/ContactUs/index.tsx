import React from 'react';
import styled from 'styled-components';
import { injectIntl, InjectedIntl } from 'react-intl';
import aws from 'aws-sdk';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import FooterButton from "../../components/FooterButton";
import T from "../../components/T";
import KEYS from "../../locale/keys";


interface IProps {
  intl:  InjectedIntl;
}

interface IState {
  name: string;
  email: string;
  message: string;
}

class ContactUs extends React.Component<IProps, IState> {
  state = {
    name: '',
    email: '',
    message: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit = () => {
    console.log(this.state);
    const ses = new aws.SES({
      "accessKeyId": "AKIAJ3T7H6LW4WPXVZDA",
      "secretAccessKey": "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",
      "region": "us-east-1",
    });
    const eparam = {
      Destination: {
        ToAddresses: ["anaxyad@gmail.com"],
      },
      Message: {
        Body: {
          Text: {
            Data: "Hello, this is a test email!",
          },
        },
        Subject: {
          Data: "Tarteel Contact Form",
        },
      },
      Source: "geekbahaa1@gmail.com",
      ReplyToAddresses: ["geekbahaa1@gmail.com"],
      ReturnPath: "geekbahaa1@gmail.com",
    };

    ses.sendEmail(eparam, (err, data) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(data);
      }
    });
  }
  render() {
    const { intl } = this.props;
    return (
      <Container>
        <Navbar />
        <div className="content">
          <div className="form">
            <Input
              placeholder={intl.formatMessage({ id: KEYS.NAME_INPUT_PLACEHOLDER })}
              label={intl.formatMessage({ id: KEYS.NAME_INPUT_LABEL })}
              name={'name'}
              onChange={this.handleChange}
            />
            <Input
              placeholder={intl.formatMessage({ id: KEYS.EMAIL_ADDRESS_INPUT_PLACEHOLDER })}
              label={intl.formatMessage({ id: KEYS.EMAIL_ADDRESS_INPUT_LABEL })}
              name={'email'}
              onChange={this.handleChange}
            />
            <Input
              placeholder={intl.formatMessage({ id: KEYS.MESSAGE_TEXTAREA_PLACEHOLDER })}
              label={intl.formatMessage({ id: KEYS.MESSAGE_TEXTAREA_LABEL })}
              name={'message'}
              type={'textarea'}
              cols="30"
              rows="10"
              onChange={this.handleChange}
            />
            <FooterButton onClick={this.handleSubmit} >
              <T id={KEYS.CONTACT_US_SEND} />
            </FooterButton>
          </div>
        </div>
      </Container>
    )
  }
}

const Container = styled.div`
  padding: 1em;
  display: flex;
  flex-flow: column;
  height: 100%;
  box-sizing: border-box;
  
  .content {
    padding: 1em;
    padding-top: 2em;
    flex: 1;
    display: flex;
    flex-flow: column;
    position: relative;
    box-sizing: border-box;
    
    .form {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
    }
  }
`

export default injectIntl(ContactUs);
