import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ActionType} from "typesafe-actions";

import {fetchEvaluatorAyah} from "../api/evaluator";
import ReduxState, {IProfile} from "../types/GlobalState";
import {setAyah, setNextAyah} from "../store/actions/evaluator";
import Evaluator from "../pages/Evaluator";
import AyahShape from "../shapes/AyahShape";


interface IDispatchProps {
  setAyah(ayah: AyahShape): ActionType<typeof setAyah>;
  setNextAyah(ayah: AyahShape): ActionType<typeof setNextAyah>;
}

interface IStateProps {
  currentAyah: AyahShape;
  nextAyah: AyahShape;
  profile: IProfile;
}

const mapDispatchToProps = (dispatch: Dispatch<ActionType<typeof setAyah>>): IDispatchProps => {
  return {
    setAyah:
      (ayah: AyahShape) => dispatch(setAyah(ayah)),
    setNextAyah:
      (ayah: AyahShape) => dispatch(setNextAyah(ayah)),

  }
};

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.evaluator.currentAyah,
    nextAyah: state.evaluator.nextAyah,
    profile: state.profile,
  }
};

export const EvaluatorContainer = {
  component: connect(mapStateToProps, mapDispatchToProps)(Evaluator),
  loadData: (store: any, req: any) => {
    return fetchEvaluatorAyah(req)
      .then((ayah: AyahShape) => {
        return store.dispatch(setAyah(ayah))
      })
  }
};
