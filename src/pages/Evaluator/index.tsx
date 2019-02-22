import classNames from 'classnames';
import range from 'lodash/range';
import React from 'react';
import Icon from 'react-icons-kit';
import { play } from 'react-icons-kit/fa/play';
import { stop } from 'react-icons-kit/fa/stop';
import { chevronsLeft } from 'react-icons-kit/feather/chevronsLeft';
import { skipForward } from 'react-icons-kit/feather/skipForward';
import { thumbsDown } from 'react-icons-kit/feather/thumbsDown';
import { thumbsUp } from 'react-icons-kit/feather/thumbsUp';
import { volume2 as volumeIcon } from 'react-icons-kit/feather/volume2';
import { threeHorizontal } from 'react-icons-kit/entypo/threeHorizontal';
import { ActionType } from 'typesafe-actions';
import SiriWave from '../../../modified_modules/siriwave';
import Helmet from 'react-helmet';

import HandShakeImage from '../../../public/handshake-icon.png';
import { fetchEvaluatorAyah, submitAyah } from '../../api/evaluator';
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import { commaFormatter } from '../../helpers/utils';
import { createAudioMeter } from '../../helpers/volume-meter';
import AyahShape from '../../shapes/AyahShape';
import WordShape from '../../shapes/WordShape';
import { setAyah, setNextAyah } from '../../store/actions/evaluator';
import { increaseEvaluatedAyahs } from '../../store/actions/profile';
import { WORD_TYPES } from '../../types';
import { IProfile } from '../../types/GlobalState';
import { Container, ModalContent } from './styles';
import config from '../../../config';
import T from '../../components/T';
import KEYS from '../../locale/keys';
import { fetchSpecificAyah } from '../../api/ayahs';
import { getNextAyah } from '../../helpers/ayahs';
import logScreen from '../../helpers/logScreen';

const cdnURL = config('cdnURL');

interface IProps {
  currentAyah: AyahShape;
  nextAyah: AyahShape;
  setAyah(ayah: AyahShape): ActionType<typeof setAyah>;
  setNextAyah(ayah: AyahShape): ActionType<typeof setNextAyah>;
  increaseEvaluatedAyahs(): ActionType<typeof increaseEvaluatedAyahs>;
  profile: IProfile;
}

interface IState {
  played: boolean;
  isPlaying: boolean;
  showModal: boolean;
  pills: number[];
  currentStep: number;
  isLoading: boolean;
}

class Evaluator extends React.Component<IProps, IState> {
  public audio: null | HTMLAudioElement;
  public siriWave: null | HTMLElement;

