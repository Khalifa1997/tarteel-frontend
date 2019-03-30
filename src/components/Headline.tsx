/* Headline Component include <h1 /> <p /> with standard styles */
import React from 'react';
import styled from 'styled-components';

import T from './T';

interface IProps {
  align: string;
  headtag: string;
  headtagSize: number;
  paragraph: string;
  paragraphSize: number;
  paragraphGray: any;
  width: number;
}

const Headline = (props: IProps) => {
  const {
    align,
    paragraph,
    headtag,
    width,
    headtagSize,
    paragraphSize,
    paragraphGray,
  } = props;
  return (
    <HeadlineContainer
      align={align}
      width={width}
      paragraphSize={paragraphSize}
      headtagSize={headtagSize}
      paragraphGray={paragraphGray}
    >
      {headtag && (
        <h1>
          <T id={headtag} />
        </h1>
      )}
      {paragraph && (
        <p>
          <T id={paragraph} />
        </p>
      )}
    </HeadlineContainer>
  );
};

const HeadlineContainer = styled.div`
  text-align: ${props => props.align};
  max-width: ${props => props.width}%;
  h1 {
    span {
      font-size: ${props =>
        props.headtagSize ? props.headtagSize + 'px' : 'inherit'};
    }
  }
  p {
    margin: 1em 0;
    color: ${props =>
      props.paragraphGray ? props.theme.colors.gray : 'unset'};
    span {
      font-size: ${props =>
        props.paragraphSize ? props.paragraphSize + 'px' : 'inherit'};
    }
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
