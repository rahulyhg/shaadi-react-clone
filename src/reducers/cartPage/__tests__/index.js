import { Reducer } from 'redux-testkit';
import cart from '../../cartPage/cart';
import factory from './utils/factory';

describe('reducer cart', () => {
  describe('cart', () => {
    it('should generate the default state on no action', () => {
      const state = Reducer(cart).execute({});
      expect(state).toMatchObject({ cartData: expect.any(Object), loading: true });
      expect(state).toHaveProperty('cartData.cart_details');
      expect(state.cartData).toHaveProperty('errorMsg');
      expect(state.cartData).toMatchObject({ cart_details: expect.any(Object) });
      expect(state.cartData).toMatchObject({ extra_products: expect.any(Array) });
      expect(state.cartData).toMatchObject({ mode_of_payment: expect.any(Array) });
      expect(state.cartData).toMatchObject({ settings: expect.any(Object) });
      expect(state.cartData.settings).toHaveProperty('isShaadiCare', false);
      expect(state.cartData.settings).toHaveProperty('isProfileBooster', false);
      expect(state.cartData.settings).toHaveProperty('isPersonalisedPlan', false);
      expect(state.cartData.settings).toHaveProperty('shaadiCareAmount', 0);
      expect(state.cartData.settings).toHaveProperty('profileBoosterAmount', 0);
      expect(state.cartData.settings).toHaveProperty('offerDiscountPerc', 0);
      expect(state.cartData.settings).toHaveProperty('offerDiscountAmount', 0);
      expect(state.cartData.settings).toHaveProperty('price', 0);
      expect(state.cartData.settings).toHaveProperty('discountedPrice', 0);
      expect(state.cartData.settings).toHaveProperty('yourPrice', 0);
      expect(state.cartData.settings).toHaveProperty('isCreditCardMop', false);
      expect(state.cartData.settings).toHaveProperty('isDebitCardMop', false);
      expect(state.cartData.settings).toHaveProperty('isPaypalMop', false);
      expect(state.cartData.settings).toHaveProperty('isNetBankingMop', false);
      expect(state.cartData.settings).toHaveProperty('isPayAtDoorStepMop', false);
      expect(state.cartData.settings).toHaveProperty('isPaymentAtBankMop', false);
      expect(state.cartData.settings).toHaveProperty('isShaadiCentreMop', false);
      expect(state.cartData.settings).toHaveProperty('isCashPaymentMop', false);
      expect(state.cartData.settings).toMatchObject({ ccConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ dcConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ paypalConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ netBankingConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ payAtDoorConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ paymentAtBankConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ shaadiCenterConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ cashPaymentConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ mopIds: expect.any(Object) });
      expect(state.cartData.settings.mopIds).toHaveProperty('creditCardId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('debitCardId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('paypalId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('netBankingId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('payAtDoorStepId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('paymentAtBankId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('shaadiCenterId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('cashPaymentId', 0);
      expect(state).toEqual(factory.theDefaultState);
    });

    it('should generate the modified state on SUCCESS CART API response', () => {
      const state = cart(factory.theDefaultState, {
        type: 'CART_SUCCESS',
        payload: { ...factory.payloadProps },
      });
      expect(state).toMatchObject({
        cartData: expect.objectContaining({
          cart_details: expect.any(Object),
          extra_products: expect.any(Array),
          mode_of_payment: expect.any(Array),
          settings: expect.any(Object),
        }),
        loading: false,
      });

      expect(state.cartData).toMatchObject({
        cart_details: expect.objectContaining({
          id: expect.any(Number),
          product_code: expect.any(String),
          product_name: expect.any(String),
          duration: expect.any(Number),
          price: expect.any(String),
          country: expect.any(String),
          currency: expect.any(String),
          display_currency: expect.any(String),
          offer_details: expect.any(Array),
          discounted_amount: expect.any(String),
        }),
      });
      expect(state.cartData).toMatchObject({
        extra_products: expect.arrayContaining([
          {
            name: expect.any(String),
            description: expect.any(String),
            amount: expect.any(Number),
          },
        ]),
      });
      expect(state.cartData).toMatchObject({
        mode_of_payment: expect.arrayContaining([
          {
            id: expect.any(Number),
            category: expect.any(String),
            mode: expect.any(String),
            type: expect.any(String),
            order_amount: expect.objectContaining({
              currency: expect.any(String),
              value: expect.any(Number),
              shaadi_care: expect.any(String),
            }),
          },
        ]),
      });
      expect(state.cartData).toMatchObject({
        settings: expect.objectContaining({
          isShaadiCare: expect.any(Boolean),
          isProfileBooster: expect.any(Boolean),
          isPersonalisedPlan: expect.any(Boolean),
          shaadiCareAmount: expect.any(Number),
          profileBoosterAmount: expect.any(Number),
          offerDiscountPerc: expect.any(Number),
          offerDiscountAmount: expect.any(Number),
          price: expect.any(Number),
          discountedPrice: expect.any(Number),
          yourPrice: expect.any(Number),
          isCreditCardMop: expect.any(Boolean),
          isDebitCardMop: expect.any(Boolean),
          isPaypalMop: expect.any(Boolean),
          isNetBankingMop: expect.any(Boolean),
          isPayAtDoorStepMop: expect.any(Boolean),
          isPaymentAtBankMop: expect.any(Boolean),
          isShaadiCentreMop: expect.any(Boolean),
          isCashPaymentMop: expect.any(Boolean),
          ccConvertedAmount: expect.any(Object),
          dcConvertedAmount: expect.any(Object),
          paypalConvertedAmount: expect.any(Object),
          netBankingConvertedAmount: expect.any(Object),
          payAtDoorConvertedAmount: expect.any(Object),
          paymentAtBankConvertedAmount: expect.any(Object),
          shaadiCenterConvertedAmount: expect.any(Object),
          cashPaymentConvertedAmount: expect.any(Object),
          mopIds: {
            creditCardId: expect.any(Number),
            debitCardId: expect.any(Number),
            paypalId: expect.any(Number),
            netBankingId: expect.any(Number),
            payAtDoorStepId: expect.any(Number),
            paymentAtBankId: expect.any(Number),
            shaadiCenterId: expect.any(Number),
            cashPaymentId: expect.any(Number),
          },
        }),
      });
      expect(state.cartData.settings).toHaveProperty('isShaadiCare');
      expect(state.cartData.settings).toHaveProperty('isProfileBooster');
      expect(state.cartData.settings).toHaveProperty('isPersonalisedPlan');
      expect(state.cartData.settings).toHaveProperty('shaadiCareAmount');
      expect(state.cartData.settings).toHaveProperty('profileBoosterAmount');
      expect(state.cartData.settings).toHaveProperty('offerDiscountPerc');
      expect(state.cartData.settings).toHaveProperty('offerDiscountAmount');
      expect(state.cartData.settings).toHaveProperty('price');
      expect(state.cartData.settings).toHaveProperty('discountedPrice');
      expect(state.cartData.settings).toHaveProperty('yourPrice');
      expect(state.cartData.settings).toHaveProperty('isCreditCardMop');
      expect(state.cartData.settings).toHaveProperty('isDebitCardMop');
      expect(state.cartData.settings).toHaveProperty('isPaypalMop');
      expect(state.cartData.settings).toHaveProperty('isNetBankingMop');
      expect(state.cartData.settings).toHaveProperty('isPayAtDoorStepMop');
      expect(state.cartData.settings).toHaveProperty('isPaymentAtBankMop');
      expect(state.cartData.settings).toHaveProperty('isShaadiCentreMop');
      expect(state.cartData.settings).toHaveProperty('isCashPaymentMop');
      expect(state.cartData.settings.ccConvertedAmount).toHaveProperty('currency');
      expect(state.cartData.settings.ccConvertedAmount).toHaveProperty('shaadi_care');
      expect(state.cartData.settings.ccConvertedAmount).toHaveProperty('value');
      expect(state.cartData.settings.ccConvertedAmount).not.toHaveProperty('spotlight');
      expect(state.cartData.settings.mopIds).toHaveProperty('creditCardId');
      expect(state.cartData.settings.mopIds).toHaveProperty('debitCardId');
      expect(state.cartData.settings.mopIds).toHaveProperty('paypalId');
      expect(state.cartData.settings.mopIds).toHaveProperty('netBankingId');
      expect(state.cartData.settings.mopIds).toHaveProperty('payAtDoorStepId');
      expect(state.cartData.settings.mopIds).toHaveProperty('paymentAtBankId');
      expect(state.cartData.settings.mopIds).toHaveProperty('shaadiCenterId');
      expect(state.cartData.settings.mopIds).toHaveProperty('cashPaymentId');
    });

    it('should generate the modified state on DETAILS CART API response fetch', () => {
      const state = cart(factory.theDefaultState, {
        type: 'CART_SUCCESS',
        payload: { ...factory.requestProps },
      });
      expect(state).toMatchObject({ cartData: expect.any(Object), loading: false });
      expect(state.cartData).not.toHaveProperty('cart_details');
      expect(state.cartData).not.toHaveProperty('extra_products');
      expect(state.cartData).not.toHaveProperty('mode_of_payment');
      expect(state.cartData).toHaveProperty('settings');
      expect(state.cartData.settings).toHaveProperty('isShaadiCare', false);
      expect(state.cartData.settings).toHaveProperty('isProfileBooster', false);
      expect(state.cartData.settings).toHaveProperty('isPersonalisedPlan', false);
      expect(state.cartData.settings).toHaveProperty('shaadiCareAmount', 0);
      expect(state.cartData.settings).toHaveProperty('profileBoosterAmount', 0);
      expect(state.cartData.settings).toHaveProperty('offerDiscountPerc', 0);
      expect(state.cartData.settings).toHaveProperty('offerDiscountAmount', 0);
      expect(state.cartData.settings).toHaveProperty('price', 0);
      expect(state.cartData.settings).toHaveProperty('discountedPrice', 0);
      expect(state.cartData.settings).toHaveProperty('yourPrice', 0);
      expect(state.cartData.settings).toHaveProperty('isCreditCardMop', false);
      expect(state.cartData.settings).toHaveProperty('isDebitCardMop', false);
      expect(state.cartData.settings).toHaveProperty('isPaypalMop', false);
      expect(state.cartData.settings).toHaveProperty('isNetBankingMop', false);
      expect(state.cartData.settings).toHaveProperty('isPayAtDoorStepMop', false);
      expect(state.cartData.settings).toHaveProperty('isPaymentAtBankMop', false);
      expect(state.cartData.settings).toHaveProperty('isShaadiCentreMop', false);
      expect(state.cartData.settings).toHaveProperty('isCashPaymentMop', false);
      expect(state.cartData.settings).toMatchObject({ ccConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ dcConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ paypalConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ netBankingConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ payAtDoorConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ paymentAtBankConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ shaadiCenterConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ cashPaymentConvertedAmount: expect.any(Object) });
      expect(state.cartData.settings).toMatchObject({ mopIds: expect.any(Object) });
      expect(state.cartData.settings.mopIds).toHaveProperty('creditCardId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('debitCardId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('paypalId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('netBankingId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('payAtDoorStepId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('paymentAtBankId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('shaadiCenterId', 0);
      expect(state.cartData.settings.mopIds).toHaveProperty('cashPaymentId', 0);
    });
  });
});
