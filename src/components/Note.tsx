import React from 'react';
import styled from 'styled-components';

import T from './T';

interface IProps {
  fontSize: number;
  message: string;
  align: string;
  grey: any;
}

const Note = (props: IProps) => {
  const { fontSize, message, align, grey } = props;
  return (
    <NoteContainer fontSize={fontSize} align={align} grey={grey}>
      <p>
        <T id={message} />
      </p>
    </NoteContainer>
  );
};

const NoteContainer = styled.div`
  text-align: ${props => props.align};
  color: ${props =>
    props.grey ? props.theme.colors.gray : props.theme.colors.black};
  font-size: ${props => (props.fontSize ? props.fontSize : '10')}px;
`;

export default Note;
