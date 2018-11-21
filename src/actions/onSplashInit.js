import logger from '../logger';

export default history => () => {
  history.replace('/search/partner?ref=splash');
  logger.debug('Moving to preferred search');
};
