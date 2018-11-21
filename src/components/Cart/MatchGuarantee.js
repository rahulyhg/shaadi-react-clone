import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import Tooltip from '../Common/Tooltip';

const MatchGuarantee = props => {
  const { isPersonalisedPlan } = props;
  return (
    <s.MatchGuaranteeWrapper>
      <s.MatchGuarantee />
      <s.MatchGuaranteeText>
        <s.LeftSquare />
        {isPersonalisedPlan && (
          <s.MatchGuaranteeContent>
            Our Advisors will introduce you<br />
            to at least 3 handpicked Matches.
          </s.MatchGuaranteeContent>
        )}
        {!isPersonalisedPlan && (
          <s.MatchGuaranteeContent>
            If you do not find a match within 30 days, we will refund your fee
            <span id="match_guarantee_tooltip">
              <Tooltip
                isQuestionMark
                offset={[0, -5]}
                overlay={
                  <span>
                    {"If you have sent at least 10 Interests and you don't have a single Accept, we will refund your entire fee!"}
                  </span>
                }
              />
            </span>
          </s.MatchGuaranteeContent>
        )}
        <s.RightSquare />
      </s.MatchGuaranteeText>
    </s.MatchGuaranteeWrapper>
  );
};
MatchGuarantee.defaultProps = {
  isPersonalisedPlan: false,
};
MatchGuarantee.propTypes = {
  isPersonalisedPlan: PropTypes.bool.isRequired,
};

export default MatchGuarantee;
