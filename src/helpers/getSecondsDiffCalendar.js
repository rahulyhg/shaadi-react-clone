import getSecondsToFormat from './getSecondsToFormat';
import getUnixToFormat from './getUnixToFormat';

const isUserInputFormat = format => format.match(/\[(.*?)\]/);

const getFormatedOutput = (epoch, format) => (isUserInputFormat(format) ? isUserInputFormat(format)[1] : getUnixToFormat(epoch, format));

const defaultFormats = {
  sameDay: 'DD/MM/YYYY HH:mm:ss',
  lastDay: 'DD/MM/YYYY HH:mm:ss',
  nextDay: 'DD/MM/YYYY HH:mm:ss',
  lastWeek: 'DD/MM/YYYY HH:mm:ss',
  nextWeek: 'DD/MM/YYYY HH:mm:ss',
  sameElse: 'DD/MM/YYYY HH:mm:ss',
};

export default (inputEpoch, userFormats) => {
  const formats = {
    ...defaultFormats,
    ...userFormats,
  };
  const nowEpoch = Math.floor(Date.now() / 1000);
  const diffSeconds = nowEpoch - inputEpoch;
  const isFuture = diffSeconds < 0;
  let diffDays = getSecondsToFormat(Math.abs(diffSeconds)).daysInSeconds;
  diffDays = isFuture ? -1 * diffDays : diffDays;
  switch (diffDays) {
    case 0:
      return getFormatedOutput(inputEpoch, formats.sameDay);
    case 1:
      return getFormatedOutput(inputEpoch, formats.lastDay);
    case -1:
      return getFormatedOutput(inputEpoch, formats.nextDay);
    case 7:
      return getFormatedOutput(inputEpoch, formats.lastWeek);
    case -7:
      return getFormatedOutput(inputEpoch, formats.nextWeek);
    default:
      return getFormatedOutput(inputEpoch, formats.sameElse);
  }
};
