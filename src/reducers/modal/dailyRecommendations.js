import types from '../../action_types';

const initialState = {
  items: [],
};

const initialProfileState = {
  key: null,
  uid: null,
  name: null,
  photoUrl: null,
};

const dailyItem = (state = initialProfileState, action) => {
  switch (action.type) {
    case types.LAYER_SUCCESS: {
      const { display_name, image_path, memberlogin } = action.payload;
      return {
        key: memberlogin,
        uid: memberlogin,
        name: display_name,
        photoUrl: image_path,
      };
    }
    default:
      return state;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LAYER_SUCCESS: {
      if (action.payload.modal !== 'dailyRecommendations') {
        return state;
      }
      return {
        items: action.payload.profiles.map((profile, i) => dailyItem(state.items[i], { ...action, payload: profile })),
      };
    }

    default:
      return state;
  }
}
