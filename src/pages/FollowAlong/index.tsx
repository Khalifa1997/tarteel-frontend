import React from 'react';
import { Icon } from 'react-icons-kit';
import { circleONotch } from 'react-icons-kit/fa/circleONotch';
import { micA } from 'react-icons-kit/ionicons/micA';
import { stop } from 'react-icons-kit/fa/stop';
import classNames from 'classnames';
import io from 'socket.io-client';

import { Container } from './styles';
import Navbar from '../../components/Navbar';
import RecordingButton from '../../components/RecordingButton';
import AudioStreamer from '../../helpers/AudioStreamer'

const testingAyahText = "قل هو الله احد";

interface IProps {

}

interface IState {
  isRecording: boolean;
  isLoading: boolean;
  showErrorMessage: boolean;
}

class FollowAlong extends React.Component<IProps, IState> {
  socket: any;

  state = {
    isLoading: false,
    isRecording: false,
    showErrorMessage: false,
  }
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
    console.log(e);
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
  handleSearch = () => {

  }
  handleStopRecording = () => {
    this.setState({
      isRecording: false,
    });
    this.AudioStreamer.stopRecording();
  };
  setLoading = (isLoading: boolean) => {
    this.setState({
      isLoading,
    });
  };
  componentDidMount() {
    const speechServerURL = __DEVELOPMENT__
      ? 'http://localhost:5000/'
      : 'https://tarteel-voice.now.sh/';

    this.socket = window.socket || io(speechServerURL);

    this.socket.on('loading', this.setLoading);
    this.socket.on('endStream', this.handleStopRecording);

    this.scoekt.emit('setCurrentAyah', testingAyahText);

    this.AudioStreamer = new AudioStreamer(this.socket);
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
        {this.state.showErrorMessage ? (
          <RecordingError
            onClose={() => {
              this.setState({ showErrorMessage: false });
            }}
          />
        ) : null}
        <div className={'ayah'} >
          <div className="text">
            {
              testingAyahText.split(' ')
            }
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
            {
              this.state.isLoading ? (
                <div className={'icon spin'}>
                  <Icon icon={circleONotch} size={20} />
                </div>
              ) : !this.state.isRecording ? (
                <Icon icon={micA} size={30} />
              ) : (
                <Icon icon={stop} size={30} />
              )
            }
          </RecordingButton>
        </div>
      </Container>
    )
  }
}

export default FollowAlong;
