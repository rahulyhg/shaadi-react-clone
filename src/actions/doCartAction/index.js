import withAuth from '../withAuth';
import types from '../../action_types';

import apiGetBankList from './apiGetBankList';
import apiGetDoorStepCollection from './apiGetDoorStepCollection';
import apiGetShaadiCenterCities from './apiGetShaadiCenterCities';
import apiGetUaeExchangeCities from './apiGetUaeExchangeCities';
import apiPostOtpGeneration from './apiPostOtpGeneration';
import apiPutOtpVerification from './apiPutOtpVerification';
import apiGetVerifiedMobile from './apiGetVerifiedMobile';
import apiGetOrderId from './apiGetOrderId';

export default (type, ...args) => (dispatch, getState) => {
  if (type !== 'getOrderIdApi') {
    dispatch({ type: types.BANKLIST_REQUEST, payload: {} });
  }
  dispatch({ type: types.DOORSTEP_REQUEST, payload: {} });
  dispatch({ type: types.SHAADICENTER_REQUEST, payload: {} });
  dispatch({ type: types.UAE_EXCHANGE_REQUEST, payload: {} });
  if (type !== 'otpVerificationApi') {
    dispatch({ type: types.OTP_GENERATION_REQUEST, payload: {} });
  }
  dispatch({ type: types.OTP_VERIFICATION_REQUEST, payload: {} });
  dispatch({ type: types.GET_ORDERID_REQUEST, payload: {} });

  withAuth(
    ({ auth }) => {
      switch (type) {
        case 'bankListApi':
          return apiGetBankList(auth, dispatch, ...args);
        case 'doorStepCollectionApi':
          return apiGetDoorStepCollection(dispatch);
        case 'shaadiCenterCitiesApi':
          return apiGetShaadiCenterCities(dispatch);
        case 'uaeExchangeCitiesApi':
          return apiGetUaeExchangeCities(dispatch);
        case 'otpGenerationApi':
          return apiPostOtpGeneration(auth, dispatch, ...args);
        case 'otpVerificationApi':
          return apiPutOtpVerification(auth, dispatch, ...args);
        case 'verifiedMobileApi':
          return apiGetVerifiedMobile(auth.uid, dispatch, ...args);
        case 'getOrderIdApi':
          return apiGetOrderId(auth, dispatch, ...args);
        default:
          return null;
      }
    },
    { caller: 'doCartAction', allowCache: false, delay: 200 },
  );
};
