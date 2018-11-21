/* eslint no-underscore-dangle: 0 */
import { getRequestWorker, authenticationHeaders } from '../helpers';
import { API_BASE_URL } from '../server';

// Make a batch request to the server from a webworker
export default (auth, request) => {
  request.headers = {
    ...authenticationHeaders(auth),
    ...request.headers,
  };

  request.baseUrl = request.baseUrl || API_BASE_URL;

  getRequestWorker().sendBeacon(request);
};
