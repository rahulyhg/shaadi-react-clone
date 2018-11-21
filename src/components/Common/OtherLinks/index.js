import React from 'react';
import s from './styles';

const OtherLinks = () => (
  <s.OtherLinkWrapper>
    <s.UsefulHead>Useful Links</s.UsefulHead>
    <s.UseFulLinks>
      <s.InviteFrnds />
      <s.InviteFrndsTxt href="/my-shaadi/refer-friends">Refer A Friend</s.InviteFrndsTxt>
    </s.UseFulLinks>
    <s.UseFulLinks>
      <s.NeedHelpIcon />
      <s.InviteFrndsTxt href="/customer-relations/faq">Need Help?</s.InviteFrndsTxt>
    </s.UseFulLinks>
    <s.UseFulLinks>
      <s.SecurityTips />
      <s.InviteFrndsTxt href="/customer-relations/faq/privacy-tips">Security Tips</s.InviteFrndsTxt>
    </s.UseFulLinks>
  </s.OtherLinkWrapper>
);

export default OtherLinks;
