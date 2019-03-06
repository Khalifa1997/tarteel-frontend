import { History, Location } from 'history';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import AppHelmet from './components/AppHelmet';
import CookiesBanner from './components/CookiesBanner';
import LanguagePicker from './components/LanguagePicker';
import Routes from './components/Routes';
import { setLocation } from './store/actions/router';

import './styles/index.scss';

// import Amplify from 'aws-amplify';
// import AWSConfig from './aws-exports';
import logScreen from './helpers/logScreen';

// Amplify.configure(AWSConfig);

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: any) =>
      props.path === '/evaluator' ? '#F4F3F2' : '#fff'};
  }
`;

interface IOwnProps {
  location: Location;
  history: History;
}

interface IDispatchProps {
  setLocation(location: Location): void;
}

type IProps = IOwnProps & IDispatchProps;

class App extends React.Component<IProps, never> {
  public componentDidMount() {
    // Registering the first page because it's won't be handled by the listener
    logScreen();
    // To dispatch a location change redux action every time the route changes.
    this.props.history.listen((location, action) => {
      this.props.setLocation(location);
      logScreen();
    });
  }
  public render() {
    return (
      <Container>
        <GlobalStyle path={this.props.location.pathname} />
        <AppHelmet path={this.props.location.pathname} />
        <Routes />
        {/*<CookiesBanner />*/}
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-width: 900px;
  margin: auto;

  .rtl {
    direction: rtl;
  }

  .text-center {
    text-align: center;
  }
`;

const mapDispatchToProps = dispatch => {
  return {
    setLocation: (location: Location) => {
      dispatch(setLocation(location));
    },
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(injectIntl(App))
);
