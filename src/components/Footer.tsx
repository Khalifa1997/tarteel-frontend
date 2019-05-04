import { History, Location } from 'history';
import humps from 'humps';
import React from 'react';
import { Cookies, withCookies } from 'react-cookie';
import { Icon } from 'react-icons-kit';
import { refresh } from 'react-icons-kit/fa/refresh';
import { stop } from 'react-icons-kit/fa/stop';
import { micA } from 'react-icons-kit/ionicons/micA';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getType } from 'typesafe-actions';
import classNames from 'classnames';

import HandShakeImage from '../../public/handshake-icon.png';
import { fetchRandomAyah, sendRecording } from '../api/ayahs';
import surahs from '../api/surahs';
import { storePassedOnBoarding, storeUserRecitedAyahs } from '../helpers';
import { getNextAyah, getPrevAyah } from '../helpers/ayahs';
import { getBlob, startRecording, stopRecording } from '../helpers/recorder';
import KEYS from '../locale/keys';
import { ModalContent } from '../pages/Evaluator/styles';
import AyahShape from '../shapes/AyahShape';
import {
  loadNextAyah,
  loadNextQueue,
  loadPreviousAyah,
  loadPrevQueue,
  popNextAyah,
  popPrevAyah,
  setAyah,
  shiftNextAyah,
  shiftPrevAyah,
  unShiftNextAyah,
  unShiftPrevAyah,
} from '../store/actions/ayahs';
import {
  increaseRecitedAyahs,
  setPassedOnBoarding,
} from '../store/actions/profile';
import {
  toggleDoneRecording,
  toggleIsRecording,
} from '../store/actions/status';
import ReduxState, { IProfile, IStatus } from '../types/GlobalState';
import FooterButton from './FooterButton';
import Modal from './Modal';
import NoteButton from './NoteButton';
import RecordingButton from './RecordingButton';
import T from './T';
import ToggleButton from './ToggleButton';
import RecordingError from './RecordingError';

interface IOwnProps {
  history: History;
  location: Location;
  isAyahPage?: boolean;
}

interface IDispatchPros {
  toggleIsRecording(): void;
  toggleDoneRecording(): void;
  increaseRecitedAyahs(): void;
  setPassedOnBoarding(): void;
  setAyah(ayah: AyahShape): void;
  loadNextAyah(ayah?: AyahShape): void;
  loadPreviousAyah(ayah?: AyahShape): void;
  shiftNextAyah(): void;
  shiftPrevAyah(): void;
  unShiftNextAyah(ayah: AyahShape): void;
  unShiftPrevAyah(ayah: AyahShape): void;
  popPrevAyah(): void;
  popNextAyah(): void;
  loadNextQueue(): void;
  loadPrevQueue(): void;
}

interface IStateProps {
  status: IStatus;
  profile: IProfile;
  currentAyah: AyahShape;
  nextAyah: AyahShape[];
  prevAyah: AyahShape[];
  router: ReduxState['router'];
}

interface IState {
  showModal: boolean;
  showErrorMessage: boolean;
  showGetStarted: boolean;
}

type IProps = IOwnProps & IStateProps & IDispatchPros;

