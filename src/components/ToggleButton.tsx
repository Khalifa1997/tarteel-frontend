import React, {SFC} from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {withCookies} from 'react-cookie'

import LOCALE_KEYS from '../locale/keys';
import T from "./T";
import ReduxState from "../types/GlobalState";
import {toggleIsContinuous} from "../store/actions/status";

interface IOwnProps {
  text: LOCALE_KEYS;
}

interface IStateProps {
  isContinuous: boolean;
}

interface IDispatchProps {
  toggleIsContinuous(): void;
}


type IProps = IOwnProps & IDispatchProps & IStateProps

class ToggleButton extends React.Component<IProps, never> {
  toggle = () => {
    this.props.cookies.set("continuous", !this.props.isContinuous)
    this.props.toggleIsContinuous()
  }
  render() {
    return (
      <Container onClick={this.toggle}>
        <span />
        <input
          type="checkbox"
          id="continuous"
          checked={this.props.isContinuous}
          onClick={(e) => {
          e.stopPropagation()
        }} className="tgl tgl-ios" />
        <label htmlFor="continuous" className="tgl-btn" />
        <button className="tgl-text small-arabic-text" disabled={true}>
          <T id={this.props.text} />
        </button>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .tgl-text {
    margin: 1em 0;
    font-size: 11px;
    color: #a5aab2;
    background-color: transparent;
    border: 0;
  }
  .tgl {
    display: none;
  }
  .tgl, .tgl:after, .tgl:before, .tgl *, .tgl *:after, .tgl *:before, .tgl + .tgl-btn {
    box-sizing: border-box;
  }
  .tgl::selection, .tgl:after::selection, .tgl:before::selection, .tgl *::selection, .tgl *:after::selection, .tgl *:before::selection, .tgl + .tgl-btn::selection {
    background: none;
  }
  .tgl + .tgl-btn {
    outline: 0;
    display: block;
    width: 40px;
    height: 14px;
    position: relative;
    cursor: pointer;
    user-select: none;
  }
  .tgl + .tgl-btn:after, .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 20px;
    height: 20px;
  }
  .tgl + .tgl-btn:after {
    left: -2px;
    top: -5px;
  }
  .tgl + .tgl-btn:before {
    display: none;
  }
  .tgl:checked + .tgl-btn:after {
    left: 50%;
  }
  
  .tgl-ios + .tgl-btn {
    background: #d5d5d5;
    border-radius: 2em;
    padding: 2px;
    transition: all 0.4s ease;
  }
  .tgl-ios + .tgl-btn:after {
    border-radius: 2em;
    background: #fbfbfb;
    transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), padding 0.3s ease, margin 0.3s ease;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
  .tgl-ios + .tgl-btn:hover:after {
    will-change: padding;
  }
  .tgl-ios + .tgl-btn:active {
    box-shadow: inset 0 0 0 2em #e8eae9;
  }
  .tgl-ios + .tgl-btn:active:after {
    padding-right: 0.8em;
  }
  .tgl-ios:checked + .tgl-btn {
    background: #5EC49E;
  }
  .tgl-ios:checked + .tgl-btn:active {
    box-shadow: none;
  }
  .tgl-ios:checked + .tgl-btn:active:after {
    margin-left: -0.8em;
  }

`

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    isContinuous: state.status.isContinuous,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleIsContinuous: () => {
      dispatch(toggleIsContinuous())
    }
  }
}

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(ToggleButton));
