import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ActionType} from "typesafe-actions";
import {withCookies} from "react-cookie";

import {fetchRandomAyah} from "../api/ayahs";
import ReduxState, {IStatus} from "../types/GlobalState";
import {setAyah} from "../store/actions/ayahs";
import Main from "../pages/MainPage";
import AyahShape from "../shapes/AyahShape";

interface IDispatchProps {
  setAyah(ayah: AyahShape): ActionType<typeof setAyah>;
}

interface IStateProps {
  currentAyah: AyahShape;
  isFetchingCurrentAyah: boolean;
  passedOnBoarding: boolean;
  status: IStatus
}

const mapDispatchToProps = (dispatch: Dispatch<ActionType<typeof setAyah>>): IDispatchProps => {
  return {
    setAyah:
      (ayah: AyahShape) => dispatch(setAyah(ayah))

  }
};

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.ayahs.currentAyah,
    isFetchingCurrentAyah: state.ayahs.isFetchingCurrentAyah,
    passedOnBoarding: state.profile.passedOnBoarding,
    status: state.status,
  }
};

export const MainPageContainer = {
  component: withCookies(connect(mapStateToProps, mapDispatchToProps)(Main)),
  loadData: (store: any, req: any) => {
    const lastAyah = req.universalCookies.get('lastAyah')
    if (lastAyah) {
      return Promise.resolve(store.dispatch(setAyah(lastAyah)));
    }
    return fetchRandomAyah(req)
      .then((ayah: AyahShape) => {
        return store.dispatch(setAyah(ayah))
      })
  }
};
