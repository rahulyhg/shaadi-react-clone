import { timestamp, asDate, asT } from '../utils';
import profile from '../profile';

const baseMessage = {
  status: '', // ENUM (read | delivered | sent)
  lastMessage: '',
  unreadCount: 0,
  profile: {},
};

const messageDecorator = (base = baseMessage, payload, uid) => {
  const { account, message, unread_messages_count } = payload;
  return {
    ...base,
    uid: account.memberlogin,
    id: message.message_id,
    sentAt: timestamp(message.sent_time),
    from: message.from,
    to: message.to,
    status: message.to === uid ? 'none' : message.read_time ? 'read' : message.delivered_time ? 'delivered' : 'sent',
    lastMessage: message.message_text,
    lastMessageDate: asDate(message.sent_time),
    lastMessageT: asT(message.sent_time),
    unreadCount: unread_messages_count,
    profile: profile(undefined, payload),
  };
};

export default (base = undefined, payload = {}, uid) => ({
  unread: payload.unread_profiles_count,
  items: payload.data.map((message, i) => ({
    ...messageDecorator(undefined, message, uid),
    order: i,
  })),
});
