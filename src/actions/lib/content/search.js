import common from './common';

const button = (text, l) => ({ type: 'button', text, url: l });
const link = (text, l) => ({ type: 'link', text, url: l });
const red = text => ({ type: 'red', text });

export default {
  loudError: common.loudError,
  titleError: common.titleError,
  error: common.error,
  connect: (name, himHer, loc, selfUid, passwordSent, upgradeButton, isFiltered = false) => [
    'Your Invitation to Connect has been sent!',
    [
      passwordSent
        ? `We have also sent your photo password to the member.`
        : `We are happy you found a profile that you like, we will notify you as soon as ${name} responds.`,
    ],
    isFiltered && [red('The response may be delayed as you are Filtered out by this Member.')],
    upgradeButton && [`To send ${himHer.toLowerCase()} an Email`],
    upgradeButton && [button('Upgrade Now', `/payment/index?loc=${loc}&profileid=${selfUid}`)],
  ],
  bulkConnect: (n, heShe, upgrade) => [
    n === 0 ? 'Your Invitation could not be sent.' : 'Your Invitation to Connect has been sent!',
    n === 0 ? [] : [`We will notify you as soon as ${n === 1 ? heShe.toLowerCase() : 'they'} respond${n === 1 ? 's' : ''}.`],
    upgrade ? ['You can send personal messages', ' to them by becoming a premium member. '] : null,
    upgrade ? [link('Upgrade now', '/payment/index?loc=search'), '▸'] : null,
  ],
  bulkConnectEmpty: () => ['', ['You have not selected any profile.']],
  ignored: (name, hisHer) => [
    null,
    [`${name} will not be shown in your Search Results, Matches & Shortlists the next time you login.`],
    [
      `If you change your mind about ${hisHer.toLowerCase()}, you can access ${hisHer.toLowerCase()} profile from the `,
      link('Ignored Members', '/profile/ignored-members'),
      ' list.',
    ],
  ],
  shortlistedJustNow: (name, listIds, master) => {
    const addedTo = listIds.length === 1 ? `${(master.filter(m => m.id === listIds[0])[0] || {}).label}` : `${listIds.length} Shortlists`;
    return [listIds.length === 0 ? `Removed from your Maybe's.` : `Added to ${addedTo}`];
  },
  shortlisted: (name, listIds, master) => {
    const addedTo =
      listIds.length === 1 ? `${(master.filter(m => m.id === listIds[0])[0] || {}).label} Shortlist` : `${listIds.length} Shortlists`;
    return [
      listIds.length === 0 ? `You have removed ${name} from your Maybe's and Shortlists.` : `You have added ${name} to ${addedTo}`,
      listIds.length >= 0 && [
        'You can access your ',
        link(`Maybe's and Shortlists`, `/profile/shortlist?list_id=${listIds[0]}`),
        ` from the 'Matches' menu.`,
      ],
    ];
  },
  horoscope: (name, hisHer) => [
    `${name} has protected ${hisHer.toLowerCase()} own Horoscope from viewing.`,
    ['It will be visible if the member Accepts your invitation to connect.'],
  ],
  unverifiedContact: name => [
    'Contact details',
    [`You can view ${name}'s contact details after you Verify your own phone number.`],
    [
      'Verifying your phone number builds trust in your profile and helps us send you important notifications regarding your Shaadi.com profile.',
    ],
  ],
  connectLimitExceed: loc => [
    'Invitation limit exceeded.',
    [`You cannot send more than 50 Invitations in a single day. Please try again after 24 hours.`],
    null,
  ],
  connectLimitExceedPremium: loc => [
    'Invitation limit exceeded! ',
    [
      `Under our fair usage policy, you cannot send more than 200 Premium Invitations in a day. You can continue to Search and browse Profiles.`,
    ],
    null,
  ],
  hiddenProfile: multiple => [
    '',
    [
      `Your profile is currently hidden, To connect with ${multiple ? 'these members' : 'this member'}, please make your Profile `,
      link('Visible', '/my-shaadi/profile/unhide'),
    ],
    null,
  ],
};
