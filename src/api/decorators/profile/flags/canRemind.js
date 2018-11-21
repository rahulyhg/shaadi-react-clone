import getAnyFormatToDateTime from '../../../../helpers/getAnyFormatToDateTime';
import getSecondsToFormat from '../../../../helpers/getSecondsToFormat';
import dateTimeFormat from '../../../../constants/formats/dateTime';

// @todo have API send the canRemind flag like they are sending for canCancel
export default (connect, { uid }) => {
  if (!(connect && connect.status === 'Contacted' && connect.to === uid && connect.status_updated_date)) {
    return false;
  }
  if (connect.can_remind) {
    return connect.can_remind;
  }
  const statusUpdatedDateObj = getAnyFormatToDateTime(`${connect.status_updated_date}`, dateTimeFormat.apiResp);
  const statusUpdatedDateEpoch = statusUpdatedDateObj.getEpoch();
  const todayEpoch = Date.now() / 1000;
  const secondsDiff = todayEpoch - statusUpdatedDateEpoch;
  const daysSinceRequest = getSecondsToFormat(secondsDiff).daysInSeconds;
  return daysSinceRequest >= 1;
};
