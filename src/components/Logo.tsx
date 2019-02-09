import React from 'react';
import {Link} from "react-router-dom";
import { Tooltip } from 'react-tippy';
import Tippy from '@tippy.js/react';
import styled from "styled-components";

import {connect} from "react-redux";
import LogoImage from "../../public/logo-3x.png";
import {commaFormatter} from "../helpers/utils";
import ReduxState, {IProfile} from "../types/GlobalState";


interface IOwnProps {
  counterText: string;
}

interface IStateProps {
  profile: IProfile;
}

type IProps = IStateProps & IOwnProps

class Logo extends React.Component<IProps, never> {
  public render() {
    return (
      <Container>
        <Link to="/">
          <img src={LogoImage} alt="Tarteel-logo" />

            <Link to={'/about'}
              data-balloon="Total Ayas Recited"
              data-balloon-pos="down"
              className="counter">
              <Tippy
                content="Evaluated Ayahs"
                trigger="mouseenter"
              >
                <div className="evaluated">
                  {
                    commaFormatter(this.props.profile.evaluationsCount)
                  }
                </div>
              </Tippy>
              <Tippy
                content="Total Recited Ayahs"
                trigger="mouseenter"
              >
                <div className={'recited'}>
                  /{
                    commaFormatter(this.props.profile.recordingCount)
                  }
                </div>
              </Tippy>
            </Link>
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
    border-radius: 23px;
    height: 25px;
    line-height: 25px;
    text-align: left;
    background: transparent;
    border: 0;
    padding: 0;
    color: #000;
    
    .evaluated {
      color: ${props => props.theme.colors.linkColor};
      font-size: 22px;
    }
    .recited {
      font-size: 14px;
      font-family: proxima_nova_semibold;
      position: relative;
      top: -5px;
      right: -10px;
    }
  }
`

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps)(Logo);
