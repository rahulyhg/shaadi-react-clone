import React from 'react';
import PropTypes from '../../../../PropTypes';
import EoiHidden from '../EoiHidden';
import ss from '../styles';
import { PositiveCase, NegativeCase } from './UtilComponent';

const renderHiddenCases = params =>
  params.hiddenReason && (
    <EoiHidden
      type={params.type}
      hisHer={params.hisHer}
      hiddenReason={params.hiddenReason}
      onDelete={params.onDelete}
      isHorizontal={params.isHorizontal || params.status === 'declined' || params.listType === 'connect_deleted'}
      listType={params.listType}
      membershipTags={params.membershipTags}
      isDeleted={params.isDeleted}
    />
  );
const Inbox = props =>
  renderHiddenCases(props) || (
    <div>
      <ss.InboxStatusSuccess isVisible isHorizontal={props.isHorizontal}>
        {!['accepted', 'theyAccepted', 'declined'].includes(props.status) && (
          <ss.InboxStatusText isHorizontal={props.isHorizontal}>{props.searchConnectionStatusMap[props.status]}</ss.InboxStatusText>
        )}
        {['declined'].includes(props.status) && <NegativeCase {...props} justNowText="Invitation Declined" />}
        {['accepted', 'theyAccepted'].includes(props.status) && <PositiveCase {...props} />}
      </ss.InboxStatusSuccess>
    </div>
  );

Inbox.defaultProps = {
  hiddenReason: '',
  isHorizontal: false,
  type: 'inbox',
};
Inbox.propTypes = {
  type: PropTypes.string,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool.isRequired,
  justNow: PropTypes.bool.isRequired,
  listType: PropTypes.string.isRequired,
  isHorizontal: PropTypes.bool,
  hiddenReason: PropTypes.oneOf(['', 'selfHidden', 'systemHidden', 'selfDeleted', 'systemDeleted', 'defaultDeleted']),
  isHovered: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  onChatNow: PropTypes.func.isRequired,
  onShowContactDetails: PropTypes.func.isRequired,
  searchConnectionStatusMap: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onDelete: PropTypes.func.isRequired,
};

export default Inbox;
