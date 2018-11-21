/* global window */
import { stringify, parse } from 'qs';
import { extractHeaders, createLogger } from './helpers';

// Controllers
import ApplicationController from './controllers/ApplicationController';
import routes from './routes';

/*
 *
 * The api object mimics the following from the axios api.
 * This allows the rest of the app to pretend that they are using axios while
 * they use our mock api.
 *
 * axios.get(url[, config])
 * axios.delete(url[, config])
 * axios.post(url[, data[, config]])
 * axios.put(url[, data[, config]])
 * axios.patch(url[, data[, config]])
 *
 * axios.defaults.baseURL = 'https://api.example.com';
 * axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
 * axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 */

const defaults = {
  baseURL: '',
  headers: {
    common: {},
    post: {},
    get: {},
    put: {},
    patch: {},
    delete: {},
  },
};

const router = method => (path, config = {}, extras = {}) => {
  const logger = createLogger(new Date(), method, path);
  const route = (routes[method] || {})[path];
  const referer = window.location.href;
  logger.info('(request)', stringify(config.params));
  let out;
  if (route) {
    if (route.isPublic) {
      out = route(logger, parse(stringify(config.params), { arrayLimit: 1000 }));
    } else {
      out = ApplicationController.authenticate(
        logger,
        config.params,
        extractHeaders([defaults.headers.common, defaults.headers[method], config.headers, { referer }]),
      ).then(auth => route(logger, parse(stringify(config.params), { arrayLimit: 1000 }), auth, { config, ...extras }));
    }
  } else {
    out = ApplicationController.notFound(logger, method, path);
  }
  logger.debug('(promise)', out);
  return out;
};

const routerWithPayload = method => (path, data, config = {}, extras = {}) => {
  const logger = createLogger(new Date(), method, path);
  const route = (routes[method] || {})[path];
  const referer = window.location.href;
  logger.info('(request)', stringify(config.params), data);
  let out;
  if (route) {
    if (route.isPublic) {
      out = route(logger, data, parse(stringify(config.params), { arrayLimit: 1000 }), config);
    } else {
      out = ApplicationController.authenticate(
        logger,
        config.params,
        extractHeaders([defaults.headers.common, defaults.headers[method], config.headers, { referer }]),
      ).then(auth => route(logger, data, parse(stringify(config.params), { arrayLimit: 1000 }), auth, config, { ...extras }));
    }
  } else {
    out = ApplicationController.notFound(logger, method, path);
  }
  logger.debug('(promise)', out);
  return out;
};

const get = router('get');
const post = routerWithPayload('post');
const put = routerWithPayload('put');
const patch = routerWithPayload('patch');
const del = routerWithPayload('delete');

const Api = {
  get,
  post,
  put,
  patch,
  delete: del,
  defaults,
};

export default Api;
