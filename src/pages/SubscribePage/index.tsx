import React, {Component} from "react"
import Icon from "react-icons-kit";
import {facebook as FacebookIcon} from 'react-icons-kit/fa/facebook'
import {twitter as TwitterIcon} from 'react-icons-kit/fa/twitter'
import {linkedin as LinkedinIcon} from 'react-icons-kit/fa/linkedin'
import {Helmet} from "react-helmet";
import {injectIntl, InjectedIntl} from 'react-intl'

import T from "../../components/T";
import FooterButton from "../../components/FooterButton";
import KEYS from "../../locale/keys";
import {Container} from "./styles";
import Navbar from "../../components/Navbar";

interface IDispatchProps {
}

interface IOwnProps {
  intl: InjectedIntl;
}

interface IStateProps {
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class SubscribePage extends Component<IProps, never> {
  componentDidMount() {
  }
  render() {
    const recordingCount = 0
    const {intl} = this.props;
    const rtl = intl.messages.local === "arabic" ? "rtl" : "";

    return (
      <Container>
        <Helmet>
          <title>{ intl.formatMessage({ id: KEYS.SUBSCRIBE_PAGE_TEMPLATE_TITLE }) }</title>
        </Helmet>
        <Navbar />
        <div className="content">
          <h1>
            <T id={KEYS.SUBSCRIBE_PAGE_TITLE}/>
          </h1>
          <p className={`subtitle large-arabic-text ${rtl}`}>
            <T id={KEYS.SUBSCRIBE_PAGE_FIRST_PARAGRAPH_1}/>
            &nbsp;<strong>{recordingCount}</strong>&nbsp;
            <T id={KEYS.SUBSCRIBE_PAGE_FIRST_PARAGRAPH_2}/>
          </p>
           {/* Begin MailChimp Signup Form */}
          <div id="mc_embed_signup" className={`arabic-text ${rtl }`}>
            <form
              action="https://tarteel.us19.list-manage.com/subscribe/post?u=ab8add36046818c66a55a4f9c&amp;id=4015afc1f5"
              method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
              target="_blank" noValidate>
              <div id="mc_embed_signup_scroll">
                <input type="email" value="" name="EMAIL" className="email" id="mce-EMAIL" placeholder="email address"
                       required />
                   {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                  <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
                    <input type="text"
                     name="b_ab8add36046818c66a55a4f9c_4015afc1f5"
                     tabIndex={-1} value="" />
                  </div>
                  <div className="clear">
                    <input
                      type="submit"
                      value="Subscribe for Updates on Tarteel"
                      name="subscribe" id="mc-embedded-subscribe"
                      className="button" />
                  </div>
              </div>
            </form>
          </div>
           {/* End mc_embed_signup */}

            <p>
              <ul>
                <li className={`large-arabic-text ${rtl}`}>
                  <T id={KEYS.SUBSCRIBE_PAGE_CONGRATS_MESSAGE_1} />
                  &nbsp;
                  <b style={{textTransform: "capitalize"}}>
                    <T id={KEYS.CONTINUOUS_MODE_NOTE_TEXT}/>
                  </b>
                  &nbsp;
                  <T id={KEYS.SUBSCRIBE_PAGE_CONGRATS_MESSAGE_2} />
                </li>
              </ul>
            </p>


            <footer>
              <FooterButton onClick={() => {
                this.props.history.push("/")
              }}>
                <T id={KEYS.CONTINUE_READING_BUTTON_TEXT}/>
              </FooterButton>
            </footer>

            <div id="share">
              <div className={`large-arabic-text ${rtl}`}>
                <T id={KEYS.SUBSCRIBE_PAGE_HELP_US_MESSAGE_1} />
                &nbsp;
                <a href="https://tarteel.io">https://tarteel.io</a>
                &nbsp;
                <T id={KEYS.SUBSCRIBE_PAGE_HELP_US_MESSAGE_2} />
              </div>
              <a className="resp-sharing-button__link"
                 href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftarteel.io%2F" target="_blank"
                 aria-label="">
                <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small">
                  <Icon icon={FacebookIcon}/>
                </div>
              </a>

              <a className="resp-sharing-button__link"
                 href="https://twitter.com/intent/tweet/?text=The%20%23Tarteel50k%20Challenge%3A%20Help%20build%20the%20world&#x27;s%20first%20public%2C%20open-source%20dataset%20of%20Quran%20recitations%20by%20ordinary%20people.%20An%20initiative%20to%20encourage%20machine%20learning%20applications%20based%20on%20recitations%20of%20the%20Quran.&amp;url=https%3A%2F%2Ftarteel.io%2F"
                 target="_blank" aria-label="">
                <div className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small">
                  <Icon icon={TwitterIcon}/>
                </div>
              </a>

              <a className="resp-sharing-button__link"
                 href="https://www.linkedin.com/shareArticle?mini=true&amp;url=http%3A%2F%2Ftarteel.tarjim.ly%2F&amp;title=The%20%23Tarteel50k%20Challenge%3A%20Help%20build%20the%20world&#x27;s%20first%20public%2C%20open-source%20dataset%20of%20Quran%20recitations%20by%20ordinary%20people.%20An%20initiative%20to%20encourage%20machine%20learning%20applications%20based%20on%20recitations%20of%20the%20Quran.&amp;summary=The%20%23Tarteel10k%20Challenge%3A%20Help%20build%20the%20world&#x27;s%20first%20public%2C%20open-source%20dataset%20of%20Quran%20recitations%20by%20ordinary%20people.%20An%20initiative%20to%20encourage%20machine%20learning%20applications%20based%20on%20recitations%20of%20the%20Quran.&amp;source=https%3A%2F%2Ftarteel.io%2F"
                 target="_blank" aria-label="">
                <div className="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--small">
                  <Icon icon={LinkedinIcon}/>
                </div>
              </a>
            </div>
        </div>
      </Container>
    );
  }

}

export default injectIntl(SubscribePage);
