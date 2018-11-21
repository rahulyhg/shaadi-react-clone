import types from '../../action_types';

const initialState = {
  cartData: {
    cart_details: {},
    extra_products: [],
    mode_of_payment: [],
    settings: {
      isShaadiCare: false,
      isProfileBooster: false,
      isPersonalisedPlan: false,
      shaadiCareAmount: 0,
      profileBoosterAmount: 0,
      offerDiscountPerc: 0,
      offerDiscountAmount: 0,
      price: 0,
      discountedPrice: 0,
      yourPrice: 0,
      isCreditCardMop: false,
      isDebitCardMop: false,
      isPaypalMop: false,
      isNetBankingMop: false,
      isPayAtDoorStepMop: false,
      isPaymentAtBankMop: false,
      isShaadiCentreMop: false,
      isCashPaymentMop: false,
      ccConvertedAmount: {},
      dcConvertedAmount: {},
      paypalConvertedAmount: {},
      netBankingConvertedAmount: {},
      payAtDoorConvertedAmount: {},
      paymentAtBankConvertedAmount: {},
      shaadiCenterConvertedAmount: {},
      cashPaymentConvertedAmount: {},
      mopIds: {
        creditCardId: 0,
        debitCardId: 0,
        paypalId: 0,
        netBankingId: 0,
        payAtDoorStepId: 0,
        paymentAtBankId: 0,
        shaadiCenterId: 0,
        cashPaymentId: 0,
      },
    },
    errorMsg: '',
  },
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CART_SUCCESS: {
      if (!action.payload.data.cartData) {
        return state;
      }
      const cartData = action.payload.data.cartData;
      const { cart_details: cartDetails = {}, extra_products: extraProducts = [], mode_of_payment: modeOfPayment = [] } = cartData;
      const { offer_details: OfferDetails = [] } = cartDetails;
      const shaadiCareAmount = extraProducts.filter(f => f && f.name === 'Shaadi Care Donation').map(f => f.amount)[0] || 0;
      const profileBoosterAmount = extraProducts.filter(f => f && f.name === 'profile_booster').map(f => f.amount)[0] || 0;
      const isCreditCardMop = !!modeOfPayment.filter(f => f && f.category === 'Credit Card').map(f => f.category)[0];
      const isDebitCardMop = !!modeOfPayment.filter(f => f && f.category === 'Debit Card').map(f => f.category)[0];
      const isPaypalMop = !!modeOfPayment.filter(f => f && f.category === 'PayPal').map(f => f.category)[0];
      const isNetBankingMop = !!modeOfPayment.filter(f => f && f.category === 'Net banking').map(f => f.category)[0];
      const isPayAtDoorStepMop = !!modeOfPayment.filter(f => f && f.category === 'Doorstep Collection').map(f => f.category)[0];
      const isPaymentAtBankMop = !!modeOfPayment.filter(f => f && f.category === 'Payment at Bank').map(f => f.category)[0];
      const isShaadiCentreMop = !!modeOfPayment.filter(f => f && f.category === 'Shaadi.com Centre').map(f => f.category)[0];
      const isCashPaymentMop = !!modeOfPayment.filter(f => f && f.category === 'Cash Payment').map(f => f.category)[0];

      const ccConvertedAmount = modeOfPayment.filter(f => f && f.category === 'Credit Card').map(f => f.order_amount)[0] || {};
      const dcConvertedAmount = modeOfPayment.filter(f => f && f.category === 'Debit Card').map(f => f.order_amount)[0] || {};
      const paypalConvertedAmount = modeOfPayment.filter(f => f && f.category === 'PayPal').map(f => f.order_amount)[0] || {};
      const netBankingConvertedAmount = modeOfPayment.filter(f => f && f.category === 'Net banking').map(f => f.order_amount)[0] || {};
      const payAtDoorConvertedAmount =
        modeOfPayment.filter(f => f && f.category === 'Doorstep Collection').map(f => f.order_amount)[0] || {};
      const paymentAtBankConvertedAmount =
        modeOfPayment.filter(f => f && f.category === 'Payment at Bank').map(f => f.order_amount)[0] || {};
      const shaadiCenterConvertedAmount =
        modeOfPayment.filter(f => f && f.category === 'Shaadi.com Centre').map(f => f.order_amount)[0] || {};
      const cashPaymentConvertedAmount = modeOfPayment.filter(f => f && f.category === 'Cash Payment').map(f => f.order_amount)[0] || {};

      const isShaadiCare = shaadiCareAmount !== 0;
      const isProfileBooster = profileBoosterAmount !== 0;
      const isPersonalisedPlan = ['PP_SP6', 'PP_SP1'].includes(cartDetails.product_code);
      const offerDiscountPerc = OfferDetails.filter(f => f && f.type === 'perc').map(f => Number(f.value))[0] || 0;
      const offerDiscountAmount = OfferDetails.filter(f => f && f.type === 'amount').map(f => f.value)[0] || 0;
      const price = Number(cartDetails.price) || 0;
      const discountedPrice = Number(cartDetails.discounted_amount) || 0;
      const yourPrice = price - discountedPrice;

      const mopIds = {
        creditCardId: modeOfPayment.filter(f => f && f.category === 'Credit Card').map(f => f.id)[0] || 0,
        debitCardId: modeOfPayment.filter(f => f && f.category === 'Debit Card').map(f => f.id)[0] || 0,
        paypalId: modeOfPayment.filter(f => f && f.category === 'PayPal').map(f => f.id)[0] || 0,
        netBankingId: modeOfPayment.filter(f => f && f.category === 'Net banking').map(f => f.id)[0] || 0,
        payAtDoorStepId: modeOfPayment.filter(f => f && f.category === 'Doorstep Collection').map(f => f.id)[0] || 0,
        paymentAtBankId: modeOfPayment.filter(f => f && f.category === 'Payment at Bank').map(f => f.id)[0] || 0,
        shaadiCenterId: modeOfPayment.filter(f => f && f.category === 'Shaadi.com Centre').map(f => f.id)[0] || 0,
        cashPaymentId: modeOfPayment.filter(f => f && f.category === 'Cash Payment').map(f => f.id)[0] || 0,
      };
      const query = action.payload.data.query || '';
      const errorMsg = cartData.error_msg ? cartData.error_msg : query && query.error ? query.error : '';
      return {
        ...state,
        loading: false,
        cartData: {
          ...action.payload.data.cartData,
          settings: {
            isShaadiCare,
            isProfileBooster,
            isPersonalisedPlan,
            shaadiCareAmount,
            profileBoosterAmount,
            offerDiscountPerc,
            offerDiscountAmount,
            price,
            discountedPrice,
            yourPrice,
            isCreditCardMop,
            isDebitCardMop,
            isPaypalMop,
            isNetBankingMop,
            isPayAtDoorStepMop,
            isPaymentAtBankMop,
            isShaadiCentreMop,
            isCashPaymentMop,
            ccConvertedAmount,
            dcConvertedAmount,
            paypalConvertedAmount,
            netBankingConvertedAmount,
            payAtDoorConvertedAmount,
            paymentAtBankConvertedAmount,
            shaadiCenterConvertedAmount,
            cashPaymentConvertedAmount,
            mopIds,
          },
          errorMsg,
        },
      };
    }
    case types.CART_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}
