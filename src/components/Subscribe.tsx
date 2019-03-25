/* Subscribe Component include Subscribe field input with submit button */
import React, { Component } from 'react';
import { InjectedIntl, injectIntl } from 'react-intl';
import { setCookie } from '../helpers/cookie';

import KEYS from '../locale/keys';
import T from './T';
import styled from 'styled-components';
import Input from './Input';
import FooterButton from './FooterButton';

interface IDispatchProps { }

interface IOwnProps {
  intl: InjectedIntl;
}

interface IStateProps { }

interface IState {
  email: string;
  isSubscribed: boolean;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class Subscribe extends Component<IProps, IState> {
  state = {
    email: '',
    isSubscribed: false,
  };

  handleChange = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  subscribePerofile = () => {
    setCookie('isSubscribed', true, { path: '/' });
    window.open("https://tarteel.us19.list-manage.com/subscribe/post?u=ab8add36046818c66a55a4f9c&amp;id=4015afc1f5", "_blank");
    this.setState({ isSubscribed: true });
  }

  render() {
    const recordingCount = 0;
    const { intl } = this.props;
    const rtl = intl.messages.local === 'arabic' ? 'rtl' : '';

    return (
      <Container>
        <div>
          {/* Begin MailChimp Signup Form */}
          <div id="mc_embed_signup" className={`arabic-text ${rtl}`}>
            <form
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate form"
              target="_blank"
              noValidate={true}
            >
              <div id="mc_embed_signup_scroll">
                <Input
                  type="email"
                  name={'email'}
                  className="email"
                  id="mce-EMAIL"
                  placeholder={intl.formatMessage({
                    id: KEYS.SUBSCRIBE_PAGE_EMAIL_PLACEHOLDER_TEXT,
                  })}
                  onChange={this.handleChange}
                  required={true}
                  debounce={true}
                />
                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                <div
                  style={{ position: 'absolute', left: '-5000px' }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_ab8add36046818c66a55a4f9c_4015afc1f5"
                    tabIndex={-1}
                    value=""
                  />
                </div>
              </div>
            </form>
          </div>
          <div className={'footer'}>
            <FooterButton
              onClick={this.subscribePerofile}
              name="subscribe"
              id="mc-embedded-subscribe"
            >
              <T id={KEYS.SUBMIT_WORD} />
            </FooterButton>
          </div>
          {/* End mc_embed_signup */}
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
    .subtitle {
      margin: 2em 0;
    }
    #mc_embed_signup form {
      text-align: center;
      padding: 0;
      margin: 0;
    }
    #mc_embed_signup {
      #mc_embed_signup_scroll {
        justify-content: left;
        display: flex;
        flex-flow: row;
      }
    }
    footer {
      margin: 2em 0;
    }
    .form {
      text-align: center;
      margin-top: 3em;
      margin-left: 2em;
      width: 100%;
    }
    .form-row {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      margin: 2em 0;
    }
    .footer {
      margin-top: 3em;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      button {
        background: none;
      }
      .saved,
      .skip {
        margin-top: 1em;
      }
      .saved {
        text-align: right;
        width: 100%;
      }
      .icon {
        color: white;
      }
    }
    #share {
      margin-top: 2em;

      .resp-sharing-button__link {
        display: inline-block;
        text-decoration: none;
        color: #fff;
        margin: 0.5em;
      }

      .resp-sharing-button {
        border-radius: 5px;
        transition: 25ms ease-out;
        padding: 0.5em 0.75em;
      }

      .resp-sharing-button--twitter {
        background-color: #55acee;
      }

      .resp-sharing-button--twitter:hover {
        background-color: #2795e9;
      }

      .resp-sharing-button--facebook {
        background-color: #3b5998;
      }

      .resp-sharing-button--facebook:hover {
        background-color: #2d4373;
      }

      .resp-sharing-button--linkedin {
        background-color: #0077b5;
      }

      .resp-sharing-button--linkedin:hover {
        background-color: #046293;
      }
    }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    .content {
      width: 100%;
      margin-bottom: 3em;

      ul {
        list-style-type: none;
      }
    }
  }
`;

export default injectIntl(Subscribe);
