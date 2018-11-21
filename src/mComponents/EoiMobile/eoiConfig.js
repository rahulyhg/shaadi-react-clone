const getAction = ({ source = 'default', canCancelInvite, canSendRemind }) => {
  const actionMap = {
    default: {
      default: [
        { key: 'contact_mobile_confirm', icon: 'view_contact', label: 'View Contact', checkMembership: true },
        { key: 'chatNow', icon: 'write_message', label: 'Write Message', checkMembership: true },
        { key: 'connect_mobile', icon: 'send_interest', label: 'Connect Now' },
      ],
      shortlisted: [
        { key: 'contact_mobile_confirm', icon: 'view_contact', label: 'View Contact', checkMembership: true },
        { key: 'chatNow', icon: 'write_message', label: 'Write Message', checkMembership: true },
        { key: 'connect_mobile', icon: 'send_interest', label: 'Connect Now' },
      ],
      theyContacted: [
        { key: 'decline_mobile', icon: 'decline', label: 'Decline' },
        { key: 'contact_mobile_confirm', icon: 'view_contact', label: 'View Contact', checkMembership: true },
        { key: 'accept_mobile', icon: 'send_interest', label: 'Accept' },
      ],
      contacted: [
        { key: 'cancel_mobile', icon: 'decline', label: 'Cancel', isDisabled: !canCancelInvite },
        { key: 'remind_mobile', icon: 'remind', label: 'Remind', isDisabled: !canSendRemind },
        { key: 'contact_mobile_confirm', icon: 'view_contact', label: 'View Contact', checkMembership: true },
      ],
      theyAccepted: [
        { key: 'cancel_mobile', icon: 'decline', label: 'Cancel' },
        { key: 'contact_mobile_confirm', icon: 'view_contact', label: 'View Contact', checkMembership: true },
        { key: 'chatNow', icon: 'write_message', label: 'Write Message', checkMembership: true },
      ],
      accepted: [
        { key: 'decline_mobile', icon: 'decline', label: 'Decline' },
        { key: 'contact_mobile_confirm', icon: 'view_contact', label: 'View Contact', checkMembership: true },
        { key: 'chatNow', icon: 'write_message', label: 'Write Message', checkMembership: true },
      ],
    },
    inbox: {
      filteredContacted: [
        {
          key: 'cancel_mobile',
          icon: 'grey_decline',
          label: 'Cancel',
          isDisabled: !canCancelInvite,
          showTooltip: !canCancelInvite,
          title: ' You can Cancel an invitation after 7 days of sending it.',
        },
      ],
      cancelled: [{ key: 'connect_mobile', icon: 'send_interest2x', label: 'Connect Now' }],
      declined: [{ key: 'accept_mobile', icon: 'send_interest2x', label: 'Accept' }],
      theyContacted: [
        { key: 'decline_mobile', icon: 'grey_decline', label: 'Decline' },
        { key: 'accept_mobile', icon: 'send_interest2x', label: 'Accept' },
      ],
      contacted: [
        {
          key: 'cancel_mobile',
          icon: 'grey_decline',
          label: 'Cancel',
          isDisabled: !canCancelInvite,
          showTooltip: !canCancelInvite,
          title: ' You can Cancel an invitation after 7 days of sending it.',
        },
        {
          key: 'remind_mobile',
          icon: 'remind2x',
          label: 'Remind',
          isDisabled: !canSendRemind,
          showTooltip: !canSendRemind,
          title: 'Visit again after 24 hours to send a Reminder.',
        },
      ],
      theyAccepted: [
        { key: 'contact_mobile_confirm', icon: 'view_contact2x', label: 'View Contact', checkMembership: true },
        { key: 'chatNow', icon: 'write_message2x', label: 'Write Message', checkMembership: true },
      ],
      accepted: [
        { key: 'contact_mobile_confirm', icon: 'view_contact2x', label: 'View Contact', checkMembership: true },
        { key: 'chatNow', icon: 'write_message2x', label: 'Write Message', checkMembership: true },
      ],
      add_photo: [{ key: 'add_photo', icon: 'card_add_photo', label: 'Add Photo' }],
      add_contact: [{ key: 'verify_contact', icon: 'verify_contact', label: 'Verify Phone No.' }],
      theyHidden: [{ key: 'delete_mobile', icon: 'grey_decline', label: 'Delete' }],
      disabled: [{ key: 'delete_mobile', icon: 'grey_decline', label: 'Delete' }],
    },
  };

  return actionMap[source];
};

