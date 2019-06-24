import React from 'react';
import classNames from 'classnames';
import { Icon } from 'react-icons-kit';
import { History } from 'history';
import { circleONotch } from 'react-icons-kit/fa/circleONotch';
import Helmet from 'react-helmet';
import { withCookies } from 'react-cookie';
import { micA } from 'react-icons-kit/ionicons/micA';
import { stop } from 'react-icons-kit/fa/stop';
import { injectIntl, InjectedIntl } from 'react-intl';

import AudioStreamer from '../../helpers/AudioStreamer';
import Ayah from '../../components/Ayah';
import RecordingButton from '../../components/RecordingButton';
import Navbar from '../../components/Navbar';
import { Container } from './styles';
import { connect } from 'react-redux';
import ReduxState from '../../types/GlobalState';
import { setRecognitionResults } from '../../store/actions/recognition';
import config from '../../../config';
import RecordingError from '../../components/RecordingError';
import KEYS from '../../locale/keys';
import T from '../../components/T';
import expandIcon from '../../../public/images/icons/svg/expand.svg';
import collapseIcon from '../../../public/images/icons/svg/collapse.svg';
import settingsIcon from '../../../public/images/icons/svg/settings.svg';
import Fullscreen from 'react-full-screen';
import LogoImage from '../../../public/logo-3x.png';
import io from "socket.io-client";
import Socket = SocketIOClient.Socket;
import IAyahShape from "../../shapes/IAyahShape";
import {LOAD_NEXT_AYAH_STARTED} from "../../types/actions";

interface IOwnProps {
  history: History;
  intl: InjectedIntl;
  voiceServer: string;
}

interface IState {
  isRecording: boolean;
  partialQuery: string;
  query: string;
  isLoading: boolean;
  showErrorMessage: boolean;
  errorMessage: JSX.Element;
  fullScreen: boolean;
  currentAyah: IAyahShape;
  previousAyahs: IAyahShape[];
  ayahFound: boolean;
  // TODO: Update to remove these
  surahNumber: number;
  surahName: string;
  ayahNumber: number;
  ayahText: string;
  secondaryText: string;
  tertiaryText: string;
}

interface IStateProps {
  canRecord: boolean;
}

interface IDispatchProps {
  setRecognitionResults(result: any): void;
  setUnableToRecord(): void;
}

