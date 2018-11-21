import { either } from '../utils';
import getUnixToFormat from '../../../helpers/getUnixToFormat';
import getAnyFormatToDateTime from '../../../helpers/getAnyFormatToDateTime';
import getSecondsToFormat from '../../../helpers/getSecondsToFormat';
import dateTimeFormat from '../../../constants/formats/dateTime';

const getSmsViewed = sms => sms.used;

const getSmsBalance = sms => sms.total - sms.used;

const baseValue = {
  uid: '',
  accessToken: '',
  autologinToken: '',
  membership: [],
};

export default function(base = baseValue, payload = {}) {
  const {
    membership,
    other_services: membershipServices,
    profileid: uid,
    valid_till: validTill,
    upgrade_type: upgradeType = 'upgrade',
  } = payload;
  const validTillDateObj = getAnyFormatToDateTime(`${validTill}`, dateTimeFormat.apiResp);
  const validTillEpoch = Math.ceil(validTillDateObj.getTime() / 1000);
  const todayEpoch = Date.now() / 1000;
  const secondsDiff = validTillEpoch - todayEpoch;
  const isFreeAccount = secondsDiff < 0;
  const accountType = isFreeAccount ? 'FREE' : 'PAID';
  const expiryDate = isFreeAccount ? '' : getUnixToFormat(validTillEpoch, 'DD-MMM-YY');
  // @todo below param is not being used in UI, determine to keep it or remove it.
  const daysToExpiry = isFreeAccount ? 0 : getSecondsToFormat(secondsDiff).daysInSeconds;
  // test the days count at https://www.timeanddate.com/date/durationresult.html
  const sms = (payload.quota || {}).contacts || {};
  return {
    ...base,
    uid,
    membership,
    membershipServices,
    accountType,
    expiryDate,
    daysToExpiry,
    sms: { viewed: either(getSmsViewed(sms), 0), balance: either(getSmsBalance(sms), 0) },
    upgradeType,
  };
}