const getMessages = ({ source = 'default', isMale }) => {
  const msgMap = {
    default: {
      theyDeclined: {
        title: `${isMale ? 'He' : 'She'} Declined your invitation`,
        description: `You cannot contact this Member on Shaadi.com. We will notify you if ${isMale ? 'he' : 'she'} changes ${
          isMale ? 'his' : 'her'
        } mind.`,
      },
      theyCancelled: {
        title: `${isMale ? 'He' : 'She'} Cancelled your invitation`,
        description: `You cannot contact this Member on Shaadi.com. We will notify you if ${isMale ? 'he' : 'she'} changes ${
          isMale ? 'his' : 'her'
        } mind.`,
      },
      contacted: {
        title: 'Invitation Sent',
        description: 'Contact him directly, ',
        link: 'View Contact',
        action: 'contact_mobile_confirm',
      },
      declined: {
        title: 'Declined Member',
        description: 'Changed your mind?',
        link: 'Connect Now',
        action: 'accept_mobile',
      },
      cancelled: {
        title: 'Cancelled Member',
        description: 'Changed your mind?',
        link: 'Connect Now',
        action: 'connect_mobile',
      },
      sameGender: {
        title: 'Same Gender',
        description: 'You cannot contact other members of the same gender',
      },
      blocked: {
        title: 'Blocked Member',
        description: 'Changed your mind?',
        link: `Unblock ${isMale ? 'him' : 'her'}`,
        action: 'unblock_mobile',
      },
      ignored: {
        title: 'Ignored Member',
        description: 'Changed your mind?',
        link: 'Connect Now',
        action: 'connect_mobile',
      },
      misuseReported: {
        title: 'Blocked Member',
        description: 'Changed your mind?',
        link: `Unblock ${isMale ? 'him' : 'her'}`,
        action: 'unblock_mobile',
      },
      member_hidden: {
        description: 'Your profile is currently hidden. \n To unhide and Connect with this Member, \n visit the',
        link: 'Desktop version',
        action: 'unhide_profile',
        color: '#51505d',
      },
    },
    inbox: {
      contacted: {
        title: 'Invitation Sent',
        description: 'Contact him directly, ',
        link: 'View Contact',
        action: 'contact_mobile_confirm',
      },
      declined: {
        title: 'Declined Member',
        link: 'Connect Now',
        action: 'accept_mobile',
      },
      cancelled: {
        title: 'Cancelled Member',
        link: 'Connect Now',
        action: 'connect_mobile',
      },
      sameGender: {
        title: 'Same Gender',
        description: 'You cannot contact other members of the same gender',
      },
      blocked: {
        title: 'Blocked Member',
        link: `Unblock ${isMale ? 'him' : 'her'}`,
        action: 'unblock_mobile',
      },
      ignored: {
        title: 'Ignored Member',
        link: 'Connect Now',
        action: 'connect_mobile',
      },
      misuseReported: {
        title: 'Blocked Member',
        link: `Unblock ${isMale ? 'him' : 'her'}`,
        action: 'unblock_mobile',
      },
      member_hidden: {
        description: 'Your profile is currently hidden. \n To unhide and Connect with this Member,\n visit the ',
        link: 'Desktop version',
        action: 'unhide_profile',
        color: '#51505d',
      },
    },
  };
  return msgMap[source] || {};
};
const redirectionLinkMap = {
  add_photo: '/my-shaadi/photo/advance',
  verify_contact: '/my-shaadi/contact-details/verify',
};
export { getAction, getMessages, redirectionLinkMap };
