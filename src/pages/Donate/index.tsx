import React from 'react';
import { Helmet } from 'react-helmet';
import { InjectedIntl, injectIntl } from 'react-intl';
import styled from 'styled-components';

import KEYS from '../../locale/keys';
import Navbar from '../../components/Navbar';

interface IProps {
  intl: InjectedIntl;
}

class Donate extends React.Component<IProps> {
  redirectToLaunchgood() {
    // temporary hack to direct the donations page to launchgood
    // TODO: @ananas remove after Ramadan
    setTimeout(function() {
      if (window) {
        window.location.href = 'https://launchgood.com/tarteel';
      }
    }, 2000);
  }

  componentDidMount() {
    const script = document.createElement('script');

    script.src = 'https://donorbox.org/widget.js';
    script.async = true;

    document.body.appendChild(script);
  }
  public render() {
    const { intl } = this.props;

    return (
      <Container>
        <Helmet>
          <title>{intl.formatMessage({ id: KEYS.DONATE_PAGE_TITLE })}</title>
          <meta
            property={'og:description'}
            content={
              'Help Tarteel by contributing to our server costs, marketing and other expenses. Click here for more information.'
            }
          />
          <meta
            name={'twitter:description'}
            content={
              'Help Tarteel by contributing to our server costs, marketing and other expenses. Click here for more information.'
            }
          />
        </Helmet>
        <Navbar />
        <div className="content">
          {/* <iframe
            src="https://donorbox.org/embed/seed-funding-donations?show_content=true"
            width="100%"
            name="donorbox"
            frameBorder="0"
            scrolling="no"
            allowpaymentrequest
          /> */}
          We're redirecting you to our new dontations page...
          {this.redirectToLaunchgood()}
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  padding: 1em;
  box-sizing: border-box;
  height: auto;

  .content {
    padding-top: 2em;
    display: flex;
    align-items: center;
    flex-flow: column;
    flex: 1;
    text-align: center;
  }
`;

export default injectIntl(Donate);
