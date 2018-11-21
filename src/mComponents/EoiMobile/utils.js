let maskLength = 0;
let match;

const allowedLength = [25, 73, 90, 500, 100, 190, 260];
const message = (maskString, length = 0) => {
  let returnString = maskString;
  if (returnString.length === 0) {
    return returnString;
  }
  maskLength = length;
  returnString = email(returnString);
  returnString = mobile(returnString);
  if (allowedLength.includes(length)) {
    returnString = trim(returnString);
  }
  return returnString;
};

const email = emailString => {
  if (emailString.length === 0) {
    return emailString;
  }
  let searchInThisString = emailString;
  const emailRegex = /([^\s]+)@([^\s]+\.[^\s]+)/;
  const matches = [];
  while ((match = emailRegex.exec(searchInThisString))) { // eslint-disable-line
    matches.push(match[0]);
    searchInThisString = searchInThisString.replace(match[0], ' #Email_Hidden# ');
  }

  return searchInThisString;
};

const mobile = mobileString => {
  if (mobileString.length === 0) {
    return mobileString;
  }
  let searchInThisString = mobileString;
  let searchInThisProfile = mobileString;
  let mobileStringFinal = mobileString;
  const mobileRegex = /[\d\-\+]{1}[\d\-\s]{4,17}[\d]{1}/; // eslint-disable-line
  const profileRegex = /(SH|sh|sH|Sh)(\d{7})\w+/g;
  const matches = [];
  const proMatches = [];
  while ((match = profileRegex.exec(searchInThisProfile))) { // eslint-disable-line
    proMatches.push(match[0]);
    searchInThisProfile = searchInThisProfile.replace(match[0], '');
  }
  while ((match = mobileRegex.exec(searchInThisString))) { // eslint-disable-line
    matches.push(match[0]);
    searchInThisString = searchInThisString.replace(match[0], '');
    if (!proMatches.includes(`SH${match[0]}`)) {
      mobileStringFinal = mobileStringFinal.replace(match[0], ' #Phone_No_Hidden# ');
    }
  }
  return mobileStringFinal;
};

const trim = maskString => {
  const maxLen = maskLength;
  const maskStringTemp = maskString.split(' ');
  let finalMsg = '';
  let diff = 0;
  let newlen = 0;
  maskStringTemp.map(item => { // eslint-disable-line
    newlen = finalMsg.length + item.length;
    if (newlen < maxLen) {
      finalMsg += ` ${item}`;
    } else {
      diff = maxLen - finalMsg.length;
      switch (item) {
        case '#Phone_No_Hidden#':
          break;
        case '#Email_Hidden#':
          break;
        default:
          finalMsg += ` ${item.substr(0, diff)}`;
          break;
      }
    }
  });
  return finalMsg;
};

const maskMsg = (msg, length, status) => {
  let maskedMsg;

  switch (status) {
    case 'hidden':
      maskedMsg = message(msg, length);
      break;
    default:
      maskedMsg = msg.substr(0, length);
  }

  return maskedMsg;
};

export { maskMsg };