class Footer extends React.Component<IProps, IState> {
  public state = {
    showModal: false,
    showErrorMessage: false,
    showGetStarted:
      Boolean(this.props.isAyahPage) && !this.props.profile.passedOnBoarding,
  };
  public setPreviousAyah = async () => {
    const { verseNumber: ayah, chapterId: surah } = this.props.currentAyah;
    const { prevSurah, prevAyah } = getPrevAyah(surah, ayah);

    await this.props.popNextAyah();
    await this.props.unShiftNextAyah(this.props.currentAyah);

    if (
      this.props.prevAyah.length &&
      this.props.prevAyah[0].verseNumber === prevAyah
    ) {
      await this.props.setAyah(this.props.prevAyah[0]);
    }

    await this.props.shiftPrevAyah();
    this.props.loadPrevQueue();
  };
  public setNextAyah = async () => {
    const { verseNumber: ayah, chapterId: surah } = this.props.currentAyah;
    const { nextSurah, nextAyah } = getNextAyah(surah, ayah);

    await this.props.popPrevAyah();
    await this.props.unShiftPrevAyah(this.props.currentAyah);

    if (
      this.props.nextAyah.length &&
      this.props.nextAyah[0].verseNumber === nextAyah
    ) {
      await this.props.setAyah(this.props.nextAyah[0]);
    }

    await this.props.shiftNextAyah();
    await this.props.loadNextQueue();
  };
  public handleRecordingError = () => {
    this.setState({
      showErrorMessage: true,
    });
    this.props.toggleIsRecording();
  };
  public handleRetry = () => {
    this.handleStartRecording();
    this.props.toggleDoneRecording();
  };
  public increaseRecitedAyahs = async () => {
    await this.props.increaseRecitedAyahs();
    storeUserRecitedAyahs(this.props.profile.userRecitedAyahs);
  };
  public handleSubmit = async (lastOne: boolean = false) => {
    const record = {
      surahNum: this.props.currentAyah.chapterId,
      ayahNum: this.props.currentAyah.verseNumber,
      hashString: this.props.currentAyah.hash,
      audio: getBlob(),
    };
    sendRecording(
      record.audio,
      record.surahNum,
      record.ayahNum,
      record.hashString,
      this.props.profile.sessionId,
      this.props.status.isContinuous
    ).then((res: Response) => {
      if (res.status === 201) {
        // after success code
      }
    });

    this.increaseRecitedAyahs();

    if (lastOne) {
      this.setNextAyah();
    } else if (this.props.status.isContinuous) {
      stopRecording().then(() => {
        this.setNextAyah();
        startRecording();
      });
    } else {
      const endpoints = [10, 50, 100];
      if (endpoints.includes(this.props.profile.userRecitedAyahs)) {
        this.setState({
          showModal: true,
        });
      }

      if (
        this.props.profile.userRecitedAyahs === 5 &&
        !this.props.profile.passedOnBoarding
      ) {
        this.props.setPassedOnBoarding();
        this.props.cookies.set('passedOnBoarding', true, { path: '/' });
        this.props.history.push('/demographics');
      } else {
        this.props.toggleDoneRecording();
        this.setNextAyah();
      }
    }
  };
  public handleStartRecording = () => {
    const recConfig = {
      onError: this.handleRecordingError,
    };
    startRecording(recConfig).then(() => {
      this.props.toggleIsRecording();
    });
  };
  public handleStopRecording = () => {
    stopRecording().then(() => {
      if (this.props.status.isContinuous) {
        // To submit the last ayah recited in continuous mode if the user clicked directly on stop button.
        this.handleSubmit(true);
        this.props.toggleIsRecording();
      } else {
        this.props.toggleIsRecording();
        this.props.toggleDoneRecording();
      }
    });
  };
  public handleReviewPreviousAyah = () => {
    this.props.toggleDoneRecording();
    this.setPreviousAyah();
  };

