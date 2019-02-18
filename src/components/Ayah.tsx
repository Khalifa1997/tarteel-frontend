import classNames from 'classnames'
import React from "react";
import ContentLoader from "react-content-loader";
import {Link} from "react-router-dom";
import styled from "styled-components";

import KEYS from "../locale/keys";
import AyahShape from "../shapes/AyahShape";
import WordShape from "../shapes/WordShape";
import {WORD_TYPES} from "../types";
import T from "./T";
import ShareModal from '../components/ShareModal';

import * as shareIcon from '../../public/share-icon.png'
import {withCookies} from "react-cookie";

interface IProps {
  ayah: AyahShape;
  isFetchingAyah: boolean;
}

interface IState {
  showTranslit: boolean;
  showShareModal: boolean;
}

class Ayah extends React.Component<IProps, IState> {
  state = {
    showTranslit: false,
    showShareModal: false,
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
      <em>
        <T id={KEYS.AYAH_COMPONENT_LOADING_MESSAGE} />
      </em>
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
  handleShareAyah = () => {
    this.setState({
      showShareModal: true,
    })
  }
  render() {
    const {ayah, isFetchingAyah} = this.props;
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return (
      <Container>
        <div id="ayah-text">
          {
            isFetchingAyah || !ayah.textSimple ? this.renderAyahLoader() : this.renderAyah()
          }
        </div>
        <div className="ayah-data">
          <div className="ayah-translit">
            <p className="translit-button" onClick={this.toggleTranslit}>
              {
                this.state.showTranslit ? "Hide" : "Show"
              } <T id={KEYS.AYAH_COMPONENT_TRANSLITERATION} />
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
          <div className={'ayah-loc-container'}>
            <div className="ayah-loc">
              ({ ayah.chapterId } : {ayah.verseNumber})
            </div>
            <a className="share" onClick={this.handleShareAyah}>
              <img src={shareIcon} alt="share icon" />
            </a>
          </div>
          <Link to={`/surah/${ayah.chapterId}`} className={'change-ayah'}>
            <T id={KEYS.CHANGE_AYAH_TEXT} />
          </Link>
        </div>
        <ShareModal
          show={this.state.showShareModal}
          quote={``}
          url={`https://tarteel.io/ayah/${ayah.chapterId}/${ayah.verseNumber}${locale === 'ar' ? '/?lang=ar' : ''}`}
          handleCloseModal={() => {
            this.setState({ showShareModal: false });
          }}
        />
      </Container>
    )
  }
}

const Container = styled.div`
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  z-index: 5;
  position: relative;
  max-width: 750px;
  margin: auto;
  flex: 1;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;

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
    height: 50px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .translit-button {
      cursor: pointer;
      color: ${props => props.theme.colors.textColor};
    }
  }
  .ayah-loc-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 14px;

    .share {
      position: relative;
      right: -10px;
      cursor: pointer;
    }
    .ayah-loc {
      color: #9fa1a8;
      font-size: 18px;
      transition: 0.2s;
    }
  }
    .change-ayah {
      cursor: pointer;
      display: inline-block;
      span {
        color: #9fa1a8;
        font-size: 16px;
        transition: 0.2s;
      }

      &:hover span {
        color: #5ec49e;
      }
    }


  @media screen and (max-height: ${props => props.theme.breakpoints.sm}px) {
    .ayah-translit {
      .translit-button {
        font-size: 14px;
      }
    }
    .ayah-loc {
      font-size: 16px;
    }
    .change-ayah {
      span {
        font-size: 14px;
      }
    }
  }
`

export default withCookies(Ayah);
