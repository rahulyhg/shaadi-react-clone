import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import HtmlToReact from '../../Common/HtmlToReact';
import Tooltip from '../../Common/Tooltip';

const parseTootipFromAPI = tooltip =>
  tooltip.split('|').map((text, index) => (
    <s.TooltipWrapper key={text.slice(0, 10)}>
      <s.Bullet />
      <s.TooltipText>{text}</s.TooltipText>
    </s.TooltipWrapper>
  ));

const FeatureDetails = ({ benefit, membershipId, index }) => (
  <s.FeatureList key={benefit.icon} id={`${membershipId}${index}`}>
    <s.PlainDiv>
      <s.FeaturesIcon available={benefit.applicable !== true}>
        <s.Icon icon={benefit.icon} />
      </s.FeaturesIcon>
      <s.FeaturesText available={benefit.applicable !== true}>
        <HtmlToReact html={benefit.description} />
      </s.FeaturesText>
      {benefit.tooltip &&
        benefit.tooltip.length > 0 && (
          <span data-test-selector="feature_tooltip">
            <Tooltip
              isQuestionMark
              trigger="hover"
              placement="bottom"
              overlayClassName="tooltip-features"
              offset={[0, -5]}
          overlay={<span>{parseTootipFromAPI(benefit.tooltip)}</span>} //eslint-disable-line
            />
          </span>
        )}
    </s.PlainDiv>
  </s.FeatureList>
);

FeatureDetails.propTypes = {
  benefit: PropTypes.shape({
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    applicable: PropTypes.bool.isRequired,
    tooltip: PropTypes.string.isRequired,
    new_badge: PropTypes.bool.isRequired,
  }).isRequired,
  membershipId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
export default FeatureDetails;
