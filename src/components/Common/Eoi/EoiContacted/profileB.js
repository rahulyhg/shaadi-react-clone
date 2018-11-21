import React, { Fragment } from 'react';
import PropTypes from '../../../../PropTypes';
import ss from '../styles';
import Tooltip from '../../../Common/Tooltip';
import SvgCheckmark from '../../../Common/SvgCheckmark';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';

const isPremiumFeature = ({ isPaidUser, canCommunicate }) => isPaidUser || canCommunicate;
const isPremiumFeatureForWriteMsg = ({ isPaidUser, canCommunicate, isLoggerBothPartyPayUser }) =>
  isPaidUser || (canCommunicate && !isLoggerBothPartyPayUser);
const showUpgradeLink = ({ isPaidUser, canCommunicate }) => !isPaidUser && !canCommunicate;

const upgradeLink = profileId => (
  <Fragment>
    <ss.UpgradeTextLink isExternal to={`/payment?loc=profile&profileid=${profileId}&source=profile`} target="_blank">
      Upgrade
    </ss.UpgradeTextLink>{' '}
    to <br />
  </Fragment>
);

const Profile = props => {
  const { onChatNow, onViewPhoneNoClick, onRemind, canRemind } = props;
  const { heShe, membershipTags, isPaidUser, canCommunicate, himHer, status, profileId, isHovered } = props;
  const { justNow, justNowText, connectionAction } = props;
  const isVip = membershipTags === 'vip';
  const canRemindClick = canRemind ? onRemind : null;
  const RemindButtonMode = canRemind ? 'enabled' : 'disabled';

  return (
    <ss.InvitationBtnContainer isVisible>
      {(justNow || status === 'filteredContacted') && (
        <ss.SvgCheckmarkWrapper>
          <SvgCheckmark isListingSvg />
        </ss.SvgCheckmarkWrapper>
      )}
      {(status === 'filteredContacted' || connectionAction === 'member_filtered') && (
        <ss.ProfileInvitationHeading isVisible>
          Invitation Sent.<br />We will notify you when <br />
          {heShe.toLowerCase()} responds
        </ss.ProfileInvitationHeading>
      )}
      {status !== 'filteredContacted' &&
        !['member_filtered', 'member_filtered_contacted'].includes(connectionAction) &&
        (justNow ? (
          <ss.ProfileInvitationHeading isVisible>
            {justNowText || 'Invitation sent'}.<br />
            {showUpgradeLink(props) && <span>{upgradeLink(profileId)}</span>}
            {!canCommunicate && `Contact ${himHer.toLowerCase()}`}
            {isPaidUser && <br />} {!canCommunicate && `directly`}
          </ss.ProfileInvitationHeading>
        ) : (
          <ss.ProfileInvitationHeading isVisible>Awaiting response?</ss.ProfileInvitationHeading>
        ))}

      {!justNow &&
        status !== 'filteredContacted' &&
        (!canRemind ? (
          <Tooltip
            trigger="hover"
            placement="left"
            overlayClassName="rc-tooltip-dark-invite"
            offset={[30, -6]}
            overlay={<span>Visit again after 24 hours to send a <br />Reminder.</span>} //eslint-disable-line
          >
            <ss.ProfileInvitationButtonWrapper>
              <CustomButton
                type="Remind"
                onClick={canRemindClick}
                mode={RemindButtonMode}
                title="Remind"
                isVip={isVip}
                isHovered={isHovered}
              />
              <CustomContactMessage
                message="Remind"
                type="Remind"
                title="Remind"
                isVip={isVip}
                mode={RemindButtonMode}
                isHovered={isHovered}
              />
            </ss.ProfileInvitationButtonWrapper>
          </Tooltip>
        ) : (
          <ss.ProfileInvitationButtonWrapper>
            <CustomButton
              type="Remind"
              onClick={canRemindClick}
              mode={RemindButtonMode}
              title="Remind"
              isVip={isVip}
              isHovered={isHovered}
            />
            <CustomContactMessage
              message="Remind"
              type="Remind"
              title="Remind"
              isVip={isVip}
              mode={RemindButtonMode}
              isHovered={isHovered}
            />
          </ss.ProfileInvitationButtonWrapper>
        ))}

      {!justNow && status !== 'filteredContacted' && <ss.ProfileInvitationButtonMarginWrapper />}
      <ss.ProfileInvitationButtonWrapper>
        <CustomButton
          type="WriteMessage"
          onClick={onChatNow}
          title="Write Message"
          isVip={isVip}
          isPaidUser={isPremiumFeatureForWriteMsg(props)}
          isHovered={isHovered}
        />
        <CustomContactMessage
          message="Write Message"
          type="WriteMessage"
          title="Write Message"
          isVip={isVip}
          isPaidUser={isPremiumFeatureForWriteMsg(props)}
          isHovered={isHovered}
        />
      </ss.ProfileInvitationButtonWrapper>
      <ss.ProfileInvitationButtonMarginWrapper />
      <ss.ProfileInvitationButtonWrapper>
        <CustomButton
          type="ViewContact"
          onClick={isPremiumFeature(props) ? onViewPhoneNoClick : onChatNow}
          title="View Contact"
          isVip={isVip}
          isPaidUser={isPremiumFeature(props)}
          isHovered={isHovered}
        />
        <CustomContactMessage
          message="View Contact"
          title="View Contact"
          type="ViewContact"
          isVip={isVip}
          isPaidUser={isPremiumFeature(props)}
          isHovered={isHovered}
        />
      </ss.ProfileInvitationButtonWrapper>
    </ss.InvitationBtnContainer>
  );
};

Profile.defaultProps = {
  onChatNow: null,
  justNow: false,
  justNowText: '',
  connectionAction: '',
  canCommunicate: false,
};

Profile.propTypes = {
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  status: PropTypes.connectionStatus.isRequired,
  onChatNow: PropTypes.func.isRequired,
  onViewPhoneNoClick: PropTypes.func.isRequired,
  justNow: PropTypes.bool,
  justNowText: PropTypes.string,
  canRemind: PropTypes.bool.isRequired,
  onRemind: PropTypes.func.isRequired,
  membershipTags: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  connectionAction: PropTypes.string,
  canCommunicate: PropTypes.bool,
};

export default Profile;
