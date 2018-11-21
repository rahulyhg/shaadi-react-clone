import types from '../../action_types';

const initialState = {
  accountType: 'FREE',
  plan: 'FREE',
  planExpiryDate: '',
  planDaysToExpiry: 0,
  headerUpgradeLink: '/payment?source=top_navbar_upgrade',
  callSmsViewed: 0,
  callSmsBalance: 0,
  services: [],
  wasPaidUser: false,
  upgradeType: 'upgrade',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SESSION_CACHE:
      return state;
    case types.SESSION_SUCCESS: {
      const { auth } = action.payload;
      return {
        ...state,
        wasPaidUser: auth.membership.indexOf('was') !== -1,
        accountType: auth.accountType,
        services: auth.membershipServices,
        planExpiryDate: auth.expiryDate,
        planDaysToExpiry: auth.daysToExpiry,
        plan: auth.membership,
        callSmsBalance: auth.sms.balance,
        callSmsViewed: auth.sms.viewed,
        upgradeType: auth.upgradeType,
      };
    }
    case types.CONTACT_EOI_SUCCESS: {
      return {
        ...state,
        callSmsBalance: action.payload.contactDeduction === true ? state.callSmsBalance - 1 : state.callSmsBalance,
        callSmsViewed: action.payload.contactDeduction === true ? state.callSmsViewed + 1 : state.callSmsViewed,
      };
    }
    default:
      return state;
  }
}
