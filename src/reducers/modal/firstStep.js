import types from '../../action_types';

const initialState = {
  name: '',
  source: null,
  type: null,
  himHer: '',
  nextProfileLink: '',
  connectionType: '',
  discount: 10,
  offerDetails: '',
};
const discountMsg = offerDetails => {
  let msg = '';
  if (offerDetails.filter(e => e.type === 'perc').length > 0 && offerDetails.filter(e => e.type === 'perc')[0].value) {
    msg = `Save upto ${offerDetails.filter(e => e.type === 'perc')[0].value}% today!`;
  }
  return msg;
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      const { modal, source, name, type, himHer, connectionType, discount, nextProfileLink, offerDetails } = action.payload;
      if (modal !== 'firstStep') {
        return state;
      }
      const msg = discountMsg(offerDetails);
      return {
        ...state,
        name,
        source,
        type,
        himHer,
        connectionType,
        discount,
        nextProfileLink,
        msg,
      };
    }
    default:
      return state;
  }
}
