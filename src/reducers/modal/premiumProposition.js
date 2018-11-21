import types from '../../action_types';

const initialState = {
  display_uid: '',
  display_name: '',
  display_photo: '',
  offer_details: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, display_uid, display_name, display_photo, offer_details } = action.payload;
      if (modal !== 'premiumProposition') {
        return state;
      }
      return {
        ...state,
        display_uid,
        display_name,
        display_photo,
        offer_details,
      };
    }
    default:
      return state;
  }
}
