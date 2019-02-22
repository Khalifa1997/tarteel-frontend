import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from 'typesafe-actions';

import { fetchRandomAyah } from '../api/ayahs';
import Main from '../pages/MainPage';
import AyahShape from '../shapes/AyahShape';
import {
  loadNextAyah,
  loadNextQueue,
  loadPreviousAyah,
  loadPrevQueue,
  setAyah,
} from '../store/actions/ayahs';
import ReduxState, { IRouter, IStatus } from '../types/GlobalState';

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
  status: IStatus;
  router: IRouter;
}

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType<typeof setAyah>>
): IDispatchProps => {
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
      return dispatch(loadNextQueue());
    },
    loadPrevQueue: () => {
      return dispatch(loadPrevQueue());
    },
  };
};

const mapStateToProps = (state: ReduxState): IStateProps => {
  return {
    currentAyah: state.ayahs.currentAyah,
    isFetchingCurrentAyah: state.ayahs.isFetchingCurrentAyah,
    passedOnBoarding: state.profile.passedOnBoarding,
    status: state.status,
    router: state.router,
  };
};

export const MainPageContainer = {
  component: withCookies(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Main)
  ),
  loadData: (store: any, req: any) => {
    const lastAyah = req.universalCookies.get('lastAyah');
    if (lastAyah) {
      return Promise.resolve(store.dispatch(setAyah(lastAyah)));
    }
    return fetchRandomAyah(req).then((ayah: AyahShape) => {
      return store.dispatch(setAyah(ayah));
    });
  },
};
