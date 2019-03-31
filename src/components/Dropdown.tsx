/**
 * Implements the styles for the dropdown,
 * See the navbar component for state management details
 */
import styled, { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    transform: translate3d(0,40px,0)
  }

  to {
    transform: translate3d(0,0,0);
    opacity: 1
  }
`;

const Dropdown = styled.div`
    position: absolute;
    right: 5px;
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

         @media screen and (max-width: ${props =>
           props.theme.breakpoints.sm}px) {

      left: 0;
      top: 110%;

      .list {
        .list-item {
          font-size: 16px;
          padding: 1em 0;
        }
      }
      `;

export default Dropdown;
