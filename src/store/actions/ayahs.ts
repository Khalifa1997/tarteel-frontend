import humps from 'humps';
import { createAction } from 'typesafe-actions';

import { fetchSpecificAyah } from '../../api/ayahs';
import { getNextAyah, getPrevAyah } from '../../helpers/ayahs';
import { setCookie } from '../../helpers/cookie';
import AyahShape from '../../shapes/AyahShape';
import { nextAyahAction, prevAyahAction } from '../../types/actions';
import ReduxState, { ISearchAyah } from '../../types/GlobalState';

export const setAyah = createAction('ayahs/SET', resolve => {
  return (ayah: AyahShape) => {
    setCookie('lastAyah', ayah, { path: '/' });
    return resolve(humps.camelizeKeys(ayah));
  };
});

export const unShiftNextAyah = createAction('ayahs/UNSHIFT_NEXT', resolve => {
  return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah));
});

export const shiftNextAyah = createAction('ayahs/SHIFT_NEXT_AYAH', resolve => {
  return () => resolve();
});

export const popNextAyah = createAction('ayahs/POP_NEXT_AYAH', resolve => {
  return () => resolve();
});

export const clearNextAyah = createAction('ayahs/CLEAR_NEXT_AYAH', resolve => {
  return () => resolve();
});

export const unShiftPrevAyah = createAction(
  'ayahs/UNSHIFT_PREVIOUS',
  resolve => {
    return (ayah: AyahShape) => resolve(humps.camelizeKeys(ayah));
  }
);

export const shiftPrevAyah = createAction('ayahs/SHIFT_PREV_AYAH', resolve => {
  return () => resolve();
});

export const popPrevAyah = createAction('ayahs/POP_PREV_AYAH', resolve => {
  return () => resolve();
});

export const clearPrevAyah = createAction('ayahs/CLEAR_PREV_AYAH', resolve => {
  return () => resolve();
});

export const toggleFetchingCurrentAyah = createAction(
  'ayahs/TOGGLE_FETCHING_CURRENT_AYAH',
  resolve => {
    return () => resolve();
  }
);

export const setSurah = createAction('ayahs/SET_SURAH', resolve => {
  return (surah: ISearchAyah) => resolve(humps.camelizeKeys(surah));
});

export const loadNextAyah = (currentAyah?: AyahShape) => {
  return async (dispatch, getState: () => ReduxState) => {
    dispatch(nextAyahAction.request());
    const { verseNumber: ayah, chapterId: surah } =
      currentAyah || getState().ayahs.currentAyah;
    const { nextSurah, nextAyah } = getNextAyah(surah, ayah);
    return fetchSpecificAyah(nextSurah, nextAyah)
      .then((ayah: AyahShape) => {
        ayah = humps.camelizeKeys(ayah);
        dispatch(nextAyahAction.success(humps.camelizeKeys(ayah)));
      })
      .catch((error: Error) => {
        dispatch(nextAyahAction.failure(error));
      });
  };
};

export const loadPreviousAyah = (currentAyah?: AyahShape) => {
  return async (dispatch, getState: () => ReduxState) => {
    dispatch(prevAyahAction.request());
    const { verseNumber: ayah, chapterId: surah } =
      currentAyah || getState().ayahs.currentAyah;
    const { prevSurah, prevAyah } = getPrevAyah(surah, ayah);
    return fetchSpecificAyah(prevSurah, prevAyah)
      .then((ayah: AyahShape) => {
        ayah = humps.camelizeKeys(ayah);
        dispatch(prevAyahAction.success(humps.camelizeKeys(ayah)));
      })
      .catch((error: Error) => {
        dispatch(prevAyahAction.failure(error));
      });
  };
};

export const loadNextQueue = () => {
  return (dispatch, getState: () => ReduxState) => {
    return new Promise(async resolve => {
      while (getState().ayahs.nextAyah.length < 3) {
        const ayah = getState().ayahs.nextAyah.slice(-1)[0];
        await dispatch(loadNextAyah(ayah));
      }
      if (
        getState().ayahs.nextAyah[0].verseNumber ===
        getState().ayahs.currentAyah.verseNumber
      ) {
        await dispatch(shiftNextAyah());
        dispatch(loadNextQueue());
      }
      resolve();
    });
  };
};

export const loadPrevQueue = () => {
  return (dispatch, getState: () => ReduxState) => {
    return new Promise(async resolve => {
      while (getState().ayahs.prevAyah.length < 3) {
        const ayah = getState().ayahs.prevAyah.slice(-1)[0];
        await dispatch(loadPreviousAyah(ayah));
      }
      if (
        getState().ayahs.prevAyah[0].verseNumber ===
        getState().ayahs.currentAyah.verseNumber
      ) {
        await dispatch(shiftPrevAyah());
        dispatch(loadPrevQueue());
      }
      resolve();
    });
  };
};
