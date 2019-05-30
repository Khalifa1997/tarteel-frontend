import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from 'react-icons-kit';
import { History } from 'history';
import { circleONotch } from 'react-icons-kit/fa/circleONotch';
import { withCookies } from 'react-cookie';
import { micA } from 'react-icons-kit/ionicons/micA';
import { stop } from 'react-icons-kit/fa/stop';
import { injectIntl, InjectedIntl } from 'react-intl';
import io from 'socket.io-client';

import RecordingButton from '../../components/RecordingButton';
import Navbar from '../../components/Navbar';
import { Container } from './styles';
import { connect } from 'react-redux';
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
  };
  handleStartRecording = () => {
    // resets the query string with new recordings
    this.setState({
      query: '',
      isRecording: true,
    });

    this.AudioStreamer.initRecording(
      this.handleData,
      this.handleRecordingError,
    );
  };
  handleResults = results => {
    if (results.matches.length) {
      this.handleStopRecording();
      this.props.setRecognitionResults(results);
      this.props.history.push('/recognition/results');
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

  componentWillUnmount() {
    if (this.state.isRecording) {
      this.handleStopRecording();
    }
  }
  render() {
    const classnames = classNames({
      recording: this.state.isRecording,
    });
    return (
      <Container>
        <Navbar />
        <div className={'content'}>
          <div>
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
            <Link to={'/contribute'}>
              <T id={KEYS.AYAH_RECOGNITION_CONTRIBUTE} />
            </Link>
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
