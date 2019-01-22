import React from 'react'
import styled, {keyframes} from "styled-components";
import {Link as link} from "react-router-dom";
import { Icon } from 'react-icons-kit'
import {navicon} from 'react-icons-kit/fa/navicon'
import OutsideClickHandler from 'react-outside-click-handler';
import {withRouter} from "react-router-dom";
import pick from "lodash/pick";
import { isMobileOnly, BrowserView } from 'react-device-detect'
import classnames from 'classnames'
import {injectIntl, InjectedIntl} from 'react-intl';
import {withCookies} from "react-cookie";

import T from "./T";
import KEYS from "../locale/keys";
import {fetchRandomAyah} from "../api/ayahs";
import ReduxState, {IProfile} from "../types/GlobalState";
import {connect} from "react-redux";
import {setAyah} from "../store/actions/ayahs";
import AyahShape from "../shapes/AyahShape";
import theme from "../theme";

interface IOwnProps {
  location: Location;
  intl: InjectedIntl;
}

interface IDispatchProps {
  setAyah(ayah: AyahShape): void;
}

interface IStateProps {
  profile: IProfile;
}

interface IState {
  showDropdown: boolean
}

interface ILink {
  textID: KEYS;
  href: string;
  onClick?(): void;
}

type IProps = IDispatchProps & IStateProps & IOwnProps;

const linksFactory: ({sessionKey}: {sessionKey: string}) => {[key: string]: ILink} = ({sessionKey, randomAyah}) => {
  return {
    mobile: {
      textID: KEYS.MOBILE_APP_LINK_TEXT,
      href: "/mobile_app",
    },
    profile: {
      textID: KEYS.PROFILE_LINK_TEXT,
      href: `/profile/${ sessionKey }`,
    },
    evaluator: {
      textID: KEYS.EVALUATE_AYAHS,
      href: "/evaluator",
    },
    home: {
      textID: KEYS.HOME_LINK_TEXT,
      href: '/'
    },
    randomAyah: {
      textID: KEYS.RANDOM_AYAH_LINK_TEXT,
      href: "",
      onClick: randomAyah
    },
    about: {
      textID: KEYS.ABOUT_LINK_TEXT,
      href: "/about",
    },
    demographics: {
      textID: KEYS.DEMOGRAPHIC_INFO_LINK_TEXT,
      href: "/demographics",
    },
    subscribe: {
      textID: KEYS.SUBSCRIBE_BUTTON_TEXT,
      href: "/subscribe",
    }
  }
}

class NavMenu extends React.Component<IProps, IState>{
  state = {
    showDropdown: false
  }
  toggleDropdown = () => {
    this.setState((state: IState) => {
      console.log('changed !');
      return {
        showDropdown: !state.showDropdown,
      };
    });
  }
  handleRandomAyah = () => {
    fetchRandomAyah()
      .then((ayah: AyahShape) => {
        this.props.setAyah(ayah)
      })
  }
  renderItem = (item: ILink, className?: string) => {
    const classNames = classnames({
      active: item.href === this.props.location.pathname,
      [className]: className
    })
    return (
      <Link to={item.href} onClick={item.onClick} className={classNames}>
        <T id={item.textID}/>
      </Link>
    )
  }
  render() {
    const isHome = this.props.location.pathname === "/";
    const mobileLinks = ["demographics", "subscribe", 'mobile', 'about'];
    if (isMobileOnly) mobileLinks.push(...["home", "profile", "evaluator"]);
    if (isHome) mobileLinks.unshift(...['randomAyah']);
    const links = linksFactory({
      randomAyah: this.handleRandomAyah,
      sessionKey: this.props.profile.sessionKey
    })
    const currentLocale = this.props.cookies.get('currentLocale') || 'en';
    const urlLocale = currentLocale === 'en' ? 'ar' : 'en'

    return (
      <Container>
        <BrowserView viewClassName="list">
          {
            Object.keys(pick(links, ["home", "profile", "evaluator"])).map((key: string) => {
              return this.renderItem(links[key]);
            })
          }
          {/*<a href={`?lang=${ urlLocale }`}>*/}
            {/*{*/}
              {/*currentLocale === 'en' ? 'العربية' : 'English'*/}
            {/*}*/}
          {/*</a>*/}
        </BrowserView>
        <a href={`?lang=${ urlLocale }`}>
          {
            currentLocale === 'en' ? 'العربية' : 'English'
          }
        </a>
        <div className="settings" onClick={this.toggleDropdown}>
          <Icon icon={navicon} size={25} />
        </div>
        {
          this.state.showDropdown ?
            <div className="settings-menu">
              <OutsideClickHandler
                onOutsideClick={(e: any) => {
                  const button = document.querySelector(".settings")
                  if (button && button.contains(e.target)) {
                    // Nothing..
                  } else  {
                    this.setState({showDropdown: false});
                  }
                }}
              >
                <div className="list">
                  {
                    Object.keys(pick(links, mobileLinks)).map((key: string) => {
                      return this.renderItem(links[key], "list-item")
                    })
                  }
                </div>
              </OutsideClickHandler>
            </div>
            :
              null
        }

      </Container>
    )
  }
}

const Link = styled(link)`
  color: ${props => props.theme.colors.tuatara};
  text-decoration: none;
  margin: 0 10px;
  transition: 0.25s;
  
  &:hover {
    color: ${props => props.theme.colors.linkColor}
  }
`

const fadeInUp = keyframes`
  from {
    transform: translate3d(0,40px,0)
  }

  to {
    transform: translate3d(0,0,0);
    opacity: 1
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  
  > a {
    color: ${props => props.theme.colors.tuatara};
    text-decoration: none;
    margin: 0 10px;
    transition: 0.25s;
    display: flex;
    align-items: center;
    font-size: 14px;
    
    &.active, &:hover {
      color: ${props => props.theme.colors.linkColor};
    }
  }
  > .list {
    margin: 0;
    position: relative;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
    
    a {
      &.active {
        color: ${props => props.theme.colors.linkColor};
      }
    }
  }
  .settings {
    color: ${props => props.theme.colors.brandPrimary}
    display: flex;
    justify-content: center;
    align-items: center;
    
    svg {
      height: 21px;
      width: 18px;
    }
  }
  .settings-menu {
    position: absolute;
    right: 5px;
    top: 100%;
    min-width: 150px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    text-align: center;
    z-index: 20;
    animation: ${fadeInUp} 0.25s linear;
    padding: 1em 0;

    .list {
      display: flex;
      flex-flow: column;

      .list-item {
        padding: 5px 0;
        transition: background 200ms;
        margin: 0;
        font-size: 14px;

        &.active, &:hover {
          background-color: #E0EAFC;
          color: ${props => props.theme.colors.linkColor};
        }
      }
    }
  }
  
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    position: static;
    
    .settings-menu {
      left: 0;
      top: 110%;
    
      .list {
        .list-item {      
          font-size: 16px;
          padding: 1em 0;
        }
      }
  }
`


const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    setAyah: (ayah: AyahShape) => {
      dispatch(setAyah(ayah));
    }
  }
}

export default withRouter(injectIntl(withCookies(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavMenu))));
