import profile from '../profile';
import { timestamp, asDate2 } from '../utils';

const labels = (type, pro) =>
  ({
    contacts_contacted: 'has sent you an Invitation to Connect.',
    contacts_contacted_viewed: 'has viewed your invitation.',
    contacts_filtered: `has sent you an invitation to connect. ${pro.heShe} has been filtered by you.`,
    contacts_reminder: 'has sent you a Reminder to connect.',
    contacts_accepted: 'has accepted your invitation.',
    contacts_declined: 'has declined your invitation.',
    contacts_cancelled: 'has cancelled invitation.',

    photo_requests_received: 'has sent you a Photo Request.',
    photo_requests_accepted: 'has Accepted your Request and added a photo.',
    photo_password_requests_received: 'has sent you a Photo Password Request.',
    photo_password_requests_accepted: `has Accepted your Request and shared ${pro.hisHer.toLowerCase()} Photo Password.`,
    contact_details_requests_received: 'has sent you a Phone Request.',
    contact_details_requests_accepted: `has Accepted your Request and Verified ${pro.hisHer.toLowerCase()} phone number.`,

    emails_received: 'has sent you an Email.',
    emails_viewed: 'has read your Email.',
    bothpartypay_inbox:
      'Premium feature unlocked: We have extended a premium member benefit just for you, all messages in your inbox have now been unlocked!',
    bothpartypay_inbox_fb:
      'Premium feature unlocked: Congratulations on completing Facebook verification, all messages in your inbox have now been unlocked!',
    bothpartypay_accepted:
      'Premium feature unlocked: We have extended a premium member benefit just for you, all premium messages from accepted members have now been unlocked!',
    bothpartypay_accepted_fb:
      'Premium feature unlocked: Congratulations on completing Facebook verification, all premium messages from accepted members have now been unlocked!',

    recently_joined_today: 'New members have recently joined shaadi.com.',
  }[type] || type);

const shortLabels = (type, pro) =>
  ({
    contacts_contacted: 'has sent you an Invitation.',
    contacts_contacted_viewed: 'has viewed your Invitation.',
    contacts_reminder: 'has sent you a reminder.',
    contacts_accepted: 'has accepted your Invitation.',

    photo_requests_received: 'has sent you a Photo Request.',
    photo_requests_accepted: 'has added a photo.',
    photo_password_requests_received: 'has sent you a Photo Password Request.',
    photo_password_requests_accepted: `has shared ${pro.hisHer.toLowerCase()} Photo Password.`,
    contact_details_requests_received: 'has sent you a Phone Request.',
    contact_details_requests_accepted: `has verified ${pro.hisHer.toLowerCase()} phone number.`,

    emails_received: 'has sent you an Email.',
    emails_viewed: 'has read your Email.',
    bothpartypay_inbox: 'Premium feature unlocked!',
    bothpartypay_inbox_fb: 'Premium feature unlocked!',
    bothpartypay_accepted: 'Premium feature unlocked!',
    bothpartypay_accepted_fb: 'Premium feature unlocked!',

    recently_joined_today: null,
  }[type]);

const alertItemBase = {
  isRead: false,
  message: '',
  profile: null,
  notifiedAt: null,
  notifiedDate: null,
};

const alertItem = (base = alertItemBase, payload = {}) => {
  const { notifications } = payload;
  const pro = profile(undefined, payload);
  const systemTypes = ['bothpartypay_inbox', 'bothpartypay_inbox_fb', 'bothpartypay_accepted', 'bothpartypay_accepted_fb'];
  if (systemTypes.includes(notifications.notification_type)) {
    return {
      ...base,
      alertId: `${notifications.from}-${notifications.notification_type}-${notifications.record_date}`,
      isRead: notifications.viewed === 'Y',
      isSystem: true,
      type: notifications.notification_type,
      message: labels(notifications.notification_type, {
        ...pro,
        heShe: pro.gender === 'Male' ? 'He' : 'She',
        hisHer: pro.gender === 'Male' ? 'His' : 'Her',
      }),
      shortMessage:
        shortLabels(notifications.notification_type, {
          ...pro,
          heShe: pro.gender === 'Male' ? 'He' : 'She',
          hisHer: pro.gender === 'Male' ? 'His' : 'Her',
        }) || null,
      profile: pro,
      notifiedAt: timestamp(notifications.record_date),
      notifiedDate: asDate2(notifications.record_date),
    };
  }

  return {
    ...base,
    alertId: `${notifications.from}-${notifications.notification_type}-${notifications.record_date}`,
    isRead: notifications.viewed === 'Y',
    isSystem: false,
    type: notifications.notification_type,
    message: labels(notifications.notification_type, {
      ...pro,
      heShe: pro.gender === 'Male' ? 'He' : 'She',
      hisHer: pro.gender === 'Male' ? 'His' : 'Her',
    }),
    shortMessage:
      shortLabels(notifications.notification_type, {
        ...pro,
        heShe: pro.gender === 'Male' ? 'He' : 'She',
        hisHer: pro.gender === 'Male' ? 'His' : 'Her',
      }) || null,

    profile: pro,
    notifiedAt: timestamp(notifications.record_date),
    notifiedDate: asDate2(notifications.record_date),
  };
};

const baseValue = {
  items: [],
  count: 0,
  unread: 0,
};

export default function(base = baseValue, payload = {}) {
  return {
    ...base,
    count: payload.total_count,
    unread: payload.unviewed_count,
    items: payload.notifications.data.map(item => alertItem(undefined, item)),
  };
}
