import React, { Fragment } from 'react';
import s from './styles';

const getContactStatusBasedMsg = {
  contacted: `An invitation to connect has been sent.`,
  theyContacted: `Invitation Accepted.`,
  accepted: `You have already accepted the invitation.`,
  theyAccepted: `Accepted your Invitation.`,
  default: `An invitation to connect will be sent along with the SMS.`,
};

const getMsgavailable = (connectionStatus, contactStatus, data) => (
  <Fragment>
    {['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(connectionStatus) && <s.TickIncon />}
    <s.ConnectMsg isVisible isTick={['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(connectionStatus)}>
      {getContactStatusBasedMsg[connectionStatus]}
    </s.ConnectMsg>
    <br />
  </Fragment>
);

const getMsglockOrlockedMemberAccepted = (connectionStatus, contactStatus, data) => (
  <Fragment>
    {['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(connectionStatus) && <s.TickIncon />}
    <s.ConnectMsg isVisible isTick={['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(connectionStatus)}>
      {data.heShe} has already accepted your invitation but has hidden {data.hisHer.toLowerCase()} number. However, you can send{' '}
      {data.himHer.toLowerCase()} a text message.
    </s.ConnectMsg>
    <br />
  </Fragment>
);

const getMsglock = (connectionStatus, contactStatus, data) => {
  const statusBasedMsg = `${
    data.heShe
  } has hidden ${data.hisHer.toLowerCase()} contact details. However, you can send ${data.himHer.toLowerCase()} a text message.\n`;
  return (
    <Fragment>
      {['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(connectionStatus) && <s.TickIncon />}
      <s.ConnectMsg isVisible isTick={['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(connectionStatus)}>
        {['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(connectionStatus) &&
          getContactStatusBasedMsg[connectionStatus]}{' '}
        {statusBasedMsg}{' '}
        {!['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(connectionStatus) &&
          `An invitation to connect will be sent along with the SMS.`}
      </s.ConnectMsg>
      <br />
    </Fragment>
  );
};

const getMsgAvailableOnRequest = (connectionStatus, contactStatus, data) => {
  const successMsg =
    data.flashType === 'success' ? 'An invitation to connect has been sent.' : ' An invitation to connect will be sent along with the SMS.';
  return (
    <Fragment>
      {data.flashType === 'success' && <s.TickIncon />}
      <s.ConnectMsg isVisible isTick={data.flashType === 'success'}>
        {data.flashType === 'success' && successMsg} {data.heShe} had made {data.hisHer.toLowerCase()} contact details{' '}
        <b>&quot;Visible on Accept&quot;</b>.{data.flashType !== 'success' && successMsg}
      </s.ConnectMsg>
      <br />
    </Fragment>
  );
};

const connectMessagesForStatus = (connectionStatus, contactStatus, data) => {
  switch (data.status) {
    case 'available':
    case 'showToFreeAndPremium':
      return getMsgavailable(connectionStatus, contactStatus, data);
    case 'availableOnRequest':
      return getMsgAvailableOnRequest(connectionStatus, contactStatus, data);
    case 'lockedMemberAccepted':
      return getMsglockOrlockedMemberAccepted(connectionStatus, contactStatus, data);
    case 'locked':
      return getMsglock(connectionStatus, contactStatus, data);
    default:
      return null;
  }
};

export { connectMessagesForStatus };
