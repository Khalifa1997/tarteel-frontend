import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import { Tooltip } from 'react-tippy';

import LogoImage from "../../public/logo-3x.png";
import {connect} from "react-redux";
import ReduxState from "../types/GlobalState";
import {commaFormatter} from "../helpers/utils";

interface IOwnProps {
  counterText: string;
}

interface IStateProps {
  recordingCount: number;
}

type IProps = IStateProps & IOwnProps

class Logo extends React.Component<IProps, never> {
  render() {
    const {counterText} = this.props
    return (
      <Container>
        <Link to="/">
          <img src={LogoImage} alt="Tarteel-logo" />
          {/*<Tooltip*/}
            {/*title="Total Recited Ayahs"*/}
            {/*position="bottom"*/}
            {/*trigger="mouseenter"*/}
          {/*>*/}
            <Link to={'/about'}
              data-balloon="Total Ayas Recited"
              data-balloon-pos="down"
              className="counter">
                {
                  counterText || commaFormatter(this.props.recordingCount)
                }
              </Link>
          {/*</Tooltip>*/}
        </Link>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
  img {
    height: 100%;
    width: 100%;
    margin-top: 5px;
  }
  .counter {
    position: absolute;
    left: 56px;
    top: 7px;
    color: #5fc49e;
    font-size: 13pt;
    font-weight: 600;
    font-family: monospace;
    border-radius: 23px;
    height: 25px;
    line-height: 25px;
    text-align: left;
    background: transparent;
    border: 0;
    padding: 0;
  }
`

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    recordingCount: state.profile.recordingCount
  }
}

export default connect(mapStateToProps)(Logo);
