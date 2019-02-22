import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Logo from '../components/Logo';
import ProgressBubbles from '../components/ProgressBubbles';
import ReduxState, { IStatus } from '../types/GlobalState';
import NavMenu from './NavMenu';

interface IOwnProps {
  withBullets?: boolean;
  counterText?: string;
}

interface IStateProps {
  passedOnBoarding: boolean;
  status: IStatus;
}

type IProps = IOwnProps & IStateProps;

class Navbar extends React.Component<IProps, never> {
  public render() {
    const { passedOnBoarding, counterText, withBullets } = this.props;
    return (
      <Container>
        <Logo counterText={counterText} />
        <NavMenu />
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  position: relative;
`;

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    passedOnBoarding: state.profile.passedOnBoarding,
    status: state.status,
  };
};

export default connect(mapStateToProps)(Navbar);
