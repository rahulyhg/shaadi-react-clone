import types from '../../action_types';

const initialState = {
  loading: false,
  disabled: false,
  flash: null,
  flashType: 'default',
  uid: null,
  self: null,
  name: '...',
  hisHer: '...',
  heShe: '...',
  himHer: '...',
  message: '',
  preferredName: '-',
  preferredTime: '-',
  landline: '-',
  mobile: '-',
  status: 'locked',
  eoiFailed: false,
  acceptSent: false,
  eoiSent: false,
  verificationRequested: false,
  history: '',
  source: '',
  photo: '',
  photoBlur: '',
  thumbnail: '',
  thumbnailBlur: '',
  email: '-',
  profileCreatedBy: '',
  profileAlbumStatus: '',
  isMisuseReported: false,
  getSMSLoading: false,
  disabledGetSms: false,
  getSMSText: '',
  isLoggerMobileVerified: false,
  canCommunicate: false,
  membershipTags: 'free',
  loggerMembership: 'Free',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW: {
      if (action.payload.modal !== 'contactDetails') {
        return state;
      }
      const {
        loading,
        disabled,
        flash,
        uid,
        name,
        hisHer,
        heShe,
        himHer,
        status,
        source,
        history,
        photo,
        photoBlur,
        thumbnail,
        thumbnailBlur,
        email,
        isMisuseReported,
        profileCreatedBy,
        profileAlbumStatus,
        isLoggerMobileVerified,
        canCommunicate,
        membershipTags,
        loggerMembership,
      } = action.payload;
      return {
        ...state,
        loading,
        disabled,
        flash,
        uid,
        name,
        hisHer,
        himHer,
        heShe,
        status: status || state.status,
        history,
        source,
        photo,
        photoBlur,
        thumbnail,
        thumbnailBlur,
        email: email || state.email,
        isMisuseReported,
        profileCreatedBy,
        profileAlbumStatus,
        getSMSLoading: false,
        disabledGetSms: false,
        getSMSSend: false,
        isLoggerMobileVerified,
        getSMSText: 'Send to Your Phone',
        verificationRequested: !!(state.uid === uid && state.verificationRequested),
        canCommunicate: canCommunicate || state.canCommunicate,
        membershipTags: membershipTags || state.membershipTags,
        loggerMembership: loggerMembership || state.loggerMembership,
      };
    }

    case types.PHONE_VERIFICATION_REQUEST_SENT: {
      return {
        ...state,
        verificationRequested: true,
        status: 'availableOnVerificationRequested',
      };
    }
    case types.CONTACT_EOI_REQUEST: {
      if (action.payload.type === 'contact') {
        return {
          ...state,
          loading: true,
          flashType: 'default',
          flash: null,
        };
      }
      if (action.payload.type === 'sendSms') {
        return {
          ...state,
          loading: false,
          flashType: 'loading',
          flash: null,
        };
      }
      return state;
    }

    case types.CONTACT_GET_SMS_REQUEST: {
      return {
        ...state,
        getSMSLoading: true,
        disabledGetSms: false,
        getSMSSend: false,
      };
    }

    case types.CONTACT_GET_SMS_SUCCESS: {
      return {
        ...state,
        getSMSLoading: false,
        getSMSText: 'Sent to Your Phone',
        getSMSSend: true,
        disabledGetSms: true,
      };
    }
    case types.CONTACT_GET_SMS_ERROR: {
      return {
        ...state,
        getSMSLoading: false,
        disabledGetSms: true,
        getSMSText: action.payload.error.message === 'max_sms_limit_exceeded' ? 'SMS limit Exceeded' : action.payload.error.message,
        getSMSSend: action.payload.error.message === 'max_sms_limit_exceeded',
      };
    }
    case types.CONTACT_EOI_SUCCESS: {
      if (action.payload.type === 'contact') {
        const { preferredName, preferredTime, landline, mobile, status, eoiSent, acceptSent, email, isMisuseReported } = action.payload;
        return {
          ...state,
          loading: false,
          preferredName,
          preferredTime,
          landline,
          mobile,
          email: email || state.email,
          status,
          eoiSent,
          acceptSent,
          isMisuseReported,
        };
      }
      if (action.payload.type === 'sendSms') {
        return {
          ...state,
          flashType: 'success',
          flash: 'Your SMS has been sent successfully.',
          loading: false,
        };
      }
      return {
        ...state,
        loading: false,
      };
    }
    case types.FETCH_DEFAULT_DRAFT_REQUEST: {
      if (action.payload.type !== 'contact') {
        return state;
      }
      return {
        ...state,
        flashType: 'loading',
        disabled: true,
        eoiFailed: false,
      };
    }
    case types.FETCH_DEFAULT_DRAFT_SUCCESS: {
      if (action.payload.type !== 'contact') {
        return state;
      }
      if (state.eoiFailed) {
        return state;
      }

      return {
        ...state,
        disabled: action.payload.isSent,
        flashType: action.payload.isSent ? 'success' : 'default',
        flash: action.payload.isSent ? 'Your SMS has already been sent successfully.' : null,
        message: action.payload.draft || '',
      };
    }
    case types.CONTACT_EOI_FAIL:
    case types.FETCH_DEFAULT_DRAFT_FAIL: {
      const { error, prefix, uid, profile, self } = action.payload;

      const profileCreatedBy = profile && profile.summary && profile.summary.profileCreatedBy;
      const profileAlbumStatus = profile && profile.flags && profile.flags.albumStatus;
      const membershipTags = profile && profile.flags && profile.flags.membershipTags;
      if (error.message === 'contact_detail_not_verified_request') {
        return {
          ...initialState,
          uid,
          self,
          name: profile.name,
          hisHer: profile.hisHer,
          heShe: profile.heShe,
          himHer: profile.himHer,
          eoiFailed: true,
          photo: profile.photo,
          thumbnail: profile.thumbnail,
          photoBlur: profile.photoBlur,
          thumbnailBlur: profile.thumbnailBlur,
          profileCreatedBy,
          profileAlbumStatus,
          status: 'availableOnVerification',
        };
      }

      if (error.message === 'add_member_contact_details') {
        return {
          ...initialState,
          uid,
          self,
          name: profile.name,
          hisHer: profile.hisHer,
          heShe: profile.heShe,
          himHer: profile.himHer,
          eoiFailed: true,
          photo: profile.photo,
          thumbnail: profile.thumbnail,
          photoBlur: profile.photoBlur,
          thumbnailBlur: profile.thumbnailBlur,
          profileCreatedBy,
          profileAlbumStatus,
          status: 'availableOnMemberVerification',
        };
      }

      if (error.message === 'when_i_contact_member_declined') {
        return {
          ...initialState,
          uid,
          name: profile.name,
          hisHer: profile.hisHer,
          heShe: profile.heShe,
          himHer: profile.himHer,
          eoiFailed: true,
          photo: profile.photo,
          thumbnail: profile.thumbnail,
          photoBlur: profile.photoBlur,
          thumbnailBlur: profile.thumbnailBlur,
          profileCreatedBy,
          profileAlbumStatus,
          status: 'member_declined',
        };
      }

      if (error.message === 'contact_detail_not_verified_requested') {
        return {
          ...initialState,
          verificationRequested: true,
          name: profile.name,
          photo: profile.photo,
          photoBlur: profile.photoBlur,
          thumbnail: profile.thumbnail,
          thumbnailBlur: profile.thumbnailBlur,
          profileCreatedBy,
          profileAlbumStatus,
          status: 'availableOnVerificationRequested',
        };
      }

      if (error.message === 'filtered_member_contacted') {
        return {
          ...initialState,
          name: profile.name,
          hisHer: profile.hisHer,
          heShe: profile.heShe,
          himHer: profile.himHer,
          eoiFailed: true,
          photo: profile.photo,
          photoBlur: profile.photoBlur,
          thumbnail: profile.thumbnail,
          thumbnailBlur: profile.thumbnailBlur,
          profileCreatedBy,
          profileAlbumStatus,
          status: 'filteredMemberContacted',
        };
      }

      if (error.message === 'Your profile is currently hidden.') {
        return {
          ...initialState,
          name: profile.name,
          photo: profile.photo,
          photoBlur: profile.photoBlur,
          thumbnail: profile.thumbnail,
          thumbnailBlur: profile.thumbnailBlur,
          profileCreatedBy,
          profileAlbumStatus,
          status: 'member_hidden',
        };
      }

      if (error.message === 'free_membership_contact_limit_exceeded') {
        return {
          ...initialState,
          name: profile.name,
          hisHer: profile.hisHer,
          photo: profile.photo,
          photoBlur: profile.photoBlur,
          thumbnail: profile.thumbnail,
          thumbnailBlur: profile.thumbnailBlur,
          profileCreatedBy,
          profileAlbumStatus,
          membershipTags,
          status: 'sku_contact_exceeded',
        };
      }

      return {
        ...initialState,
        eoiFailed: true,
        flashType: 'fatal',
        flash: `${prefix || ''}${error.message || error}`,
      };
    }

    default:
      return state;
  }
}