interface ISpeechResult {
  text: string,
  isFinal: boolean
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class Transcribe extends React.Component<IProps, IState> {
  AudioStreamer: any;
  socket: Socket;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isRecording: false,
      partialQuery: '',
      query: '',
      isLoading: false,
      showErrorMessage: false,
      errorMessage: React.createElement("div"),
      fullScreen: false,
      currentAyah: undefined,
      previousAyahs: [],
      ayahFound: false,

      // todo: replace placeholders
      surahNumber: 42,
      surahName: 'Al-Tawbah',
      ayahNumber: 108,
      ayahText: 'Lorem ipsum',
      secondaryText:
        "Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase, and invoke [ Allah 's blessings] upon them. Indeed, your invocations are reassurance for them. And Allah is Hearing and Knowing.",
      tertiaryText: '', // text for the optional third paragraph
    };
  }

  showErrorMessage = (message: JSX.Element) => {
    /** Activate the modal displaying the error message. */
    this.setState({
      showErrorMessage: true,
      errorMessage: message,
    });
  };

  toggleFullscreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen,
    });
  };

  upgradeRequired = () => {
    this.props.setUnableToRecord();
  };

  handleRecordingError = (e: JSX.Element) => {
    /** Print the recording error. TODO: Activate modal */
    return e;
  };

  handleStartRecording = () => {
    this.setState({
      query: '',
      isRecording: true,
    });
    this.AudioStreamer.initRecording(this.handleResult, this.handleRecordingError);
  };

  handleStopRecording = () => {
    this.AudioStreamer.stopRecording();
    this.setState({
      isRecording: false,
    });
  };

  handleRecordingButton = () => {
    if (this.state.isLoading) {
      return;
    } else if (this.state.isRecording) {
      this.handleStopRecording();
    } else {
      this.handleStartRecording();
    }
  };

  handleRecognitionError = (event: any) => {
    this.handleStopRecording();
    const errorLink = '//support.google.com/websearch/answer/2940021';
    const chromeLink = '//support.google.com/chrome/answer/2693767';
    if (event.error === 'no-speech') {
      this.showErrorMessage(
        <p>
          <T
            id={KEYS.AYAH_RECOGNITION_NO_SPEECH_ERROR}
            values={{ errorLink }}
          />
        </p>,
      );
    } else if (event.error === 'audio-capture') {
      this.showErrorMessage(
        <p>
          <T
            id={KEYS.AYAH_RECOGNITION_AUDIO_CAPTURE_ERROR}
            values={{ errorLink }}
          />
        </p>,
      );
    } else if (event.error === 'not-allowed') {
      this.showErrorMessage(
        <p>
          <T
            id={KEYS.AYAH_RECOGNITION_MIC_PERMISSION_ERROR}
            values={{ chromeLink }}
          />
        </p>,
      );
    }
  };

  handleOGImage = () => {
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return `/public/og/recognition_${locale}.png`;
  };

  handleMatchFound = (surahNumber: number, ayahNumber: number, wordCount: number) => {
    /** Update the displayed sentence with the max number of words found. */
    this.setState({ayahFound: true});
    let sentence: string = '';
    for (let i: number = 0; i < wordCount; i++ ) {
      sentence += ' ' + this.state.currentAyah.words[i].textMadani;
    }
    this.setState({partialQuery: sentence})
  };

  handleAyahFound = (ayah: IAyahShape) => {
    this.setState({currentAyah: ayah});
  };

  handleResult = (result: ISpeechResult) => {
    /**
     * Updates the state of the string displayed on the page as data comes in from the GCloud backend.
     * Only displays if no ayah is found.
     * @param data - Any type (JSON Response from Google).
     */
    if (!this.state.ayahFound) {
      const interimTranscript = this.state.partialQuery + ' ' + result.text;
      this.setState({partialQuery: interimTranscript});
    }
  };

  componentDidMount() {
    /** Setup sockets and audio streamer. */
    this.setState({
      query: '',
    });

    // remove?
    if (!Boolean(window.webkitSpeechRecognition)) {
      this.upgradeRequired();
    }

    // TODO: Update speech server URL
    // const speechServerURL = config('voiceServerURL');
    const speechServerURL = 'localhost:5000';
    this.socket = io(speechServerURL);
    // Partial/Final Transcripts from Google
    this.socket.on('speechResult', this.handleResult);
    // Returns, surah/ayah number with word
    this.socket.on('ayahFound', this.handleAyahFound);
    // Update the state of read ayahs
    this.socket.on('matchFound', this.handleMatchFound);
    this.socket.on('streamError', this.handleRecognitionError);
    this.socket.on('endStream', this.handleStopRecording);

    const options = {
      type: 'recognition',
    };

    this.AudioStreamer = new AudioStreamer(this.socket, options);
  }
  componentWillUnmount() {
    this.handleStopRecording();
  }

  renderFinishedAyahs = () => {
    return this.state.previousAyahs.map((currAyah: IAyahShape, index: number) => {
      return <Ayah ayah={currAyah} isFetchingAyah={false} key={index} />
    });
  };

  render() {
    const classnames = classNames({
      recording: this.state.isRecording,
    });
    const ogTitle = this.props.intl.formatMessage({
      id: KEYS.TRANSCRIBE,
    });
    return (
      <Container>
        <Helmet>
          <title>{ogTitle}</title>
          <meta property={'og:image'} content={this.handleOGImage()} />
          <meta name={'twitter:image'} content={this.handleOGImage()} />
        </Helmet>
        <Navbar />

        {/* Show error message modal. */}
        {this.state.showErrorMessage && (
          <RecordingError
            message={this.state.errorMessage}
            onClose={() => {
              this.setState({ showErrorMessage: false });
            }}
          />
        )}

        {/* Display errors if system can't record. */}
        {!this.props.canRecord ? (
          <h3 className={'not-supported'}>
            <T id={KEYS.AYAH_RECOGNITION_UPDATE_REQUIRED} />
          </h3>
        ) : (
          <Fullscreen
            enabled={this.state.fullScreen}
            onChange={fullScreen => this.setState({ fullScreen })}
          >
            <div className="header-container">
              <div className="header-logo">
                <img
                  className="logo-image"
                  src={LogoImage}
                  alt="Tarteel-logo"
                />
              </div>

                {this.state.currentAyah ? (
                  <div className="ayah-info">
                    <span className="surah-name">Surah {this.state.currentAyah.chapterId} </span>
                    <span className="ayah-number">Ayah {this.state.currentAyah.verseNumber} </span>
                  </div>
                ) : (
                  <div className="ayah-info">
                    Waiting for input...
                  </div>
                )}

              <div className="icons-container">
                <img
                  className="icon fullscreen-icon"
                  src={this.state.fullScreen ? collapseIcon : expandIcon}
                  onClick={this.toggleFullscreen}
                />
                <img className="icon " src={settingsIcon} />
              </div>
            </div>

            <div className="finished-ayahs">{this.renderFinishedAyahs()}</div>
            <div className="ayah-display">{this.state.partialQuery}</div>

            <div className="transalations-display">
              {this.state.secondaryText}
            </div>
            <RecordingButton
              className={`mic ${classnames}`}
              onClick={this.handleRecordingButton}
            >
              {this.state.isLoading ? (
                <div className={'icon spin'}>
                  <Icon icon={circleONotch} size={20} />
                </div>
              ) : !this.state.isRecording ? (
                <Icon icon={micA} size={30} />
              ) : (
                <Icon icon={stop} size={30} />
              )}
            </RecordingButton>
            <div>
              <a className="donate-link" href="https://tarteel.io/donate">tarteel.io/donate</a>
            </div>
          </Fullscreen>
        )}
      </Container>
    );
  }
}


const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    canRecord: state.recognition.canRecord,
  };
};

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    setRecognitionResults: (result: any) => {
      return dispatch(setRecognitionResults(result));
    },
    setUnableToRecord: () => {
      return dispatch(setUnableToRecord());
    },
  };
};

export default injectIntl(
  withCookies(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Transcribe),
  ),
);
