import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from 'react-icons-kit';
import { History } from 'history';
import { circleONotch } from 'react-icons-kit/fa/circleONotch';
import Helmet from 'react-helmet';
import { withCookies } from 'react-cookie';
import { micA } from 'react-icons-kit/ionicons/micA';
import { stop } from 'react-icons-kit/fa/stop';
import { injectIntl, InjectedIntl } from 'react-intl';
import io from 'socket.io-client';

import RecordingButton from '../../components/RecordingButton';
import Navbar from '../../components/Navbar';
import { Container } from './styles';
import { connect } from 'react-redux';
import ReduxState from '../../types/GlobalState';
import { setRecognitionResults } from '../../store/actions/recognition';
import RecordingError from '../../components/RecordingError';
import KEYS from '../../locale/keys';
import T from '../../components/T';
import AudioStreamer from '../../helpers/AudioStreamer';
import config from '../../../config';

interface IOwnProps {
  history: History;
  intl: InjectedIntl;
}

interface IState {
  isRecording: boolean;
  partialQuery: string;
  query: string;
  isLoading: boolean;
  showErrorMessage: boolean;
  errorMessage: JSX.Element;
}

interface IDispatchProps {
  setRecognitionResults(result: any): void;
}

type IProps = IOwnProps & IDispatchProps;

class Recognition extends React.Component<IProps, IState> {
  AudioStreamer: any;
  socket: any;

  state = {
    isRecording: false,
    partialQuery: '',
    query: '',
    isLoading: false,
    showErrorMessage: false,
    errorMessage: '',
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
  handleRecordingError = e => {
    this.setState({
      showErrorMessage: true,
    });
    this.handleStopRecording();
    // console.log(e);
  };
  handleStartRecording = () => {
    // resets the query string with new recordings
    this.setState({
      query: '',
      isRecording: true,
    });

    this.AudioStreamer.initRecording(
      this.handleData,
      this.handleRecordingError
    );
  };
  handleResults = results => {
    if (results.matches.length) {
      this.handleStopRecording();
      this.props.setRecognitionResults(results);
      this.props.history.push('/recognition/results');
      // console.log(results);
    } else {
      this.handleStartRecording();
      this.setState({
        isLoading: false,
      });
    }
  };
  handleStopRecording = () => {
    this.setState({
      isRecording: false,
    });
    this.AudioStreamer.stopRecording();
  };
  handleData = data => {
    let interimTranscript = '';
    if (data.results[0].isFinal) {
      this.handleSearch();
    } else {
      interimTranscript += data.results[0].alternatives[0].transcript;
    }
    this.setState({
      partialQuery: interimTranscript,
    });
  };
  showErrorMessage = (message: JSX.Element) => {
    this.setState({
      showErrorMessage: true,
      errorMessage: message,
    });
  };
  handleSearch = () => {
    this.handleStopRecording();
    this.setState({
      isLoading: true,
    });
  };
  setLoading = (isLoading: boolean) => {
    this.setState({
      isLoading,
    });
  };
  componentDidMount() {
    const speechServerURL = config('voiceServerURL');
    window.socket = io(speechServerURL);
    this.socket = window.socket;

    this.socket.on('foundResults', this.handleResults);
    this.socket.on('loading', this.setLoading);
    this.socket.on('endStream', this.handleStopRecording);

    const options = {
      type: 'recognition',
    };

    this.AudioStreamer = new AudioStreamer(this.socket, options);
  }
  handleOGImage = () => {
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return `/public/og/recognition_${locale}.png`;
  };
  componentWillUnmount() {
    if (this.state.isRecording) {
      this.handleStopRecording();
    }
  }
  render() {
    const classnames = classNames({
      recording: this.state.isRecording,
    });
    const ogTitle = this.props.intl.formatMessage({
      id: KEYS.AYAH_RECOGNITION,
    });
    return (
      <Container>
        <Helmet>
          <title>{ogTitle}</title>
          <meta property={'og:image'} content={this.handleOGImage()} />
          <meta name={'twitter:image'} content={this.handleOGImage()} />
        </Helmet>
        <Navbar />
        <div className={'content'}>
          <div>
            <h2>
              <T id={KEYS.AYAH_RECOGNITION} />
            </h2>
            <p className={'status'}>
              <T id={KEYS.AYAH_RECOGNITION_RECOGNITION_MESSAGE} />
            </p>
          </div>
          <div className="words">
            <span className={'query'}>{this.state.query}</span>
            &nbsp;
            <span className="partial-query">{this.state.partialQuery}</span>
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
          <p className={'splittable'}>
            <T id={KEYS.AYAH_RECOGNITION_IMPROVE_ACCURACY} />
            &nbsp;
            <br />
            <Link to={'/'}>
              <T id={KEYS.AYAH_RECOGNITION_CONTRIBUTE} />
            </Link>
          </p>
          <p className={'iqra'}>
            <T
              id={KEYS.AYAH_RECOGNITION_POWERED_BY}
              values={{ url: 'https://iqraapp.com/' }}
            />
          </p>
        </div>
        {this.state.showErrorMessage ? (
          <RecordingError
            onClose={() => {
              this.setState({ showErrorMessage: false });
            }}
          />
        ) : null}
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    setRecognitionResults: (result: any) => {
      return dispatch(setRecognitionResults(result));
    },
  };
};

export default injectIntl(
  withCookies(
    connect(
      null,
      mapDispatchToProps
    )(Recognition)
  )
);
