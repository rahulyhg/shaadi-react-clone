import decorators from '../decorators';
import requestService from '../services/requestService';

const cart = (logger, query, auth) => {
  const today = new Date();
  const randomNumber = `${today.getHours()}${today.getMinutes()}${today.getSeconds()}`;
  const request = {
    method: 'get',
    url: `/pages/getcart/${query.uid}?_debug=payment&time=${randomNumber}`,
  };
  return requestService(logger, query, auth, request, d => decorators.payment(undefined, d.data || {}));
};

const bankList = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `lookup?fieldset=netbanking_banks`,
  };
  return requestService(logger, query, auth, request, d => d);
};

const doorStep = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `lookup?fieldset=pickup_cities&fq={"pickup_cities":{"status":"Y"}}&sort={"pickup_cities":["display_name"]}`,
  };
  return requestService(logger, query, auth, request, d => d);
};

const shaadiCenters = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `lookup?fieldset=collection_centres&fq={"collection_centres":{"type":"SCC","country":"India"}}`,
  };
  return requestService(logger, query, auth, request, d => d);
};

const uaeCities = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `lookup?fieldset=collection_centres&fq={"collection_centres":{"status":"Y", "type":"UAEX","country":"United Arab Emirates"}}&sort={"collection_centres":["city"]}`,
  };
  return requestService(logger, query, auth, request, d => d);
};

const uaeCenters = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `lookup?fieldset=collection_centres&fq={"collection_centres":{"status":"Y", "type":"UAEX","country":"United Arab Emirates"}}&sort={"collection_centres":["city"]}`,
  };
  return requestService(logger, query, auth, request, d => d);
};

const products = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `pages/getpayment/${query.uid}?profileid=${query.profileid}&source=${query.source}&profilecount=${query.profilecount}&page=${
      query.page
    }&pid=${query.pid}`,
  };
  return requestService(logger, query, auth, request, d => decorators.payment(undefined, d.data || {}));
};

const otpGeneration = (logger, query) => {
  const { auth } = query;
  const request = {
    method: 'post',
    url: `verification/otp?_debug=otp_generate`,
    data: {
      data: {
        type: 'offline_payment',
        memberlogin: auth.uid,
        mobile: query.mobile,
        country: query.country,
        country_code: query.country_code,
      },
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

const otpVerification = (logger, query) => {
  const { auth } = query;
  const request = {
    method: 'put',
    url: `verification/verify-otp?_debug=otp_verify`,
    data: {
      data: {
        type: 'offline_payment',
        memberlogin: auth.uid,
        otp: query.otp,
      },
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

const memberContactDetails = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `contact/${query.uid}?profileids=${query.uid}&fieldset=details`,
  };
  return requestService(logger, query, auth, request, d => d);
};

const addToCart = (logger, query) => {
  const { auth, product_code, discount_code = '' } = query.params;
  const request = {
    method: 'post',
    url: `pages/submitcart/${auth.uid}`,
    data: {
      memberlogin: auth.uid,
      platform: 'web',
      product_code,
      offer_code: discount_code,
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

const orderSuccess = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `pages/thank-you/${auth.uid}?order_id=${query.orderid}`,
  };
  return requestService(logger, query, auth, request, d => d);
};

const getOrderId = (logger, query) => {
  const { auth, accessToken, cartId, mopName, mopId, isShaadiCareChecked, isProfileBoosterChecked } = query;
  let requiredData = {
    access_token: accessToken,
    cart_id: `${cartId}`,
    error_url: window.location.href.split('?')[0],
    mode: mopName,
    mopid: `${mopId}`,
  };
  if (isShaadiCareChecked) {
    requiredData = { ...requiredData, shaadi_care: `${isShaadiCareChecked}` };
  }
  if (isProfileBoosterChecked) {
    requiredData = { ...requiredData, profile_booster: `${isProfileBoosterChecked}` };
  }
  const request = {
    method: 'post',
    url: `pages/placeorder`,
    data: {
      ...requiredData,
    },
  };
  return requestService(logger, query, auth, request, d => d);
};

const bankListJusPay = (logger, query, auth) => {
  const request = {
    method: 'get',
    url: `lookup?fieldset=netbanking_banks&fq={"netbanking_banks":{"vendor":"juspay"}}`,
  };
  return requestService(logger, query, auth, request, d => d);
};

export default {
  cart,
  bankList,
  doorStep,
  shaadiCenters,
  uaeCities,
  uaeCenters,
  products,
  otpGeneration,
  otpVerification,
  memberContactDetails,
  addToCart,
  orderSuccess,
  getOrderId,
  bankListJusPay,
};
