import { asFullDate } from '../../utils';
import connectionStatus from './connectionStatus';

export default (account, basic, connect, otherUid, other = {}, extra = {}) => {
  if (account && basic && connect && otherUid) {
    const status = connectionStatus(account, connect, otherUid, other, extra);
    const heShe = basic.gender === 'Male' ? 'He' : 'She';
    const hisHer = basic.gender === 'Male' ? 'his' : 'her';
    const dt = asFullDate(connect.record_date);
    const vDt = asFullDate(connect.viewed_date);
    const statusUpdatedDate = asFullDate(connect.status_updated_date);
    const parts = [];
    const p = (cond, txt) => (cond ? parts.push(txt) : null);

    p(
      connect.deleted_by_to > 0 && connect.to === account.memberlogin,
      `${heShe} Deleted your Interest on ${asFullDate(connect.deleted_by_to)}`,
    );
    p(
      connect.deleted_by_to > 0 && connect.from === account.memberlogin,
      `You Deleted ${hisHer} Interest on ${asFullDate(connect.deleted_by_to)}`,
    );

    if (parts.length === 0) {
      p(
        ['member_filtered_contacted', 'member_filtered'].includes(connect.connect_status),
        `You do not match ${hisHer} partner requirements.`,
      );
      p(
        ['profile_filtered_contacted', 'profile_filtered'].includes(connect.connect_status),
        `This Member has been Filtered out as per your criteria.`,
      );
      p(['theyContacted'].includes(status), `${heShe} sent you an Invitation on ${dt}.`);
      p(['accepted'].includes(status), `You Accepted ${hisHer.toLowerCase()} Invitation sent on ${dt}.`);
      p(['theyAccepted'].includes(status), `${heShe} Accepted your Invitation on ${statusUpdatedDate}.`);
    }

    if (parts.length === 0) {
      switch (status) {
        case 'contacted':
          p(connect.accept_viewed === 'N', `Invitation sent on ${dt}. ${heShe} hasn't Viewed your Invitation yet.`);
          p(
            connect.accept_viewed === 'Y',
            `Invitation sent on ${dt}, was Viewed on ${vDt} and ${heShe.toLowerCase()} chose to respond later.`,
          );
          break;
        default:
          return null;
      }
    }
    return parts.filter(f => f).join('  ');
  }
  return null;
};
