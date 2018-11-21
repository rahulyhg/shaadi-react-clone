import types from '../../action_types';

const initialState = {
  contactno: '+91 - 9833333311',
  name: 'Jay',
  type: 'callConsultant',
  submitted: false,
  errors: {},
  loading: false,
  memberEnquiryCount: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_VIP_CONSULTANT_REQUEST:
    case types.CONSULTANT_SUBMITTED_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.CONSULTANT_SUBMITTED_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.FETCH_VIP_CONSULTANT_SUCCESS: {
      if (!action.payload.data.consultantDetails || !action.payload.data) {
        return state;
      }
      return {
        ...state,
        contactno: action.payload.data.consultantDetails.contactno || state.contactno,
        name: action.payload.data.consultantDetails.name || state.name,
        memberEnquiryCount: action.payload.data.consultantDetails.memberEnquiryCount || 0,
        type: 'callConsultant',
        loading: false,
        errors: action.payload.data.consultantDetails.errors,
      };
    }
    case types.FETCH_VIP_CONSULTANT_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.MODAL_SHOW: {
      const { modal, uid, type, name, contactno } = action.payload;
      if (modal !== 'callConsultant') {
        return state;
      }
      return {
        ...state,
        uid,
        name,
        type,
        contactno,
        submitted: false,
        errors: {},
      };
    }
    case types.CONSULTANT_SUBMITTED_SUCCESS: {
      if (action.response.data.status === 200) {
        return {
          ...state,
          submitted: true,
          loading: false,
        };
      } else if (action.response.data.status === 400 && action.response.data.errors) {
        return {
          ...state,
          errors: action.response.data.errors,
          loading: false,
        };
      }

      return state;
    }
    default:
      return state;
  }
}
