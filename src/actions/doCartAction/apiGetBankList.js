/* eslint camelcase: 0 */
import types from '../../action_types';
import api from '../../api';
import { getTopBanksCodes } from './utils';

export default (auth, dispatch, isJusPay) => {
  const data = { auth, isJusPay };
  const url = isJusPay ? '/payment/bank-list-juspay' : '/payment/bank-list';
  const topBankCodes = getTopBanksCodes(isJusPay);
  api
    .get(url, data)
    .then(response => {
      dispatch({ type: types.BANKLIST_SUCCESS, response, isJusPay, topBankCodes });
    })
    .catch(error => {
      dispatch({ type: types.BANKLIST_FAIL, payload: {} });
    });
};
