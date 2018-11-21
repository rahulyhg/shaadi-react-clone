import React, { Fragment } from 'react';
import { decode64 } from '../../helpers/encodeDecodeHelper';

const CALL_SEND_SMS = 'profile_callsendSMS';
const SEND_EMAIL = 'profile_sendemail';
const POST_ON_WALL = 'profile_postonwall';
const CHAT_NOW = 'profile_chatnow';
const CHAT_WINDOW = 'chat_window';
const CHAT_HOVERON_PROFILE = 'chat_hoveronprofile';
const CHAT_SIDEBAR = 'chat_sidebar';
const BOTH_PARTYPAY_MESSAGE = 'bothpartypay_message';
const STOPPAGE_ACCEPT = 'stoppage_accept';
const STOPPAGE_ACCEPT_MAILER = 'stoppage_accept_mailer';
const MAILER_ACCEPT = 'mailer_accept';
const ACCEPT_STOPPAGE = 'accept_stop_page';
const MESSAGE_VIEW = 'message_view';
const MAILER_MESSAGE_VIEW = 'mailer_message_view';
const PREMIUM_MATCHMAIL = 'premium_matchmail';

const STOPPAGE_SOURCES = [STOPPAGE_ACCEPT, STOPPAGE_ACCEPT_MAILER, MAILER_ACCEPT, ACCEPT_STOPPAGE];
const PROFILE_SOURCES = [
  CALL_SEND_SMS,
  SEND_EMAIL,
  POST_ON_WALL,
  CHAT_NOW,
  CHAT_WINDOW,
  CHAT_HOVERON_PROFILE,
  CHAT_SIDEBAR,
  PREMIUM_MATCHMAIL,
];
const MESSAGE_CALL_SOURCES = [MESSAGE_VIEW, MAILER_MESSAGE_VIEW, BOTH_PARTYPAY_MESSAGE, SEND_EMAIL, CALL_SEND_SMS];

const MESSAGE_SOURCES = [MESSAGE_VIEW, MAILER_MESSAGE_VIEW, BOTH_PARTYPAY_MESSAGE];

const SCENT_TRAIL_BOTTOM_MESSAGE_ONE = 'Upgrade to any of our Plans & start a conversation.';
const SCENT_TRAIL_BOTTOM_MESSAGE_TWO = 'Upgrade & start a conversation via Email, Chat & Phone.';

const SOURCE_HEADING = type =>
  STOPPAGE_SOURCES.includes(type) ? SCENT_TRAIL_BOTTOM_MESSAGE_TWO : MESSAGE_SOURCES.includes(type) ? SCENT_TRAIL_BOTTOM_MESSAGE_ONE : '';

const topHeadingAccept = (acceptCount, profileURLText, multiAcceptURLText) =>
  acceptCount >= 2 ? (
    <Fragment>
      {profileURLText} and {multiAcceptURLText} have accepted your invite.
    </Fragment>
  ) : (
    <Fragment>{profileURLText} has accepted your invite.</Fragment>
  );
const topHeadingProfile = profileURLText => <Fragment>Wish to chat with {profileURLText}? Upgrade to any of our Premium Plans</Fragment>;
const topHeadingMessage = (profileURLText, gender) => (
  <Fragment>
    To view {profileURLText}
    {`'s`} message and reply to {gender === 'male' ? 'him' : 'her'},
  </Fragment>
);
const topContentText = (type, acceptCount, profileURLText, multiAcceptURLText, gender) => {
  const acceptScentTrail = topHeadingAccept(acceptCount, profileURLText, multiAcceptURLText);
  const profileScentTrail = topHeadingProfile(profileURLText);
  const messageScentTrail = topHeadingMessage(profileURLText, gender);
  let content = '';
  if (STOPPAGE_SOURCES.includes(type)) {
    content = acceptScentTrail;
  }
  if (PROFILE_SOURCES.includes(type)) {
    content = profileScentTrail;
  }
  if (MESSAGE_SOURCES.includes(type)) {
    content = messageScentTrail;
  }
  return content;
};

const responseError = ({ from, advisorname, phonenumber }) => {
  try {
    return decode64(from) === 'response'
      ? `Your order has been expired. Place new order or call ${decode64(advisorname)} 
    (${decode64(phonenumber)}) for any queries.`
      : '';
  } catch (e) {
    return '';
  }
};

const tagText = {
  best_value: 'BEST VALUE',
  top_seller: 'TOP SELLER',
  your_plan: 'YOUR PLAN',
};
const contactNumber = {
  SSP_G3: 75,
  SSP_GPlus: 150,
  SSP_D6: 150,
  SSP_DPlus: 300,
  SSP_PPlus: 600,
};
const hightightedMatches = {
  SSP_GPlus: true,
  SSP_DPlus: true,
  SSP_PPlus: true,
};
const contactVisible = {
  SSP_DPlus: true,
  SSP_PPlus: true,
};
const radioButton = (isSelected, handleClick, productCode, isPremiumProduct) => (
  <input
    type="radio"
    data-test-selector="radio"
    checked={isSelected}
    onChange={() => !isSelected && handleClick(productCode, isPremiumProduct)}
  />
);
const premiumFeatures = [
  {
    class: 'features_text_bg',
    iconclass: 'duration_icon',
    text: 'Duration & Price Per Month',
  },
  {
    class: 'features_text',
    iconclass: 'message_icon',
    text: 'Send unlimited Messages',
  },
  {
    class: 'features_text_bg',
    iconclass: 'call_icon',
    text: 'View Contact Numbers',
  },
  {
    class: 'features_text',
    iconclass: 'match_highlight_icon',
    text: 'Get highlighted to your Matches',
  },
  {
    class: 'features_text_bg',
    iconclass: 'make_contact_icon',
    text: 'Make Contact details visible to all',
  },
];

const personalisedFeatures = [
  {
    class: 'relation_advisor_icon',
    selector: 'relationship_advisor',
    text: 'Dedicated Relationship Advisor',
  },
  {
    class: 'handpicked_matche_icon',
    selector: 'handpicked_matches',
    text: 'Handpicked Matches',
  },
  {
    class: 'intro_meeting_icon',
    selector: 'intro_meeting',
    text: 'Introductions & Meeting',
  },
  {
    class: 'premium_benefit_icon',
    selector: 'premium_benefit',
    text: 'All Premium Benefits',
  },
];

export {
  CALL_SEND_SMS,
  SEND_EMAIL,
  POST_ON_WALL,
  CHAT_NOW,
  CHAT_WINDOW,
  CHAT_HOVERON_PROFILE,
  BOTH_PARTYPAY_MESSAGE,
  STOPPAGE_ACCEPT,
  STOPPAGE_ACCEPT_MAILER,
  MAILER_ACCEPT,
  ACCEPT_STOPPAGE,
  MESSAGE_VIEW,
  MAILER_MESSAGE_VIEW,
  STOPPAGE_SOURCES,
  MESSAGE_SOURCES,
  MESSAGE_CALL_SOURCES,
  SOURCE_HEADING,
  topContentText,
  responseError,
  tagText,
  contactNumber,
  hightightedMatches,
  contactVisible,
  radioButton,
  premiumFeatures,
  personalisedFeatures,
};
