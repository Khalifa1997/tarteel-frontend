import React from 'react';
import styled from 'styled-components';
import { DebounceInput } from 'react-debounce-input';
import classNames from 'classnames';
import { withCookies } from 'react-cookie';

interface IProps {
  debounce?: boolean;
  label: string;
  type: string;
  [x: string]: any;
}

class Input extends React.Component<IProps, never> {
  render() {
    const classes = classNames({
      rtl: this.props.cookies.get('currentLocale') === 'ar',
    });
    return (
      <Container className={classes}>
        <label>{this.props.label} {this.props.label && ':'}</label>
        {this.props.debounce ? (
          <DebounceInput
            minLength={0}
            debounceTimeout={300}
            forceNotifyByEnter={true}
            forceNotifyOnBlur={true}
            {...this.props}
          />
        ) : this.props.type !== 'textarea' ? (
          <input {...this.props} />
        ) : (
          <textarea {...this.props} />
        )}
      </Container>
    );
  }
}

const Container = styled.div`
  &.rtl {
    direction: rtl;
  }

  label {
    margin-left: 5px;
    margin-bottom: 5px;
    font-size: 14px;
  }
  input,
  textarea {
    height: 38px !important;
    border-radius: 5px;
    border: 1px solid rgb(204, 204, 204) !important;
    display: block;
    margin-bottom: 1em;
    padding: 5px 10px !important;
    width: 300px;
    font-size: 14px;

    &:hover {
      border: 2px solid ${props => props.theme.colors.linkColor};
    }
    &:focus {
      border: 2px solid ${props => props.theme.colors.linkColor};
    }
  }

  textarea {
    height: auto;
    padding: 10px;
  }
`;

export default withCookies(Input);
