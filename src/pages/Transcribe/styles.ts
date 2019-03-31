import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {transform:rotate(0deg);}
  50% {transform:rotate(180deg);}
  100% {transform:rotate(360deg);}
`;

export const Container = styled.div`
         display: flex;
         padding: 1em;
         box-sizing: border-box;
         flex-flow: column;
         height: 100%;
         position: relative;
         text-align: center;

         .not-supported {
           margin-top: 5em;
           color: gray;
         }

         h2 {
           margin-bottom: 25px;
           font-weight: normal;
           font-size: 28px;
         }

         .fullscreen {
           display: flex;
           flex: 1;
           flex-flow: column;
           justify-content: space-around;
           align-items: center;

           a {
             color: ${props => props.theme.colors.linkColor};
           }
           .status {
             color: #848484;
             font-size: 18px;
             max-width: 600px;
           }
           .words {
             span {
               font-size: 24px;
             }
           }
           .mic {
             margin: 0;
             color: #fff;

             .spin {
               svg {
                 animation: 800ms ${spin} infinite;
                 transform-origin: center;
               }
             }
           }
           .iqra {
             position: absolute;
             bottom: 1em;
             right: 0;
           }
         }

         .splittable {
           br {
             display: none;
           }
         }

         .fullscreen-enabled {
           background: white;
           padding: 50px;

           .logo-image {
             display: inherit;
           }
           .ayah-info {
             padding-left: inherit;
           }
         }
         .header-container {
           font-size: 22px;
           width: 100%;
         }
         .header-logo {
           display: inline-block;
           float: left;
           width: 68px;
         }

         .logo-image {
           display: none;
           width: 60px;
         }

         .ayah-info {
           display: inline-block;
           padding-left: 68px;
           padding-top: 17px;
         }
         .surah-name {
         }

         .ayah-number {
           color: #969696;
         }

         .icons-container {
           padding-top: 23px;
           display: inline-block;
           float: right;
         }
         .icon {
           width: 19px;
           float: right;
           filter: brightness(80%);
           cursor: pointer;
           margin-left: 15px;
         }

         .icon:hover {
           filter: brightness(20%);
         }

         .settings-icon {
           width: 21px;
         }

         .ayah-display {
           max-width: 1300px;
           font-size: 36px;
           min-height: 30%;
           display: flex;
           align-items: center;
         }
         .transalations-display {
           max-width: 1300px;
           font-size: 25px;
           min-height: 30%;
           display: flex;
           align-items: center;
         }
         @media screen and (max-width: ${props =>
             props.theme.breakpoints.sm}px) {
           .fullscreen {
             .splittable {
               margin-bottom: 15px;
               br {
                 display: inherit;
                 line-height: 1.6;
               }
             }
             .ayah-info {
               padding-left: 0px;
             }
           }
           .fullscreen-enabled {
             padding: 10px;
             .logo-image {
               display: none;
             }
           }
         }
       `;
