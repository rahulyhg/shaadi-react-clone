import types from '../../action_types';

const initialState = {
  topBanks: [],
  otherBanks: [],
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.BANKLIST_SUCCESS: {
      const data =
        (action.response && action.response.data && action.response.data.data && action.response.data.data.netbanking_banks) || [];
      const topBankCodes = action.topBankCodes;
      const topBanks = [];
      topBankCodes.forEach((code, i) => {
        data.forEach((item, j) => {
          if (topBankCodes[i] === data[j].bank_code) {
            topBanks[i] = data[j];
          }
        });
      });
      const otherBanks = data.filter(f => !topBankCodes.includes(f.bank_code)) || [];
      return {
        ...state,
        topBanks,
        otherBanks,
        loading: false,
      };
    }
    case types.BANKLIST_REQUEST: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
