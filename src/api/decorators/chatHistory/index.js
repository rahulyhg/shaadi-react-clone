/* eslint camelcase: 0 */
import { timestamp, secs, asTime } from '../utils';
import getSecondsToFormat from '../../../helpers/getSecondsToFormat';
import getUnixToFormat from '../../../helpers/getUnixToFormat';

// @todo move to a new file with default export below func
const dateTimeAgo = t => {
  const target = secs(t);
  const nowEpoch = Date.now() / 1000;
  const secondsDiff = nowEpoch - target;
  const timeDiff = getSecondsToFormat(secondsDiff);
  const hours = timeDiff.absoluteHours;
  const days = timeDiff.daysInSeconds;
  const date = getUnixToFormat(secs(t), 'DD MMM');
  if (days >= 2) {
    return `${date}`;
  } else if (days === 1) {
    return `yesterday`;
  } else if (hours >= 1) {
    return `few hours ago`;
  }
  return 'few mins ago';
};

const messageDecorator = (message, uid) => ({
  messageId: message.message_id,
  chatUid: uid,
  from: message.from,
  to: message.to,
  body: message.message_text,
  time: asTime(message.sent_time),
  t: timestamp(message.sent_time),
  isSelf: message.from === uid,
  isDeleted: message.deleted_time > 0,
  status: message.read_time ? 'read' : message.delivered_time ? 'delivered' : message.sent_time ? 'sent' : 'none',
  timeAgo: dateTimeAgo(message.sent_time),
});

export default (payload = {}, my_uid, other_uid) => ({
  chatUid: other_uid,
  since: payload.cut_off_criteria,
  hide_message: payload.hide_message,
  messages: (payload.messages || []).map(m => messageDecorator(m, my_uid)).reverse(),
});