  public handleRecordingButton = () => {
    if (this.props.status.isRecording) {
      this.handleStopRecording();
    } else {
      this.handleStartRecording();
    }
  };
  public handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  public fetchRandomAyah = () => {
    fetchRandomAyah().then((ayah: AyahShape) => {
      this.props.setAyah(ayah);
    });
  };
  handleGetStarted = () => {
    this.props.history.push('/');
    };
  public render() {
    const { isRecording, isDoneRecording, isContinuous } = this.props.status;
    const { showErrorMessage, showGetStarted } = this.state;
    const classes = classNames({
      'get-started': showGetStarted,
      'more-right': showGetStarted,
    });
    return (
      <Container className={classes}>
        <div className="buttons-wrapper">
          {!isDoneRecording ? (
            <div className="mic-wrapper">
              {!showGetStarted ? (
                <RecordingButton
                  className={`mic ${isRecording ? 'recording' : ''}`}
                  onClick={this.handleRecordingButton}
                >
                  <div className="icon">
                    {!isRecording ? (
                      <Icon icon={micA} size={30} />
                    ) : (
                      <Icon icon={stop} size={30} />
                    )}
                  </div>
                </RecordingButton>
              ) : null}
              <div className="navigation-button">
                {!isRecording ? (
                  <NoteButton
                    className={`${classes} previous arabic-text rtl`}
                    onClick={this.setPreviousAyah}
                  >
                    <T id={KEYS.PREVIOUS_AYAH} />
                  </NoteButton>
                ) : null}
                {!isRecording ? (
                  <NoteButton
                    className={`next ${classes} arabic-text rtl`}
                    onClick={this.setNextAyah}
                  >
                    <T id={KEYS.NEXT_AYAH} />
                  </NoteButton>
                ) : null}
              </div>
            </div>
          ) : null}
          {isRecording && isContinuous ? (
            <p className="recording-note small-arabic-text">
              <T id={KEYS.CONTINUOUS_MODE_NOTE_TEXT} />
            </p>
          ) : null}
          <div className="review">
            {isDoneRecording ? (
              <RecordingButton className={'retry'} onClick={this.handleRetry}>
                <div className="icon">
                  <Icon icon={refresh} size={30} />
                </div>
                <p>
                  <T id={KEYS.RETRY_BUTTON_TEXT} />
                </p>
              </RecordingButton>
            ) : null}
            {isDoneRecording || (isContinuous && isRecording) ? (
              <FooterButton
                className={'submit'}
                onClick={() => {
                  this.handleSubmit();
                }}
              >
                <span>
                  <T id={KEYS.SUBMIT_BUTTON_TEXT} />
                </span>
              </FooterButton>
            ) : null}
            {isDoneRecording ? (
              <NoteButton
                className="previous-ayah arabic-text rtl"
                onClick={this.handleReviewPreviousAyah}
              >
                <T id={KEYS.PREVIOUS_AYAH} />
              </NoteButton>
            ) : null}
          </div>
        </div>
        {!showGetStarted && !isDoneRecording && !isRecording ? (
          <ToggleButton text={KEYS.CONTINUOUS_MODE_NOTE_TEXT} />
        ) : null}
        {showGetStarted ? (
          <FooterButton
            className={'get-started-button'}
            onClick={this.handleGetStarted}
          >
            <T id={KEYS.GET_STARTED} />
          </FooterButton>
        ) : null}
        {showErrorMessage ? (
          <RecordingError
            onClose={() => {
              this.setState({ showErrorMessage: false });
            }}
          />
        ) : null}
        <Modal
          isOpen={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          style={{ height: '60%', width: '50%' }}
          shouldCloseOnOverlayClick={true}
          closable={true}
        >
          <ModalContent>
            <h1 className="modal-title">
              <T id={KEYS.THANK_YOU_MESSAGE} />
            </h1>
            <img src={HandShakeImage} alt="" />
            <p>
              <b>
                <T id={KEYS.FOOTER_MESSAGE_1} />
              </b>
            </p>
            <p>
              <T id={KEYS.FOOTER_MESSAGE_2} />
            </p>
            <p>
              <T id={KEYS.FOOTER_MESSAGE_3} />
              <b className="count">
                {' '}
                {this.props.profile.evaluationsCount}{' '}
              </b>{' '}
              <T id={KEYS.AYAHS_WORD} />.
            </p>
            <p>
              <Link to="/evaluator">
                <T id={KEYS.FOOTER_EVALUATOR_LINK} />
              </Link>
            </p>
          </ModalContent>
        </Modal>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 125px;
  width: 100%;
  color: white;
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  text-align: center;

  &.get-started {
    box-sizing: border-box;
    padding: 1em 0;
    top: 2em;
    position: relative;
  }

  .buttons-wrapper {
    .mic-wrapper {
      position: relative;
    }
    .recording-note {
      color: #a5aab2;
      font-weight: 500;
      font-size: 14px;
      position: relative;
      top: -23px;
    }
  }

  .get-started-button {
    margin-top: 2em;
    span {
      font-weight: normal;
      text-transform: none;
    }
    padding: 8px 2em;
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    //height: 200px;
    //justify-content: center;
  }
  // Special styling for very small screens like IPhone 5s and SE
  @media screen and (max-height: ${props => props.theme.breakpoints.sm}px) {
    height: 125px;
  }
`;

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    status: state.status,
    profile: state.profile,
    currentAyah: state.ayahs.currentAyah,
    nextAyah: state.ayahs.nextAyah,
    prevAyah: state.ayahs.prevAyah,
    router: state.router,
  };
};

const mapDispatchToProps = (dispatch): IDispatchPros => {
  return {
    toggleIsRecording: () => {
      dispatch(toggleIsRecording());
    },
    toggleDoneRecording: () => {
      dispatch(toggleDoneRecording());
    },
    increaseRecitedAyahs: () => {
      dispatch(increaseRecitedAyahs());
    },
    setPassedOnBoarding: () => {
      dispatch(setPassedOnBoarding());
    },
    setAyah: (ayah: AyahShape) => {
      return dispatch(setAyah(ayah));
    },
    loadNextAyah: (ayah?: AyahShape) => {
      return dispatch(loadNextAyah(ayah));
    },
    shiftNextAyah: () => {
      dispatch(shiftNextAyah());
    },
    loadPreviousAyah: (ayah?: AyahShape) => {
      return dispatch(loadPreviousAyah(ayah));
    },
    shiftPrevAyah: () => {
      return dispatch(shiftPrevAyah());
    },
    unShiftNextAyah: (ayah: AyahShape) => {
      return dispatch(unShiftNextAyah(ayah));
    },
    unShiftPrevAyah: (ayah: AyahShape) => {
      return dispatch(unShiftPrevAyah(ayah));
    },
    popNextAyah: () => {
      return dispatch(popNextAyah());
    },
    popPrevAyah: () => {
      return dispatch(popPrevAyah());
    },
    loadNextQueue: () => {
      return dispatch(loadNextQueue());
    },
    loadPrevQueue: () => {
      return dispatch(loadPrevQueue());
    },
  };
};

export default withCookies(
  withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Footer)
  )
);
