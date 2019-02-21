import humps from "humps";
import React, {Component} from "react"
import {Helmet} from "react-helmet";
import {injectIntl, InjectedIntl} from 'react-intl';

import {connect} from "react-redux";
import {fetchAboutData, fetchProfileData} from "../../api";
import Navbar from "../../components/Navbar";
import T from "../../components/T";
import KEYS from "../../locale/keys";
import ReduxState, {IProfile} from "../../types/GlobalState";
import {Container} from "./styles";
import logScreen from "../../helpers/logScreen";

interface IDispatchProps {

}

interface IOwnProps {
  intl: InjectedIntl;
}

interface IStateProps {
  profile: IProfile;
}

interface IState {
  data: any;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class ProfilePage extends Component<IProps, IState> {
  public state = {
    data: {
      recentDict: {},
      oldDict: {},
    },
  }
  public async componentDidMount() {
    logScreen();
    const sessionKey = this.props.match.params.sessionKey;
    const data = humps.camelizeKeys(await fetchProfileData(sessionKey));
    this.setState({data});

    // Importing this here is to avoid `window is not defined` error on the server while SSR
    import('chart.js/dist/Chart.js')
      .then((Chart) => {
        Chart = Chart.default;
        const ctx = document.getElementById('weekly_chart').getContext('2d');
        const chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'bar',

          // The data for our dataset
          data: {
            labels: this.state.data.dates,
            datasets: [{
              backgroundColor: '#5fc49e',
              data: this.state.data.weeklyCounts,
            }],
          },

          // Configuration options go here
          options: {
            legend:{
              display:false,
            },
            title: {
              display: true,
              text: 'Weekly Progress',
            },
            scales: {
              yAxes: [{
                ticks: {
                  suggestedMax: 10,
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Verses',
                },
              }],
            },
          },
        });
      })
  }
  public render() {
    const {recentDict, oldDict} = this.state.data;
    const {sessionKey, userRecitedAyahs} = this.props.profile
    return (
      <Container>
        <Helmet>
          <title>
            {
              this.props.intl.formatMessage({ id: KEYS.PROFILE_TITLE })
            }
          </title>
        </Helmet>
        <Navbar />
        <div className={"content"}>
          <div className="info" id="start-text">

            <h1>
              <T id={KEYS.YOUR_RECITATIONS} />
            </h1>
            <p>
              <T id={KEYS.PROFILE_THANKS_USER_FOR_CONTRIBUTING_MESSAGE} />
              {
                userRecitedAyahs ?
                  <span>
                    <T id={KEYS.PROFILE_TOTAL_OF_VERSES_HAS_BEEN_RECITED} />
                  </span>
                  :
                  null

              }
              <T id={KEYS.PROFILE_SEE_STATISTICS_MESSAGE} values={{ sessionKey}} />
            </p>
            <p>
              <div className="profile-link">
                <div className="link">
                  <a
                    href={`https://www.tarteel.io/profile/${sessionKey}`}>
                    <div className="select">https://www.tarteel.io/profile/{sessionKey}</div>
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

            <h1>
              <T id={KEYS.PROFILE_VERSES_RECITED_LAST_WEEK} />
            </h1>
            <p>
              <T id={KEYS.PROFILE_VERSES_RECITED_PARAGRAPH_MESSAGE} />
            </p>
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
                  {
                    Object.keys(recentDict).map(surahKey => {
                      return (
                        <tr>
                          <td><T id={KEYS.SURAH_WORD} /> {surahKey}</td>
                            <td>
                              {
                                recentDict[surahKey].map(([ayahNum, link]) => {
                                  return (
                                    <a href={link} target="recording">{ayahNum}</a>
                                  )
                                })
                              }
                            </td>
                        </tr>
                      )
                    })
                  }
            </table>

            <h1>
              <T id={KEYS.PROFILE_OLDER_RECITATIONS} />
            </h1>
            <p>
              <T id={KEYS.PROFILE_OLDER_RECITATIONS_PARAGRAPH_MESSAGE} />
            </p>
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
                  {
                    Object.keys(oldDict).map(surahKey => {
                      return (
                        <tr>
                          <td><T id={KEYS.SURAH_WORD} /> {surahKey}</td>
                          <td>
                            {
                              oldDict[surahKey].map(([ayahNum, link]) => {
                                return (
                                  <a href={link} target="recording">{ayahNum}</a>
                                )
                              })
                            }
                          </td>
                        </tr>
                      )
                    })
                  }
            </table>
          </div>
        </div>
      </Container>
    );
  }

}

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    profile: state.profile,
  }
}

export default injectIntl(connect(mapStateToProps)(ProfilePage))
