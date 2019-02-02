import styled, {keyframes} from "styled-components";
import Icon from "react-icons-kit";
import React from "react";
import {circleONotch} from 'react-icons-kit/fa/circleONotch'
import fadeInUp from "react-animations/lib/fade-in-up";

interface IProps {
  afterLoadingMessage?: string;
  isLoading?: boolean;
}

interface IState {
  isJustLoaded: boolean;
}

class FooterButton extends React.Component<IProps, IState> {
  state = {
    isJustLoaded: false,
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps.isLoading && !this.props.isLoading ) {
      this.setState({
        isJustLoaded: true,
      });
      setTimeout(() => {
        this.setState({
          isJustLoaded: false,
        });
      }, 800)
    }
  }
  render() {
    return (
      <Container {...this.props}>
        {
          this.props.isLoading ?
            <div className={'icon spin'}>
              <Icon icon={circleONotch} size={20} />
            </div>
            :
            this.state.isJustLoaded ?
            <span className={'fadeup'}>
              {
                this.props.afterLoadingMessage
              }
            </span>
              :
                this.props.children
        }
      </Container>
    )
  }
}


const spin = keyframes`
  0% {transform:rotate(0deg);}
  50% {transform:rotate(180deg);}
  100% {transform:rotate(360deg);}
`;

const fadeUp = keyframes`${fadeInUp}`;


const Container = styled.div`
  padding: 8px 3em;
  background-color: #5ec49e;
  border-radius: 23px;
  display: inline;
  cursor: pointer;
  min-width: 90px;
  text-align: center;
  
  span {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(255, 255, 255, 1);
  }
  .icon {
    color: white;
  }
  .fadeup {
    animation: 500ms ${fadeUp};
  }
  .spin {
    svg {
      animation: 800ms ${spin} infinite ;
      transform-origin: center;
    }
  }
`

export default FooterButton;
