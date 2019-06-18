import classnames from 'classnames';
import pick from 'lodash/pick';
import React from 'react';
import { withCookies } from 'react-cookie';
import { BrowserView, isMobileOnly } from 'react-device-detect';
import { Icon } from 'react-icons-kit';
import { navicon } from 'react-icons-kit/fa/navicon';
import { InjectedIntl, injectIntl } from 'react-intl';
import OutsideClickHandler from 'react-outside-click-handler';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { fetchRandomAyah } from '../api/ayahs';
import KEYS from '../locale/keys';
import IAyahShape from '../shapes/IAyahShape';
import { setAyah, toggleFetchingCurrentAyah } from '../store/actions/ayahs';
import ReduxState, { IProfile } from '../types/GlobalState';
import T from './T';
import Dropdown from './Dropdown';

interface IOwnProps {
  location: Location;
  intl: InjectedIntl;
}

interface IDispatchProps {
  setAyah(ayah: IAyahShape): void;
  toggleFetchingCurrentAyah(): void;
}

interface IStateProps {
  profile: IProfile;
}

interface IState {
  showDropdown: boolean;
}

interface ILink {
  textID: KEYS;
  href: string;
  onClick?(): void;
  busy: boolean;
  badgeText: string;
}

type IProps = IDispatchProps & IStateProps & IOwnProps;

const linksFactory: (props: any) => { [key: string]: ILink } = props => {
  return {
    mobile: {
      textID: KEYS.MOBILE_APP_LINK_TEXT,
      href: '/mobile',
    },
    profile: {
      textID: KEYS.PROFILE_LINK_TEXT,
      href: `/profile/${props.profile.sessionId}`,
    },
    evaluator: {
      textID: KEYS.EVALUATE_AYAHS,
      href: '/evaluator',
    },
    home: {
      textID: KEYS.HOME_WORD,
      href: '/',
    },
    contribute: {
      textID: KEYS.CONTRIBUTE_WORD,
      href: '/contribute',
    },
    randomAyah: {
      textID: KEYS.RANDOM_AYAH_LINK_TEXT,
      href: '',
      onClick: props.randomAyah,
    },
    about: {
      textID: KEYS.ABOUT_LINK_TEXT,
      href: '/about',
    },
    demographics: {
      textID: KEYS.DEMOGRAPHIC_INFO_LINK_TEXT,
      href: '/demographics',
      busy: props.profile.askForDemographics,
    },
    subscribe: {
      textID: KEYS.SUBSCRIBE_BUTTON_TEXT,
      href: '/subscribe',
    },
    dataset: {
      textID: KEYS.TARTEEL_DATASET_LINK_TEXT,
      href: '/dataset',
    },
    contact: {
      textID: KEYS.CONTACT_US,
      href: '/contact',
    },
    partners: {
      textID: KEYS.PARTNERS_LINK_TEXT,
      href: '/partners',
    },
    donate: {
      textID: KEYS.DONATE_LINK_TEXT,
      href: '/donate',
    },
  };
};

class NavMenu extends React.Component<IProps, IState> {
  public state = {
    showDropdown: false,
  };
  public toggleDropdown = () => {
    this.setState((state: IState) => {
      return {
        showDropdown: !state.showDropdown,
      };
    });
  };
  public handleRandomAyah = () => {
    this.props.toggleFetchingCurrentAyah();
    fetchRandomAyah().then((ayah: IAyahShape) => {
      this.props.setAyah(ayah);
      this.props.toggleFetchingCurrentAyah();
    });
  };
  public renderItem = (item: ILink, index: number, className?: string) => {
    const classNames = classnames({
      active: item.href === this.props.location.pathname,
      busy: item.busy,
      badge: item.badgeText,
      [className]: className,
    });
    return (
      <LinkContainer key={index}>
        <Link
          to={item.href}
          onClick={() => {
            this.setState({ showDropdown: false });
            if (item.onClick) {
              item.onClick();
            }
          }}
          className={classNames}
        >
          <span className={'badge-text'}>{item.badgeText}</span>
          <div className="text">
            <T id={item.textID} />
          </div>
        </Link>
      </LinkContainer>
    );
  };
  public render() {
    const isHome = this.props.location.pathname === '/';
    let navbarLinks = [
      'home',
      'about',
      'evaluator',
      'profile',
      'contribute',
      'mobile',
      'partners',
      'donate',
      'dataset',
      'contact',
    ];
    const links = linksFactory({
      profile: this.props.profile,
    });
    const currentLocale = this.props.cookies.get('currentLocale') || 'en';
    const urlLocale = currentLocale === 'en' ? 'ar' : 'en';

    return (
      <Container>
        <a href={`?lang=${urlLocale}`}>
          {currentLocale === 'en' ? 'العربية' : 'English'}
        </a>
        <div className="settings" onClick={this.toggleDropdown}>
          <Icon icon={navicon} size={25} />
        </div>
        {this.state.showDropdown ? (
          // TODO: refactor OutsideClickHandler into the Dropdown compoent
          <Dropdown>
            <OutsideClickHandler
              onOutsideClick={(e: any) => {
                const button = document.querySelector('.settings');
                if (button && button.contains(e.target)) {
                  // Nothing..
                } else {
                  this.setState({ showDropdown: false });
                }
              }}
            >
              <div className="list">
                {Object.keys(pick(links, navbarLinks)).map(
                  (key: string, i: number) => {
                    return this.renderItem(links[key], i, 'list-item');
                  }
                )}
              </div>
            </OutsideClickHandler>
          </Dropdown>
        ) : null}
      </Container>
    );
  }
}

const LinkContainer = styled.div`
  margin: 0 10px;
  a {
    color: ${props => props.theme.colors.tuatara};
    text-decoration: none;
    transition: 0.25s;

    &.busy {
      .text {
        display: inline-block;
        position: relative;

        &:before {
          content: '';
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: ${props => props.theme.colors.linkColor};
          position: absolute;
          right: -5px;
          top: 3px;
        }
      }
    }

    &.badge {
      position: relative;
      display: block;
      .badge-text {
        position: absolute;
        font-size: 13px;
        color: ${props => props.theme.colors.linkColor};
        right: 8px;
        top: -13px;
      }
    }

    &:hover {
      color: ${props => props.theme.colors.linkColor};
    }
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
    margin: 0 10px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      height: 21px;
      width: 18px;
    }
  }
  }


  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    position: static;
  }
`;

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    setAyah: (ayah: IAyahShape) => {
      dispatch(setAyah(ayah));
    },
    toggleFetchingCurrentAyah: () => {
      dispatch(toggleFetchingCurrentAyah());
    },
  };
};

export default withRouter(
  injectIntl(
    withCookies(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(NavMenu)
    )
  )
);
