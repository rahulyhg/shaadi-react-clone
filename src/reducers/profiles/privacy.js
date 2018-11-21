import types from '../../action_types';

const initialState = {
  display_name: '', // 'profile_id'
  horoscope_status: '', // 'Show All'
  memberlogin: '',
  phone: '', // 'Show All', 'When I Contact'
  photo: '', // 'Show All', 'When I Contact', 'Only When I Contact'
  photo_password: null,
  profile_privacy: '', // 'Show All'
  shortlist_setting: '', // 'Y', 'N'
  sms_alert: 0,
  visitors_setting: '', // 'Y', 'N'
};

export default (state = initialState, { payload, type } = {}) => {
  switch (type) {
    case types.SESSION_CACHE:
    case types.SESSION_SUCCESS: {
      if (!payload || !payload.privacy) {
        return state;
      }
      const newState = {
        ...state,
        ...{
          ...payload.privacy,
          isDefault: false,
        },
      };
      return newState;
    }
    case types.UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS:
    case types.GET_PROFILE_PRIVACY_SETTING_SUCCESS: {
      const privacyData = payload.privacy || (payload.data && payload.data.privacy);
      return privacyData
        ? {
            ...state,
            ...privacyData,
            isDefault: false,
            photoSettingSaveSuccess: type === types.UPDATE_PROFILE_PRIVACY_SETTING_SUCCESS,
          }
        : state;
    }
    case types.UPDATE_PROFILE_PRIVACY_SETTING_FAIL: {
      return {
        ...state,
        ...{
          photoSettingSaveFail: true,
        },
      };
    }
    case types.UPDATE_PROFILE_PRIVACY_SETTING_REQUEST: {
      delete state.photoSettingSaveFail;
      delete state.photoSettingSaveSuccess;
      return state;
    }
    case types.GET_PROFILE_PRIVACY_SETTING_REQUEST:
    case types.GET_PROFILE_PRIVACY_SETTING_FAIL:
    default:
      return state;
  }
};
