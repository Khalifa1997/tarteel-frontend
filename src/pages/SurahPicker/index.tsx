import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import Icon from "react-icons-kit";
import {arrowLeft} from 'react-icons-kit/feather/arrowLeft'
import { InjectedIntl, injectIntl } from "react-intl"
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import Truncate from "react-truncate";
import surahs from "../../api/surahs"
import Navbar from "../../components/Navbar";
import T from "../../components/T";
import KEYS from "../../locale/keys";
import AyahShape from "../../shapes/AyahShape";
import ReduxState from "../../types/GlobalState";
import {Container} from "./styles"

interface IOwnProps {
  match: any;
  intl: InjectedIntl;
}

interface IStateProps {
  currentAyah: AyahShape;
}

interface ISearchSurah {
  arabic: string;
  latin: string;
  english: string;
  location: number;
  sajda: number;
  ayah: number;
}

interface IState {
  surahs: { [num: string]: ISearchSurah};
  searchText: string;
  isFetching: boolean;
}

type IProps = IStateProps & IOwnProps;

class SurahPicker extends Component<IProps, IState> {
  public state = {
    surahs,
    searchText: "",
    isFetching: false,
  }
  public renderSurahs = () => {
    let {searchText} = this.state;
    searchText = searchText.toLowerCase().trim();
    return Object.keys(this.state.surahs)
      .filter((surahNum: string) => {
        return surahs[surahNum].arabic.includes(searchText) ||
        surahs[surahNum].english.toLocaleLowerCase().includes(searchText) ||
        surahs[surahNum].latin.toLocaleLowerCase().includes(searchText)
      })
      .map((surahNum: string) => {
        const active = this.props.currentAyah.chapterId === Number(surahNum);
        const surah = this.state.surahs[surahNum];
        return (
          <Link to={`/surah/${surahNum}`} key={surahNum} className={`list-item ${active ? "active": ""}`}>
            <p className={"number"}>{ surahNum }</p>
            <div className={"text"}>
              <p>
                <Truncate
                  lines={1}
                  ellipsis='...'
                  trimWhitespace={true}
                >
                  { surah.latin } ({surah.english})
                </Truncate>
              </p>
              <p className={"arabic"} data-surah-number={surahNum} />
            </div>
          </Link>
        )
      })
  }
  public handleSearchText = (e: any) => {
    this.setState({
      searchText: e.currentTarget.value,
    });
  }
  public render() {
    const { intl } = this.props;
    return (
      <Container>
        <Helmet>
          <title>{ intl.formatMessage({ id: KEYS.SURAH_PICKER_TITLE }) }</title>
        </Helmet>
        <Navbar/>
        <div className="content">
          <h3 className="title">
            <T id={KEYS.SURAH_PICKER_TITLE}/>
          </h3>
          <div className="search-box">
            <input type="text" name="search" onKeyUp={this.handleSearchText} placeholder={
              intl.formatMessage({
                id: KEYS.SURAH_PICKER_SEARCH_PLACEHOLDER,
              })
            } />
          </div>
          <div className="list">
            {
              this.renderSurahs()
            }
          </div>
        </div>
      </Container>
    )
  }
}


const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.ayahs.currentAyah,
  }
}


export default connect(mapStateToProps)(injectIntl(SurahPicker));
