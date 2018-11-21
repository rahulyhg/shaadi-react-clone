import axios from 'axios';
import { httpResponse, errorFor, deleteCookie } from '../helpers';

export default (reject, logger) => error => {
  if (error && error.response) {
    const { status, data } = error.response;
    const st = status && status >= 400 ? status : 400;
    if (st === 401) {
      deleteCookie('abc');
      window.location.reload();
    }
    if (status && data && data.error && data.error.message) {
      logger.info('(response)', st);
      reject(httpResponse(st, errorFor(data.error)));
    } else {
      logger.info('(response)', st);
      reject(httpResponse(st, error));
    }
  } else if (error.config && error.config.url) {
    reject(error);
  } else {
    Promise.reject(error);
    let errorCode = 500;
    if (axios.isCancel(error)) {
      errorCode = 499;
    }
    reject(httpResponse(errorCode, error));
  }
  return true;
};
