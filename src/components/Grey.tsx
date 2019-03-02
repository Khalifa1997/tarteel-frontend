import styled from 'styled-components';

const Grey = styled.div`
  -webkit-filter: grayscale(${props => (props.grey ? 100 : 0)}%);
  filter: grayscale(${props => (props.grey ? 100 : 0)}%);
  &:hover {
    -webkit-filter: grayscale(0%);
    filter: grayscale(0%);
  }
`;

export default Grey;
