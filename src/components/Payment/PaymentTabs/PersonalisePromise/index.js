import React from 'react';
import s from '../styles';

const PersonalisePromise = () => (
  <s.PremiumPromise>
    <s.BoxShadow>
      <s.MatchGuarantee isCenter id="data_test_personalisedplan">
        Our Advisors will introduce you to at least 3 handpicked Matches.
      </s.MatchGuarantee>
    </s.BoxShadow>
    <s.SpacerEight />
    <s.BoxShadow>
      <img
        src="https://img2.shaadi.com/assests/2017/payment/payment-banner-personalised-v2.png"
        border="0"
        alt="Our Promise"
        style={{ display: 'block' }}
      />
    </s.BoxShadow>
  </s.PremiumPromise>
);
export default PersonalisePromise;
