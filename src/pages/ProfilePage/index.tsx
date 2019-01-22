import React, {Component} from "react"
import humps from "humps";
import {Helmet} from "react-helmet";

import T from "../../components/T";
import KEYS from "../../locale/keys";
import {Container} from "./styles";
import {fetchAboutData, fetchProfileData} from "../../api";
import Navbar from "../../components/Navbar";
import {connect} from "react-redux";
import ReduxState, {IProfile} from "../../types/GlobalState";

interface IDispatchProps {

}

interface IOwnProps {

}

interface IStateProps {
  profile: IProfile;
}

interface IState {
  data: any;
}

type IProps = IOwnProps & IDispatchProps & IStateProps;

class ProfilePage extends Component<IProps, IState> {
  state = {
    data: {
      recentDict: {},
      oldDict: {},
    }
  }
  async componentDidMount() {
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
            }]
          },

          // Configuration options go here
          options: {
            legend:{
              display:false
            },
            title: {
              display: true,
              text: 'Weekly Progress'
            },
            scales: {
              yAxes: [{
                ticks: {
                  suggestedMax: 10
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Verses',
                }
              }],
            },
          },
        });
      })
  }
  render() {
    const {recentDict, oldDict} = this.state.data;
    const {sessionKey, userRecitedAyahs} = this.props.profile
    return (
      <Container>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Navbar />
        <div className={"content"}>
          <div className="info" id="start-text">

            <h1>Your Recitations</h1>
            <p> Thank you for your work in contributing to Tarteel.
            {
              userRecitedAyahs ?
                <span>You have recited a total of <strong>{userRecitedAyahs}</strong> verses.</span>
                :
                  null

            }
            This information is based only on
              sessions recorded
              using this particular device and browser, and may not show up if you clear your cache or use a different
              browser. If you'd like to see these statistics on a different device or <a
                href={`https://facebook.com/sharer/sharer.php?u=https://www.tarteel.io/profile/${sessionKey}`}
                target="_blank" aria-label="">
                share</a> these statistics,
              please use the following permalink: </p>
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
            <h1>Your Weekly Activity</h1>
            <div className="canvas-container" id="weekly-canvas">
              <canvas id="weekly_chart" />
            </div>

            <h1>Verses Recited Last Week</h1>
            <p>These are the verses you recited over the past week. Click on a verse to listen to its recording.</p>
            <table className="recitations">
              <col width="50" />
                <col width="150" />
                  <tr>
                    <th>Surah</th>
                    <th>Ayahs</th>
                  </tr>
                  {
                    Object.keys(recentDict).map(surahKey => {
                      return (
                        <tr>
                          <td>Surah {surahKey}</td>
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

            <h1>Older Recitations</h1>
            <p>These are the verses more than a week ago. Click on a verse to listen to its recording.</p>
            <table className="recitations">
              <col width="50" />
                <col width="150" />
                  <tr>
                    <th>Surah</th>
                    <th>Ayahs</th>
                  </tr>
                  {
                    Object.keys(oldDict).map(surahKey => {
                      return (
                        <tr>
                          <td>Surah {surahKey}</td>
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

export default connect(mapStateToProps)(ProfilePage)
