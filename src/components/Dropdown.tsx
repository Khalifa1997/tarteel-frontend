import React, { Children } from 'react';
import KEYS from '../locale/keys';
import classnames from 'classnames';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { ILink } from './NavMenu';
import T from './T';

interface IOwnProps {
  children: any;
  href: string;
  passedDownStyles: string;
  onClick?(): void;
}
type IProps = IOwnProps;

const Dropdown = ({ children, href, onClick, passedDownStyles }: IProps) => {
  return (
    <LinkContainer>
      <Link
        to={href}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
        className={passedDownStyles}
      >
        {children}
      </Link>
    </LinkContainer>
  );
};

export default Dropdown;
const LinkContainer = styled.div`
  margin: 0 10px;
  a {
    color: ${props => props.theme.colors.tuatara};
    text-decoration: none;
    transition: 0.25s;
    .list-item {
      line-height: 35px;
      transition: background 200ms;
      margin: 30px;
      font-size: 14px;
    }
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
    &.active,
    &:hover {
      color: ${props => props.theme.colors.linkColor};
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
