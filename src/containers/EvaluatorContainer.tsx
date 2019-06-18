import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from 'typesafe-actions';

import { fetchEvaluatorAyah } from '../api/evaluator';
import Evaluator from '../pages/Evaluator';
import IAyahShape from '../shapes/IAyahShape';
import evaluatorActions, {
  setAyah,
  setNextAyah,
  setPreviousAyah,
} from '../store/actions/evaluator';
import ReduxState, { IProfile } from '../types/GlobalState';
import { injectIntl } from 'react-intl';
import { increaseEvaluatedAyahs } from '../store/actions/profile';

interface IDispatchProps {
  setAyah(ayah: IAyahShape): ActionType<typeof setAyah>;
  setNextAyah(ayah: IAyahShape): ActionType<typeof setNextAyah>;
  setPreviousAyah(ayah: IAyahShape): ActionType<typeof setPreviousAyah>;
  increaseEvaluatedAyahs(): ActionType<typeof increaseEvaluatedAyahs>;
}

interface IStateProps {
  currentAyah: IAyahShape;
  nextAyah: IAyahShape;
  previousAyah: IAyahShape;
  profile: IProfile;
}

const mapDispatchToProps = (
  dispatch: Dispatch<
    ActionType<typeof evaluatorActions | typeof increaseEvaluatedAyahs>
  >
): IDispatchProps => {
  return {
    setAyah: (ayah: IAyahShape) => dispatch(setAyah(ayah)),
    setNextAyah: (ayah: IAyahShape) => dispatch(setNextAyah(ayah)),
    setPreviousAyah(ayah: IAyahShape): ActionType<typeof setPreviousAyah> {
      return dispatch(setPreviousAyah(ayah));
    },
    increaseEvaluatedAyahs: () => {
      return dispatch(increaseEvaluatedAyahs());
    },
  };
};

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.evaluator.currentAyah,
    nextAyah: state.evaluator.nextAyah,
    previousAyah: state.evaluator.previousAyah,
    profile: state.profile,
  };
};

export const EvaluatorContainer = {
  component: injectIntl(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Evaluator)
  ),
  loadData: (store: any, req: any) => {
    return fetchEvaluatorAyah(req).then((ayah: IAyahShape) => {
      return store.dispatch(setAyah(ayah));
    });
  },
};
