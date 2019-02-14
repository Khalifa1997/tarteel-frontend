import React, {Component} from "react"
import {InjectedIntl, injectIntl} from "react-intl"
import classNames from 'classnames';

import FooterButton from "../../components/FooterButton";
import Navbar from "../../components/Navbar";
import T from "../../components/T";
import KEYS from "../../locale/keys";
import {IUser} from "../../types/GlobalState";
import {Container} from "./styles";

import {withCookies} from "react-cookie";
import LogoImage from "../../../public/logo-3x.png";

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
  public handleStart = () => {
    this.props.history.push('/');
  }
  public render() {
    const classes = classNames({
      rtl: this.props.cookies.get('currentLocale') === 'ar';
    })
    return (
      <Container>
        <Navbar />
        <div className="content">
          <div className="banner">
            <img src={LogoImage} alt="Tarteel-logo" className="logo-img" />
          </div>
          <div className="core-text">
            <div className="info start-text">
              <h3 className={classes}>
                <T id={KEYS.LANDING_GREETING_MESSAGE} />
              </h3>
              <p className={classes}>
                <T id={KEYS.LANDING_FIRST_PARAGRAPH} />
              </p>
              <h3 className={classes}>
                <br />
                <T id={KEYS.LANDING_SECOND_PARAGRAPH_TITLE} />
              </h3>
              <ul className={classes}>
                <li className={classes}>
                  <T id={KEYS.LANDING_LIST_FIRST_ITEM} />
                </li>
                <li className={classes}>
                  <T id={KEYS.LANDING_LIST_SECOND_ITEM} />
                </li>
                <li className={classes}>
                  <T id={KEYS.LANDING_LIST_THIRD_ITEM} />
                </li>
              </ul>
              <div className={classes}>
                <br />
                <T id={KEYS.LANDING_LAST_LINE} />
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
