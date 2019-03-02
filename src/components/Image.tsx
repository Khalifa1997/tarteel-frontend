import React from 'react';
import styled from 'styled-components';
import Grey from './Grey';

interface IProps {
  size: number;
  title: string;
  linkUrl: string;
  pictureUrl: string;
  grey: any;
}

const Image = (props: IProps) => {
  const { size, title, linkUrl, pictureUrl, grey } = props;
  return (
    <ImageContainer>
      <a href={linkUrl ? linkUrl : ''} target="_blank">
        <Grey grey={grey}>
          <img src={pictureUrl} width={size + 'px'} alt={title} />
        </Grey>
      </a>
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  img {
    height: auto;
    max-width: 95%;
    padding: 0 20px 40px 20px;
    margin: auto;
  }
`;

export default Image;
