import classNames from 'classnames';
import range from 'lodash/range';
import React from 'react';
import Icon from 'react-icons-kit';
import { play } from 'react-icons-kit/fa/play';
import { stop } from 'react-icons-kit/fa/stop';
import { skipBack } from 'react-icons-kit/feather/skipBack';
import { skipForward } from 'react-icons-kit/feather/skipForward';
import { thumbsDown } from 'react-icons-kit/feather/thumbsDown';
import { thumbsUp } from 'react-icons-kit/feather/thumbsUp';
import { volume2 as volumeIcon } from 'react-icons-kit/feather/volume2';
import { threeHorizontal } from 'react-icons-kit/entypo/threeHorizontal';
import { ActionType } from 'typesafe-actions';
import SiriWave from '../../../modified_modules/siriwave';
import Helmet from 'react-helmet';
import humps from 'humps';
import ContentLoader from 'react-content-loader';
import { InjectedIntl } from 'react-intl';

import HandShakeImage from '../../../public/handshake-icon.png';
import {
  fetchEvaluatorAyah,
  fetchSpecificEvaluatorAyah,
  submitAyah,
} from '../../api/evaluator';
import Modal from '../../components/Modal';
import Navbar from '../../components/Navbar';
import { commaFormatter } from '../../helpers/utils';
import { createAudioMeter } from '../../helpers/volume-meter';
import AyahShape from '../../shapes/AyahShape';
import WordShape from '../../shapes/WordShape';
import {
  setAyah,
  setNextAyah,
  setPreviousAyah,
} from '../../store/actions/evaluator';
import { increaseEvaluatedAyahs } from '../../store/actions/profile';
import { WORD_TYPES } from '../../types';
import { IProfile } from '../../types/GlobalState';
import { Container, ModalContent, HelpModalContent } from './styles';
import config from '../../../config';
import T from '../../components/T';
import KEYS from '../../locale/keys';
import { fetchSpecificAyah } from '../../api/ayahs';
import { getNextAyah } from '../../helpers/ayahs';

interface IOwnProps {
  intl: InjectedIntl;
}

interface IDispatchProps {
  setAyah(ayah: AyahShape): ActionType<typeof setAyah>;
  setNextAyah(ayah: AyahShape): ActionType<typeof setNextAyah>;
  setPreviousAyah(ayah: AyahShape): ActionType<typeof setPreviousAyah>;
  increaseEvaluatedAyahs(): ActionType<typeof increaseEvaluatedAyahs>;
}

interface IStateProps {
  currentAyah: AyahShape;
  nextAyah: AyahShape;
  previousAyah: AyahShape;
  profile: IProfile;
}

