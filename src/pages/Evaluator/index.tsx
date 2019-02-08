import classNames from 'classnames'
import range from 'lodash/range';
import React from "react";
import Icon from "react-icons-kit";
import {play} from 'react-icons-kit/fa/play'
import {stop} from 'react-icons-kit/fa/stop'
import {chevronsLeft} from 'react-icons-kit/feather/chevronsLeft'
import {skipForward} from 'react-icons-kit/feather/skipForward'
import {thumbsDown} from 'react-icons-kit/feather/thumbsDown'
import {thumbsUp} from 'react-icons-kit/feather/thumbsUp'
import {volume2 as volumeIcon} from 'react-icons-kit/feather/volume2'
import {ActionType} from "typesafe-actions";
import SiriWave from '../../../modified_modules/siriwave';
import Helmet from 'react-helmet';


import HandShakeImage from '../../../public/handshake-icon.png'
import {fetchEvaluatorAyah, submitAyah} from "../../api/evaluator";
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";
import {commaFormatter} from "../../helpers/utils";
import {createAudioMeter} from "../../helpers/volume-meter";
import AyahShape from "../../shapes/AyahShape";
import WordShape from "../../shapes/WordShape";
import {setAyah, setNextAyah} from "../../store/actions/evaluator";
import {WORD_TYPES} from "../../types";
import {IProfile} from "../../types/GlobalState";
import {Container, ModalContent} from "./styles";
import config from '../../../config';
import KEYS from "../../locale/keys";

const cdnURL = config('cdnURL');

interface IProps {
  currentAyah: AyahShape;
  nextAyah: AyahShape;
  setAyah(ayah: AyahShape): ActionType<typeof setAyah>;
  setNextAyah(ayah: AyahShape): ActionType<typeof setNextAyah>;
  profile: IProfile;
}

interface IState {
  played: boolean;
  isPlaying: boolean;
  showModal: boolean;
  pills: number[];
  currentStep: number;
}

class Evaluator extends React.Component<IProps, IState> {

  public audio: null | HTMLAudioElement;
  public siriWave: null | HTMLElement;

