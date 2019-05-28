import humps from 'humps';
import React, { Component } from 'react';
import ReduxState, { IProfile } from '../../types/GlobalState';
import { Helmet } from 'react-helmet';
import { injectIntl, InjectedIntl } from 'react-intl';
import { withCookies } from 'react-cookie';

import { connect } from 'react-redux';
import { fetchProfileData } from '../../api';
import KEYS from '../../locale/keys';
import { Container, Boxed } from './styles';
import { getCookie } from '../../helpers/cookie';
import ShareModal from '../../components/ShareModal';
import Navbar from '../../components/Navbar';
import T from '../../components/T';
import Headline from '../../components/Headline';
import Demographics from '../../components/Demographics';
import Subscribe from '../../components/Subscribe';
import Note from '../../components/Note';
import downArrow from '../../../public/images/icons/svg/down-arrow.svg';

interface IDispatchProps {}

interface IOwnProps {
  intl: InjectedIntl;
}

interface IStateProps {
  profile: IProfile;
}

interface IState {
  data: any;
  openDemographics: boolean;
  openSubscribe: boolean;
  showShareModal: boolean;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class ProfilePage extends Component<IProps, IState> {
  public state = {
    data: {
      recentDict: {},
      oldDict: {},
    },
    openDemographics: this.props.cookies.get('demographicData') ? false : true,
    openSubscribe: this.props.cookies.get('isSubscribed') ? false : true,
    showShareModal: false,
  };
  toggleMenu = (toggleSection: string) => {
    this.setState(state => ({ [toggleSection]: !state[toggleSection] }));
  };
  handleShareProfile = () => {
    this.setState({
      showShareModal: true,
    });
  };
  public async componentDidMount() {
    const sessionId = this.props.match.params.sessionId;
    const data = humps.camelizeKeys(await fetchProfileData(sessionId));
    this.setState({ data });

    // Importing this here is to avoid `window is not defined` error on the server while SSR
    import('chart.js/dist/Chart.js').then(Chart => {
      Chart = Chart.default;
      const ctx = document.getElementById('weekly_chart').getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
          labels: this.state.data.dates,
          datasets: [
            {
              backgroundColor: '#5fc49e',
              data: this.state.data.weeklyCounts,
            },
          ],
        },

        // Configuration options go here
        options: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Weekly Progress',
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMax: 10,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Verses',
                },
              },
            ],
          },
        },
      });
    });
  }
  public render() {
    const { openDemographics, openSubscribe } = this.state;
    const { recentDict, oldDict } = this.state.data;
    const { sessionId, userRecitedAyahs } = this.props.profile;
    return (
      <Container>
        <Helmet>
          <title>
            {this.props.intl.formatMessage({ id: KEYS.PROFILE_TITLE })}
          </title>
        </Helmet>
        <Navbar />
        <div className="content">
          <a className="share-profile-link" onClick={this.handleShareProfile}>
            <T id={KEYS.PROFILE_SHARE_MESSAGE} />
          </a>
          <Boxed>
            <Note
              message={KEYS.PROFILE_NOTE_MESSAGE}
              fontSize={11}
              align={'left'}
              grey
            />
            <img
              width={20}
              className={openDemographics ? '' : 'rotate'}
              onClick={() => this.toggleMenu('openDemographics')}
              src={downArrow}
              title={'Down Arrow icon'}
            />
            <Headline
              headtag={KEYS.DEMOGRAPHIC_INFO_LINK_TEXT}
              paragraph={
                openDemographics
                  ? KEYS.DEMOGRAPHIC_PAGE_FIRST_PARAGRAPH_3
                  : null
              }
              headtagSize={20}
              width={85}
              align={'left'}
              paragraphGray
            />
            {openDemographics && <Demographics />}
          </Boxed>
        </div>
        <div className="content">
          <Boxed>
            <Note
              message={KEYS.PROFILE_NOTE_MESSAGE}
              fontSize={11}
              align={'left'}
              grey
            />
            <img
              width={20}
              className={openSubscribe ? '' : 'rotate'}
              onClick={() => this.toggleMenu('openSubscribe')}
              src={downArrow}
              title={'Down Arrow icon'}
            />
            <Headline
              headtag={KEYS.SUBSCRIBE_PAGE_TEMPLATE_TITLE}
              paragraph={
                openSubscribe ? KEYS.SUBSCRIBE_PAGE_RECEIVE_MESSAGE : null
              }
              headtagSize={23}
              width={85}
              align={'left'}
              paragraphGray
            />
            {openSubscribe && <Subscribe />}
          </Boxed>
        </div>
        <div className="content">
          <Boxed>
            <div className="info profile-info" id="start-text">
              <h1>
                <T id={KEYS.YOUR_RECITATIONS} />
              </h1>
              <p>
                <T id={KEYS.PROFILE_THANKS_USER_FOR_CONTRIBUTING_MESSAGE} />
                {userRecitedAyahs ? (
                  <span>
                    <T id={KEYS.PROFILE_TOTAL_OF_VERSES_HAS_BEEN_RECITED} />
                  </span>
                ) : null}
                <T
                  id={KEYS.PROFILE_SEE_STATISTICS_MESSAGE}
                  values={{ sessionId }}
                />
              </p>
              <p>
                <div className="profile-link">
                  <div className="link">
                    <a href={`https://www.tarteel.io/profile/${sessionId}`}>
                      <div className="select">
                        https://www.tarteel.io/profile/{sessionId}
                      </div>
                    </a>
                  </div>
                </div>
              </p>
              <h1>
                <T id={KEYS.PROFILE_WEEKLY_ACTIVITY} />
              </h1>
              <div className="canvas-container" id="weekly-canvas">
                <canvas id="weekly_chart" />
              </div>

              <Headline
                headtag={KEYS.PROFILE_VERSES_RECITED_LAST_WEEK}
                paragraph={KEYS.PROFILE_VERSES_RECITED_PARAGRAPH_MESSAGE}
                headtagSize={20}
                width={85}
                align={'left'}
                paragraphGray
              />
              <table className="recitations">
                <col width="50" />
                <col width="150" />
                <tr>
                  <th>
                    <T id={KEYS.SURAH_WORD} />
                  </th>
                  <th>
                    <T id={KEYS.AYAHS_WORD} />
                  </th>
                </tr>
                {Object.keys(recentDict).map(surahKey => {
                  return (
                    <tr>
                      <td>
                        <T id={KEYS.SURAH_WORD} /> {surahKey}
                      </td>
                      <td>
                        {recentDict[surahKey].map(([ayahNum, link]) => {
                          return (
                            <a href={link} target="recording">
                              {ayahNum}
                            </a>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </table>

              <Headline
                headtag={KEYS.PROFILE_OLDER_RECITATIONS}
                paragraph={KEYS.PROFILE_OLDER_RECITATIONS_PARAGRAPH_MESSAGE}
                headtagSize={20}
                width={85}
                align={'left'}
                paragraphGray
              />
              <table className="recitations">
                <col width="50" />
                <col width="150" />
                <tr>
                  <th>
                    <T id={KEYS.SURAH_WORD} />
                  </th>
                  <th>
                    <T id={KEYS.AYAHS_WORD} />
                  </th>
                </tr>
                {Object.keys(oldDict).map(surahKey => {
                  return (
                    <tr>
                      <td>
                        <T id={KEYS.SURAH_WORD} /> {surahKey}
                      </td>
                      <td>
                        {oldDict[surahKey].map(([ayahNum, link]) => {
                          return (
                            <a href={link} target="recording">
                              {ayahNum}
                            </a>
                          );
                        })}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </Boxed>
        </div>
        <ShareModal
          show={this.state.showShareModal}
          quote={``}
          url={`https://www.tarteel.io/profile/${sessionId}`}
          handleCloseModal={() => {
            this.setState({ showShareModal: false });
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    profile: state.profile,
  };
};

export default injectIntl(withCookies(connect(mapStateToProps)(ProfilePage)));
