import { History } from 'history';
import range from 'lodash/range';
import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import { Helmet } from 'react-helmet';
import { arrowLeft } from 'react-icons-kit/feather/arrowLeft';
import { defineMessages, InjectedIntl, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import Truncate from 'react-truncate';

import Icon from 'react-icons-kit';
import { Link } from 'react-router-dom';
import { fetchSpecificAyah, fetchSurah } from '../../api/ayahs';
import Navbar from '../../components/Navbar';
import T from '../../components/T';
import KEYS from '../../locale/keys';
import IAyahShape from '../../shapes/IAyahShape';
import {
  clearNextAyah,
  clearPrevAyah,
  loadNextAyah,
  loadNextQueue,
  loadPreviousAyah,
  loadPrevQueue,
  setAyah,
  setSurah,
  toggleFetchingCurrentAyah,
} from '../../store/actions/ayahs';
import ReduxState, { ISearchSurah } from '../../types/GlobalState';
import { Container } from './styles';

const messages = defineMessages({
  placeholder: {
    id: KEYS.AYAH_PICKER_SEARCH_PLACEHOLDER,
  },
});

interface IOwnProps {
  match: any;
  intl: InjectedIntl;
  history: History;
}

interface IDispatchProps {
  setAyah(ayah: IAyahShape): void;
  setSurah(surah: ISearchSurah): void;
  toggleFetchingCurrentAyah(): void;
  loadNextAyah(ayah?: IAyahShape): void;
  loadPreviousAyah(ayah?: IAyahShape): void;
  loadNextQueue(): void;
  loadPrevQueue(): void;
  clearNextAyah(): void;
  clearPrevAyah(): void;
}

interface IStateProps {
  currentAyah: IAyahShape;
  currentSurah: ISearchSurah;
}

interface IState {
  searchText: string;
  isFetching: boolean;
}

type IProps = IStateProps & IDispatchProps & IOwnProps;

class AyahPicker extends Component<IProps, IState> {
  public state = {
    searchText: '',
    isFetching: false,
  };
  public componentDidMount() {
    if (
      !this.props.currentSurah ||
      this.props.currentSurah.chapterId !== this.props.match.params.num
    ) {
      this.setState({
        isFetching: true,
      });
      fetchSurah(this.props.match.params.num).then(ayahs => {
        this.setState({
          isFetching: false,
        });
        this.props.setSurah(ayahs);
      });
    }
  }
  public handleAyahClick = (ayahNum: number) => {
    if (this.props.currentAyah.verseNumber !== ayahNum) {
      this.props.toggleFetchingCurrentAyah();
      fetchSpecificAyah(this.props.match.params.num, ayahNum).then(
        async (ayah: IAyahShape) => {
          await this.props.setAyah(ayah);
          await this.props.clearNextAyah();
          await this.props.clearPrevAyah();
          await this.props.loadNextAyah();
          await this.props.loadPreviousAyah();
          this.props.toggleFetchingCurrentAyah();
          await this.props.loadNextQueue();
          await this.props.loadPrevQueue();
        }
      );
    }
    this.props.history.replace({ pathname: '/', state: { k: 'ayahPicker' } });
  };
  public renderAyahs = () => {
    return Object.keys(this.props.currentSurah.ayahs)
      .filter((ayahNum: string) => {
        return this.props.currentSurah.ayahs[ayahNum].text
          .toLowerCase()
          .trim()
          .includes(this.state.searchText.toLowerCase().trim());
      })
      .map((ayahNum: string) => {
        ayahNum = Number(ayahNum);
        const active =
          this.props.currentAyah.surah === this.props.match.params.num &&
          this.props.currentAyah.ayah === ayahNum;
        return (
          <LazyLoad height={35} offset={0} once={true} overflow={true}>
            <div
              className={`list-item ${active ? 'active' : ''}`}
              onClick={() => this.handleAyahClick(ayahNum)}
            >
              <p className={'number'}>{ayahNum}</p>
              <p className={'text'}>
                <Truncate lines={1} ellipsis="..." trimWhitespace={true}>
                  {this.props.currentSurah.ayahs[ayahNum].displayText}
                </Truncate>
              </p>
            </div>
          </LazyLoad>
        );
      });
  };
  public handleSearchText = (e: any) => {
    this.setState({
      searchText: e.currentTarget.value,
    });
  };
  public renderLoader = () => {
    return range(6).map(n => {
      return (
        <ContentLoader height={42} style={{ transform: 'rotate(-180deg)' }}>
          {/* Pure SVG */}
          <rect x="80" y="10" rx="3" ry="3" width="250" height="10" />
          <rect x="35" y="8" rx="5" ry="5" width="15" height="15" />
        </ContentLoader>
      );
    });
  };
  public render() {
    const { intl } = this.props;
    return (
      <Container>
        <Helmet>
          <title>{intl.formatMessage({ id: KEYS.AYAH_PICKER_TITLE })}</title>
        </Helmet>
        <Navbar />
        <div className="content">
          <Link to={'/surahs'} className="back-to-surah">
            <Icon icon={arrowLeft} />
            <T id={KEYS.AYAH_PICKER_BACK_BUTTON_TEXT} />
          </Link>
          <h3 className="title">
            <T id={KEYS.AYAH_PICKER_TITLE} />
          </h3>
          <div className="search-box">
            <input
              type="text"
              name="search"
              onKeyUp={this.handleSearchText}
              placeholder={intl.formatMessage(messages.placeholder)}
            />
          </div>
          <div className="list">
            {this.state.isFetching ? this.renderLoader() : this.renderAyahs()}
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.ayahs.currentAyah,
    currentSurah: state.ayahs.currentSurah,
  };
};

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    setAyah: (ayah: IAyahShape) => {
      return dispatch(setAyah(ayah));
    },
    toggleFetchingCurrentAyah: () => {
      dispatch(toggleFetchingCurrentAyah());
    },
    setSurah: (surah: ISearchSurah) => {
      dispatch(setSurah(surah));
    },
    loadNextAyah: (ayah?: IAyahShape) => {
      return dispatch(loadNextAyah(ayah));
    },
    loadPreviousAyah: (ayah?: IAyahShape) => {
      return dispatch(loadPreviousAyah(ayah));
    },
    loadNextQueue: () => {
      return dispatch(loadNextQueue());
    },
    loadPrevQueue: () => {
      return dispatch(loadPrevQueue());
    },
    clearNextAyah: () => {
      return dispatch(clearNextAyah());
    },
    clearPrevAyah: () => {
      return dispatch(clearPrevAyah());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AyahPicker));
