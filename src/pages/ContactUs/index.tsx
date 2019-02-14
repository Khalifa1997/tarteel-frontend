import React from 'react';
import styled from 'styled-components';
import { injectIntl, InjectedIntl } from 'react-intl';
import Select from 'react-select';
import {withCookies} from "react-cookie";
import pick from 'lodash/pick';

import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import FooterButton from "../../components/FooterButton";
import T from "../../components/T";
import KEYS from "../../locale/keys";


const subjects = [
  {
    label: "Bug Report",
    value: "bug",
  },
  {
    label: "Question",
    value: "question",
  },
  {
      label: "Feature request",
    value: "featureRequest",
  },
  {
    label: "Partnership",
    value: "partnership",
  },
  {
    label: "Other",
    value: "other",
  },

]

interface IProps {
  intl:  InjectedIntl;
}

interface IState {
  subject: string;
  email: string;
  message: string;
}

class ContactUs extends React.Component<IProps, IState> {
  state = {
    subject: '',
    email: '',
    message: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit = () => {
    const body = pick(this.state, 'subject', 'email', 'message');
    console.log(body);
    return fetch('https://7gjflh9pwi.execute-api.us-east-1.amazonaws.com/production/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then(json => {
        console.log(json);
      })
      .catch((e) => {
        console.log(e);
      })
  }
  render() {
    const { intl } = this.props;
    const rtl = this.props.cookies.get('currentLocale') === 'ar';
    return (
      <Container>
        <Navbar />
        <div className="content">
          <div className="form">
            <div className="select-container">
              <label>Subject</label>
              <Select
                isRtl={Boolean(rtl)}
                isSearchable={true}
                defaultValue={subjects[0]}
                className={"select"}
                options={subjects}
                onChange={(option) => this.setState({ subject: option.value })}
              />
            </div>
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
      
      .select {
        width: 300px;
      }
    }
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    .content {
      width: 100%;
      
      .select {
        width: 200px;
      }
    }
  }
`

export default withCookies(injectIntl(ContactUs));
