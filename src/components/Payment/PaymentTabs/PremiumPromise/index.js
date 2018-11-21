import React from 'react';
import s from '../styles';
import Tooltip from '../../../Common/Tooltip';

const PremiumPromise = () => (
  <s.PremiumPromise>
    <s.BoxShadow>
      <s.MatchGuarantee id="data_test_premiumplan">
        If you do not find a match within 30 days, we will refund your fee<span id="match_guarantee_tooltip">
          <Tooltip
            isQuestionMark
            offset={[0, -5]}
            overlay={
              <span>{"If you have sent at least 10 Interests and you don't have a single Accept, we will refund your entire fee!"}</span>
            }
          />
        </span>
      </s.MatchGuarantee>
    </s.BoxShadow>
    <s.SpacerEight />
    <s.BoxShadow>
      <img
        src="https://img2.shaadi.com/assests/2017/payment/payment-banner.png"
        border="0"
        alt=""
        width="300"
        height="350"
        style={{ display: 'block' }}
      />
    </s.BoxShadow>
  </s.PremiumPromise>
);
export default PremiumPromise;
