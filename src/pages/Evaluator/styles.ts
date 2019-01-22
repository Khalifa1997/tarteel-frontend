import styled from "styled-components"

export const Container = styled.div`
  background-color: #F4F3F2;
  min-height: 100%;
  padding: 1em 3em;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  
  .pills {
    flex: 1;
    max-width: 20%;
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
        display: flex!important;
        height: 57px;
        width: 100%;
        padding: 0 12px;
        margin-left: auto;
        margin-top: 20px;
        
        svg {
          margin: 0 23px;
        }
        &:nth-child(1) {
          margin-top: 0;
        }
        .num {
          -webkit-box-align: center;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-weight: 600;
          display: flex;
          -webkit-box-pack: center;
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
    margin: 10px 0;
    
    .title, .text {
      text-align: center;
      color: gray;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  .cards-and-pills {
    display: flex;
    flex-flow: row;
    padding: 0 1em;
    justify-content: flex-end;
    
    .cards {
      flex: 2;
      max-width: 60%;
      margin-top: 3em;
      
      .instruction {
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
        font-style: italic;
        color: #4a4a4a;
        
        .icon {
          color: #78C1A0;
          width: 35px;
          text-align: center;
        }
      }
      .card {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 6px 12px 0 rgba(0,0,0,.05);
        overflow: auto;
        opacity: 1;
        transition: transform .5s cubic-bezier(.4,0,.2,1),opacity .5s cubic-bezier(.4,0,.2,1);
        min-height: 250px;
        margin-bottom: 2em;
        padding: 0 1em;
        
        .ayah-text {
          direction: rtl;
          word-wrap: break-word;
          min-height: 0;
          margin-top: 0;
          color: black;
          text-align: center;
          
          p {
            display: inline-block;
            direction: rtl;
            font-family: 'UthmanicHafs';
            font-size: 6vmin;
          }
          
          .verse-number {
            font-family: "Open Sans", sans-serif !important;
          }
        }
      }
    }
  }
  
  select {
    border: 1px solid #78C2A0;
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
    margin-top: 1em;
    margin-bottom: 3em;
    position: relative;
    
    .siri-wave {
      position: absolute;
      top: -75px;
      left: 50%;
      bottom: 0;
      right: 0;
      width: 500px;
      transform: translateX(-50%);
      
      canvas {
        mask-image: linear-gradient(90deg,transparent 3%,#000,transparent 97%);
        position: absolute;
        width: 100%!important;
        max-width: 1360px;
        height: 250px !important;
      }
    }
  }
  
  .starting-wave {
    position: absolute;
    mask-image: linear-gradient(90deg,transparent 3%,#000,transparent 97%);
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
    width: 130px;
    height: 57px;
    cursor: pointer;
    
    svg {
      margin-right: 23px;
    }
    
    &.yes {
      box-shadow: 0 5px 10px rgba(89,203,183,.3);
      
      &:hover, &.active {
        background: #59cbb7;
        box-shadow: 0 5px 10px rgba(89,203,183,.7);
      }
    }
    &.no {
      box-shadow: 0 5px 10px rgba(255,79,94,.2);
      
      &:hover, &.active {
        background: #ff4f5e;
        box-shadow: 0 5px 10px rgba(255,79,94,.6);
      }
    }
    &:hover, &.active {
      color: #fff;
    }
    &:hover svg g g, &.active svg g g {
      fill: #fff
    }
  }
  
  
  
  .primary-button {
    margin: 0 40px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .background {
      position: absolute;
      margin: 0 auto;
      border-radius: 50%;
      width: 109px;
      height: 109px;
      filter: blur(7.6px);
      transition: opacity .2s linear;
      opacity: .5;
      background: -webkit-gradient(linear,right top,left top,from(#88d1f1),to(#b1b5e5));
      background: linear-gradient(270deg,#88d1f1,#b1b5e5);
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      border: none;
      border-radius: 50%;
      width: 88px;
      height: 88px;
      background: #fff;
      
      &:hover {
        opacity: 1;
      }
    }
    
    &.play svg {
      height: 22px;
    }
    &:hover .background {
      opacity: 1!important;
    }
  }

  .skip {
    border: 2px solid lightgrey;
    color: black;
    transition: 0.25s linear;
    border-radius: 50px;
    display: flex;
    flex-flow: row;
    text-align: center;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: absolute;
    bottom: 25px;
    right: 50px;
    height: 45px;
    width: 100px;
    
    svg {
      margin-left: 13px;
      margin-right: 0;
    }
  }
  .back-to-home {
    border: 2px solid lightgrey;
    color: black;
    transition: 0.25s linear;
    border-radius: 50px;
    display: flex;
    flex-flow: row-reverse;
    text-align: center;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: absolute;
    bottom: 25px;
    left: 50px;
    text-decoration: none;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    height: 45px;
    width: 100px;
    
    
    svg {
      margin-right: 5px;
    }
  }

  .skip:hover, .back-to-home:hover {
    border: 2px solid #000;
    color: #000;
  }
  .skip:hover svg g g, .back-to-home:hover svg g g {
    fill: #000;
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
              background-color: #5386F7;
            }
          }
          &:nth-child(1) {
            padding-top: 20px;
          }
          
        }
          
      }
    }
    
    .cards {
      max-width: 100% !important;
      margin-top: 1em;
      
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
      margin-bottom: 10%;
      
      .siri-wave {
        top: -90px !important;
        width: 90% !important;
        overflow: hidden;
      }
    }
    .skip {
      bottom: 10px;
      right: 20px;
      height: 35px !important;
      width: 85px !important;
      font-size: 14px;
    }
    .back-to-home {
      bottom: 10px;
      left: 20px;
      height: 35px !important;
      width: 85px !important;
      font-size: 14px;
    }
    .skip svg {
      margin-left: 0;
    }
    .back-to-home svg {
      margin-right: 0;
    }
    .vote-button {
      width: 100px;
      height: 46px;
    }
    .primary-button {
      margin: 0 18px;
      button {
        width: 65px;
        height: 65px;
      }
      .background {
        width: 80px;
        height: 80px;
      }
    }
    
    
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.sm }px) {
    padding-bottom: 3em;
    
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
          display: none
        }
      }
    }
  }       
  
`


const VoteButton = styled.button`

`


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
    color: #59b548
  }
  @media screen and (max-width: ${props => props.theme.breakpoints.md}) {    
    img {
      width: 75px;
    }
  }
`;
