import React from "react";
import styled, {keyframes} from "styled-components";
import {connect} from "react-redux";
import Select from "react-select";
import { injectIntl, InjectedIntl } from "react-intl"
import {History} from "history";
import {Helmet} from "react-helmet";
import {circleONotch} from 'react-icons-kit/fa/circleONotch'
import fadeInUp from 'react-animations/lib/fade-in-up'

import RadioButton from "../../components/RadioButton";
import FooterButton from "../../components/FooterButton";
import NoteButton from "../../components/NoteButton";
import CountryList from "../../components/CountryList";
import ReduxState, {IDemographics, IProfile} from "../../types/GlobalState";
import {updateDemographicData} from "../../store/actions/demographicData";
import {setDemographicData} from "../../helpers";
import T from "../../components/T";
import KEYS from "../../locale/keys";
import {submitDemographics} from "../../api";
import Navbar from "../../components/Navbar";
import Icon from "react-icons-kit";


const genderOptions = [
  {
    text: KEYS.GENDER_INPUT_OPTION_MALE,
    value: "male"
  },
  {
    text: KEYS.GENDER_INPUT_OPTION_FEMALE,
    value: "female"
  }
]

const ageOptions = [
  {
    label: "13-18",
    value: "13-18",
  },
  {
    label: "19-25",
    value: "19-25",
  },
  {
    label: "26-35",
    value: "26-35",
  },
  {
    label: "36-45",
    value: "36-45",
  },
  {
    label: "46-55",
    value: "46-55",
  },
  {
    label: "56+",
    value: "56+",
  },
]

interface IOwnProps {
  history: History;
  intl: InjectedIntl;
}

interface IDispatchProps {
  updateDemographics(obj: Partial<IDemographics>): void;
}

interface IStateProps {
  demographicData: IDemographics;
  profile: IProfile;
}

type IProps = IDispatchProps & IStateProps& IOwnProps;


interface IState {
  isSubmitting: boolean;
  isJustSubmitted: boolean;
}

