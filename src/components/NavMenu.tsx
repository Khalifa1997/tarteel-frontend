import React from 'react';
import { withCookies } from 'react-cookie';
import { navicon } from 'react-icons-kit/fa/navicon';
import { InjectedIntl, injectIntl } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { fetchRandomAyah } from '../api/ayahs';
import KEYS from '../locale/keys';
import AyahShape from '../shapes/AyahShape';
import { setAyah, toggleFetchingCurrentAyah } from '../store/actions/ayahs';
import DropdownMenu from './DropdownMenu';
import ReduxState, { IProfile } from '../types/GlobalState';

interface IOwnProps {
  location: Location;
  intl: InjectedIntl;
}

interface IDispatchProps {
  setAyah(ayah: AyahShape): void;
  toggleFetchingCurrentAyah(): void;
}

interface IStateProps {
  profile: IProfile;
}

interface IState {
  showDropdown: boolean;
}

type IProps = IDispatchProps & IStateProps & IOwnProps;

const navLinks = (props: any) => {
  return {
    items: [
      {
        name: 'profile',
        textID: KEYS.PROFILE_LINK_TEXT,
        href: `/profile/${props.profile.sessionId}`,
      },
      {
        name: 'randomAyah',
        textID: KEYS.RANDOM_AYAH_LINK_TEXT,
        href: '',
        onClick: props.randomAyah,
        showRoute: '/',
      },
      {
        name: 'recognition',
        textID: KEYS.AYAH_RECOGNITION,
        href: '/recognition',
        badgeText: 'BETA',
      },
      {
        name: 'mobile',
        textID: KEYS.MOBILE_APP_LINK_TEXT,
        href: '/mobile',
      },
      {
        name: 'partners',
        textID: KEYS.PARTNERS_LINK_TEXT,
        href: '/partners',
      },
      {
        name: 'donate',
        textID: KEYS.DONATE_LINK_TEXT,
        href: '/donate',
      },
      {
        name: 'dataset',
        textID: KEYS.TARTEEL_DATASET_LINK_TEXT,
        href: '/dataset',
      },
      {
        name: 'contact',
        textID: KEYS.CONTACT_US,
        href: '/contact',
      },
    ],
  };
};

class NavMenu extends React.Component<IProps, IState> {
  public handleRandomAyah = () => {
    this.props.toggleFetchingCurrentAyah();
    fetchRandomAyah().then((ayah: AyahShape) => {
      this.props.setAyah(ayah);
      this.props.toggleFetchingCurrentAyah();
    });
  };
  public render() {
    const links = navLinks({
      profile: this.props.profile,
    });
    const currentLocale = this.props.cookies.get('currentLocale') || 'en';
    const urlLocale = currentLocale === 'en' ? 'ar' : 'en';

    return (
      <Container>
        <a href={`?lang=${urlLocale}`}>
          {currentLocale === 'en' ? 'العربية' : 'English'}
        </a>
        <div className="icon-container">
          <DropdownMenu
            links={...links.items}
            icon={navicon}
            currentRoute={this.props.location.pathname}
            passedFunction={this.handleRandomAyah}
            passedFunctionRouteName={'randomAyah'}
          />
        </div>
      </Container>
    );
  }
}

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

    &.active,
    &:hover {
      color: ${props => props.theme.colors.linkColor};
    }
  }
  .icon-container {
    margin: auto;
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
    setAyah: (ayah: AyahShape) => {
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
