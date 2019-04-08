import React, { Component } from 'react';
import { Icon } from 'react-icons-kit';
import { navicon } from 'react-icons-kit/fa/navicon';
import styled, { keyframes } from 'styled-components';
import { withRouter, Link } from 'react-router-dom';

interface IProps {
  afterLoadingMessage?: string;
  isLoading?: boolean;
}

interface IState {
  showMenu: boolean;
}

class DropdownMenu extends React.Component<IProps, IState> {
  state = {
    showMenu: false,
  };

  render() {
    const { showMenu } = this.state;
    return (
      <Container>
        <div>
          <div className="settings" onClick={() => {
            this.setState({ showMenu: !showMenu })
          }}>
            <Icon icon={navicon} size={25} />
          </div>
          {
            showMenu
              ? (
                  <div className="settings-menu">
                    <div className="list">
                      <LinkContainer>
                        <Link
                          to={'/'}
                        >
                          <div className="text">
                            Menu item 1
                          </div>
                        </Link>
                      </LinkContainer>
                    </div>
                  </div>
              )
              : (
                null
              )
          }
        </div>
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
  .settings-menu {
    position: absolute;
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

      > div {
        margin: 0;
      }
      .list-item {
        line-height: 35px;
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
`;

export default DropdownMenu;
