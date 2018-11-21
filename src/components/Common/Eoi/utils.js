let maskLength = 0;

const allowedLength = [25, 73, 90, 500, 100, 120, 190, 260];
const message = (maskString, length = 0) => {
  let returnString = maskString;
  if (returnString.length === 0) {
    return returnString;
  }
  maskLength = length;
  if (allowedLength.includes(length)) {
    returnString = trim(returnString);
  }
  return returnString;
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
const showDeleteBtn = ({ onDelete = null, isDeleted = false, listType = '' }) =>
  onDelete && !isDeleted && !['connect_deleted', 'connect_awaiting'].includes(listType);

const premiumBoldCtaHover = {
  'font-weight': 700,
  color: '#00bcd5',
};
const premiumCtaHover = {
  'font-weight': 500,
  color: '#00bcd5',
};
const vipBoldCtaHover = {
  'font-weight': 700,
  color: '#aa1e3c',
};
const vipCtaHover = {
  'font-weight': 500,
  color: '#aa1e3c',
};
const getCtaColor = (isPaidMember, membershipTags) => {
  if (isPaidMember && membershipTags === 'vip') {
    return 'red';
  }
  if (isPaidMember) {
    return 'green';
  }
  return 'grey';
};
export { maskMsg, showDeleteBtn, premiumBoldCtaHover, premiumCtaHover, vipBoldCtaHover, vipCtaHover, getCtaColor };
