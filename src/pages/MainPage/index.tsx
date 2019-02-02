import React from 'react';
import {Helmet} from "react-helmet";

import Ayah from "../../components/Ayah";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import {IStatus} from "../../types/GlobalState";
import AyahShape from "../../shapes/AyahShape";
import {Container} from "./styles";
import config from '../../../config';

const cdnURL = config('cdnURL');

interface IProps {
  currentAyah: AyahShape;
  isFetchingCurrentAyah: boolean;
  passedOnBoarding: boolean;
  status: IStatus
}

class Main extends React.Component<IProps, never> {
  handleOGImage = () => {
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return `${cdnURL}/main_${locale}.png`
  }
  public componentDidMount() {
    if (this.props.currentAyah.textSimple) {
      this.props.cookies.set("lastAyah", this.props.currentAyah, { path: '/' });
    }
  }
  public render() {
    return (
      <Container>
        <Helmet>
          <meta
            property={'og:image'}
            content={this.handleOGImage()}
          />
        </Helmet>
        <Navbar withBullets={true} />
        <div className={"content"}>
          <Ayah
            ayah={this.props.currentAyah}
            isFetchingAyah={this.props.isFetchingCurrentAyah}
          />
        </div>
        <Footer />
      </Container>
    );
  }
}

export default Main;
