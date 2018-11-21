import { httpResponse } from '../helpers';

const show = (logger, query, auth) =>
  new Promise((resolve, reject) => {
    const { uid } = auth;
    if (uid && uid.length) {
      logger.info('(response)', 200);
      resolve(httpResponse(200, { auth }));
    } else {
      logger.info('(response)', 400);
      reject(
        httpResponse(401, {
          code: 'E_NO_SESSION',
          message: 'Please login to continue.',
        }),
      );
    }
  });

export default {
  show,
};
