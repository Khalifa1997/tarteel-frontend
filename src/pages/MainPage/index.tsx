import React from 'react';
import {Helmet} from "react-helmet";

import {Container} from "./styles";
import Navbar from "../../components/Navbar";
import Ayah from "../../components/Ayah";
import {IStatus} from "../../types/GlobalState";
import Footer from "../../components/Footer";
import AyahShape from "../shapes/AyahShape";

interface IProps {
  currentAyah: AyahShape;
  isFetchingCurrentAyah: boolean;
  passedOnBoarding: boolean;
  status: IStatus
}

class Main extends React.Component<IProps, never> {
  componentDidMount() {
    if (this.props.currentAyah.textSimple) {
      this.props.cookies.set("lastAyah", this.props.currentAyah, { path: '/' });
    }
  }
  render() {
    return (
      <Container>
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
