import types from '../../action_types';

const initialState = {
  sms: '',
  contact: {},
  actionDate: '',
  dnd: '',
  hidden: '',
  hiddenReason: '',
  tempKey: '',
  contactType: '',
  photoStatus: '',
  photoCount: 0,
  profileContactStatus: '',
  contactDetailsStatusString: '',
  contactDetailsTitleStatusString: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CONTACT_SUMMARY_DATA_SUCCESS:
    case types.PROFILE_SUCCESS: {
      const { contactSummary } = action.payload;
      if (!contactSummary) {
        return {
          state,
        };
      }
      const {
        contactDetailsTitleStatusString,
        contactDetailsStatusString,
        profileContactStatus,
        photoCount,
        photoStatus,
        sms,
        contactType,
        contact,
        actionDate,
        dnd,
        hidden,
        hiddenReason,
        tempKey,
      } = contactSummary;
      return {
        ...state,
        contact,
        actionDate,
        dnd,
        hidden,
        hiddenReason,
        tempKey,
        contactType,
        sms,
        photoStatus,
        photoCount,
        profileContactStatus,
        contactDetailsStatusString,
        contactDetailsTitleStatusString,
      };
    }
    default:
      return state;
  }
};
