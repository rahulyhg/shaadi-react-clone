import requestService from '../services/requestService';

const Labels = {
  member_blocked: 'You have Blocked this member.',
  member_hidden: 'Your Profile is currently hidden. Please unhide to chat',
  profile_hidden: 'Your chat message could not be sent as this profile is currently hidden or deactivated.',
  profile_blocked: 'This profile is currently not available. The member may have either hidden or deactivated profile.',
  member_cancelled: 'You Cancelled your Invitation.',
  profile_cancelled: 'This member Cancelled their Invitation. %HeShe% cannot be contacted.',
  member_declined: "Your chat message could not be sent as you have declined %name%'s invitation",
  profile_declined: 'This member declined your invitation. %HeShe% cannot be contacted.',
  same_gender: 'You cannot chat with a member of the same gender.',
  offline: '%name% just went offline. Your message will be delivered when %heShe% comes online.',
  profile_filtered_out: 'Your chat message could not be sent as %name% has filtered you from contacting.',
  member_filtered_out: 'Your chat message could not be sent as %name% has filtered you from contacting.',
  profile_filtered_contacted: 'Your chat message could not be sent as %name% has filtered you from contacting.',
  member_filtered_contacted: 'Your chat message could not be sent as %name% has filtered you from contacting.',
  both_party_pay_gamified: 'free_member',
  invalid_request: 'Your chat request is invalid.',
  free_member: 'free_member',
  allowed: '',
};

const show = (logger, query, auth) => {
  const { uid } = auth;
  const request = {
    method: 'get',
    url: `/chat/${uid}/allow`,
    params: {
      direction: query.direction,
      profileid: query.id,
      metadata: query.metadata,
    },
  };
  return requestService(logger, query, auth, request, d => ({
    code: d.data.code,
    message: Labels[d.data.message] || `You cannot contact this member due to ${d.data.message.replace(/_/g, ' ')}.`,
    isAllowed: d.data.allowed === 'Y',
    specialAction:
      d.data.code === 159
        ? 'both_party_locked'
        : d.data.code === 156 ? 'eoi_sent' : d.data.message === 'offline' && d.data.allowed === 'Y' ? 'try_anyway' : null,
  }));
};

export default {
  show,
};
