import React from 'react';
import { Icon } from 'react-icons-kit';
import { circleONotch } from 'react-icons-kit/fa/circleONotch';
import { micA } from 'react-icons-kit/ionicons/micA';
import { stop } from 'react-icons-kit/fa/stop';
import classNames from 'classnames';
import io from 'socket.io-client';
import humps from 'humps';
import Fullscreen from 'react-full-screen';
import Helmet from 'react-helmet';
import { injectIntl, InjectedIntl } from 'react-intl';
import { withCookies } from 'react-cookie';

import { Container } from './styles';
import Navbar from '../../components/Navbar';
import RecordingButton from '../../components/RecordingButton';
import AudioStreamer from '../../helpers/AudioStreamer';
import config from '../../../config';
import { WORD_TYPES } from '../../types';
import KEYS from '../../locale/keys';
import T from '../../components/T';
import WordShape from '../../shapes/WordShape';
import RecordingError from '../../components/RecordingError';
import expandIcon from '../../../public/images/icons/svg/expand.svg';
import collapseIcon from '../../../public/images/icons/svg/collapse.svg';
import settingsIcon from '../../../public/images/icons/svg/settings.svg';
import LogoImage from '../../../public/logo-3x.png';

const testingSurah = [
  {
    verse_number: 1,
    chapter_id: 1,
    text_madani: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    text_simple: 'بسم الله الرحمن الرحيم',
    sajdah: null,
    translations: [
      {
        language_name: 'english',
        text: 'Bismi Allahi arrahmani arraheem',
        resource_name: 'Transliteration',
      },
    ],
    words: [
      {
        text_madani: 'بِسْمِ',
        text_simple: 'بسم',
        class_name: 'p1',
        code: '&#xfb51;',
        char_type: 'word',
      },
      {
        text_madani: 'اللَّهِ',
        text_simple: 'الله',
        class_name: 'p1',
        code: '&#xfb52;',
        char_type: 'word',
      },
      {
        text_madani: 'الرَّحْمَٰنِ',
        text_simple: 'الرحمان',
        class_name: 'p1',
        code: '&#xfb53;',
        char_type: 'word',
      },
      {
        text_madani: 'الرَّحِيمِ',
        text_simple: 'الرحيم',
        class_name: 'p1',
        code: '&#xfb54;',
        char_type: 'word',
      },
      {
        text_madani: null,
        text_simple: null,
        class_name: 'p1',
        code: '&#xfb55;',
        char_type: 'end',
      },
    ],
  },
  {
    verse_number: 2,
    chapter_id: 1,
    text_madani: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    text_simple: 'الحمد لله رب العالمين',
    sajdah: null,
    translations: [
      {
        language_name: 'english',
        text: 'Alhamdu lillahi rabbi alAAalameen',
        resource_name: 'Transliteration',
      },
    ],
    words: [
      {
        text_madani: 'الْحَمْدُ',
        text_simple: 'الحمد',
        class_name: 'p1',
        code: '&#xfb56;',
        char_type: 'word',
      },
      {
        text_madani: 'لِلَّهِ',
        text_simple: 'لله',
        class_name: 'p1',
        code: '&#xfb57;',
        char_type: 'word',
      },
      {
        text_madani: 'رَبِّ',
        text_simple: 'رب',
        class_name: 'p1',
        code: '&#xfb58;',
        char_type: 'word',
      },
      {
        text_madani: 'الْعَالَمِينَ',
        text_simple: 'العالمين',
        class_name: 'p1',
        code: '&#xfb59;',
        char_type: 'word',
      },
      {
        text_madani: null,
        text_simple: null,
        class_name: 'p1',
        code: '&#xfb5a;',
        char_type: 'end',
      },
    ],
  },
  {
    verse_number: 3,
    chapter_id: 1,
    text_madani: 'الرَّحْمَٰنِ الرَّحِيمِ',
    text_simple: 'الرحمن الرحيم',
    sajdah: null,
    translations: [
      {
        language_name: 'english',
        text: 'Arrahmani arraheem',
        resource_name: 'Transliteration',
      },
    ],
    words: [
      {
        text_madani: 'الرَّحْمَٰنِ',
        text_simple: 'الرحمان',
        class_name: 'p1',
        code: '&#xfb5b;',
        char_type: 'word',
      },
      {
        text_madani: 'الرَّحِيمِ',
        text_simple: 'الرحيم',
        class_name: 'p1',
        code: '&#xfb5c;',
        char_type: 'word',
      },
      {
        text_madani: null,
        text_simple: null,
        class_name: 'p1',
        code: '&#xfb5d;',
        char_type: 'end',
      },
    ],
  },
  {
    verse_number: 4,
    chapter_id: 1,
    text_madani: 'مَالِكِ يَوْمِ الدِّينِ',
    text_simple: 'مالك يوم الدين',
    sajdah: null,
    translations: [
      {
        language_name: 'english',
        text: 'Maliki yawmi addeen',
        resource_name: 'Transliteration',
      },
    ],
    words: [
      {
        text_madani: 'مَالِكِ',
        text_simple: 'مالك',
        class_name: 'p1',
        code: '&#xfb5e;',
        char_type: 'word',
      },
      {
        text_madani: 'يَوْمِ',
        text_simple: 'يوم',
        class_name: 'p1',
        code: '&#xfb5f;',
        char_type: 'word',
      },
      {
        text_madani: 'الدِّينِ',
        text_simple: 'الدين',
        class_name: 'p1',
        code: '&#xfb60;',
        char_type: 'word',
      },
      {
        text_madani: null,
        text_simple: null,
        class_name: 'p1',
        code: '&#xfb61;',
        char_type: 'end',
      },
    ],
  },
  {
    verse_number: 5,
    chapter_id: 1,
    text_madani: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    text_simple: 'اياك نعبد واياك نستعين',
    sajdah: null,
    translations: [
      {
        language_name: 'english',
        text: 'Iyyaka naAAbudu wa-iyyaka nastaAAeen',
        resource_name: 'Transliteration',
      },
    ],
    words: [
      {
        text_madani: 'إِيَّاكَ',
        text_simple: 'اياك',
        class_name: 'p1',
        code: '&#xfb62;',
        char_type: 'word',
      },
      {
        text_madani: 'نَعْبُدُ',
        text_simple: 'نعبد',
        class_name: 'p1',
        code: '&#xfb63;',
        char_type: 'word',
      },
      {
        text_madani: 'وَإِيَّاكَ',
        text_simple: 'واياك',
        class_name: 'p1',
        code: '&#xfb64;',
        char_type: 'word',
      },
      {
        text_madani: 'نَسْتَعِينُ',
        text_simple: 'نستعين',
        class_name: 'p1',
        code: '&#xfb65;',
        char_type: 'word',
      },
      {
        text_madani: null,
        text_simple: null,
        class_name: 'p1',
        code: '&#xfb66;',
        char_type: 'end',
      },
    ],
  },
  {
    verse_number: 6,
    chapter_id: 1,
    text_madani: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    text_simple: 'اهدنا الصراط المستقيم',
    sajdah: null,
    translations: [
      {
        language_name: 'english',
        text: 'Ihdina assirata almustaqeem',
        resource_name: 'Transliteration',
      },
    ],
    words: [
      {
        text_madani: 'اهْدِنَا',
        text_simple: 'اهدنا',
        class_name: 'p1',
        code: '&#xfb67;',
        char_type: 'word',
      },
      {
        text_madani: 'الصِّرَاطَ',
        text_simple: 'الصراط',
        class_name: 'p1',
        code: '&#xfb68;',
        char_type: 'word',
      },
      {
        text_madani: 'الْمُسْتَقِيمَ',
        text_simple: 'المستقيم',
        class_name: 'p1',
        code: '&#xfb69;',
        char_type: 'word',
      },
      {
        text_madani: null,
        text_simple: null,
        class_name: 'p1',
        code: '&#xfb6a;',
        char_type: 'end',
      },
    ],
  },
  {
    verse_number: 7,
    chapter_id: 1,
    text_madani:
      'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    text_simple: 'صراط الذين انعمت عليهم غير المغضوب عليهم ولا الضالين',
    sajdah: null,
    translations: [
      {
        language_name: 'english',
        text:
          'Sirata allatheena anAAamta AAalayhim ghayri almaghdoobi AAalayhim wala addalleen',
        resource_name: 'Transliteration',
      },
    ],
    words: [
      {
        text_madani: 'صِرَاطَ',
        text_simple: 'صراط',
        class_name: 'p1',
        code: '&#xfb6b;',
        char_type: 'word',
      },
      {
        text_madani: 'الَّذِينَ',
        text_simple: 'الذين',
        class_name: 'p1',
        code: '&#xfb6c;',
        char_type: 'word',
      },
      {
        text_madani: 'أَنْعَمْتَ',
        text_simple: 'انعمت',
        class_name: 'p1',
        code: '&#xfb6d;',
        char_type: 'word',
      },
      {
        text_madani: 'عَلَيْهِمْ',
        text_simple: 'عليهم',
        class_name: 'p1',
        code: '&#xfb6e;',
        char_type: 'word',
      },
      {
        text_madani: 'غَيْرِ',
        text_simple: 'غير',
        class_name: 'p1',
        code: '&#xfb6f;',
        char_type: 'word',
      },
      {
        text_madani: 'الْمَغْضُوبِ',
        text_simple: 'المغضوب',
        class_name: 'p1',
        code: '&#xfb70;',
        char_type: 'word',
      },
      {
        text_madani: 'عَلَيْهِمْ',
        text_simple: 'عليهم',
        class_name: 'p1',
        code: '&#xfb71;',
        char_type: 'word',
      },
      {
        text_madani: 'وَلَا',
        text_simple: 'ولا',
        class_name: 'p1',
        code: '&#xfb72;',
        char_type: 'word',
      },
      {
        text_madani: 'الضَّالِّينَ',
        text_simple: 'الضالين',
        class_name: 'p1',
        code: '&#xfb73;',
        char_type: 'word',
      },
      {
        text_madani: null,
        text_simple: null,
        class_name: 'p1',
        code: '&#xfb74;',
        char_type: 'end',
      },
    ],
  },
];

