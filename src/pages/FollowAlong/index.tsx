import React from 'react';
import { Icon } from 'react-icons-kit';
import { circleONotch } from 'react-icons-kit/fa/circleONotch';
import { micA } from 'react-icons-kit/ionicons/micA';
import { stop } from 'react-icons-kit/fa/stop';

import { Container } from './styles';
import Navbar from '../../components/Navbar';
import RecordingButton from '../../components/RecordingButton';

const testingAyahText = "قل هو الله احد";

interface IProps {

}

interface IState {
  isRecording: boolean;
  isLoading: boolean;
}

class FollowAlong extends React.Component<IProps, IState> {
  socket: any;

  state = {
    isLoading: false,
    isRecording: false,
  }
  setLoading = (isLoading: boolean) => {
    this.setState({
      isLoading,
    });
  };
  componentDidMount() {
    const speechServerURL = __DEVELOPMENT__
      ? 'http://localhost:5000/'
      : 'https://tarteel-voice.now.sh/';

    if (window.socket) {
      this.socket = window.socket;
    } else {
      this.socket = io(speechServerURL);
    }

    this.socket.on('loading', this.setLoading);
    this.socket.on('endStream', this.handleStopRecording);

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
        <div className={'ayah'} >
          <div className="text">
            {
              testingAyahText.split(' ')
            }
          </div>
          <RecordingButton>
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
