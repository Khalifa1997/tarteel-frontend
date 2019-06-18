import React from 'react';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from 'typesafe-actions';

import { fetchSpecificAyah } from '../api/ayahs';
import Main from '../pages/MainPage';
import IAyahShape from '../shapes/IAyahShape';
import {
  loadNextAyah,
  loadNextQueue,
  loadPreviousAyah,
  loadPrevQueue,
  setAyah,
} from '../store/actions/ayahs';
import ReduxState, { IStatus, IRouter } from '../types/GlobalState';
import { removeNil } from '../shared/utils/arrays';
import { isCorrectAyah } from '../helpers/ayahs';

interface IDispatchProps {
  setAyah(ayah: IAyahShape): ActionType<typeof setAyah>;
  loadPreviousAyah(ayah?: IAyahShape): void;
  loadNextAyah(ayah?: IAyahShape): void;
  loadNextQueue(): void;
  loadPrevQueue(): void;
}

interface IStateProps {
  currentAyah: IAyahShape;
  isFetchingCurrentAyah: boolean;
  passedOnBoarding: boolean;
  status: IStatus;
  router: IRouter;
}

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType<typeof setAyah>>
): IDispatchProps => {
  return {
    setAyah: (ayah: IAyahShape) => {
      return dispatch(setAyah(ayah));
    },
    loadNextAyah: (ayah?: IAyahShape) => {
      return dispatch(loadNextAyah(ayah));
    },
    loadPreviousAyah: (ayah?: IAyahShape) => {
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

export const AyahPageContainer = {
  component: withCookies(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(props => <Main isAyahPage={true} {...props} />)
  ),
  loadData: (store: any, req: any, res: any) => {
    const params = req.params[0]
      .split('/')
      .filter((a: string) => a)
      .slice(1);
    const [surah, ayah] = params;
    if (isCorrectAyah(surah, ayah)) {
      return fetchSpecificAyah(surah, ayah).then((fetchedAyah: IAyahShape) => {
        return store.dispatch(setAyah(fetchedAyah));
      });
    } else {
      return res.redirect('/ayah_not_found');
    }
  },
};
