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
}

interface IStateProps {
  canRecord: boolean;
}

interface IDispatchProps {
  setRecognitionResults(result: any): void;
  setUnableToRecord(): void;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class Transcribe extends React.Component<IProps, IState> {
  AudioStreamer: any;
  socket: Socket;

  state = {
    isRecording: false,
    partialQuery: '',
    query: '',
    isLoading: false,
    showErrorMessage: false,
    errorMessage: '',
    fullScreen: false,
    // todo: replace placeholders
    surahNumber: 42,
    surahName: 'Al-Tawbah',
    ayahNumber: 108,
    ayahText: 'Lorem ipsum',
    secondaryText:
      "Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase, and invoke [ Allah 's blessings] upon them. Indeed, your invocations are reassurance for them. And Allah is Hearing and Knowing.",
    tertiaryText: null, // text for the optional third paragraph
  };


  showErrorMessage = (message: JSX.Element) => {
    this.setState({
      showErrorMessage: true,
      errorMessage: message,
    });
  };
  
  handleRecordingError = (e: string) => {
    /** Print the recording error. TODO: Activate modal */
    console.log(e);
  };

  handleData = (data: any) => {
    let interimTranscript = '';
    for (let i = data.resultIndex; i < data.results.length; ++i) {
      // TODO: Is this necessary for transcribe? Set state here
      if (data.results[i].isFinal) {
        interimTranscript = this.state.query + ' ' + data.results[i][0].transcript;
      } else {
        interimTranscript += data.results[i][0].transcript;
      }
    }
    this.setState({
      partialQuery: interimTranscript,
    });
  };

  handleStartRecording = () => {
    this.setState({
      query: '',
      isRecording: true,
    });
    this.AudioStreamer.initRecording(this.handleData, this.handleRecordingError);
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
  upgradeRequired = () => {
    this.props.setUnableToRecord();
  };
  handleOGImage = () => {
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return `/public/og/recognition_${locale}.png`;
  };
  toggleFullscreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen,
    });
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

    const speechServerURL = config('voiceServerURL');
    this.socket = io(speechServerURL);
    // Partial/Final Transcripts from Google (TODO)
    this.socket.on('speechResult', this.handleResults);
    // Returns, surah/ayah number with word (TODO)
    this.socket.on('ayahFound', this.ayahFound);
    // Update the state of read ayahs (TODO)
    this.socket.on('matchFound', this.updateAyah);
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
        {this.state.showErrorMessage && (
          <RecordingError
            message={this.state.errorMessage}
            onClose={() => {
              this.setState({ showErrorMessage: false });
            }}
          />
        )}
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
              <div className="ayah-info">
                <span className="surah-name">Surah {this.state.surahName}</span>{' '}
                <span className="ayah-number">
                  Ayah {this.state.ayahNumber}
                </span>
              </div>
              <div className="icons-container">
                <img
                  className="icon fullscreen-icon"
                  src={this.state.fullScreen ? collapseIcon : expandIcon}
                  onClick={this.toggleFullscreen}
                />
                <img className="icon " src={settingsIcon} />
              </div>
            </div>
            <div className="ayah-display">{this.state.ayahText}</div>
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
