import React from 'react';
import {Helmet} from "react-helmet";

import Ayah from "../../components/Ayah";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {IStatus} from "../../types/GlobalState";
import AyahShape from "../../shapes/AyahShape";
import {Container} from "./styles";
import config from '../../../config';
import surahs from '../../api/surahs';
import {isCorrectAyah} from "../../helpers/ayahs";
import {fetchRandomAyah, fetchSpecificAyah} from "../../api/ayahs";
import {setAyah} from "../../store/actions/ayahs";
import {ActionType} from "typesafe-actions";

const cdnURL = config('cdnURL');

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
}

type IProps = IOwnProps & IDispatchProps;

class Main extends React.Component<IProps, never> {
  handleOGImage = () => {
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return `${cdnURL}/og/main_${locale}.png`;
  }
  loadQueue = async () => {
    await this.props.loadNextAyah();
    await this.props.loadPreviousAyah();
    await this.props.loadNextQueue();
    await this.props.loadPrevQueue();
  }
  public async componentDidMount() {
    const {surah, ayah} = this.props.match.params;
    if (surah && ayah) {
      if (isCorrectAyah(surah, ayah)) {
        return fetchSpecificAyah(surah, ayah)
          .then(async (fetchedAyah: AyahShape) => {
            await this.props.setAyah(fetchedAyah);
            await this.loadQueue()
          })
      } else {
        return this.history.push('/ayah_not_found');
      }
    }
    else if (this.props.currentAyah.textSimple) {
      if (!this.props.router.location.state) {
        await this.loadQueue();
      }
      this.props.cookies.set("lastAyah", this.props.currentAyah, { path: '/' });
    } else {
      this.fetchRandomAyah();
    }
  }
  public fetchRandomAyah = () => {
    fetchRandomAyah()
      .then((ayah: AyahShape) => {
        this.props.setAyah(ayah)
      })
  }
  public render() {
    const {surah, ayah} = this.props.match.params;
    const locale = this.props.cookies.get('currentLocale') || 'en';
    let ogTitle;
    if (surah && ayah) {
      ogTitle = (
        locale === 'ar' ?
          `سورة [${surahs[surah].arabic}] آيه ${ayah}  | ترتيل `
          :
          `Surah [${surahs[surah].latin}] ayah ${ ayah } | Tarteel`
      )
    }
    return (
      <Container>
        <Helmet>
          {
            (surah && ayah) &&
              [
                <title>
                  {
                    ogTitle
                  }
                </title>,
                <meta property={'og:title'} content={ogTitle} />,
                <meta name={'twitter:title'} content={ogTitle} />,
                <meta
                  property={'og:description'}
                  content={this.props.currentAyah.textSimple}
                />,
                <meta
                  name={'twitter:description'}
                  content={this.props.currentAyah.textSimple}
                />,
            ]
          }
          <meta
            property={'og:image'}
            content={this.handleOGImage()}
          />
          <meta
            name={'twitter:image'}
            content={this.handleOGImage()}
          />
        </Helmet>
        <Navbar withBullets={true} />
        <div className={"content"}>
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

export default Main;
