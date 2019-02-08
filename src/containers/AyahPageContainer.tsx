import {withCookies} from "react-cookie";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ActionType} from "typesafe-actions";

import {fetchSpecificAyah} from "../api/ayahs";
import Main from "../pages/MainPage";
import AyahShape from "../shapes/AyahShape";
import {loadNextAyah, loadNextQueue, loadPreviousAyah, loadPrevQueue, setAyah} from "../store/actions/ayahs";
import ReduxState, {IStatus, IRouter} from "../types/GlobalState";
import {removeNil} from '../shared/utils/arrays'
import {isCorrectAyah} from "../helpers/ayahs";

interface IDispatchProps {
  setAyah(ayah: AyahShape): ActionType<typeof setAyah>;
  loadPreviousAyah(ayah?: AyahShape): void;
  loadNextAyah(ayah?: AyahShape): void;
  loadNextQueue(): void;
  loadPrevQueue(): void;
}

interface IStateProps {
  currentAyah: AyahShape;
  isFetchingCurrentAyah: boolean;
  passedOnBoarding: boolean;
  status: IStatus,
  router: IRouter;
}

const mapDispatchToProps = (dispatch: Dispatch<ActionType<typeof setAyah>>): IDispatchProps => {
  return {
    setAyah: (ayah: AyahShape) => {
      return dispatch(setAyah(ayah));
    },
    loadNextAyah: (ayah?: AyahShape) => {
      return dispatch(loadNextAyah(ayah));
    },
    loadPreviousAyah: (ayah?: AyahShape) => {
      return dispatch(loadPreviousAyah(ayah));
    },
    loadNextQueue: () => {
      return dispatch(loadNextQueue())
    },
    loadPrevQueue: () => {
      return dispatch(loadPrevQueue())
    },
  }
};

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.ayahs.currentAyah,
    isFetchingCurrentAyah: state.ayahs.isFetchingCurrentAyah,
    passedOnBoarding: state.profile.passedOnBoarding,
    status: state.status,
    router: state.router,
  }
};

export const AyahPageContainer = {
  component: withCookies(connect(mapStateToProps, mapDispatchToProps)(Main)),
  loadData: (store: any, req: any, res: any) => {
    const params = req.params[0].split('/').filter((a: string) => a).slice(1);
    const [surah, ayah] = params;
    if (isCorrectAyah(surah, ayah)) {
      return fetchSpecificAyah(surah, ayah)
        .then((fetchedAyah: AyahShape) => {
          return store.dispatch(setAyah(fetchedAyah))
        })
    } else {
      return res.redirect('/ayah_not_found');
    }
  },
};
