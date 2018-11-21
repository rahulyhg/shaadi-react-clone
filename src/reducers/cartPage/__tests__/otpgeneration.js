import { Reducer } from 'redux-testkit';
import otpGeneration from '../../cartPage/otpGeneration';
import factory from './utils/factory';

describe('reducer otp generation', () => {
  describe('otp generation', () => {
    it('should generate the otpGeneration state on no action', () => {
      const state = Reducer(otpGeneration).execute({});
      expect(state).toHaveProperty('attempt');
      expect(state).toHaveProperty('errorMsg');
      expect(state).toHaveProperty('loading');
      expect(state).toEqual(factory.theDefaultOtpGenerationState);
    });

    it('should generate the modified state on SUCCESS OTPGENERATION API response', () => {
      const state = otpGeneration(factory.theDefaultOtpGenerationState, {
        type: 'OTP_GENERATION_SUCCESS',
        ...factory.otpGenerationProps,
      });
      expect(state).toMatchObject({
        attempt: expect.any(Number),
        errorMsg: expect.any(String),
        loading: false,
      });
      expect(state.attempt).toEqual(2);
      expect(state.errorMsg).toEqual('');
    });

    it('should generate the modified state on DETAILS OTPGENERATION API requested', () => {
      const state = otpGeneration(factory.theDefaultOtpGenerationState, {
        type: 'OTP_GENERATION_REQUEST',
        action: { response: { data: { data: {} } } },
      });
      expect(state).toMatchObject({ attempt: expect.any(Number) });
      expect(state).toMatchObject({ errorMsg: expect.any(String) });
      expect(state).toHaveProperty('loading');
      expect(state.attempt).toEqual(0);
      expect(state.errorMsg).toEqual('');
      expect(state).toEqual(factory.theDefaultOtpGenerationState);
    });

    it('should generate the modified state on FAILURE OTPGENERATION API response', () => {
      const state = otpGeneration(factory.theDefaultOtpGenerationState, {
        type: 'OTP_GENERATION_FAIL',
        ...factory.otpGenerationErrorProps,
      });
      expect(state).toMatchObject({
        attempt: expect.any(Number),
        errorMsg: expect.any(String),
        loading: false,
      });
      expect(state.attempt).toEqual(0);
      expect(state.errorMsg).toEqual('OTP Generation Failed');
    });
  });
});
