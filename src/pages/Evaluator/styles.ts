import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f4f3f2;
  min-height: 100%;
  padding: 16px;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  box-sizing: border-box;
  
  .container {
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: center;
    overflow-y: hidden;
    box-sizing: border-box;

  }

  .pills {
    max-width: 10%;
    margin-top: -25px;

    .inner {
      direction: ltr;
      position: relative;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      margin-top: 0;
      margin-left: auto;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      width: fit-content;
      flex-direction: column;
      -webkit-box-pack: start;
      justify-content: flex-start;

      .pill {
        border-radius: 29px;
        box-sizing: border-box;
        flex-shrink: 0;
        -webkit-box-align: center;
        align-items: center;
        overflow: hidden;
        justify-content: flex-end;
        flex-direction: row;
        -webkit-box-pack: justify;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        display: flex !important;
        height: 40px;
        width: 100%;
        padding: 0 12px;
        margin-left: auto;
        margin-top: 20px;

        svg {
          margin-right: 10px;
        }
        &:nth-child(1) {
          margin-top: 0;
        }
        .num {
          -webkit-box-align: center;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          font-weight: 600;
          display: flex;
          -webkit-box-pack: center;
          font-size: 14px;
        }
        &.pending .num {
          background: #fff;
        }
        &.right .num {
          background-color: #5ec49e;
        }
        &.wrong .num {
          background-color: #ff4f5e;
        }
        &.skipped .num {
          background-color: #959595;
        }
        &.active {
          border: 2px solid #e7e5e2;
          background: #fff;

          .num {
            color: #fff;
            background: #959595;
          }
        }
      }
    }
  }

  .start-text {
    margin: 10px 0 20px 0;

    .title,
    .text {
      text-align: center;
      color: gray;
      font-weight: bold;
      margin-bottom: 10px;
    }
    
    a {
      text-decoration: underline;
      cursor: pointer;
      color: ${props => props.theme.colors.linkColor}
    }
  }
  .cards-and-pills {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
    position: relative;

    .cards {
      flex: 1;
      margin-top: 35px;
      max-width: 100%;

      .instruction {
        display: flex;
        justify-content: center;
        font-style: italic;
        color: #4a4a4a;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 10px;

        .icon {
          color: #78c1a0;
          width: 35px;
          text-align: center;
        }
      }
      .card {
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.05);
        overflow: auto;
        opacity: 1;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
          opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        min-height: 250px;
        margin-bottom: 32px;
        padding: 0 16px;

        .ayah-text {
          direction: rtl;
          word-wrap: break-word;
          min-height: 0;
          margin-top: 0;
          color: black;
          text-align: center;
          display: inline-block;
          font-family: 'UthmanicHafs';
          font-size: 6vmin;
          max-width: 100%;

          span.p3 a {
            font-size: 5vmin;
          }
          .ayah-loader {
            height: 50px;
            display: flex;
            justify-content: center;
          }
          .verse-number {
            font-family: 'Open Sans', sans-serif !important;
          }
        }
      }
    }
  }

  select {
    border: 1px solid #78c2a0;
    width: 150px;
    padding: 2px 5px;
    border-radius: 3px;
    margin: 0 10px;
    line-height: 15px;
  }

  .primary-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .siri-wave {
      position: absolute;
      top: -85px;
      left: 50%;
      bottom: 0;
      right: 0;
      width: 500px;
      transform: translateX(-50%);
      overflow: hidden;

      canvas {
        mask-image: linear-gradient(
          90deg,
          transparent 3%,
          #000,
          transparent 97%
        );
        position: absolute;
        width: 100% !important;
        max-width: 1360px;
        height: 250px !important;
      }
    }
  }

  .starting-wave {
    position: absolute;
    mask-image: linear-gradient(90deg, transparent 3%, #000, transparent 97%);
    width: 100%;
    height: 100px;
  }

  .vote-button {
    border: none;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    z-index: 2;
    background: #fff;
    transition: all .2s linear;
    //width: 130px;
    //height: 57px;
    width: 100px;
    height: 46px;
    cursor: pointer;
    box-shadow: 0 5px 10px rgba(204,204,204,0.3);

    svg {
      margin-right: 23px;
    }

    &.yes {
      box-shadow: 0 5px 10px rgba(89, 203, 183, 0.3);

      &:hover,
      &.active {
        background: #59cbb7;
        box-shadow: 0 5px 10px rgba(89, 203, 183, 0.7);
      }
    }
    &.no {
      box-shadow: 0 5px 10px rgba(255, 79, 94, 0.2);

      &:hover,
      &.active {
        background: #ff4f5e;
        box-shadow: 0 5px 10px rgba(255, 79, 94, 0.6);
      }
    }
    &.skip {
      position: relative;
      left: 15px;
      justify-content: space-evenly;
      
      svg {
        margin: 0;
      }
      &:hover {
        color: initial;
      }
    }
    &.previous {
      position: relative;
      right: 15px;
      justify-content: space-evenly;
      
      svg {
        margin: 0;
      }
      &:hover {
        color: initial;
      }
    }
    &.hidden {
      opacity: 0;
      cursor: normal;
    }
    &:hover,
    &.active {
      color: #fff;
    }
    &:hover svg g g,
    &.active svg g g {
      fill: #fff;
    }
  }

  .primary-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 18px;
    
    .background {
      position: absolute;
      margin: 0 auto;
      border-radius: 50%;
      //width: 109px;
      //height: 109px;
      width: 80px;
      height: 80px;
      filter: blur(7.6px);
      transition: opacity 0.2s linear;
      opacity: 0.5;
      background: -webkit-gradient(
        linear,
        right top,
        left top,
        from(#88d1f1),
        to(#b1b5e5)
      );
      background: linear-gradient(270deg, #88d1f1, #b1b5e5);
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      border: none;
      border-radius: 50%;
      //width: 88px;
      //height: 88px;
      width: 65px;
      height: 65px;
      background: #fff;

      &:hover {
        opacity: 1;
      }
    }

    &.play svg {
      height: 22px;
    }
    &:hover .background {
      opacity: 1 !important;
    }
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    padding: 0 10px;

    .cards-and-pills {
      flex-flow: column;
      padding: 0;

      .instruction {
        font-size: 12px;
      }
    }

    .pills {
      max-width: initial;
      align-items: center;
      display: flex;
      justify-content: center;
      position: relative;
      flex: none;
      margin-top: 0;
      .inner {
        flex-flow: row;
        margin-left: initial;

        .pill {
          width: initial;

          svg {
            display: none;
          }
          &.active {
            border: 0;
            background: transparent;

            .num {
              background-color: #5386f7;
            }
          }
          &:nth-child(1) {
            margin-top: 20px;
          }
        }
      }
    }

    .cards {
      max-width: 100% !important;
      margin-top: 16px;

      .card {
        min-height: 200px;

        .ayah-text {
          font-size: 18px;
        }
      }
    }

    .text {
      font-size: 14px;
    }
    .primary-buttons {

      .siri-wave {
        top: -90px !important;
        width: 90% !important;
        overflow: hidden;
      }
    }
    
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding-bottom: 50px;

    .start-text {
      .title {
        font-size: 22px;
      }
      .text {
        font-weight: normal;
      }
    }

    .card {
      min-height: 175px;
      .ayah-text {
        font-size: 16px;
      }
    }

    .pill {
      padding: 0 !important;
      margin: 0 10px !important;
      height: 35px;

      &.active {
        .contents {
          display: none;
        }
      }
    }
    
    .primary-button {
      margin: 0 12px;
     
      .background {
        width: 75px;
        height: 75px;
      }
    }
    .vote-button {
      height: 50px;
      width : 50px !important;
     
     /*  Reversing the styles to remove the left over hover effect on mobile.  */
      &.yes {
        box-shadow: 0 5px 10px rgba(89,203,183,.3);
        
        &:hover, &.active {
          background: #fff;
          box-shadow: 0 5px 10px rgba(89,203,183,.3);
          color: #000;
        }
      }
      
      &.no {
        box-shadow: 0 5px 10px rgba(255,79,94,.2);
        
        &:hover, &.active {
          background: #fff;
          box-shadow: 0 5px 10px rgba(255,79,94,.2);
          color: #000;
        }
      }
      
      /* Replacing the :hover pseudo class with :active to be suitable for mobile.  */
      &.yes {
        box-shadow: 0 5px 10px rgba(89,203,183,.3);
        
        &:active, &.active {
          background: #59cbb7;
          box-shadow: 0 5px 10px rgba(89,203,183,.7);
        }
      }
      &.no {
        box-shadow: 0 5px 10px rgba(255,79,94,.2);
        
        &:active, &.active {
          background: #ff4f5e;
          box-shadow: 0 5px 10px rgba(255,79,94,.6);
        }
      }
      
      &.skip {
        left: 8px;
      }
      &.previous {
        right: 8px;
      }
      
      svg {
        margin: 0;
      }
      
      span {
        display: none;
      }
    }
  }       
  
`;

const VoteButton = styled.button``;

export const ModalContent = styled.div`
  text-align: center !important;

  .modal-title {
    color: #59b548;
  }
  img {
    margin: 10px 0;
    width: 100px;
  }
  p {
    line-height: 25px;
  }
  a {
    color: #59b548;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {
    img {
      width: 75px;
    }
  }
`;

export const HelpModalContent = styled.div`
  flex: 1;
  position: absolute;
  overflow-y: scroll;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 50px;
  
  .content {
    margin-top: 25px;
    height: 100%; 
  }
  .modal-title {
    color: #59b548;
    margin-bottom: 15px;
  }
  ul {
    padding-left: 25px;
  }
  h4 {
    margin-bottom: 15px;  
  }
  p {
    line-height: 25px;
  }
  a {
    color: #59b548;
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    padding: 20px;
    
    .modal-title {
      font-size: 18px;
    }
    
    ul {
      padding-left: 5px;
    }
  }
`;


