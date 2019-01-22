import React from "react";
import styled from "styled-components"
import {injectIntl} from 'react-intl'
import {History, Location} from "history";
import {connect} from "react-redux";
import { createGlobalStyle } from 'styled-components'
import {withRouter} from "react-router";

import Routes from "./components/Routes";
import AppHelmet from "./components/AppHelmet";
import LanguagePicker from "./components/LanguagePicker";
import CookiesBanner from "./components/CookiesBanner";
import {setLocation} from "./store/actions/router";

import 'react-tippy/dist/tippy.css'
import './styles/index.scss'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props: any) => props.path === '/evaluator' ? '#F4F3F2' : '#fff'};
  }
`

interface IOwnProps {
  location: Location;
  history: History;
}

interface IDispatchProps {
  setLocation(location: Location): void;
}

type IProps = IOwnProps & IDispatchProps;

class App extends React.Component<IProps, never> {
  componentDidMount() {
    this.props.history.listen((location, action) => {
      this.props.setLocation(location)
    })
  }
  render() {
    return (
      <Container>
        <GlobalStyle path={this.props.location.pathname} />
        <AppHelmet/>
        <Routes />
        {/*<CookiesBanner />*/}
      </Container>
    )
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
`

const mapDispatchToProps = (dispatch) => {
  return {
    setLocation: (location: Location) => {
      dispatch(setLocation(location))
    }
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(injectIntl(App)));