class DemographicsPage extends React.Component<IProps, IState> {
  state = {
    isSubmitting: false,
    isJustSubmitted: false,
  }
  qiraahOptions = [
    {
      label: this.props.intl.formatMessage({id: KEYS.QIRAAH_INPUT_OPTION_HAFS,}),
      value: "hafs",
    },
    {
      label: this.props.intl.formatMessage({id: KEYS.QIRAAH_INPUT_OPTION_WARSH}),
      value: "warsh",
    },
    {
      label: this.props.intl.formatMessage({id: KEYS.QIRAAH_INPUT_OPTION_NOTSURE}),
      value: "notsure",
    },
    {
      label: this.props.intl.formatMessage({id: KEYS.QIRAAH_INPUT_OPTION_OTHER}),
      value: "other",
    },
  ]
  submitDemographics = () => {
    this.setState({isSubmitting: true});
    submitDemographics(this.props.demographicData)
      .then(() => {
        setDemographicData(this.props.demographicData);
        this.setState({
          isSubmitting: false,
          isJustSubmitted: true,
        });
        setTimeout(() => {
          this.setState({isJustSubmitted: false});
        }, 800)
      })
  };
  handleChange = (key, option) => {
    this.props.updateDemographics({
      [key]: option.value
    })
  }
  render() {
    const {isJustSubmitted, isSubmitting} = this.state
    const askForPermissions = false;
    const {demographicData, intl} = this.props;
    const selectedAge = ageOptions.filter(opt => opt.value === demographicData.age)[0]
    const selectedQiraah = this.qiraahOptions.filter(opt => opt.value === demographicData.qiraah)[0]
    const rtl = intl.messages.local === "arabic" ? "rtl" : "";

    return (
      <Container>
        <Helmet>
          <title>Demographic Data</title>
        </Helmet>
        <Navbar />
        <div className="content">
          <span className={`flag-icon flag-icon-gr flag-icon-squared`} />
          {
            askForPermissions ?
              <h3> Thank you! <span className="one-more">One more thing... </span></h3>
              :
              <h3 style={{textAlign: "center"}}>
                <T id={KEYS.DEMOGRAPHICS_PAGE_TITLE} />
              </h3>
          }
          <div className={`arabic-text ${rtl} paragraph`}>
            <T id={KEYS.DEMOGRAPHIC_PAGE_FIRST_PARAGRAPH_1} />
            &nbsp;<strong>
            { this.props.profile.recordingCount }
            </strong>&nbsp;
            <T id={KEYS.DEMOGRAPHIC_PAGE_FIRST_PARAGRAPH_2} />
          </div>
          <div className={`arabic-text ${rtl} paragraph`}>
            <T id={KEYS.DEMOGRAPHIC_PAGE_SECOND_PARAGRAPH} />
          </div>

          <div className={"form"}>
            <div className={`form-row ${rtl}`}>
              <label className={`arabic-text ${rtl}`}>
                <T id={KEYS.GENDER_INPUT_LABEL} />
              </label>
              <RadioButton
                currentValue={demographicData.gender}
                options={genderOptions}
                onChange={(option) => this.handleChange("gender", option)}
              />
            </div>
            <div className={`form-row ${rtl}`}>
              <label className={`arabic-text ${rtl}`}>
                <T id={KEYS.AGE_INPUT_LABEL} />
              </label>
              <Select
                isRtl={Boolean(rtl)}
                isSearchable={true}
                defaultValue={selectedAge}
                className={"select"}
                options={ageOptions}
                onChange={(option) => this.handleChange("age", option)}
              />
            </div>
            <div className={`form-row ${rtl}`}>
              <label className={`arabic-text ${rtl}`}>
                <T id={KEYS.QIRAAH_INPUT_LABEL} />
              </label>
              <Select
                isRtl={Boolean(rtl)}
                isSearchable={true}
                defaultValue={selectedQiraah}
                className={"select"}
                options={this.qiraahOptions}
                onChange={(option) => this.handleChange("qiraah", option)}
              />
            </div>
            <div className={`form-row ${rtl}`}>
              <label className={`arabic-text ${rtl}`}>
                <T id={KEYS.HERITAGE_INPUT_LABEL} />
              </label>
              <CountryList
                locale={intl.messages.local}
                isRtl={Boolean(rtl)}
                currentValue={demographicData.ethnicity}
                onChange={(option) => this.handleChange("ethnicity", option)}/>
            </div>
          </div>

          <div className={"footer"}>
            <FooterButton onClick={this.submitDemographics}>
              {
                isSubmitting ?
                  <div className={'icon spin'}>
                    <Icon icon={circleONotch} size={20}/>
                  </div>
                   :
                   isJustSubmitted ?
                    <span className={'fadeup'}>Saved !</span> :
                  <T id={KEYS.DEMOGRAPHICS_FORM_SUBMIT_BUTTON_TEXT} />
              }
            </FooterButton>
            <NoteButton className={"skip"} onClick={() => {
              this.props.history.push("/")
            }}>
              <T id={KEYS.SKIP_BUTTON_TEXT} />
            </NoteButton>
          </div>
        </div>
      </Container>
    )
  }
}

const spin = keyframes`
  0% {transform:rotate(0deg);}
  50% {transform:rotate(180deg);}
  100% {transform:rotate(360deg);}
`;

const fadeUp = keyframes`${fadeInUp}`;

const Container = styled.div`
  padding: 1em 3em;
  
  .content {
    width: 50%;
    margin: auto;
  }
  .paragraph {
    margin: 1em 0 ;
  }
  .form {
    text-align: center;
    margin-top: 3em;
  }
  .form-row {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    margin: 2em 0; 
  }
  .select {
    width: 300px;
  }
  .footer {
    margin-top: 3em;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    
    .skip {
      margin-top: 1em;
    }
    .icon {
      color: white;
    }
    .fadeup {
      animation: 500ms ${fadeUp};
    }
    .spin {
      svg {
        animation: 800ms ${spin} infinite ;
        transform-origin: center;
      }
    }
  }
  
  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    padding: 1em;
    
    .content {
      width: 100%;
      
      .select {
        width: 200px;
      }
    }
  }
`;

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    demographicData: state.demographicData,
    profile: state.profile,
  }
}

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    updateDemographics: (obj: Partial<IDemographics>) => {
      dispatch(updateDemographicData(obj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DemographicsPage));
