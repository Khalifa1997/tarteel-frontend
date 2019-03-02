import React from 'react';
import styled from 'styled-components';

import T from './T';

interface IProps {
  align: string;
  paragraph: string;
  headtag: string;
  width: number;
}

const Headline = (props: IProps) => {
  const { align, paragraph, headtag, width } = props;
  return (
    <HeadlineContainer align={align} width={width}>
      <h1>
        <T id={headtag} />
      </h1>
      <p>
        <T id={paragraph} />
      </p>
    </HeadlineContainer>
  );
};

const HeadlineContainer = styled.div`
  text-align: ${props => props.align};
  max-width: ${props => props.width}%;
  p {
    margin: 1em 0;
  }
  a {
    text-decoration: underline;
    color: ${props => props.theme.colors.linkColor};
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    max-width: 100%;
  }
`;

export default Headline;
