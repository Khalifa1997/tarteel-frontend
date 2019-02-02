import React from 'react';
import styled from "styled-components";

interface IProps {
  message: string;
}

const FormErrorMessage: React.SFC<IProps> = (props) => {
  return (
    <Container>
      <p>
        {
          props.message
        }
      </p>
    </Container>
  )
}

const Container = styled.div`
  margin: 10px 0;
  p {
    color: ${props => props.theme.colors.errorColor}
  }
`;

export default FormErrorMessage;
