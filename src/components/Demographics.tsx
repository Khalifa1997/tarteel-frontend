/* Demographics Component include Demographics of user */
import { History } from 'history';
import React from 'react';
import { Helmet } from 'react-helmet';
import { InjectedIntl, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { submitDemographics } from '../api';
import CountryList from './CountryList';
import FooterButton from './FooterButton';
import Navbar from './Navbar';
import NoteButton from './NoteButton';
import RadioButton from './RadioButton';
import Headline from './Headline';
import T from './T';
import { setDemographicData } from '../helpers';
import KEYS from '../locale/keys';
import { updateDemographicData } from '../store/actions/demographicData';
import ReduxState, { IDemographics, IProfile } from '../types/GlobalState';
import { unsetAskForDemographics } from '../store/actions/profile';
import Select from './Select';

const genderOptions = [
  {
    text: KEYS.GENDER_INPUT_OPTION_MALE,
    value: 'male',
  },
  {
    text: KEYS.GENDER_INPUT_OPTION_FEMALE,
    value: 'female',
  },
];

const ageOptions = [
  {
    label: '13-18',
    value: '13-18',
  },
  {
    label: '19-25',
    value: '19-25',
  },
  {
    label: '26-35',
    value: '26-35',
  },
  {
    label: '36-45',
    value: '36-45',
  },
  {
    label: '46-55',
    value: '46-55',
  },
  {
    label: '56+',
    value: '56+',
  },
];

interface IOwnProps {
  history: History;
  intl: InjectedIntl;
}

interface IDispatchProps {
  updateDemographics(obj: Partial<IDemographics>): void;
  unsetAskForDemographics(): void;
}

interface IStateProps {
  demographicData: IDemographics;
  profile: IProfile;
}

type IProps = IDispatchProps & IStateProps & IOwnProps;

interface IState {
  isSubmitting: boolean;
  isSaved: boolean;
}

class Demographics extends React.Component<IProps, IState> {
  state = {
    isSubmitting: false,
    isSaved: false,
  };
  qiraahOptions = [
    {
      label: this.props.intl.formatMessage({
        id: KEYS.QIRAAH_INPUT_OPTION_HAFS,
      }),
      value: 'hafs',
    },
    {
      label: this.props.intl.formatMessage({
        id: KEYS.QIRAAH_INPUT_OPTION_WARSH,
      }),
      value: 'warsh',
    },
    {
      label: this.props.intl.formatMessage({
        id: KEYS.QIRAAH_INPUT_OPTION_NOTSURE,
      }),
      value: 'notsure',
    },
    {
      label: this.props.intl.formatMessage({
        id: KEYS.QIRAAH_INPUT_OPTION_OTHER,
      }),
      value: 'other',
    },
  ];
  submitDemographics = () => {
    this.setState({ isSubmitting: true });
    const demographicRequestBody = {
      ...this.props.demographicData,
      session_id: this.props.profile.sessionId,
      platform: window.navigator.userAgent,
    };
    submitDemographics(demographicRequestBody).then(() => {
      setDemographicData(this.props.demographicData);
      this.props.unsetAskForDemographics();
      this.setState({
        isSubmitting: false,
        isSaved: true,
      });
    });
  };
  handleChange = (key, option) => {
    this.props.updateDemographics({
      [key]: option.value,
    });
  };
  render() {
    const { isSubmitting, isSaved } = this.state;
    const askForPermissions = false;
    const { demographicData, intl } = this.props;
    const selectedAge = ageOptions.filter(
      opt => opt.value === demographicData.age
    )[0];
    const selectedQiraah = this.qiraahOptions.filter(
      opt => opt.value === demographicData.qiraah
    )[0];
    const rtl = intl.messages.local === 'arabic' ? 'rtl' : '';
    const pageTitle = intl.formatMessage({ id: KEYS.DEMOGRAPHICS_PAGE_TITLE });

    return (
      <Container>
        <div>
          <span className={`flag-icon flag-icon-gr flag-icon-squared`} />
          <div className={'form'}>
            <div className={`form-row ${rtl}`}>
              <label className={`arabic-text ${rtl}`}>
                <T id={KEYS.GENDER_INPUT_LABEL} />
              </label>
              <RadioButton
                currentValue={demographicData.gender}
                options={genderOptions}
                onChange={option => this.handleChange('gender', option)}
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
                className={'select'}
                options={ageOptions}
                onChange={option => this.handleChange('age', option)}
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
                className={'select'}
                options={this.qiraahOptions}
                onChange={option => this.handleChange('qiraah', option)}
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
                onChange={option => this.handleChange('ethnicity', option)}
              />
            </div>
          </div>

          <div className={'footer'}>
            {!isSaved ? (
              <>
                <FooterButton
                  onClick={this.submitDemographics}
                  isLoading={isSubmitting}
                  afterLoadingMessage={'Saved !'}
                >
                  <T id={KEYS.SAVE_WORD} />
                </FooterButton>
              </>
            ) : (
              <>
                <NoteButton className={'saved'}>
                  <T id={KEYS.SAVED_WORD} />
                </NoteButton>
              </>
            )}
          </div>
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  .paragraph {
    margin: 1em 0;
  }
  .form {
    text-align: center;
    margin-top: 3em;
    margin-left: 2em;
    width: 70%;
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

    .saved,
    .skip {
      margin-top: 1em;
    }
    .saved {
      text-align: right;
      width: 100%;
    }
    .icon {
      color: white;
    }
  }

  @media screen and (max-width: ${props => props.theme.breakpoints.sm}px) {
    .form {
      width: 100%;
      margin-left: unset;
    }

    .select {
      width: 200px;
    }
  }
`;

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    demographicData: state.demographicData,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch): IDispatchProps => {
  return {
    updateDemographics: (obj: Partial<IDemographics>) => {
      dispatch(updateDemographicData(obj));
    },
    unsetAskForDemographics: () => {
      dispatch(unsetAskForDemographics());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Demographics));