interface IState {
  played: boolean;
  isPlaying: boolean;
  showModal: boolean;
  showHelpModal: boolean;
  pills: number[];
  currentStep: number;
  isLoading: boolean;
  isBuffering: boolean;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class Evaluator extends React.Component<IProps, IState> {
  public audio: null | HTMLAudioElement;
  nextAudio: HTMLAudioElement;
  public siriWave: null | HTMLElement;
  siriWaveContainer: HTMLDivElement;
  analyser: any;

  public state = {
    played: false,
    isPlaying: false,
    showModal: false,
    showHelpModal: false,
    currentStep: 1,
    pills: new Array(5), //  ['wrong', 'skipped', ...],
    isLoading: false,
    isBuffering: false,
  };
  public getNewAyah = () => {
    if (this.props.nextAyah.textSimple) {
      this.props.setPreviousAyah(this.props.currentAyah);
      return this.props.setAyah(this.props.nextAyah);
    } else {
      return fetchEvaluatorAyah().then((ayah: AyahShape) => {
        return this.props.setAyah(ayah);
      });
    }
  };
  public loadNextAyah = () => {
    const {
      chapterId: surah,
      verseNumber: ayah,
      recordingId,
    } = this.props.currentAyah;
    const { nextSurah, nextAyah } = getNextAyah(surah, ayah);
    return fetchSpecificEvaluatorAyah(nextSurah, nextAyah, recordingId + 1)
      .then(this.handleUpcomingAyah)
      .catch((e: Error | Response) => {
        if (e.status === 500) {
          fetchEvaluatorAyah().then(this.handleUpcomingAyah);
        }
      });
  };
  handleUpcomingAyah = async (fetchedAyah: AyahShape) => {
    fetchedAyah = humps.camelizeKeys(fetchedAyah);
    await this.props.setNextAyah(fetchedAyah);
    this.preloadAudio(fetchedAyah.audioUrl);
    this.preloadFont(fetchedAyah.words[0].className);
  };
  preloadAudio = (audioURL: string) => {
    // audioURL = __DEVELOPMENT__ ? `http://localhost:8000${ audioURL }` : audioURL;
    this.nextAudio = new Audio(audioURL);
    this.registerAudioEvents(this.nextAudio);

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(this.nextAudio);
    this.nextAnalyser = audioContext.createAnalyser();
    source.connect(this.nextAnalyser);
    this.nextAnalyser.connect(audioContext.destination);
  };
  registerAudioEvents = audio => {
    audio.preload = 'true';
    audio.crossOrigin = 'anonymous';
    audio.onloadedmetadata = () => {};
    audio.onended = this.handleAudioEnd;
    audio.onerror = this.handleAudioEnd;
    audio.onwaiting = () => {
      this.setState({
        isBuffering: true,
      });
    };
    audio.onplaying = () => {
      if (this.state.isBuffering) {
        this.setState({
          isBuffering: false,
        });
      }
    };
  };
  preloadFont = async (fontName: string) => {
    const font = new FontFace(
      fontName,
      `url('/public/fonts/ayahs/${fontName}.ttf') format('truetype')`
    );
    await font.load();
    document.fonts.add(font);
  };
  public updatePills = (action: string) => {
    this.setState((state, props) => {
      const newPills = state.pills;
      newPills[state.currentStep - 1] = action;
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
    this.replaceAudioTags();
    this.loadNextAyah();
    this.updatePills(action);
    this.handleAudioEnd();
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
  replaceAudioTags = () => {
    this.audio = null;
    this.analyser = null;
    this.audio = this.nextAudio;
    this.analyser = this.nextAnalyser;
    this.audio.load();
  };
  public handleSkip = () => {
    // this.handleAyahChange('skipped');
    this.setState({
      isLoading: true,
    });
    fetchEvaluatorAyah().then(async (ayah: AyahShape) => {
      await this.props.setAyah(ayah);
      this.initializeAudioPlayer();
      this.loadNextAyah();
      this.setState({
        isLoading: false,
      });
    });
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
    if (this.state.isBuffering) {
      return;
    }
    this.siriWave = this.startWave();
    if (!this.state.isPlaying) {
      // Before Playing
      this.audio.play();
      this.setState({
        isPlaying: true,
        played: true,
      });
      this.siriWaveContainer.style.display = 'block';
      this.siriWave.start();
      this.startAnimating();
    } else {
      // While Playing...
      this.audio.pause();
      this.handleAudioEnd();
    }
  };
  public startWave = () => {
    const siriWave = new SiriWave({
      container: this.siriWaveContainer,
      width: 640,
      height: 200,
      style: 'ios9',
      amplitude: 0.1,
    });
    return siriWave;
  };
  public startAnimating = async () => {
    this.drawLoop();
  };
  drawLoop = () => {
    const fbcArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(fbcArray);
    let barHeight = fbcArray[0] / 100;
    barHeight = barHeight > 1.25 ? 1 : barHeight;
    this.siriWave.setAmplitude(barHeight);

    this.drawFunction = window.requestAnimationFrame(this.drawLoop);
  };
  public handleCloseModal = () => {
    this.setState({ showModal: false });
  };
  public handleCloseHelpModal = () => {
    this.setState({ showHelpModal: false });
  };
  handleAudioEnd = () => {
    this.setState({
      isPlaying: false,
      isBuffering: false,
    });
    if (this.siriWave) {
      this.siriWave.stop();
    }
    window.cancelAnimationFrame(this.drawFunction);
    this.siriWaveContainer.innerHTML = '';
  };
  public async componentDidMount() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!this.props.currentAyah.textSimple) {
      this.setState({
        isLoading: true,
      });
      await this.getNewAyah();
      this.setState({
        isLoading: false,
      });
    }
    this.loadNextAyah();
    this.initializeAudioPlayer();
  }
  initializeAudioPlayer = () => {
    this.audio = new Audio(this.props.currentAyah.audioUrl);
    this.registerAudioEvents(this.audio);

    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(this.audio);
    this.analyser = audioContext.createAnalyser();
    source.connect(this.analyser);
    this.analyser.connect(audioContext.destination);
  };
  handleOGImage = (): string => {
    return '/public/og/evaluation_en.png';
  };
  renderAyahLoader = () => {
    return (
      <ContentLoader height={30} className={'ayah-loader'}>
        {/* Pure SVG */}
        <rect x="80" y="10" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
    );
  };
  renderAyah = () => {
    return this.props.currentAyah.words.map((word: WordShape) => {
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
    });
  };
  handlePrevious = async () => {
    this.setState({
      isLoading: true,
    });
    await this.audio.pause();
    this.props.setNextAyah(this.props.currentAyah);
    this.preloadAudio(this.props.currentAyah.audioUrl);
    await this.props.setAyah(this.props.previousAyah);
    await this.initializeAudioPlayer();
    this.audio.play();
    this.setState({
      isLoading: false,
    });
  };
  showHelpModal = () => {
    this.setState({
      showHelpModal: true,
    });
  };
  public render() {
    const { currentAyah, profile } = this.props;
    const {
      isPlaying,
      played,
      isLoading,
      isBuffering,
      pills,
      currentStep,
    } = this.state;
    const ogTitle = this.props.intl.formatMessage({
      id: KEYS.EVALUATE_AYAHS_PAGE_TITLE,
    });
    const audioURL = __DEVELOPMENT__
      ? `http://localhost:8000${currentAyah.audioUrl}`
      : currentAyah.audioUrl;
    const disableButtons = !played;
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
        <div className="container">
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
                &nbsp;
                <a onClick={this.showHelpModal}>
                  <T id={KEYS.EVALUATOR_PARAGRAPH_2_LINK_TEXT} />
                </a>
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
                  {isLoading || !currentAyah.textSimple
                    ? this.renderAyahLoader()
                    : this.renderAyah()}
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

        <div className="primary-buttons">
          <div
            ref={C => (this.siriWaveContainer = C)}
            className={'siri-wave'}
          />
          <button
            className="previous vote-button"
            onClick={this.handlePrevious}
          >
            <Icon icon={skipBack} size={24} />
            <T id={KEYS.PREVIOUS_WORD} />
          </button>
          <button
            type="button"
            className="vote-button yes"
            onClick={this.handleRightAyah}
            // disabled={disableButtons}
          >
            <Icon icon={thumbsUp} size={24} />
            <span>
              <T id={KEYS.YES_WORD} />
            </span>
          </button>
          <div className="primary-button play" onClick={this.handlePlay}>
            <button type="button">
              <Icon
                icon={
                  isLoading || isBuffering
                    ? threeHorizontal
                    : !isPlaying
                    ? play
                    : stop
                }
                size={24}
              />
            </button>
            <div className="background" />
          </div>
          <button
            type="button"
            className="vote-button no"
            onClick={this.handleWrongAyah}
            // disabled={disableButtons}
          >
            <Icon icon={thumbsDown} size={24} />
            <span>
              <T id={KEYS.NO_WORD} />
            </span>
          </button>
          <button
            type="button"
            className="vote-button skip"
            onClick={this.handleSkip}
          >
            <T id={KEYS.SKIP_WORD} />
            <Icon icon={skipForward} size={24} />
          </button>
        </div>

        <Modal
          isOpen={this.state.showHelpModal}
          handleCloseModal={this.handleCloseHelpModal}
          closable={true}
        >
          <HelpModalContent>
            <div className="content">
              <h1 className="modal-title">Evaluation Instructions</h1>
              Use the following examples as guidelines when deciding whether a
              recitation is recorded correctly or incorrectly.
              <br /> <br />
              <h4>
                Mark a recitation as{' '}
                <span style={{ color: 'green' }}>correct</span> even if:
              </h4>
              <ul style={{ textAlign: 'left' }}>
                <li>
                  The reciter makes a mistake in how they pronounce a letter, or
                  if he/she makes mistakes in harakaat (vowels).
                </li>
                <li> The reciter makes tajweed-related mistakes.</li>
                <li>
                  The reciter makes a major mistake, but then corrects himself
                  or herself.
                </li>
                <li>
                  The recitation includes noise or an out-of-place word before
                  or after the verse.
                </li>
                <li> The reciter recites very slowly or very quickly.</li>
                <li>
                  The reciter omits <strong>up to a single word</strong> at the
                  beginning or end of a verse. If he/she misses more than that,
                  it should be marked as incorrect.
                </li>
              </ul>
              <br />
              <h4>
                Mark a recitation as{' '}
                <span style={{ color: 'red' }}>incorrect</span> if:
              </h4>
              <ul style={{ textAlign: 'left' }}>
                <li> The recording is empty or is only background noise.</li>
                <li> The wrong verse is recited.</li>
                <li>
                  The verse is recited so softly that you cannot hear the
                  recitation (make sure your device volume is set properly!)
                </li>
                <li>
                  Multiple verses are recited in the same recording, even if
                  they include the correct verse.
                </li>
                <li>
                  The reciter omits <strong>more than a single word</strong> at
                  the beginning or end of a verse.
                </li>
              </ul>
              <br />
              The evaluator works best on your <strong>desktop/laptop</strong>,
              as not all audio files play on mobile.
              <br />
              <br />
            </div>
          </HelpModalContent>
        </Modal>

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
              <b className="count">{this.props.profile.evaluationsCount}</b>
              <T id={KEYS.AYAHS_WORD} />.
            </p>
            <p>
              <T id={KEYS.EVALUATOR_THANKS_FOR_HELPING_MESSAGE_3} />
              <a href="/evaluator">
                <T id={KEYS.YES_WORD} />!
              </a>
            </p>
          </ModalContent>
        </Modal>
      </Container>
    );
  }
}

export default Evaluator;
