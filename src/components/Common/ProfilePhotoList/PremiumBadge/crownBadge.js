import React from 'react';
import PropTypes from '../../../../PropTypes';
import Tooltip from '../../../Common/Tooltip';
import s from './stylesCrown';

const tagTooltipText = {
  premium: 'Premium',
  premiumplus: 'Premium+',
  vip: 'VIP',
  select: 'Select',
};

const manageDraftTooltip = (plan, tag) => {
  const key = plan && !['vip', 'select'].includes(tag) ? plan : tag;
  return {
    title: null,
    body: [
      {
        key: 'para-1',
        items: [
          {
            type: 'text',
            key: 'bleh',
            text: tagTooltipText[key.toLowerCase()],
          },
        ],
      },
    ],
  };
};

const CrownBadge = props => (
  <Tooltip
    trigger="hover"
    offset={[20, 0]}
    tooltip={manageDraftTooltip(props.membershipLevel, props.membershipTags)}
    overlayClassName="withBorder crown-tooltip"
  >
    <s.PremiumBadge isVisible={props.isVisible} plan={props.membershipLevel} tag={props.membershipTags} />
  </Tooltip>
);

CrownBadge.defaultProps = {
  membershipTags: 'free',
  membershipLevel: 'none',
  isVisible: false,
};
CrownBadge.propTypes = {
  membershipTags: PropTypes.string.isRequired,
  membershipLevel: PropTypes.oneOf(['Free', 'Premium', 'PremiumPlus', 'Select', 'none']).isRequired,
  isVisible: PropTypes.bool.isRequired,
};
export default CrownBadge;
