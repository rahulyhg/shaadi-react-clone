import { Reducer } from 'redux-testkit';
import otpVerification from '../../cartPage/otpVerification';
import factory from './utils/factory';

describe('reducer otp verification', () => {
  describe('otp verification', () => {
    it('should generate the otpVerification state on no action', () => {
      const state = Reducer(otpVerification).execute({});
      expect(state).toHaveProperty('success');
      expect(state).toHaveProperty('errorMsg');
      expect(state).toHaveProperty('loading');
      expect(state).toEqual(factory.theDefaultOtpVerificationState);
    });

    it('should generate the modified state on SUCCESS OTPVERIFICATION API response', () => {
      const state = otpVerification(factory.theDefaultOtpVerificationState, {
        type: 'OTP_VERIFICATION_SUCCESS',
        ...factory.otpVerificationProps,
      });
      expect(state).toMatchObject({
        success: false,
        errorMsg: expect.any(String),
        loading: false,
      });
      expect(state.errorMsg).toEqual('');
    });

    it('should generate the modified state on DETAILS OTPVERIFICATION API requested', () => {
      const state = otpVerification(factory.theDefaultOtpVerificationState, {
        type: 'OTP_VERIFICATION_REQUEST',
        action: { response: { data: { data: {} } } },
      });
      expect(state).toHaveProperty('success');
      expect(state).toHaveProperty('errorMsg');
      expect(state).toHaveProperty('loading');
      expect(state.success).toEqual(false);
      expect(state.errorMsg).toEqual('');
      expect(state).toEqual(factory.theDefaultOtpVerificationState);
    });

    it('should generate the modified state on FAILURE OTPVERIFICATION API response', () => {
      const state = otpVerification(factory.theDefaultOtpVerificationState, {
        type: 'OTP_VERIFICATION_FAIL',
        ...factory.otpVerificationErrorProps,
      });
      expect(state).toMatchObject({
        success: false,
        errorMsg: expect.any(String),
        loading: false,
      });
      expect(state.errorMsg).toEqual('OTP Verification Failed');
    });
  });
});
