/* eslint camelcase: 0 */
import { timestamp } from '../utils';

const baseValue = {
  onlineStatus: null,
  onlineAt: null,
  device: null,
  platform: null,
  lastOnline: null,
  lastOnlineDetails: null,
  chatIcon: null,
};

const isValidPayload = payload => payload.chat_presence || payload.chat_details;

export default (baseline = baseValue, payload) => {
  if (isValidPayload(payload)) {
    const { chat_presence, chat_details, relationship_actions } = payload;
    const presence = chat_presence && chat_presence.length > 0 ? chat_presence[chat_presence.length - 1] : {};
    const details = chat_details || {};
    const relationship = relationship_actions || {};

    const t = details.lastonlinestatus_time ? details.lastonlinestatus_time * 1000 : timestamp(presence.date);

    let onlineStatus = details.status || null;
    onlineStatus = onlineStatus === 'Online' && relationship.can_chat !== true ? null : onlineStatus;
    return {
      ...baseline,
      onlineStatus,
      onlineAt: t,
      device: presence.platform || null,
      platform: presence.platform ? (presence.platform === 'web' ? 'web' : 'mobile') : null,
      lastOnline: details.chat_status || null,
      lastOnlineDetails: details.status !== 'Online' ? `Online ${details.lastonlinetext}` : `${details.lastonlinetext} now`,
      chatIcon: details.icon_status || baseline.chatIcon,
    };
  }
  return null;
};
