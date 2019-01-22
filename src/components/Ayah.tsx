import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import classNames from 'classnames'
import ContentLoader from "react-content-loader";

import T from "./T";
import KEYS from "../locale/keys";
import {WORD_TYPES} from "../types";
import WordShape from "../shapes/WordShape";
import AyahShape from "../shapes/AyahShape";

interface IProps {
  ayah: AyahShape;
  isFetchingAyah: boolean;
}

interface IState {
  showTranslit: boolean;
}

class Ayah extends React.Component<IProps, IState> {
  state = {
    showTranslit: false,
  }
  toggleTranslit = () => {
    this.setState((state, props) => {
      return {
        showTranslit: !state.showTranslit,
      }
    });
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps.ayah.verseNumber !== this.props.ayah.verseNumber) {
      this.setState({
        showTranslit: false,
      });
    }
  }
  renderTransliteration = () => {
    if (this.props.ayah.translations) {
      return this.props.ayah.translations
        .filter((trans) => {
          return trans.resourceName === 'Transliteration'
        })[0].text
    }
  }
  renderAyah = () => {
    return (
      this.props.ayah.words.map(((word: WordShape) => {
        const className = classNames({
          [word.className]: true,
          [word.charType]: true,
        })
        return (
          <span>
            <a
              className={className}
              dangerouslySetInnerHTML={{ __html: word.code }}
            />
            {word.charType === WORD_TYPES.CHAR_TYPE_WORD && (
              <small style={{ letterSpacing: -15 }}>&nbsp;</small>
            )}
          </span>
        )
      }))
      ||
      <em>Loading ayah... (if an ayah does not show up, try clicking "next ayah")</em>
    )
  }
  renderAyahLoader = () => {
    return (
      <ContentLoader height={42}>
        {/* Pure SVG */}
        <rect x="80" y="10" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
    )
  }
  render() {
    const {ayah, isFetchingAyah} = this.props;
    return (
      <Container>
        <div id="ayah-text">
          {
            isFetchingAyah || !ayah.textSimple ? this.renderAyahLoader() : this.renderAyah()
          }
        </div>
        <div className="ayah-translit">
          <p className="translit-button" onClick={this.toggleTranslit}>
            {
              this.state.showTranslit ? "Hide" : "Show"
            } Transliteration
          </p>
          {
            this.state.showTranslit ?
              <p className="translit" >
                {
                  this.renderTransliteration()
                }
              </p>
              :
              null
          }
        </div>
        <Link to={`/surah/${ayah.chapterId}`} className="change-ayah-container">
          <div id="ayah-loc">
            ({ ayah.chapterId } : {ayah.verseNumber})
          </div>
          <span className="change-ayah">
            <T id={KEYS.CHANGE_AYAH_TEXT}/>
          </span>
        </Link>
      </Container>
    )
  }
}

const Container = styled.div`
  text-align: center;
  padding: 10px;
  z-index: 5;
  position: relative;
  max-width: 750px;
  margin: auto;
  
  #ayah-text {
    //margin-top: 20px;
    direction: rtl !important;
    font-family: 'UthmanicHafs';
    font-size: 5.5vmin;
    color: black;
    min-height: 180px;
    
    .word {
      display: inline-block;
      span {
        -webkit-font-smoothing: antialiased;
      }
    }
  }
  .ayah-translit {
    margin-top: 30px;
    height: 50px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .translit-button {
      cursor: pointer;
      color: ${props => props.theme.colors.textColor};
    }
  }
  .change-ayah-container {
    cursor: pointer;
    display: inline-block;
    
    #ayah-loc {
      margin-top: 14px;
      color: #9fa1a8;
      font-size: 18px;
      transition: 0.2s;
    }
    .change-ayah {
      color: #9fa1a8;
      font-size: 16px;
      transition: 0.2s;
    }
    &:hover .change-ayah {
      color: #5ec49e;
    }
    
  }
  
  @media screen and (max-height: ${props => props.theme.breakpoints.sm}px) { 
    .ayah-translit {
      .translit-button {
        font-size: 14px;
      }
    }
    .change-ayah-container {
      #ayah-loc {
        font-size: 16px;
      }
      .change-ayah {
        font-size: 14px;
      }
    }

  }   
`

export default Ayah;
