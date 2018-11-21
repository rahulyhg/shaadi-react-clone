import { Reducer } from 'redux-testkit';
import verifiedMobile from '../../cartPage/verifiedMobile';
import factory from './utils/factory';

describe('reducer verified Mobile', () => {
  describe('verified Mobile', () => {
    it('should generate the verifiedMobile state on no action', () => {
      const state = Reducer(verifiedMobile).execute({});
      expect(state).toHaveProperty('isVerifiedMobile');
      expect(state).toHaveProperty('mobile');
      expect(state).toHaveProperty('country');
      expect(state).toHaveProperty('countryCode');
      expect(state).toEqual(factory.theDefaultVerifiedMobileState);
    });

    it('should generate the modified state on SUCCESS VERIFIEDMOBILE API response', () => {
      const state = verifiedMobile(factory.theDefaultVerifiedMobileState, {
        type: 'VERIFIED_MOBILE_SUCCESS',
        ...factory.verifiedMobileProps,
      });
      expect(state).toMatchObject({
        isVerifiedMobile: true,
        mobile: expect.any(String),
        country: expect.any(String),
        countryCode: expect.any(String),
      });
      expect(state.isVerifiedMobile).toEqual(true);
      expect(state.mobile).toEqual('6812297799');
      expect(state.country).toEqual('India');
      expect(state.countryCode).toEqual('+91');
    });

    it('should generate the modified state on DETAILS VERIFIEDMOBILE API requested', () => {
      const state = verifiedMobile(factory.theDefaultVerifiedMobileState, {
        type: 'VERIFIED_MOBILE_REQUEST',
        action: { response: { data: { data: {} } } },
      });
      expect(state).toHaveProperty('isVerifiedMobile');
      expect(state).toHaveProperty('mobile');
      expect(state).toHaveProperty('country');
      expect(state).toHaveProperty('countryCode');
      expect(state.isVerifiedMobile).toEqual(false);
      expect(state.mobile).toEqual('');
      expect(state.country).toEqual('');
      expect(state.countryCode).toEqual('');
      expect(state).toEqual(factory.theDefaultVerifiedMobileState);
    });
  });
});
