import React from 'react';
import { EmailPhoneHiddenMsg } from './styles';

const hideContactData = (regEx, str, infoToDisplay) => {
  const splitedStr = str.split(regEx);
  if (splitedStr.length === 1) {
    return str;
  }
  return splitedStr.map(value => {
    if (infoToDisplay.includes(value)) {
      return <EmailPhoneHiddenMsg>{value}</EmailPhoneHiddenMsg>;
    }
    return value;
  });
};
const trim = (regEx, str, maxLength) => {
  const splitedStr = str.split(regEx);
  let updatedMsg = '';
  let newLength = 0;
  if (splitedStr.length === 1) {
    updatedMsg = str;
  } else {
    updatedMsg = splitedStr.reduce((accum, info) => {
      switch (info) {
        case '#Email_Hidden#':
          newLength = accum.length + 'Email Visible on Accept'.length;
          break;
        case '#Phone_No_Hidden#':
          newLength = accum.length + 'Phone No Visible on Accept'.length;
          break;
        default:
          newLength = accum.length + info.length;
      }

      if (newLength < maxLength) {
        switch (info) {
          case '#Email_Hidden#':
            return `${accum}#Email Visible on Accept#`;
          case '#Phone_No_Hidden#':
            return `${accum}#Phone No Visible on Accept#`;
          default:
            return `${accum}${info} `;
        }
      } else {
        switch (info) {
          case '#Email_Hidden#':
          case '#Phone_No_Hidden#':
            return accum;
          default:
            return `${accum}${info} `;
        }
      }
    }, '');
  }

  return updatedMsg;
};
export { hideContactData, trim };
