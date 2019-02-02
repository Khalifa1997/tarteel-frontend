import classnames from 'classnames'
import range from "lodash/range";
import React from "react";
import {connect} from "react-redux";
import styled from "styled-components";

import ReduxState from "../types/GlobalState";

interface IOwnProps {

}

interface IStateProps {
  userRecitedAyahs: number;
}

type IProps = IOwnProps & IStateProps;

class ProgressBubbles extends React.Component<IProps, never> {
  public render() {
    return (
      <Container>
        {
          range(1, 6).map((num, i) => {
            const classname = classnames({
              completed: this.props.userRecitedAyahs >= i,
            })
            return <Bubble key={i} className={classname} >{ num }</Bubble>
          })
        }
      </Container>
    )
  }
}

const Container = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Bubble = styled.div`
  font-weight: bold;
  border: solid 2px #9a9e9b;
  color: #9a9e9b;
  border-radius: 50%;
  font-size: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  
  &.completed {
    background-color: #5ec49e;
    border-color: #5ec49e;
    color: white;
  }
`

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    userRecitedAyahs: state.profile.userRecitedAyahs,
  }
}

export default connect(mapStateToProps)(ProgressBubbles);
