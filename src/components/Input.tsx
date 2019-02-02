import React from 'react';
import styled from "styled-components";
import {DebounceInput} from 'react-debounce-input';

interface IProps{
  debounce?: boolean;
  label: string;
  [x: string]: any;
}

class Input extends React.Component<IProps, never> {
  render() {
    return (
      <Container>
        <label>
          {
            this.props.label
          }:
        </label>
        {
          this.props.debounce ?
            <DebounceInput
              minLength={0}
              debounceTimeout={300}
              forceNotifyByEnter={true}
              forceNotifyOnBlur={true}
              {...this.props}
            />
            :
            <input {...this.props} />
        }
      </Container>
    );
  }
}

const Container = styled.div`
  label {
    margin-left: 5px;
    margin-bottom: 5px;
    font-size: 14px;
  }
  input {
    height: 30px;
    border-radius: 5px;
    border: 2px solid lightgray;
    display: block;
    margin-bottom: 1em;
    padding: 0 10px;
    width: 300px;
    font-size: 14px;
    
    &:hover {
      border: 2px solid ${props => props.theme.colors.linkColor};
    }
    &:focus {
      border: 2px solid ${props => props.theme.colors.linkColor};
    }
  }
`;

export default Input;
