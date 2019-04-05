import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 1em;
  box-sizing: border-box;
  flex-flow: column;
  height: 100%;
  position: relative;
  text-align: center;

  .content {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;

    .ayah {
      .text {
        font-size: 50px;

        > span {
          transition: 0.25s;

          &.active {
            color: ${props => props.theme.colors.brandPrimary};
          }

          .word {
            color: inherit;
          }
        }
      }
    }

    .mic {
      margin: 0;
    }
  }
`;
