import { Reducer } from 'redux-testkit';
import products from '../../payment/products';
import factory from './utils/factory';

describe('reducer products', () => {
  describe('Products', () => {
    it('should generate the products state on no action', () => {
      const state = Reducer(products).execute({});
      expect(state).toMatchObject({ paymentData: expect.any(Object), loading: true });
      expect(state).toMatchObject({
        paymentData: expect.objectContaining({
          topBand: expect.any(Object),
          productDetails: expect.any(Object),
          urlParams: expect.any(Object),
        }),
        loading: true,
      });
      expect(state.paymentData.topBand).toHaveProperty('isOfferDetail', false);
      expect(state.paymentData.topBand).toHaveProperty('isScentTrail', false);
      expect(state.paymentData.topBand).toHaveProperty('type', '');
      expect(state.paymentData.topBand).toHaveProperty('maxDiscount', 0);
      expect(state.paymentData.topBand).toHaveProperty('discountType', '');
      expect(state.paymentData.topBand).toHaveProperty('showTicker', false);
      expect(state.paymentData.topBand).toHaveProperty('validTill', '');
      expect(state.paymentData.topBand).toHaveProperty('isOldPrice', false);
      expect(state.paymentData.topBand).toHaveProperty('html', '');
      expect(state.paymentData.topBand).toHaveProperty('profileId', '');
      expect(state.paymentData.topBand).toHaveProperty('profileName', '');
      expect(state.paymentData.topBand).toHaveProperty('photo', '');
      expect(state.paymentData.topBand).toHaveProperty('subText', '');
      expect(state.paymentData.topBand).toHaveProperty('currency', '');
      expect(state.paymentData.topBand).toHaveProperty('gender', 'none');
      expect(state.paymentData.productDetails).toHaveProperty('currency', '');
      expect(state.paymentData.productDetails).toHaveProperty('showVip', true);
      expect(state.paymentData.productDetails).toHaveProperty('currentTime', '');
      expect(state.paymentData.productDetails).toHaveProperty('offerType', '');
      expect(state.paymentData.productDetails).toHaveProperty('showSkipLink', false);
      expect(state.paymentData.productDetails).toHaveProperty('skipProfileId', '');
      expect(state.paymentData.productDetails.products).toMatchObject({
        personalisedProducts: expect.any(Object),
        premiumProducts: expect.any(Object),
      });
      expect(state.paymentData.userDetails).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
      });
      expect(state.paymentData.urlParams).toHaveProperty('acceptCount', 0);
      expect(state.paymentData.urlParams).toHaveProperty('profileId', '');
      expect(state.paymentData.urlParams).toHaveProperty('source', '');
      expect(state).toEqual(factory.theDefaultState);
    });

    it('should generate the modified state on SUCCESS PRODUCTS API response', () => {
      const state = products(factory.theDefaultState, {
        type: 'PRODUCTS_DETAIL_SUCCESS',
        ...factory.payloadProps,
      });
      expect(state).toMatchObject({
        paymentData: expect.objectContaining({
          topBand: expect.any(Object),
          productDetails: expect.any(Object),
          userDetails: expect.any(Object),
          urlParams: expect.any(Object),
        }),
        loading: false,
      });
      expect(state.paymentData.productDetails.currency).toEqual('USD');
    });

    it('should generate the modified state on DETAILS PRODUCTS API requested', () => {
      const state = products(factory.theDefaultState, {
        type: 'PRODUCTS_DETAIL_REQUEST',
        action: { payload: { data: { paymentData: {} } } },
      });
      expect(state).toHaveProperty('loading', true);
    });

    it('should generate the initial state on SUCCESS PRODUCTS API response when payload is empty', () => {
      const state = products(factory.theDefaultState, {
        type: 'PRODUCTS_DETAIL_SUCCESS',
        payload: { data: null },
      });
      expect(state).toEqual(factory.theDefaultState);
    });
  });
});