  public state = {
    played: false,
    isPlaying: false,
    showModal: false,
    currentStep: 1,
    pills: new Array(5),  //  ['wrong', 'skipped', ...]
  }
  public getNewAyah = () => {
    if (this.props.nextAyah.ayahText) {
      return this.props.setAyah(this.props.nextAyah)
    } else {
      return fetchEvaluatorAyah()
        .then((ayah: AyahShape) => {
          return this.props.setAyah(ayah)
        })
    }
  }
  public loadNextAyah = () => {
    return fetchEvaluatorAyah()
      .then((ayah: AyahShape) => {
        this.props.setNextAyah(ayah)
      })
  }
  public updatePills = (action: string) => {
    this.setState((state, props) => {
      const newPills = state.pills;
      newPills[state.currentStep - 1] = action
      console.log(newPills);
      return {
        pills: newPills,
      }
    });
  }
  public handleAyahChange = async (action: string) => {
    this.setState((state, props) => {
        return {
          played: false,
          currentStep: state.currentStep + 1,
        }
    });

    await this.getNewAyah();
    this.loadNextAyah();
    this.audio.pause();
    this.audio.load();
    this.updatePills(action);
    this.audio.dispatchEvent(new Event("ended"))
    this.handlePlay()
    // if (this.state.currentStep > 5) {
    //   this.setState({
    //     showModal: true,
    //   })
    // }
  }
  public handleSkip = () => {
    this.handleAyahChange("skipped")
  }
  public handleWrongAyah = () => {
    if  (this.state.played) {
      this.handleAyahChange("wrong")
      submitAyah("incorrect", this.props.currentAyah.recordingId)

    }
  }
  public handleRightAyah = () => {
    if (this.state.played) {
      this.handleAyahChange("right")
      submitAyah("correct", this.props.currentAyah.recordingId)
    }

  }
  public handlePlay = () => {
    const siriWave = this.startWave();
    if (this.audio) {
      this.audio.addEventListener("ended", () => {
        this.setState({
          isPlaying: false,
        })
        siriWave.stop()
        if (this.siriWave.querySelector("canvas")) {
          this.siriWave.querySelector("canvas").remove()
        }
      })
      if (this.audio.paused) { // Before Playing
        this.audio.play();
        this.setState({
          isPlaying: true,
          played: true,
        });
        this.siriWave.style.display = "block";
        siriWave.start();
        this.startAnimating();
      } else {  // While Playing...
        this.audio.pause();
        this.audio.dispatchEvent(new Event("ended"))
      }
    }
  }
  public startWave = () => {
    const siriWave = new SiriWave({
      container: this.siriWave,
      width: 640,
      height: 200,
      style: "ios9",
    });
    return siriWave
  }
  public startAnimating = () => {
    const audio_context = new AudioContext();
    const input = audio_context.createMediaElementSource(this.audio.cloneNode(true));
    const meter = createAudioMeter(audio_context);
    input.connect(meter);
  }
  public handleCloseModal = () => {
    this.setState({ showModal: false });
  }
  public componentDidMount() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!this.props.currentAyah.textSimple) {
      this.getNewAyah()
    }
  }
  handleOGImage = (): string => {
    return cdnURL + '/og/evaluation_en.png'
  }
  public render() {
    const {currentAyah, profile} = this.props;
    const {isPlaying, played, pills, currentStep} = this.state;
    const ogTitle = this.props.intl.formatMessage({ id: KEYS.EVALUATE_AYAHS });
    const localName = this.props.intl.formatMessage({ id: KEYS.LOCAL_NAME })
    return (
      <Container>
        <Helmet>
          <title>{ogTitle}</title>
          <meta property={'og:title'} content={`${ogTitle} | ${localName}`} />
          <meta property={'og:image'} content={this.handleOGImage()} />
          <meta name={'twitter:title'} content={`${ogTitle} | ${localName}`} />
          <meta name={'twitter:image'} content={this.handleOGImage()} />
        </Helmet>
        <Navbar
          counterText={
            `${commaFormatter(profile.evaluationsCount)}/${commaFormatter(profile.recordingCount)}`
          }
        />
        <div id="container">
          <div className="start-text">
            <h1 className="title">
              Listen and Evaluate
            </h1>
            <div className="text">
              <p>
                Is the correct verse being recited in this recording?
              </p>
              <p>
                If so (don't worry about <em>tajweed</em>, background noise, or minor mistakes), click YES.
              </p>
              <p>
                If the wrong verse (or no verse) is recited, click NO.
              </p>
            </div>
          </div>
          <div className="cards-and-pills">
            <div className="cards">
              {
                !played ?
                  <div className="instruction hidden-sm-down">
                    Click
                    <Icon icon={play} className={'icon'} />
                    to hear the sentence.
                  </div>
                  :
                  null
              }
               {/* Start ayah-container */}
              <div className="card">
                <div className="ayah-text">
                  {
                    currentAyah.words.map((word: WordShape) => {
                      const className = classNames({
                        [word.className]: true,
                        [word.charType]: true,
                      })
                      return (
                        <span className={className}>
                          <a
                            className={className}
                            dangerouslySetInnerHTML={{ __html: word.code }}
                          />
                          {
                            word.charType === WORD_TYPES.CHAR_TYPE_WORD && (
                              <small style={{ letterSpacing: -15 }}>&nbsp;</small>
                            )
                          }
                        </span>
                      )
                    })
                  }
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

        <audio ref={(C) => this.audio = C}>
          <source src={currentAyah.audioUrl} type="audio/mp3" />
        </audio>

        <div className="primary-buttons">
          <div ref={(C) => this.siriWave = C} className={"siri-wave"} />
          <button type="button" className="vote-button yes" onClick={this.handleRightAyah} disabled={!played}>
            <Icon icon={thumbsUp} size={24} />
            <span>Yes</span>
          </button>
          <div className="primary-button play" onClick={this.handlePlay}>
            <button type="button">
              <Icon icon={!isPlaying ? play : stop} size={24} />
            </button>
            <div className="background" />
          </div>
          <button type="button" className="vote-button no" onClick={this.handleWrongAyah} disabled={!played}>
            <Icon icon={thumbsDown} size={24} />
            <span>No</span>
          </button>
        </div>

        <button type="button" className="skip vote-button" onClick={this.handleSkip}>
          <span>Skip</span>
          <Icon icon={skipForward} size={24} />
        </button>

        <button className="back-to-home vote-button" onClick={() => {
          this.props.history.push('/')
        }}>
          <span>Home</span>
          <Icon icon={chevronsLeft} size={24} />

        </button>

        <Modal
          isOpen={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          style={{height: '60%', width: '50%'}}
        >
          <ModalContent>
            <h1 className="modal-title">Thank You!</h1>
            <img src={HandShakeImage} alt="" />
            <p><b>Thanks for helping us evaluating the recited ayahs.</b></p>
            <p>With the help of users like you, we have evaluated
              <b className="count"> {this.props.profile.evaluationsCount} </b> ayahs.</p>
            <p>
              Want to help us evaluating more ayahs?
              <a href="/evaluator"> YES! </a>
            </p>
          </ModalContent>
        </Modal>
      </Container>
    )
  }
}


export default Evaluator;
