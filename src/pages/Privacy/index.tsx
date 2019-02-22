import React from 'react';
import styled from 'styled-components';
import T from '../../components/T';
import KEYS from '../../locale/keys';
import logScreen from '../../helpers/logScreen';

class Privacy extends React.Component {
  componentDidMount() {
    logScreen();
  }
  public render() {
    return (
      <Container>
        <h1>
          <T id={KEYS.PRIVACY_POLICY_PAGE_TITLE} />
        </h1>
        <p>
          <T id={KEYS.PRIVACY_POLICY_PAGE_PARAGRAPH} />
        </p>
      </Container>
    );
  }
}

const Container = styled.div`
  color: #485364;
  padding: 5em;

  h1 {
    margin: 20px 0;
  }
`;

export default Privacy;
