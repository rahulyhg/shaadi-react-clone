const getMsgType = ({ listType, direction, message_id, isBothPartyPayUser }) => {
  let MsgDisplay = 'none';
  if (['connect_pending', 'connect_accepted', 'connect_awaiting'].includes(listType) && message_id) {
    if (isBothPartyPayUser) {
      MsgDisplay = direction === 'in' ? 'gamified' : 'none';
    } else {
      MsgDisplay = 'show';
    }
  }
  return MsgDisplay;
};
const getHiddenMsg = (isHidden, hiddenReason, { hisHer }) =>
  isHidden &&
  {
    selfDeleted: `Member has deleted ${hisHer.toLowerCase()} Profile`,
    systemDeleted: 'The profile has been deleted',
    defaultDeleted: `Member has decided to keep ${hisHer.toLowerCase()} profile hidden. Please check again after a few days.`,
    selfHidden: `Member has decided to keep ${hisHer.toLowerCase()} profile hidden. Please check again after a few days.`,
    systemHidden: `The profile has been temporarily hidden. Please check again after a few days.`,
  }[hiddenReason];
const getInfoMsgContent = ({ profile, item }) => {
  let alertMsg = '';
  let infoType;
  const { listType: CardType } = item;
  const [type] = CardType.split('_');
  const { connectionStatus, isHidden, hiddenReason } = profile.flags;
  const { heShe, himHer, hisHer } = profile;
  let hiddenMsg;
  if ((hiddenMsg = getHiddenMsg(isHidden, hiddenReason, { hisHer }))) {
    return { alertMsg: hiddenMsg, InfoType: 'warning' };
  }
  if (type !== 'request') {
    switch (connectionStatus) {
      case 'cancelled':
        alertMsg = 'You cancelled your Invitation';
        break;
      case 'declined':
        alertMsg = `You Declined  ${hisHer} Invitation`;
        break;
      case 'theyDeclined':
        alertMsg = `${heShe} Declined your Invitation. This member cannot be contacted.`;
        break;
      case 'theyCancelled':
        alertMsg = `${heShe} Cancelled ${hisHer} Invitation.This member cannot be contacted.`;
        break;
      case 'filteredContacted':
        alertMsg = 'You are Filtered Out by this member';
        infoType = 'info';
        break;
      // no default
    }
  }
  if (alertMsg) {
    return { alertMsg, InfoType: infoType || 'warning' };
  }
  const { viewed_date, direction, actionTS, type: reqType } = item.requests[CardType];
  switch (CardType) {
    case 'connect_awaiting':
      alertMsg = viewed_date && `${heShe} viewed your Invitation on ${viewed_date} and chose to respond later`;
      break;
    case 'request_accepted':
      {
        const textMap = {
          out_contact: `${heShe} accepted your Phone Request on ${viewed_date}`,
          out_photo: `${heShe} accepted your Photo Request on ${viewed_date}`,
          in_contact: `You accepted ${hisHer.toLowerCase()} Phone Request on ${viewed_date}`,
          in_photo: `You accepted ${hisHer.toLowerCase()} Photo Request on ${viewed_date}`,
        };
        alertMsg = viewed_date && textMap[`${direction}_${reqType}`];
      }
      break;
    case 'request_awaiting': {
      const textMap = {
        contact: `You requested ${himHer.toLowerCase()} to verify Phone No. on ${actionTS}`,
        photo: `You requested ${himHer.toLowerCase()} to add Photo on ${actionTS}`,
      };
      alertMsg = actionTS && textMap[reqType];
    }
    // no default
  }

  return alertMsg && { alertMsg, InfoType: 'info' };
};
const getProfileUrl = ({ results }) => item => {
  const { results_id, permalink, evt_ref } = results;
  const ubt = `${permalink}|${results_id}|${item.requests[item.listType].requestKey}`;
  const pg_ubt = window.btoa(unescape(encodeURIComponent(ubt)));
  const profileUrl = `/profile?profileid=${item.uid}&ubt=${pg_ubt}&source=unified&evt_ref=${evt_ref}&datasrc=api`;
  return profileUrl;
};
export { getMsgType, getInfoMsgContent, getProfileUrl };
