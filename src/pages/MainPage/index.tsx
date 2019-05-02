import React from 'react';
import { Helmet } from 'react-helmet';
import { InjectedIntl, injectIntl } from 'react-intl';
import ReactGA from 'react-ga';

import Ayah from '../../components/Ayah';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { IStatus } from '../../types/GlobalState';
import KEYS from '../../locale/keys';
import AyahShape from '../../shapes/AyahShape';
import { Container } from './styles';
import config from '../../../config';
import surahs from '../../api/surahs';
import { isCorrectAyah } from '../../helpers/ayahs';
import { fetchRandomAyah, fetchSpecificAyah } from '../../api/ayahs';
import { setAyah } from '../../store/actions/ayahs';
import { ActionType } from 'typesafe-actions';

interface IDispatchProps {
  setAyah(ayah: AyahShape): ActionType<typeof setAyah>;
  loadPreviousAyah(ayah?: AyahShape): void;
  loadNextAyah(ayah?: AyahShape): void;
  loadNextQueue(): void;
  loadPrevQueue(): void;
}

interface IOwnProps {
  currentAyah: AyahShape;
  isFetchingCurrentAyah: boolean;
  passedOnBoarding: boolean;
  status: IStatus;
  isAyahPage?: boolean;
  intl: InjectedIntl;
}

type IProps = IOwnProps & IDispatchProps;

class Main extends React.Component<IProps, never> {
  getOGComponent = () => {
    const { surah, ayah } = this.props.match.params;
    const locale = this.props.cookies.get('currentLocale') || 'en';

    let ogTitle = this.props.intl.formatMessage({
      id: KEYS.CONTRIBUTE_PAGE_TITLE,
    });
    console.log('ogTitle is', ogTitle);
    if (surah && ayah) {
      ogTitle =
        locale === 'ar'
          ? `سورة ${surahs[surah].arabic} آيه ${ayah} `
          : `Surah ${surahs[surah].latin} Ayah ${ayah}`;

      return (
        <Helmet titleTemplate={''}>
          {surah &&
            ayah && [
              <title>{ogTitle}</title>,
              <meta
                property={'og:description'}
                content={this.props.currentAyah.textSimple}
              />,
              <meta
                name={'twitter:description'}
                content={this.props.currentAyah.textSimple}
              />,
            ]}
          <meta property={'og:image'} content={this.handleOGImage()} />
          <meta name={'twitter:image'} content={this.handleOGImage()} />
        </Helmet>
      );
    } else {
      return (
        <Helmet>
          <title>{ogTitle}</title>
        </Helmet>
      );
    }
  };

  handleOGImage = () => {
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return `/public/og/main_${locale}.png`;
  };
  loadQueue = async () => {
    await this.props.loadNextAyah();
    await this.props.loadPreviousAyah();
    await this.props.loadNextQueue();
    await this.props.loadPrevQueue();
  };
  public async componentDidMount() {
    const { surah, ayah } = this.props.match.params;
    if (surah && ayah) {
      if (isCorrectAyah(surah, ayah)) {
        return fetchSpecificAyah(surah, ayah).then(
          async (fetchedAyah: AyahShape) => {
            await this.props.setAyah(fetchedAyah);
            await this.loadQueue();
          }
        );
      } else {
        return this.history.push('/ayah_not_found');
      }
    } else if (this.props.currentAyah.textSimple) {
      if (!this.props.router.location.state) {
        await this.loadQueue();
      }
      this.props.cookies.set('lastAyah', this.props.currentAyah, { path: '/' });
    } else {
      this.fetchRandomAyah();
    }
  }
  public fetchRandomAyah = () => {
    fetchRandomAyah().then((ayah: AyahShape) => {
      this.props.setAyah(ayah);
    });
  };
  public render() {
    const OGComponent = this.getOGComponent();
    return (
      <Container>
        {OGComponent}
        <Navbar withBullets={true} />
        <div className={'content'}>
          <Ayah
            ayah={this.props.currentAyah}
            isFetchingAyah={this.props.isFetchingCurrentAyah}
          />
          <Footer isAyahPage={this.props.isAyahPage} />
        </div>
      </Container>
    );
  }
}

export default injectIntl(Main);
