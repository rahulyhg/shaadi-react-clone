import types from '../../action_types';
import { strnorm } from '../utils';

const initialState = {
  infoMap: [],
  infoList: [],
  detailList: [],
  premiumInfo: [],
  miniList: [],
  miniNriList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PREFERRED_PHOTOS_CACHE:
    case types.PREFERRED_PHOTOS_SUCCESS:
    case types.OTHERSEARCH_PHOTOS_CACHE:
    case types.OTHERSEARCH_PHOTOS_SUCCESS:
      return state;
    case types.MY_DASHBOARD_WIDGETS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        detailList: [
          {
            key: 'age-height',
            value: `${payload.age} yrs, ${payload.height}`,
          },
          {
            key: 'religion-caste',
            value: payload.religion === payload.caste ? `${payload.religion}, Not Specified` : `${payload.religion}, ${payload.caste}`,
          },
          {
            key: 'profession',
            value: strnorm(payload.career.profession) || 'Not Specified',
          },
          {
            key: 'location',
            value: `${payload.location.city}, ${payload.location.country}`,
          },
        ],
        profileInfo: [
          {
            key: 'info-0',
            label: 'Age / Height',
            value: `${payload.age} yrs, ${payload.height}`,
          },
          {
            key: 'info-1',
            label: 'mother_tongue',
            value: payload.mother_tongue,
          },
          {
            key: 'info-2',
            label: 'location',
            value: strnorm(payload.location.city),
          },
          {
            key: 'info-3',
            label: 'Profession',
            value: strnorm(payload.career.profession) || 'Not Specified',
          },
        ].filter(h => h.value),
      };
    }
    default: {
      const { base } = action.payload || {};
      if (!base) {
        return state;
      }
      const newState = {
        ...state,
        infoMap: base.infoMap || state.infoMap,
        infoList: base.infoList || state.infoList,
        detailList: base.detailList || state.detailList,
        premiumInfo: base.premiumInfo || state.premiumInfo,
        miniList: base.miniList || state.miniList,
        miniNriList: base.miniNriList || state.miniNriList,
      };
      return JSON.stringify(newState) === JSON.stringify(state) ? state : newState;
    }
  }
};