interface IProps {
  intl: InjectedIntl;
}

interface IState {
  isRecording: boolean;
  isLoading: boolean;
  showErrorMessage: boolean;
  fullScreen: boolean;
}

class Transcribe extends React.Component<IProps, IState> {
  socket: any;

  state = {
    isLoading: false,
    isRecording: false,
    showErrorMessage: false,
    currentAyah: 0,
    fullScreen: false,
    // todo: replace placeholders
    surahNumber: 42,
    surahName: 'Al-Tawbah',
    ayahNumber: 108,
    ayahText: 'Lorem ipsum',
    secondaryText:
      "Take, [O, Muhammad], from their wealth a charity by which you purify them and cause them increase, and invoke [ Allah 's blessings] upon them. Indeed, your invocations are reassurance for them. And Allah is Hearing and Knowing.",
    tertiaryText: null, //text for the optional third paragraph
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
  handleSearch = () => {};
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
  toggleFullscreen = () => {
    this.setState({
      fullScreen: !this.state.fullScreen,
    });
  };
  handleOGImage = () => {
    const locale = this.props.cookies.get('currentLocale') || 'en';
    return `/public/og/recognition_${locale}.png`;
  };
  renderAyah = () => {
    return (
      testingSurah[this.state.currentAyah].words.map((word: WordShape, i) => {
        word = humps.camelizeKeys(word);
        const className = classNames({
          [word.className]: true,
          [word.charType]: true,
        });
        return (
          <span key={i}>
            <a
              className={className}
              dangerouslySetInnerHTML={{ __html: word.code }}
            />
            {word.charType === WORD_TYPES.CHAR_TYPE_WORD && (
              <small style={{ letterSpacing: -15 }}>&nbsp;</small>
            )}
          </span>
        );
      }) || (
        <em>
          <T id={KEYS.AYAH_COMPONENT_LOADING_MESSAGE} />
        </em>
      )
    );
  };
  drawMatch = result => {
    const wordsList = document.querySelector('.ayah-display').children;
    wordsList[result.index].classList.add('active');
  };
  revertColor = () => {
    const wordsList = document.querySelector('.ayah-display').children;
    Array.from(wordsList).forEach(element => {
      element.classList.remove('active');
    });
  };
  setNextAyah = () => {
    this.revertColor();
    this.setState(state => ({
      currentAyah: state.currentAyah + 1,
    }));
    this.socket.emit(
      'setCurrentAyah',
      testingSurah[this.state.currentAyah].text_simple
    );
  };
  componentDidMount() {
    const speechServerURL = config('voiceServerURL');
    this.socket = window.socket || io(speechServerURL);

    this.socket.on('loading', this.setLoading);
    this.socket.on('endStream', this.handleStopRecording);

    this.socket.emit(
      'setCurrentAyah',
      testingSurah[this.state.currentAyah].text_simple
    );
    this.socket.on('handleMatchingResult', this.drawMatch);
    this.socket.on('nextAyah', this.setNextAyah);

    const options = {
      type: 'transcribe',
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
        {this.state.showErrorMessage ? (
          <RecordingError
            onClose={() => {
              this.setState({ showErrorMessage: false });
            }}
          />
        ) : null}
        <div className={'content'}>
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
            <div className="ayah-display">{this.renderAyah()}</div>
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
              <a className="donate-link" href="https://tarteel.io/donate">
                tarteel.io/donate
              </a>
            </div>
          </Fullscreen>
        </div>
      </Container>
    );
  }
}

export default injectIntl(withCookies(Transcribe));
