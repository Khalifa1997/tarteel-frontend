import Chart from 'chart.js/dist/Chart.bundle.min'
import humps from 'humps';
import ProgressBar from "progressbar.js"
import React, {Component} from "react"
import {Helmet} from "react-helmet";
import {InjectedIntl, injectIntl} from "react-intl"

import config from '../../../config';
import {fetchAboutData} from "../../api";
import FooterButton from "../../components/FooterButton";
import Navbar from "../../components/Navbar";
import T from "../../components/T";
import {commaFormatter} from "../../helpers/utils";
import KEYS from "../../locale/keys";
import {Container} from "./styles";
import {connect} from "react-redux";
import ReduxState, {IProfile} from "../../types/GlobalState";


interface IOwnProps {
  intl: InjectedIntl
}

interface IStateProps {
  profile: IProfile;
}

interface IState {
  data: any;
}

type IProps = IOwnProps & IStateProps;

class About extends Component<IProps, IState> {
  state = {
    data: {},
  }
  async componentDidMount() {
    const data = humps.camelizeKeys(await fetchAboutData())
    this.setState({data});

    const recitedAyahs = this.state.data.recordingCount;
    const counter = document.querySelector(".progress-counter")
    const bar = new ProgressBar.Circle(counter, {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false,
      },
      from: { color: '#5ec49e', width: 1 },
      to: { color: '#5ec49e', width: 4 },
      // Set default step function for all animate calls
      step: (state, circle) =>  {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
        // var value = Math.round(circle.value() * 50000);
        const value = Math.round(circle.value() * recitedAyahs * config('objective')/ recitedAyahs );
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(commaFormatter(value));
        };
      },
    });
    bar.text.style.fontFamily = 'Proxima Nova';
    bar.text.style.fontSize = '2rem';
    const animate_value = recitedAyahs/config('objective');
    bar.animate(animate_value);  // Number from 0.0 to 1.0


    const genderCTX = document.getElementById('gender_chart').getContext('2d');
    const backgroundColors2 = ["#8e5ea2", "#3e95cd"]
    const backgroundColors6 = ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#8888aa"]

    const genderChart = new Chart(genderCTX, {
      // The type of chart we want to create
      type: 'doughnut',

      // The data for our dataset
      data: {
        labels: this.state.data.genderLabels,
    datasets: [{
      label: "Reported Gender",
      backgroundColor: backgroundColors2,
      data: this.state.data.genderData,
  }],
  },

    // Configuration options go here
    options: {
      title: {
        display: true,
          text: 'Reported Gender',
      },
    },
  });

    const ageCTX = document.getElementById('age_chart').getContext('2d');
    const ageChart = new Chart(ageCTX, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: this.state.data.ageLabels,
    datasets: [{
      backgroundColor:  backgroundColors6,
      data: this.state.data.ageData,
  }],
  },

    // Configuration options go here
    options: {
      legend:{
        display:false,
      },
      title: {
        display: true,
          text: 'Reported Age',
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number of Users',
          },
        }],
      },
    },
  });
  //
    const ethnicityCTX = document.getElementById('ethnicity_chart').getContext('2d');
    const ethnicityChart = new Chart(ethnicityCTX, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: this.state.data.ethnicityLabels,
    datasets: [{
      backgroundColor:  backgroundColors6,
      data: this.state.data.ethnicityData,
  }],
  },

    // Configuration options go here
    options: {
      legend:{
        display:false,
      },
      title: {
        display: true,
          text: 'Reported Ethnic Background',
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number of Users',
          },
        }],
      },
    },
  });


    const ayahCTX = document.getElementById('ayah_chart').getContext('2d');
    const ayahChart = new Chart(ayahCTX, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: this.state.data.countLabels,
    datasets: [{
      backgroundColor:  backgroundColors6,
      data: this.state.data.countData,
  }],
  },

    // Configuration options go here
    options: {
      legend:{
        display:false,
      },
      title: {
        display: true,
          text: 'How many verses have __ # of recordings',
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number of verses',
          },
          ticks: {
            min: 0,
          },
        }],
      },
    },
  });


  }
  render() {
    const {intl} = this.props;
    const rtl = intl.messages.local === "arabic" ? "rtl" : "";
    return (
      <Container>
        <Helmet>
          <title>
            { intl.formatMessage({ id: KEYS.ABOUT_PAGE_TEMPLATE_TITLE }) }
          </title>
        </Helmet>
        <Navbar />
        <div className="content">
          <div className={"header"}>
            <div className="progress-counter">
              <p className='counter-text large-arabic-text'>
                <T id={KEYS.AYAHS_RECITED} />
              </p>
            </div>
            <p className="large-arabic-text text-center">
              <T
                id={KEYS.ABOUT_PAGE_RECITED_AYAHS_MESSAGE}
                values={{
                  users: this.state.data.uniqueUserCount,
                  recitedAyahs: commaFormatter(this.props.profile.recordingCount),
                }} />
            </p>
          </div>

          <div className="core-text" >
            <div className="info">

              <h2 className={rtl}>
                <T id={KEYS.ABOUT_PAGE_FIRST_PARAGRAPH_TITLE} />
              </h2>
              <p className={`${rtl} large-arabic-text`}>
                <T id={KEYS.ABOUT_PAGE_FIRST_PARAGRAPH_TEXT} />
              </p>

              <h2 className={rtl}>
                <T id={KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TITLE} />
              </h2>
              <p className={`${rtl} large-arabic-text`}>
                <T id={KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TEXT_1} />
              </p>
              <br /> <br />
              <p className={`${rtl} large-arabic-text`}>
                <T id={KEYS.ABOUT_PAGE_SECOND_PARAGRAPH_TEXT_2} />
              </p>
              <ul className={`${rtl} list`}>
                <li className="large-arabic-text">
                  <T id={KEYS.FIELDS_OF_USE_FIRST_ITEM} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.FIELDS_OF_USE_SECOND_ITEM} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.FIELDS_OF_USE_THIRD_ITEM} />
                </li>
              </ul>


              <h2 className={rtl}>
                <T id={KEYS.ABOUT_PAGE_THIRD_PARAGRAPH_TITLE} />
              </h2>

              <p className={`${rtl} large-arabic-text`}>
                <T id={KEYS.ABOUT_PAGE_THIRD_PARAGRAPH_TEXT} />
              </p>
              <ul className={`${rtl} list`}>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_1} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_2} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_3} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_4} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_5} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_6} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_7} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_8} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_9} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_10} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_11} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_12} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_13} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_14} />
                </li>
                <li className="large-arabic-text">
                  <T id={KEYS.CONTRIBUTOR_15} />
                </li>
              </ul>

              <h2 className={rtl}>
                <T id={KEYS.ABOUT_PAGE_FOURTH_PARAGRAPH_TITLE} />
              </h2>
              <p className={`${rtl} large-arabic-text`}>
                <T id={KEYS.ABOUT_PAGE_FOURTH_PARAGRAPH_TEXT} />
              </p>

              <h2 className={rtl}>
                <T id={KEYS.ABOUT_PAGE_FIFTH_PARAGRAPH_TITLE} />
              </h2>
              <div className="canvas-container" id="gender-canvas">
                <canvas id="gender_chart" />
              </div>
              <p>&nbsp;</p>
              <div className="canvas-container" id="age-canvas">
                <canvas id="age_chart" />
              </div>
              <p>&nbsp;</p>
              <div className="canvas-container" id="ethnicity-canvas">
                <canvas id="ethnicity_chart" />
              </div>

              <h2 className={rtl}>
                <T id={KEYS.ABOUT_PAGE_SIXTH_PARAGRAPH_TITLE} />
              </h2>
              <p className={`${rtl} large-arabic-text`}>
                <T id={KEYS.ABOUT_PAGE_SIXTH_PARAGRAPH_TEXT} />
              </p>
              <p>&nbsp;</p>
              <div className="canvas-container" id="ayah-canvas">
                <canvas id="ayah_chart" />
              </div>

              <h2 className={rtl}>
                <T id={KEYS.ABOUT_PAGE_SEVENTH_PARAGRAPH_TITLE} />
              </h2>
              <p className={`${rtl} large-arabic-text`}>
                <T id={KEYS.ABOUT_PAGE_SEVENTH_PARAGRAPH_TEXT} />
              </p>

              <h2 className={rtl}>
                <T id={KEYS.ABOUT_PAGE_LAST_PARAGRAPH_TITLE} />
              </h2>
              <p className={`${rtl} large-arabic-text`}>
                <T id={KEYS.ABOUT_PAGE_LAST_PARAGRAPH_TEXT} />
              </p>

              <footer>
                <FooterButton onClick={() => {
                  window.open('mailto:tarteel@abdellatif.io', '_self');
                }}>
                  <T id={KEYS.CONTACT_US_BUTTON_TEXT} />
                </FooterButton>
              </footer>
            </div>
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

export default connect(
  mapStateToProps,
)(injectIntl(About));