  public state = {
    played: false,
    isPlaying: false,
    showModal: false,
    currentStep: 1,
    pills: new Array(5), //  ['wrong', 'skipped', ...],
    isLoading: false,
  };
  public getNewAyah = () => {
    if (this.props.nextAyah.textSimple) {
      return this.props.setAyah(this.props.nextAyah);
    } else {
      return fetchEvaluatorAyah().then((ayah: AyahShape) => {
        return this.props.setAyah(ayah);
      });
    }
  };
  public loadNextAyah = () => {
    return fetchEvaluatorAyah().then((ayah: AyahShape) => {
      this.props.setNextAyah(ayah);
    });
  };
  public updatePills = (action: string) => {
    this.setState((state, props) => {
      const newPills = state.pills;
      newPills[state.currentStep - 1] = action;
      console.log(newPills);
      return {
        pills: newPills,
      };
    });
  };
  public handleAyahChange = async (action: string) => {
    this.setState((state, props) => {
      return {
        played: false,
        currentStep: state.currentStep + 1,
        isLoading: true,
      };
    });

    this.props.increaseEvaluatedAyahs();
    await this.getNewAyah();
    this.loadNextAyah();
    this.audio.pause();
    try {
      this.audio.load();
    } catch (e) {
      console.log(e);
    }
    this.audio.load();
    this.updatePills(action);
    this.audio.dispatchEvent(new Event('ended'));
    this.handlePlay();
    this.setState({
      isLoading: false,
    });
    // if (this.state.currentStep > 5) {
    //   this.setState({
    //     showModal: true,
    //   })
    // }
  };
  public handleSkip = () => {
    this.handleAyahChange('skipped');
  };
  public handleWrongAyah = () => {
    // if  (this.state.played) { commnented because it's blocking the continuous mode
    this.handleAyahChange('wrong');
    submitAyah('incorrect', this.props.currentAyah.recordingId);
    // }
  };
  public handleRightAyah = () => {
    // if (this.state.played) { commnented because it's blocking the continuous mode
    this.handleAyahChange('right');
    submitAyah('correct', this.props.currentAyah.recordingId);
    // }
  };
  public handlePlay = () => {
    const siriWave = this.startWave();
    if (this.audio) {
      this.audio.addEventListener('ended', () => {
        this.setState({
          isPlaying: false,
        });
        siriWave.stop();
        if (this.siriWave.querySelector('canvas')) {
          this.siriWave.querySelector('canvas').remove();
        }
      });
      if (this.audio.paused) {
        // Before Playing
        this.audio.play();
        this.setState({
          isPlaying: true,
          played: true,
        });
        this.siriWave.style.display = 'block';
        siriWave.start();
        this.startAnimating();
      } else {
        // While Playing...
        this.audio.pause();
        this.audio.dispatchEvent(new Event('ended'));
      }
    }
  };
  public startWave = () => {
    const siriWave = new SiriWave({
      container: this.siriWave,
      width: 640,
      height: 200,
      style: 'ios9',
    });
    return siriWave;
  };
  public startAnimating = () => {
    const audio_context = new AudioContext();
    const input = audio_context.createMediaElementSource(
      this.audio.cloneNode(true)
    );
    const meter = createAudioMeter(audio_context);
    input.connect(meter);
  };
  public handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  public componentDidMount() {
    logScreen();
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!this.props.currentAyah.textSimple) {
      this.getNewAyah();
    }
  }
  handleOGImage = (): string => {
    return cdnURL + '/og/evaluation_en.png';
  };
  public render() {
    const { currentAyah, profile } = this.props;
    const { isPlaying, played, isLoading, pills, currentStep } = this.state;
    const ogTitle = this.props.intl.formatMessage({ id: KEYS.EVALUATE_AYAHS });
    return (
      <Container>
        <Helmet>
          <title>{ogTitle}</title>
          <meta property={'og:image'} content={this.handleOGImage()} />
          <meta name={'twitter:image'} content={this.handleOGImage()} />
        </Helmet>
        <Navbar
          counterText={`${commaFormatter(
            profile.evaluationsCount
          )}/${commaFormatter(profile.recordingCount)}`}
        />
        <div id="container">
          <div className="start-text">
            <h1 className="title">
              <T id={KEYS.EVALUATOR_TITLE_TEXT} />
            </h1>
            <div className="text">
              <p>
                <T id={KEYS.EVALUATOR_PARAGRAPH_1} />
              </p>
              <p>
                <T id={KEYS.EVALUATOR_PARAGRAPH_2} />
              </p>
              <p>
                <T id={KEYS.EVALUATOR_PARAGRAPH_3} />
              </p>
            </div>
          </div>
          <div className="cards-and-pills">
            <div className="cards">
              {!played ? (
                <div className="instruction hidden-sm-down">
                  <T id={KEYS.CLICK_WORD} />
                  <Icon icon={play} className={'icon'} />
                  <T id={KEYS.EVALUATOR_CLICK_TO_HEAR_TEXT} />
                </div>
              ) : null}
              {/* Start ayah-container */}
              <div className="card">
                <div className="ayah-text">
                  {currentAyah.words.map((word: WordShape) => {
                    const className = classNames({
                      [word.className]: true,
                      [word.charType]: true,
                    });
                    return (
                      <span className={className}>
                        <a
                          className={className}
                          dangerouslySetInnerHTML={{ __html: word.code }}
                        />
                        {word.charType === WORD_TYPES.CHAR_TYPE_WORD && (
                          <small style={{ letterSpacing: -15 }}>&nbsp;</small>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
              {/* End ayah-container */}
            </div>

            {/*<div className="pills">*/}
            {/*<div className="inner">*/}
            {/*{*/}
            {/*range(1, 6).map((num: number) => {*/}
            {/*const isActive = currentStep === num;*/}
            {/*const className = classNames({*/}
            {/*wrong: pills[num] === 'wrong',*/}
            {/*right: pills[num] === 'right',*/}
            {/*skipped: pills[num] === 'skipped',*/}
            {/*active: isActive,*/}
            {/*pending: !isActive*/}
            {/*})*/}
            {/*return (*/}
            {/*<div className={`pill ${className}`}>*/}
            {/*{*/}
            {/*isActive ?*/}
            {/*<div className="contents">*/}
            {/*<Icon icon={volumeIcon} size={24} />*/}
            {/*</div>*/}
            {/*:*/}
            {/*null*/}
            {/*}*/}
            {/*<div className="num">{ num }</div>*/}
            {/*</div>*/}
            {/*)*/}
            {/*})*/}
            {/*}*/}
            {/**/}
            {/*</div>*/}
            {/*</div>*/}
          </div>
        </div>

        <audio ref={C => (this.audio = C)}>
          <source src={currentAyah.audioUrl} type="audio/mp3" />
        </audio>

        <div className="primary-buttons">
          <div ref={C => (this.siriWave = C)} className={'siri-wave'} />
          <button
            type="button"
            className="vote-button yes"
            onClick={this.handleRightAyah}
            // disabled={!played}
          >
            <Icon icon={thumbsUp} size={24} />
            <span>
              <T id={KEYS.YES_WORD} />
            </span>
          </button>
          <div className="primary-button play" onClick={this.handlePlay}>
            <button type="button">
              <Icon
                icon={isLoading ? threeHorizontal : !isPlaying ? play : stop}
                size={24}
              />
            </button>
            <div className="background" />
          </div>
          <button
            type="button"
            className="vote-button no"
            onClick={this.handleWrongAyah}
            // disabled={!played}
          >
            <Icon icon={thumbsDown} size={24} />
            <span>
              <T id={KEYS.NO_WORD} />
            </span>
          </button>
        </div>

        <button
          type="button"
          className="skip vote-button"
          onClick={this.handleSkip}
        >
          <span>
            <T id={KEYS.SKIP_WORD} />
          </span>
          <Icon icon={skipForward} size={24} />
        </button>

        <button
          className="back-to-home vote-button"
          onClick={() => {
            this.props.history.push('/');
          }}
        >
          <span>
            <T id={KEYS.HOME_WORD} />
          </span>
          <Icon icon={chevronsLeft} size={24} />
        </button>

        <Modal
          isOpen={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          style={{ height: '60%', width: '50%' }}
        >
          <ModalContent>
            <h1 className="modal-title">
              <T id={KEYS.THANK_YOU_MESSAGE} />
            </h1>
            <img src={HandShakeImage} alt="" />
            <p>
              <b>
                <T id={KEYS.EVALUATOR_THANKS_FOR_HELPING_MESSAGE_1} />
              </b>
            </p>
            <p>
              <T id={KEYS.EVALUATOR_THANKS_FOR_HELPING_MESSAGE_2} />
              <b className="count">
                {' '}
                {this.props.profile.evaluationsCount}{' '}
              </b>{' '}
              <T id={KEYS.AYAHS_WORD} />.
            </p>
            <p>
              <T id={KEYS.EVALUATOR_THANKS_FOR_HELPING_MESSAGE_3} />
              <a href="/evaluator">
                {' '}
                <T id={KEYS.YES_WORD} />!{' '}
              </a>
            </p>
          </ModalContent>
        </Modal>
      </Container>
    );
  }
}

export default Evaluator;
