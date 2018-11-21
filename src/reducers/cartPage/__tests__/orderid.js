import { Reducer } from 'redux-testkit';
import orderId from '../../cartPage/orderId';
import factory from './utils/factory';

describe('reducer Generate Order ID', () => {
  describe('Generate Order ID', () => {
    it('should generate the Order ID state on no action', () => {
      const state = Reducer(orderId).execute({});
      expect(state).toHaveProperty('id');
      expect(state).toHaveProperty('errorMsg');
      expect(state).toHaveProperty('loading');
      expect(state).toEqual(factory.theDefaultOrderIdState);
    });

    it('should generate the modified state on SUCCESS ORDERID API response with status code 200', () => {
      const state = orderId(factory.theDefaultOrderIdState, {
        type: 'GET_ORDERID_SUCCESS',
        ...factory.orderIdGenerationProps,
      });
      expect(state).toMatchObject({
        id: expect.any(String),
        errorMsg: expect.any(String),
        loading: false,
      });
      expect(state.id).toEqual('11211');
      expect(state.errorMsg).toEqual('');
    });

    it('should generate the modified state on SUCCESS ORDERID API response without status code 200', () => {
      const state = orderId(factory.theDefaultOrderIdState, {
        type: 'GET_ORDERID_SUCCESS',
        ...factory.orderIdGenerationWithoutSuccessCodeProps,
      });
      expect(state).toMatchObject({
        id: expect.any(String),
        errorMsg: expect.any(String),
        loading: false,
      });
      expect(state.id).toEqual('');
      expect(state.errorMsg).toEqual('');
    });

    it('should generate the modified state on DETAILS ORDERID API requested', () => {
      const state = orderId(factory.theDefaultOrderIdState, {
        type: 'GET_ORDERID_REQUEST',
        action: { response: { data: { data: {} } } },
      });
      expect(state).toMatchObject({ id: expect.any(String) });
      expect(state).toMatchObject({ errorMsg: expect.any(String) });
      expect(state).toHaveProperty('loading');
      expect(state.id).toEqual('');
      expect(state.errorMsg).toEqual('');
      expect(state).toEqual(factory.theDefaultOrderIdState);
    });

    it('should generate the modified state on FAILURE ORDERID API response with code ', () => {
      const state = orderId(factory.theDefaultOrderIdState, {
        type: 'GET_ORDERID_FAIL',
        ...factory.orderIdGenerationErrorProps,
      });
      expect(state).toMatchObject({
        id: expect.any(String),
        errorMsg: expect.any(String),
        loading: false,
      });
      expect(state.id).toEqual('');
      expect(state.errorMsg).toEqual(
        'An error occurred while processing your payment. Please try again or try a different mode of payment.',
      );
    });

    it('should generate the modified state on FAILURE ORDERID API response without code ', () => {
      const state = orderId(factory.theDefaultOrderIdState, {
        type: 'GET_ORDERID_FAIL',
        ...factory.orderIdGenerationWithoutCodeErrorProps,
      });
      expect(state).toMatchObject({
        id: expect.any(String),
        errorMsg: expect.any(String),
        loading: false,
      });
      expect(state.id).toEqual('');
      expect(state.errorMsg).toEqual('');
    });
  });
});
