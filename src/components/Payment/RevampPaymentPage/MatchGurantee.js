import React from 'react';
import Tooltip from '../../Common/Tooltip';
import './payment-style.css';

const MatchGurantee = () => (
  <div className="match_guarantee_wrapper">
    <div className="matchguarantee_icon" />
    <br />
    Match Guarantee<span data-test-selector="tooltip" id="match_guarantee_tooltip">
      <Tooltip
        isQuestionMark
        offset={[0, -5]}
        overlay={
          <span>{"If you have sent at least 10 Interests and you don't have a single Accept, we will refund your entire fee!"}</span>
        }
      />
    </span>
  </div>
);

export default MatchGurantee;
