import React from 'react';
import { Icon } from 'react-icons-kit';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import T from './T';

/**
 * DropdownMenu Component:
 * Pass Links as array prop
 * Pass function to specific link as prop
 * Pass icon as prop
 * Checker if showRoute is the same pathname or not
 **/

interface IProps {
  links: any;
  icon?: any;
  currentRoute?: string;
  passedFunction?: any;
  passedFunctionRouteName?: string;
}

interface IState {
  showMenu: boolean;
}

class DropdownMenu extends React.Component<IProps, IState> {
  state = {
    showMenu: false,
  };

  toggleDropdownMenu = () => {
    this.setState(state => ({ showMenu: !state.showMenu }));
  };

  render() {
    const { showMenu } = this.state;
    const { links, icon, passedFunction, passedFunctionRouteName } = this.props;
    return (
      <Container>
        <div>
          <div className="settings" onClick={() => this.toggleDropdownMenu()}>
            <Icon icon={icon} size={25} />
          </div>
          {showMenu ? (
            <div className="settings-menu">
              <ul className="list">
                <LinkContainer>
                  {links.map(link => (
                    <li
                      className="list-item"
                      onClick={
                        link.name === passedFunctionRouteName
                          ? passedFunction
                          : null
                      }
                    >
                      <Link to={link.href} className="text">
                        {link.badgeText ? (
                          <span className={'badge-text'}>{link.badgeText}</span>
                        ) : null}
                        <T id={link.textID} />
                      </Link>
                    </li>
                  ))}
                </LinkContainer>
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    );
  }
}

const LinkContainer = styled.div`
  margin: 0 10px;

  .badge-text {
    position: absolute;
    font-size: 13px;
    color: ${props => props.theme.colors.linkColor};
    right: 8px;
    top: -13px;
  }
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
    right: 0;
    top: 100%;
    margin-top: 5px;
    min-width: 150px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    text-align: center;
    z-index: 20;
    animation: ${fadeInUp} 0.25s linear;
    padding: 1em 0;

    .list {
      display: flex;
      flex-flow: column;

      > div {
        margin: 0;
        li {
          list-style: none;
        }
      }
      .list-item {
        position: relative;
        line-height: 35px;
        transition: background 200ms;
        margin: 0;
        font-size: 14px;
        text-transform: capitalize;

        &.active,
        &:hover {
          background-color: #e0eafc;
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
  }
`;

export default DropdownMenu;