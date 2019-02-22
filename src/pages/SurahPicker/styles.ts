import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  padding: 1em;
  height: 100%;
  overflow-y: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  .content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    flex: 1;
    width: 100%;
    top: 1em;

    .title {
      margin-bottom: 1em;
    }
    .search-box {
      margin-bottom: 1em;

      input {
        border-radius: 3px;
        border: 1px solid lightgray;
        padding: 10px;
        width: 300px;
        font-size: 14px;
        transition: 0.25s;
        text-align: center;

        &:hover,
        &:focus {
          border: 1px solid ${props => props.theme.colors.linkColor};
        }
      }
    }
    .list {
      width: 75%;
      overflow-y: scroll;
      flex: 1;

      .list-item {
        color: #485364;
        font-size: 16pt;
        padding: 1em;
        line-height: 35px;
        transition: 0.25s;
        cursor: pointer;
        display: flex;
        flex-flow: row-reverse;
        flex: 1;
        direction: rtl;

        p {
          font-size: 11pt;
          font-weight: 500;
          direction: ltr;
        }

        .text {
          flex: 1;
          text-align: center;
          display: flex;
          justify-content: space-between;
          flex-flow: row-reverse;
          padding: 0 1em;
          color: ${props => props.theme.colors.linkColor};

          p:not(.arabic) {
            width: 50%;
            text-align: left;
          }

          .arabic {
            font-family: 'surah_names' !important;
            speak: none;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            font-size: 25px;
            float: right;
            direction: rtl;

            /* Better Font Rendering =========== */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: #5fc49e;
          }
        }

        &:hover,
        &.active {
          background: #f1f1f1;
          color: ${props => props.theme.colors.linkColor};
        }
      }
    }
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    .content {
      .list {
        width: 85%;
      }

      .search-box {
        display: block;
        margin: 0 1em 1em 1em;
        width: 100%;

        input {
          display: block;
          margin: auto;
          width: 90%;
        }
      }
    }
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em 5px;

    .content {
      .list {
        width: 100%;

        .list-item {
          font-size: 18px;

          .text {
            p:not(.arabic) {
              width: 70%;
              text-align: left;
            }
          }
        }
      }
    }
  }
`;
