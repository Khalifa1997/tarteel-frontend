import React from 'react';
import styled from 'styled-components';
import pluralize from 'pluralize';
import { androidAdd } from 'react-icons-kit/ionicons/androidAdd';
import { injectIntl, InjectedIntl } from 'react-intl';

import Navbar from '../../components/Navbar';
import { connect } from 'react-redux';
import ReduxState, { IRecognition } from '../../types/GlobalState';
import { Link } from 'react-router-dom';
import Icon from 'react-icons-kit';
import KEYS from '../../locale/keys';
import T from '../../components/T';
import logScreen from '../../helpers/logScreen';

interface IRecognitionAyah {
  arabicAyah: string;
  arabicSurahName: string;
  surahNum: number;
  ayahNum: number;
  translationAyah: string;
  translationSurahName: string;
}

interface IStateProps {
  recognition: IRecognition;
}

interface IOwnProps {
  intl: InjectedIntl;
}

type IProps = IStateProps & IOwnProps & IOwnProps;

class RecognitionResults extends React.Component<IProps> {
  componentDidMount() {
    logScreen();
  }
  render() {
    return (
      <Container>
        <Navbar />
        <div className="content">
          <h1 className={'query'}>{this.props.recognition.queryText}</h1>
          <h3 className="count">
            {pluralize(
              this.props.intl.formatMessage({
                id: KEYS.AYAH_RECOGNITION_RESULTS,
              }),
              this.props.recognition.matches.length,
              true
            )}
          </h3>
          <div className="list">
            {this.props.recognition.matches.map(
              (ayah: IRecognitionAyah, i: number) => {
                return (
                  <Ayah
                    {...ayah}
                    key={i}
                    to={`/ayah/${ayah.surahNum}/${ayah.ayahNum}`}
                  >
                    <p>{ayah.arabicSurahName}</p>
                    <p>{ayah.translationSurahName}</p>
                    <div className="surah-index">
                      (<span>{ayah.surahNum}</span>
                      &nbsp;:&nbsp;
                      <span>{ayah.ayahNum}</span>)
                    </div>
                  </Ayah>
                );
              }
            )}
          </div>
          <New to={'/recognition'}>
            <Icon icon={androidAdd} size={25} />
            <p>
              <T id={KEYS.AYAH_RECOGNITION_NEW_SEARCH} />
            </p>
          </New>
        </div>
      </Container>
    );
  }
}

const New = styled(Link)`
  height: 50px;
  padding: 0 1em;
  color: ${props => props.theme.colors.brandPrimary};
  border-radius: 23px;
  box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.25);
  position: fixed;
  right: 15em;
  bottom: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background: #fff;

  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    right: 1em;
  }
`;

const Ayah = styled(Link)`
  background-color: ${props => props.theme.colors.linkColor};
  border-radius: 5px;
  color: #fff;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin: 1em;
  width: 230px;
  box-shadow: 0 4px 15px 0 #ccc;
  position: relative;
  box-sizing: border-box;
  padding: 10px 1em;

  p {
    text-align: left;

    &:nth-child(1) {
      margin-bottom: 10px;
    }
  }

  .surah-index {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const Container = styled.div`
  padding: 1em;
  display: flex;
  flex-flow: column;
  height: 100%;
  box-sizing: border-box;

  .content {
    padding: 1em;
    padding-top: 2em;
    flex: 1;
    display: flex;
    flex-flow: column;
    position: relative;
    box-sizing: border-box;

    .query {
      color: ${props => props.theme.colors.brandPrimary};
      text-align: center;
      margin-top: 20px;
    }
    h3 {
      color: gray;
      text-align: center;
      margin-top: 10px;
    }
    .list {
      margin-top: 2em;
      display: flex;
      flex-wrap: wrap;
    }
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.md}px) {
    .content {
      .list {
        justify-content: center;
      }
    }
  }
`;

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    recognition: state.recognition,
  };
};

export default injectIntl(connect(mapStateToProps)(RecognitionResults));
