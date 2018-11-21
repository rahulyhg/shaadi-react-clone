import React from 'react';
import PropTypes from '../../PropTypes';
import EoiMobile from '../EoiMobile';
import { Toolbar } from './styles';

class BottomEoiBar extends React.PureComponent {
  render() {
    const { profile, onAction, justNow, justNowText, isPaidUser, memberHidden, gaEventActionLabel } = this.props;
    const { uid, flags, gender } = profile;
    const { connectionStatus, membershipLevel, membershipTags, canRemind, canCancelInvite } = flags;

    return (
      <Toolbar warning={memberHidden} className="bottom-eoi-bar">
        <EoiMobile
          uid={uid}
          gender={gender}
          isPaidUser={isPaidUser}
          connectionStatus={connectionStatus}
          membershipLevel={membershipLevel}
          onAction={onAction}
          membershipTags={membershipTags}
          justNow={justNow}
          justNowText={justNowText}
          canSendRemind={canRemind}
          canCancelInvite={canCancelInvite}
          memberHidden={memberHidden}
          actionSource={`profile_bottombar`}
          gaEventActionLabel={gaEventActionLabel}
        />
      </Toolbar>
    );
  }
}

BottomEoiBar.defaultProps = {
  justNowText: null,
};

BottomEoiBar.propTypes = {
  onAction: PropTypes.func.isRequired,
  profile: PropTypes.shape(PropTypes.basicProfile).isRequired,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string,
  isPaidUser: PropTypes.bool.isRequired,
  memberHidden: PropTypes.bool.isRequired,
  gaEventActionLabel: PropTypes.string.isRequired,
};

export default BottomEoiBar;
