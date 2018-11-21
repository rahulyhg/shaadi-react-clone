/* global window */
import getAnyFormatToDateTime from '../../helpers/getAnyFormatToDateTime';
import getUnixToFormat from '../../helpers/getUnixToFormat';
import getSecondsDiffCalendar from '../../helpers/getSecondsDiffCalendar';
import getSecondsToFormat from '../../helpers/getSecondsToFormat';
import dateTimeFormat from '../../constants/formats/dateTime';

// @todo seggregate all the below util functions to single file with single function as default export

const inchesToFeet = inches => `${Math.floor(inches / 12)}' ${Math.round(inches % 12)}"`;
const inchesToCm = inches => `${Math.floor(inches * 2.54)}`;
const dateObj = t => getAnyFormatToDateTime(`${t}`, dateTimeFormat.apiResp);
const asT = t => dateObj(t).getTime();
const timestamp = t => dateObj(t).getTime();
const timekey = t => dateObj(t).getTime() / 10000000000000;
const secs = t => dateObj(t).getEpoch();
const midnightRoundedEpoch = t => {
  const date = dateObj(t);
  date.setHours(0, 0, 0, 0);
  return date.getTime() / 1000;
};
const asFullDate = t => getUnixToFormat(secs(t), 'DD MMM YYYY');

const hourMins = (h = 0, m = 0) => {
  if (!h && !m) {
    return '';
  }
  if (h >= 12) {
    return `${h - 12}:${m < 10 ? `0${m}` : m} PM`;
  }
  return `${h}:${m < 10 ? `0${m}` : m} AM`;
};

const asDate = t =>
  getSecondsDiffCalendar(midnightRoundedEpoch(t), {
    sameDay: 'h:mmA',
    lastDay: '[Yesterday]',
    lastWeek: 'DD/MM/YYYY',
    sameElse: 'DD/MM/YYYY',
    nextDay: '[Tomorrow]',
    nextWeek: 'DD/MM/YYYY',
  });

const asTime = t => getUnixToFormat(secs(t), 'h:mm A');

function sunSign(dob) {
  const monthAndDay = parseInt(String(dob).substr(4, 4), 10);
  if (!monthAndDay) {
    return undefined;
  }
  let sign;
  if (monthAndDay >= 101 && monthAndDay <= 119) sign = 'Capricorn';
  else if (monthAndDay >= 120 && monthAndDay <= 218) sign = 'Aquarius';
  else if (monthAndDay >= 219 && monthAndDay <= 320) sign = 'Pisces';
  else if (monthAndDay >= 321 && monthAndDay <= 420) sign = 'Aries';
  else if (monthAndDay >= 421 && monthAndDay <= 521) sign = 'Taurus';
  else if (monthAndDay >= 522 && monthAndDay <= 621) sign = 'Gemini';
  else if (monthAndDay >= 622 && monthAndDay <= 722) sign = 'Cancer';
  else if (monthAndDay >= 723 && monthAndDay <= 822) sign = 'Leo';
  else if (monthAndDay >= 823 && monthAndDay <= 923) sign = 'Virgo';
  else if (monthAndDay >= 924 && monthAndDay <= 1022) sign = 'Libra';
  else if (monthAndDay >= 1023 && monthAndDay <= 1122) sign = 'Scorpio';
  else if (monthAndDay >= 1123 && monthAndDay <= 1221) sign = 'Sagittarius';
  else if (monthAndDay >= 1222 && monthAndDay <= 1231) sign = 'Capricorn';
  else sign = '-';
  return sign;
}

const timeAgo = t => {
  const target = secs(t);
  const nowEpoch = Date.now() / 1000;
  const secondsDiff = nowEpoch - target;
  const timeDiff = getSecondsToFormat(secondsDiff);
  const hours = timeDiff.absoluteHours;
  const days = timeDiff.daysInSeconds;
  const weeks = timeDiff.weeksInSeconds;
  const months = timeDiff.monthsInSeconds;
  if (months >= 1) {
    return 'over a month ago';
  } else if (weeks >= 2) {
    return `${weeks} weeks ago`;
  } else if (weeks === 1) {
    return '1 week ago';
  } else if (days >= 2) {
    return `${days} days ago`;
  } else if (days === 1) {
    return `yesterday`;
  } else if (hours >= 1) {
    return `a few hours ago`;
  }
  return 'a few mins ago';
};

const asDate2 = t =>
  getSecondsDiffCalendar(midnightRoundedEpoch(t), {
    sameDay: `[${timeAgo(t)}]`,
    lastDay: '[Yesterday]',
    lastWeek: 'DD MMM',
    sameElse: 'DD MMM',
    nextDay: '[Tomorrow]',
    nextWeek: 'DD MMM',
  });

// @todo rectify below function and its usegage
const strnorm = (str, n = 0) => (!str || str === 'null' || str === 'undefined' || `${str}`.length <= n ? null : `${str}`);

// @todo rectify below function and its usegage
const arrnorm = arr => (!arr || arr === 'null' || arr === '' || arr === 'undefined' || arr === '[]' || arr.length === 0 ? [] : arr);

const extractKeys = (attrNameArr, AttrMap) => {
  if (!AttrMap) return {};
  return attrNameArr.reduce((accum, attrName) => {
    accum[attrName] = AttrMap[attrName] || '';
    return accum;
  }, {});
};

const either = (val, fallback) => ([NaN, undefined].includes(val) ? fallback : val);

export {
  arrnorm,
  strnorm,
  timestamp,
  secs,
  timekey,
  asFullDate,
  asT,
  asDate,
  asDate2,
  asTime,
  inchesToFeet,
  inchesToCm,
  sunSign,
  timeAgo,
  hourMins,
  extractKeys,
  either,
};
