import React, {Component} from "react"
import {injectIntl, InjectedIntl} from "react-intl"

import {IUser} from "../../types/GlobalState";
import T from "../../components/T";
import KEYS from "../../locale/keys";
import {Container} from "./styles";
import FooterButton from "../../components/FooterButton";
import Navbar from "../../components/Navbar";

import LogoImage from "../../../public/logo-3x.png";
import {withCookies} from "react-cookie";

interface IDispatchProps {
  setUsers(users: IUser[]): Promise<IUser[]>;
}

interface IOwnProps {
  intl: InjectedIntl;
}

interface IStateProps {
  users: IUser;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class WelcomePage extends Component<IProps, never> {
  handleStart = () => {
    this.props.cookies.set('isFirstTime', 'false', {path: '/'});
    this.props.history.push('/')
  }
  render() {
    const rtl = this.props.intl.messages.local === "arabic" ? "rtl" : "";
    return (
      <Container>
        <Navbar/>
        <div className="content">
          <div className="banner">
            <img src={LogoImage} alt="Tarteel-logo" className="logo-img" />
          </div>
          <div className="core-text">
            <div className="info start-text">
              <h3 className={rtl}>
                <T id={KEYS.LANDING_GREETING_MESSAGE}/>
              </h3>
              <p className={rtl}>
                <T id={KEYS.LANDING_FIRST_PARAGRAPH}/>
              </p>
              <h3 className={rtl}>
                <T id={KEYS.LANDING_SECOND_PARAGRAPH_TITLE}/>
              </h3>
              <ul>
                <li className={rtl}>
                  <T id={KEYS.LANDING_LIST_FIRST_ITEM}/>
                </li>
                <li className={rtl}>
                  <T id={KEYS.LANDING_LIST_SECOND_ITEM}/>
                </li>
                <li className={rtl}>
                  <T id={KEYS.LANDING_LIST_THIRD_ITEM}/>
                </li>
              </ul>
              <div className={rtl}>
                <T id={KEYS.LANDING_LAST_LINE}/>
              </div>
            </div>
          </div>
          <footer>
            <FooterButton id="start" onClick={this.handleStart}>
              <T id={KEYS.LANDING_BUTTON_TEXT} />
            </FooterButton>
          </footer>
        </div>
      </Container>
    );
  }

}

export default injectIntl(withCookies(WelcomePage))
