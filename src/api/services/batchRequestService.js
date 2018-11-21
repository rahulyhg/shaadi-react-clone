/* eslint no-underscore-dangle: 0 */
import { httpResponse, errorFor, authenticationHeaders } from '../helpers';
import server from '../server';
import errorService from './errorService';

const defaultError = e => {
  if (e.error) {
    return errorFor(e.error).message;
  }
  return `${e.key}: Something went wrong (${e.code}). The shaadi team is looking into it.`;
};

export default (logger, query, auth, batchRequests, decorator, errorDecorator, { allowPartialSuccess, cancelToken } = {}) => {
  const { uid } = auth;

  return new Promise((resolve, reject) => {
    server({
      method: 'post',
      url: `/batch/${uid}?_debug=${query._debug || Object.keys(batchRequests).join(',')}`,
      headers: authenticationHeaders(auth),
      data: batchRequests,
      cancelToken,
    })
      .then(response => {
        let allRequestsSuccess = true;
        let partialRequestsSuccess = false;
        let allRequestsFailed = false;
        Object.keys(response.data).every(k => {
          const isSuccess = response.data[k].code === 200;
          allRequestsSuccess = allRequestsSuccess && isSuccess;
          partialRequestsSuccess = partialRequestsSuccess || isSuccess;
          allRequestsFailed = allRequestsFailed && !isSuccess;
          return true;
        });
        if (allRequestsSuccess || (allowPartialSuccess && partialRequestsSuccess)) {
          const err = errorDecorator && errorDecorator(response.data); // bad way to use error decorator
          if (err) {
            reject(httpResponse(400, { message: err.message || err.code }));
          } else {
            const data = decorator(response.data);
            logger.info('(response)', 200);
            if (data.rejectPromise) {
              reject(httpResponse(400, { message: data.error.message || data.error.code }));
            }
            resolve(httpResponse(200, data));
          }
        } else {
          const errors = Object.keys(response.data)
            .map(k => ({ key: k, ...response.data[k] }))
            .filter(c => c.code !== 200)
            .map(c => [defaultError(c), c.key]);
          logger.info('(response)', 400);
          const err = errorDecorator && errorDecorator(response.data);
          if (err) {
            reject(httpResponse(400, { message: err.message || err.code }));
          } else {
            const error = errors[0][0];
            reject(httpResponse(400, { message: error }));
          }
        }
      })
      .catch(errorService(reject, logger));
  });
};
