const baseValue = {
  cartData: {},
  paymentData: {},
};

export default (base = baseValue, payload = {}) => ({
  ...base,
  cartData: (payload.mode_of_payment ? payload : {}) || {},
  paymentData: (payload.top_header ? payload : {}) || {},
});
