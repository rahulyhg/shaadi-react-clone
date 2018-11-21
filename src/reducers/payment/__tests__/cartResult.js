import { Reducer } from 'redux-testkit';
import cartResult from '../cartResult';
import types from '../../../action_types';

describe('reducer cartresult', () => {
  it('should handle any other action by returning state as is', () => {
    const action = { type: 'default' };
    const result = {
      btnloading: false,
      cartErrorMsg: '',
    };
    Reducer(cartResult)
      .expect(action)
      .toReturnState(result);
  });

  it('should handle types.ADD_CART_REQUEST action by setting loading to true', () => {
    const action = { type: types.ADD_CART_REQUEST };
    const result = {
      btnloading: true,
      cartErrorMsg: '',
    };
    Reducer(cartResult)
      .expect(action)
      .toReturnState(result);
  });

  it('should handle types.ADD_CART_SUCCESS action by setting loading to true', () => {
    const action = { type: types.ADD_CART_SUCCESS, payload: { data: null } };
    const state = { previousState: true };
    Reducer(cartResult)
      .withState(state)
      .expect(action)
      .toReturnState(state);
  });

  it('should handle types.ADD_CART_FAIL action by setting loading to true by showing error', () => {
    const action = {
      type: types.ADD_CART_FAIL,
      payload: { response: { data: { status: 400, message: 'This Promotion code cannot be availed for the selected product.' } } },
    };
    const result = {
      btnloading: false,
      cartErrorMsg: 'This Promotion code cannot be availed for the selected product.',
    };
    Reducer(cartResult)
      .expect(action)
      .toReturnState(result);
  });
});
