import { combineReducers } from 'redux';
import cart from './cart';
import bankList from './bankList';
import doorStep from './doorStep';
import shaadiCenters from './shaadiCenters';
import uaeCities from './uaeCities';
import otpGeneration from './otpGeneration';
import otpVerification from './otpVerification';
import verifiedMobile from './verifiedMobile';
import orderId from './orderId';

export default combineReducers({
  cart,
  bankList,
  doorStep,
  shaadiCenters,
  uaeCities,
  otpGeneration,
  otpVerification,
  verifiedMobile,
  orderId,
});
