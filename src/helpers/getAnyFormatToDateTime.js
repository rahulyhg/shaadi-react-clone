const getMonthFromString = monthStr => {
  const monthNumber = new Date(Date.parse(`${monthStr}1, 2012`)).getMonth();
  return isNaN(monthNumber) ? -1 : monthNumber;
};

export default (dateTimeStr, format) => {
  const matchedLetter = dateTimeStr.match(/[a-z]{1,}/i) || [''];
  const monthStr = matchedLetter[0];
  let monthNumber = getMonthFromString(monthStr);
  monthNumber = monthNumber > -1 ? monthNumber + 1 : '';
  const modifiedDateTimeStr = dateTimeStr.replace(monthStr, monthNumber);
  let year = '';
  let month = '';
  let date = '';
  let hours = '';
  let minutes = '';
  let seconds = '';
  const milliseconds = 0;
  Array(modifiedDateTimeStr.length)
    .fill()
    .forEach((_, j) => {
      const number = modifiedDateTimeStr.charAt(j);
      switch (format.charAt(j)) {
        case 'Y':
          year += number;
          break;
        case 'M':
          month += number;
          break;
        case 'D':
          date += number;
          break;
        case 'H':
          hours += number;
          break;
        case 'm':
          minutes += number;
          break;
        case 's':
          seconds += number;
          break;
        // case "ms": seconds += number; break;
        default:
          break;
      }
    });
  const currentDateObj = new Date();
  if (year.length === 2) {
    const currentYear = currentDateObj.getFullYear();
    const currentDecade = currentYear % 100;
    year = currentYear - currentDecade + parseInt(year, 10);
  }
  const dateObj = new Date(year, month - 1, date, hours, minutes, seconds, milliseconds);
  dateObj.getEpoch = () => dateObj.getTime() / 1000;
  return dateObj;
};
