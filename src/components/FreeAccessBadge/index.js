import React from 'react';
import PropTypes from '../../PropTypes';
import Tooltip from '../Common/Tooltip';
import s from './styles';

const showExclusiveTag = ({ isPaidUser, canCommunicate }) => !isPaidUser && canCommunicate;

const ExclusiveFeature = (hisHer, placement) => {
  const toolTipClass = placement === 'top' ? 'exclusiveTooltipTop' : 'exclusiveTooltip';

  const tooltipBody = {
    body: [
      {
        key: 'exclusiveTag',
        items: [
          {
            type: 'text',
            key: 'exclusiveTag',
            text: `You can contact ${hisHer.toLowerCase()} for free, after sending a Connect.`,
          },
        ],
      },
    ],
  };
  return (
    <Tooltip trigger="hover" offset={[-3, -3]} placement={placement} tooltip={tooltipBody} overlayClassName={toolTipClass}>
      <s.ExclusiveBox data-test-selector="sku_exclusive_feature">FREE ACCESS</s.ExclusiveBox>
    </Tooltip>
  );
};

const FreeAccessBadge = props => showExclusiveTag(props) && ExclusiveFeature(props.himHer, props.toolTipPlacement);

FreeAccessBadge.defaultProps = {
  canCommunicate: false,
  toolTipPlacement: 'bottomRight',
};

FreeAccessBadge.propTypes = {
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  isPaidUser: PropTypes.bool,
  canCommunicate: PropTypes.bool,
  toolTipPlacement: PropTypes.string.isRequired,
};

export default FreeAccessBadge;
