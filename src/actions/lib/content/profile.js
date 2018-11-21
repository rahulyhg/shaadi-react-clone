import common from './common';

// const button = (text, l) => ({ type: 'button', text, url: l });
const link = (text, l, className = '', target = '_blank') => ({ type: 'link', text, url: l, target, className });

const messageFor = content => ({
  title: content[0],
  body: content
    .slice(1)
    .filter(s => s)
    .map((para, i) => ({
      key: `para-${i}`,
      items: para.filter(s => s).map((sentence, j) => ({
        key: `s-${i}.${j}`,
        type: sentence.type ? `${sentence.type}` : 'text',
        text: sentence.text ? `${sentence.text}` : sentence ? `${sentence}` : null,
        url: sentence.url ? `${sentence.url}` : null,
        className: sentence.className ? `${sentence.className}` : null,
        target: sentence.target ? `${sentence.target}` : null,
      })),
    })),
  loading: false,
});

export default {
  loudError: common.loudError,
  titleError: common.titleError,
  error: common.error,
  connect: (name, pronoun, href, uid, showUpgradeLinks, accountType, heshe) => [
    null,
    [
      link(name, href),
      `has been notified that you wish to Connect with ${pronoun.toLowerCase()}!`,
      accountType.toLowerCase() === 'free'
        ? showUpgradeLinks && 'Send an Email & get 3 times more responses,'
        : `We will notify you as soon as ${heshe.toLowerCase()} responds.`,
      accountType.toLowerCase() === 'free'
        ? showUpgradeLinks && link('Upgrade Now', `/payment/index?loc=profile&profileid=${uid}&source=email`)
        : null,
    ],
  ],
  reminder: (name, pronoun, href, uid, showUpgradeLinks, accountType, heshe) => [
    null,
    [
      link(name, href),
      `has been sent an Invitation Reminder.`,
      accountType.toLowerCase() === 'free'
        ? showUpgradeLinks && `To contact ${pronoun.toLowerCase()} directly via Email or Phone,`
        : `We will notify you when ${heshe.toLowerCase()} responds.`,
      accountType.toLowerCase() === 'free'
        ? showUpgradeLinks && link('Upgrade Now', `/payment/index?loc=profile&profileid=${uid}&source=email`)
        : null,
    ],
  ],
  shortlist: (name, pronoun, uid, href) => [
    null,
    [
      link(name, href),
      ' has been added to your',
      link("Maybe's and Shortlists", '/profile/shortlist'),
      ". You can access your Shortlists from the 'Matches' menu.",
    ],
  ],
  blocked: (name, pronoun, uid, href) => [
    null,
    [
      link(name, href),
      ' has been added to your',
      link('Blocked list', '/profile/blocked-members'),
      `. ${pronoun} will not be able to view / contact you on Shaadi.com.`,
    ],
  ],
  unblock: (name, pronoun, uid, href) => [
    null,
    [link(name, href), ' has been removed from your Blocked list.', ` ${pronoun} can now view your Profile / contact you.`],
  ],
  reportMisuse: (name, pronoun, uid, href) => [
    null,
    [link(name, href), ' Member has been Blocked & successfully Reported to the Shaadi.com Safety team for review.'],
  ],
  misuseAlreadyMarked: (name, pronoun, uid, href) => [null, [link(name, href), ' is Already Blocked']],
  reportMisuseBlocked: (name, pronoun, uid, href) => [
    null,
    [' You cannot Block or Report more than 20 Members in a single day. Please try again after 24 hours.'],
  ],
  ignored: (name, pronoun, href) => [
    null,
    [
      link(name, href),
      ' has been added to your',
      link('Ignored list', '/profile/ignored-members'),
      `. ${pronoun} will not be shown in your Search Results.`,
    ],
  ],
  benefitTooltip: messageFor([
    null,
    ['Unlock these features and get 3 times more responses!'],
    [link('Upgrade Now', '/payment/index?source=lockbutton_tooltip', 'benefitUpgradeBtn')],
  ]),
  hiddenProfile: () => [
    ['Your profile is currently hidden, To connect with this member, please make your Profile '],
    [link('Visible', 'https://www.shaadi.com/my-shaadi/profile/unhide')],
  ],
  namePrivacyTooltip: messageFor([
    null,
    ['Full name visible only to Premium Members'],
    [link('Upgrade Now', '/payment/index?source=lockbutton_tooltip', 'nameUpgradeBtn')],
  ]),
  accept: (name, pronoun, href, uid, showUpgradeLinks, accountType, heshe) => [
    null,
    [
      link(name, href),
      `has been added to your `,
      link('Accepted Members', '/inbox/accepted/interests'),
      `.`,
      accountType.toLowerCase() === 'free'
        ? showUpgradeLinks && `To send ${pronoun.toLowerCase()} an Email,`
        : `Start a conversation with ${pronoun.toLowerCase()} now!`,
      accountType.toLowerCase() === 'free'
        ? showUpgradeLinks && link('Upgrade Now', `/payment/index?loc=profile&profileid=${uid}&source=accept`)
        : null,
    ],
  ],
  cancel: (name, pronoun, href) => [
    null,
    [link(name, href), `has been notified of your response. ${pronoun} will not be able to contact you on Shaadi.com.`],
  ],
  decline: (name, pronoun, href) => [
    null,
    [link(name, href), `has been notified of your response. ${pronoun} will not be able to contact you on Shaadi.com.`],
  ],
  delete: (name, pronoun, href) => [
    null,
    [
      link(`${name}'s`, href),
      ` Invitation has been deleted from your Inbox and moved to your`,
      link('Deleted', '/inbox/archived/interests-deleted'),
      `folder.`,
    ],
  ],
  premiumMatchmailToast: messageFor([
    null,
    ['Wish to get featured in the Premium Match Mail?'],
    [
      'Upgrade to a Premium Membership and get noticed!',
      link('Know more', '/payment/index?loc=banner&source=premium_matchmail', 'matchmailToastBtn'),
    ],
  ]),
};
