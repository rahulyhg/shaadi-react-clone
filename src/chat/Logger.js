/* eslint no-underscore-dangle: 0 */
import logger from '../logger';

export default class Logger {
  constructor(prefix, logToConsole) {
    this.logToConsole = logToConsole;
    this.prefix = prefix;
  }

  log(...args) {
    if (!this.logToConsole) {
      return;
    }
    logger.debug(`%c ${this.prefix}`, 'color: green; font-weight: bold;', ...args);
  }
}
