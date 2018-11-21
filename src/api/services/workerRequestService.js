/* eslint no-underscore-dangle: 0 */
import { getRequestWorker, httpResponse, errorFor, authenticationHeaders } from '../helpers';
import errorService from './errorService';
import { API_BASE_URL } from '../server';

const defaultError = e => {
  if (e.error) {
    return errorFor(e.error).message;
  }
  return `${e.key}: Something went wrong (${e.code}). The shaadi team is looking into it.`;
};

// Make a batch request to the server from a webworker
export default (logger, query, auth, batchRequests, decorator, errorDecorator, { allowPartialSuccess } = {}) => {
  const { uid } = auth;

  const request = {
    method: 'post',
    url: `/batch/${uid}?_debug=${query._debug || Object.keys(batchRequests).join(',')}`,
    baseUrl: API_BASE_URL,
    headers: authenticationHeaders(auth),
    body: batchRequests,
  };

  return new Promise((resolve, reject) => {
    getRequestWorker()
      .sendRequest(request)
      .then(response => {
        let allRequestsSuccess = true;
        let partialRequestsSuccess = false;
        let allRequestsFailed = false;

        Object.keys(response).every(k => {
          const isSuccess = response[k].code === 200;
          allRequestsSuccess = allRequestsSuccess && isSuccess;
          partialRequestsSuccess = partialRequestsSuccess || isSuccess;
          allRequestsFailed = allRequestsFailed && !isSuccess;
          return true;
        });

        if (allRequestsSuccess || (allowPartialSuccess && partialRequestsSuccess)) {
          const err = errorDecorator && errorDecorator(response); // bad way to use error decorator

          if (err) {
            reject(httpResponse(400, { message: err.message || err.code }));
          } else {
            const data = decorator(response);
            logger.info('(response)', 200);
            if (data.rejectPromise) {
              reject(httpResponse(400, { message: data.error.message || data.error.code }));
            }
            resolve(httpResponse(200, data));
          }
        } else {
          const errors = Object.keys(response)
            .map(k => ({ key: k, ...response[k] }))
            .filter(c => c.code !== 200)
            .map(c => [defaultError(c), c.key]);

          logger.info('(response)', 400);

          const err = errorDecorator && errorDecorator(response);

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
