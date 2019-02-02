import React from 'react';
import {Link} from "react-router-dom";
import classNames from 'classnames';
import {Icon} from "react-icons-kit";
import {History} from "history";
import {circleONotch} from 'react-icons-kit/fa/circleONotch'
import Helmet from "react-helmet";
import {withCookies} from "react-cookie";
import {micA} from 'react-icons-kit/ionicons/micA'
import {stop} from 'react-icons-kit/fa/stop'

import RecordingButton from '../../components/RecordingButton';
import Navbar from "../../components/Navbar";
import {Container} from "./styles";
import {connect} from "react-redux";
import ReduxState from "../../types/GlobalState";
import {setRecognitionResults, setUnableToRecord} from "../../store/actions/recognition";
import config from '../../../config'

const cdnURL = config('cdnURL');

interface IOwnProps {
  history: History;
}

interface IState {
  isRecording: boolean;
  partialQuery: string;
  query: string;
  isLoading: boolean;
  recognitionMessage: string;
}

interface IStateProps {
  canRecord: boolean;
}

interface IDispatchProps {
  setRecognitionResults(result: any): void;
  setUnableToRecord(): void;
}

type IProps = IOwnProps & IDispatchProps & IStateProps

class Recognition extends React.Component<IProps, IState> {
  recognition: SpeechRecognition;

  state = {
    isRecording: false,
    partialQuery: '',
    query: '',
    isLoading: false,
    recognitionMessage: 'Tap on the mic and recite a full or partial verse',
  }
  handleRecordingButton = () => {
    if (this.state.isLoading) {
      return ;
    }
    else if (this.state.isRecording) {
      this.stopRecognition();
    } else {
      this.startRecognition();
    }
  }
  stopRecognition = () => {
    this.setState({
      isRecording: false,
    });
    this.recognition.onend = () =>  null;
    this.recognition.stop();
  }
  handleRecognitionResult = (e) => {
    let interimTranscript = '';
    for (let i = e.resultIndex; i < e.results.length; ++i) {
      if (e.results[i].isFinal) {
        this.handleSearch(this.state.query + ' ' + e.results[i][0].transcript)
      } else {
        interimTranscript += e.results[i][0].transcript;
      }

    }
    this.setState(() => {
      return {
        partialQuery: interimTranscript,
      }
    });
  }
  startRecognition = () => {
    this.setState({
      isRecording: true,
    });
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'ar-AE';
    this.recognition.continuous = false;
    this.recognition.interimResults = true;

    this.recognition.addEventListener('result', this.handleRecognitionResult);
    this.recognition.onerror = this.handleRecognitionError;
    this.recognition.onend = this.recognition.start;

    this.recognition.start();

  }
  showErrorMessage = (message) => {
    this.setState({
      errorMessage: message,
    })
  }
  handleRecognitionError = (event) => {
    const errorLink = '//support.google.com/websearch/answer/2940021';
    const chromeLink = '//support.google.com/chrome/answer/2693767';
    if (event.error === 'no-speech') {
      this.showErrorMessage(
        <p>
          No speech was detected. You may need to adjust your
          <a target="_blank" href={errorLink}> microphone settings</a>.
        </p>
      );
    } else if (event.error === 'audio-capture') {
      this.showErrorMessage(
        <p>
          No microphone was found. Ensure that a microphone is installed and that your
          <a target="_blank" href={errorLink}> microphone settings </a>
          are configured correctly.
        </p>
      );
    } else if (event.error === 'not-allowed') {
      this.showErrorMessage(
        <p>
          Permission to use microphone is blocked. To fix, please
          <a target="_blank" href={chromeLink}> change your settings here</a>.
        </p>
      );
    }
  };
  resetSearch = () => {
    this.setState({
      query: '',
    });
  }
  handleSearch = (query: string) => {
    this.setState({
      isLoading: true,
    })
    query = query.trim();
    this.setState((state) => {
      return {
        query,
        partialQuery: '',
      }
    });
    fetch('https://api.iqraapp.com/api/v3.0/search', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        arabicText: query,
        translation: 'en-hilali',
        apikey: '5995a4ed5c311227c1bfad46da592e9de5fc10e2036eebf95c601375ead8d532',
      }),

    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoading: false,
        })
        this.props.setRecognitionResults(json.result)
        if (json.result.matches.length) {
          this.stopRecognition()
          this.props.history.push('/recognition/results');
          console.log(json.result);
        }
      })

  }
  componentDidMount() {
    this.resetSearch();
    if (!Boolean(window.webkitSpeechRecognition)) {
      this.upgradeRequired();
    }
  }
  upgradeRequired = () => {
    this.props.setUnableToRecord();
  }
  handleOGImage = () => {
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return `${cdnURL}/recognition_${locale}.png`
  }
  componentWillUnmount() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }
  render() {
    const classnames = classNames({
      recording: this.state.isRecording,
    })
    return (
      <Container>
        <Helmet>
          <meta
            property={'og:image'}
            content={this.handleOGImage()}
          />
        </Helmet>
        <Navbar />
        {
          !this.props.canRecord ?
            <h3 className={'not-supported'}>Thank you for trying to use Iqra.
              Unfortunately, Iqra is not supported by this browser. Upgrade
              to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.
            </h3>
            :
            <div className={'content'}>
              <p className={'status'}>
                {
                  this.state.recognitionMessage
                }
              </p>
              <div className="words">
                <span className={'query'}>
                  {
                    this.state.query
                  }
                </span>
                &nbsp;
                <span className="partial-query">
                  {
                    this.state.partialQuery
                  }
                </span>
              </div>
              <RecordingButton
                className={`mic ${classnames}`}
                onClick={this.handleRecordingButton}>
                {
                  this.state.isLoading ?
                    <div className={'icon spin'}>
                      <Icon icon={circleONotch} size={20} />
                    </div>
                    :
                    !this.state.isRecording ?
                      <Icon icon={micA} size={30} />
                      :
                      <Icon icon={stop} size={30} />
                }
              </RecordingButton>
              <p>
                Want to improve Accuracy?
                &nbsp;
                <Link to={'/'}>
                  Contribute your recording
                </Link>
              </p>
              <p className={'iqra'}>
                Powered by <a href="#">Iqra</a>
              </p>
            </div>
        }
      </Container>
    )
  }
}


const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    canRecord: state.recognition.canRecord,
  }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    setRecognitionResults: (result: any) => {
      return dispatch(setRecognitionResults(result))
    },
    setUnableToRecord: () => {
      return dispatch(setUnableToRecord())
    },
  }
}

export default withCookies(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recognition));
