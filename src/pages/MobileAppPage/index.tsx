import React, {Component} from "react"
import {History} from "history";
import {Helmet} from "react-helmet";
import {injectIntl, InjectedIntl} from "react-intl"

import T from "../../components/T";
import KEYS from "../../locale/keys";
import Navbar from "../../components/Navbar";
import config from "../../../config";
import FooterButton from "../../components/FooterButton";
import {Container} from "./styles";

import LogoImage from "../../../public/logo-3x.png";
import AndroidLogo from "../../../public/android-logo.png";
import AppleLogo from "../../../public/apple-logo.png";

interface IDispatchProps {
}

interface IOwnProps {
  history: History;
  intl: InjectedIntl;
}

interface IStateProps {
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class MobileAppPage extends Component<IProps, never> {
  componentDidMount() {
  }
  render() {
    const {intl} = this.props;
    return (
      <Container>
        <Helmet>
          <title>{ intl.formatMessage({ id: KEYS.MOBILE_PAGE_TITLE }) }</title>
        </Helmet>
        <Navbar />
        <div className="content">
          <div className="mobile-app-banner">
            <img src={LogoImage} alt="Tarteel-logo" className="background-logo" />
          </div>
          <div className="mobile-page-text">
            <h1>
              <T id={KEYS.MOBILE_PAGE_TITLE} />
            </h1>
            <p className="large-arabic-text">
              <T id={KEYS.MOBILE_PAGE_PARAGRAPH} />
            </p>
          </div>
          <div className="mobile-buttons">
            <a href={config('androidAppLink')} target="_blank">
              <img src={AndroidLogo} alt="" />
              <p>Android</p>
            </a>
            <a href={config('IOSAppLink')} target="_blank">
              <img src={AppleLogo} alt="" />
              <p>IOS</p>
            </a>
          </div>
          <footer>
            <FooterButton onClick={() => {
              this.props.history.push("/")
            }}>
              <T id={KEYS.CONTINUE_READING_BUTTON_TEXT}/>
            </FooterButton>
          </footer>
        </div>
      </Container>
    );
  }

}


export default injectIntl(MobileAppPage)
