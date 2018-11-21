/* eslint camelcase: 0 */
/* global window */
import React from 'react';
import PropTypes from '../../../PropTypes';
import Eoi from '../../Common/Eoi';
import s from './styles';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const evt_ref = encode64('chat');

const overrides = {
  Male: {
    requestPassword: 'https://img.shaadi.com/imgs/profiles/150-password-protected-m.gif',
    passwordRequested: 'https://img.shaadi.com/imgs/profiles/150-password-request-sent-m.gif',
    visibleOnAccept: 'https://img.shaadi.com/imgs/profiles/150-member-accepts-m.gif',
    noPhoto: 'https://img.shaadi.com/imgs/profiles/150-photo-request-m.gif',
  },
  Female: {
    requestPassword: 'https://img.shaadi.com/imgs/profiles/150-password-protected-f.gif',
    passwordRequested: 'https://img.shaadi.com/imgs/profiles/150-password-request-sent-f.gif',
    visibleOnAccept: 'https://img.shaadi.com/imgs/profiles/150-member-accepts-f.gif',
    noPhoto: 'https://img.shaadi.com/imgs/profiles/150-photo-request-f.gif',
  },
};

const ProfileCard = props => {
  const { profile, isVisible, canInitiateChat, canShowUpgradeLink } = props;
  const { base, flags } = profile;
  const profileUrl = `/profile?profileid=${profile.slug}&evt_ref=${evt_ref}`;
  const upgradeLink = `${props.wwwBaseUrl}/payment/index?profileid=${profile.slug}&source=chat_hoveronprofile`;
  const memberHiddenCase = (
    <s.HiddenNote>
      {['hidden'].includes(props.profile.flags.connectionStatus) ? (
        <div>
          Your profile is currently hidden.<br />
          <s.Hiddenspan>
            To Contact this Member {''}
            <s.UnhideLink to={`/my-shaadi/profile/unhide`} isExternal target={'_self'}>
              Unhide
            </s.UnhideLink>{' '}
            your Profile
          </s.Hiddenspan>
        </div>
      ) : (
        [
          ['profile_hidden_deactivated'].includes(props.profile.flags.connectionAction) &&
            `This Profile is currently not available as it has been hidden or deleted.`,
        ]
      )}
    </s.HiddenNote>
  );

  let eoi = (
    <Eoi
      type={'chat'}
      chatMode={'chatProfileCard'}
      profile={props.profile}
      shortlistItems={[]}
      settings={props.settings}
      loadingStyle={props.hoverCard.eoiLoadingStyle}
      tooltip={props.hoverCard.tooltip}
      onAction={props.onProfileAction}
    />
  );
  if (
    ['online', 'chats'].includes(props.source) &&
    props.canInitiateChat &&
    props.profile.flags.connectionStatus !== 'hidden' &&
    props.profile.flags.connectionAction !== 'profile_hidden_deactivated'
  ) {
    eoi = (
      <div>
        <s.ChatNowBtn isVisible={props.canInitiateChat} onClick={() => props.doChatWindowAction(profile.uid, 'open')}>
          Chat now
          <s.ChatNowIcon />
        </s.ChatNowBtn>
        {['default', 'shortlisted'].includes(props.profile.flags.connectionStatus) ? (
          <s.InvitationNote isVisible={props.canInitiateChat}>A Invitation to Connect will also be sent.</s.InvitationNote>
        ) : (
          eoi
        )}
      </div>
    );
  } else if (['alerts'].includes(props.source)) {
    if (props.profile.flags.connectionStatus === 'hidden' || props.profile.flags.connectionAction === 'profile_hidden_deactivated') {
      eoi = <div>{memberHiddenCase}</div>;
    } else {
      eoi = <div>{eoi}</div>;
    }
  } else if (props.profile.flags.connectionStatus === 'hidden' || props.profile.flags.connectionAction === 'profile_hidden_deactivated') {
    eoi = <div>{memberHiddenCase}</div>;
  } else {
    eoi = (
      <div>
        {eoi}
        <s.ChatNowBtn isVisible={props.canInitiateChat} onClick={() => props.doChatWindowAction(profile.uid, 'open')}>
          Chat now
          <s.ChatNowIcon />
        </s.ChatNowBtn>
        <s.InvitationNote isVisible={props.canInitiateChat}>A Invitation to Connect will also be sent.</s.InvitationNote>
        {!flags.canCommunicate && (
          <s.ChatInvitationLinkWrapper
            isVisible={
              !canInitiateChat &&
              canShowUpgradeLink &&
              !['cancelled', 'theyCancelled', 'declined', 'theyDeclined'].includes(profile.flags.connectionStatus)
            }
          >
            <s.ChatInvitationLink to={upgradeLink} target={'_blank'} isExternal>
              Upgrade Now to start Chatting
            </s.ChatInvitationLink>
          </s.ChatInvitationLinkWrapper>
        )}
      </div>
    );
  }

  const photoPath = ['visibleOnAccept', 'visibleOnUpgrade'].includes(profile.flags.albumStatus)
    ? profile.photoBlur
    : (overrides[profile.gender] || {})[profile.flags.albumStatus] || profile.photo;

  return (
    <s.ProfileCard data-plan={flags.isPremium ? 'premium' : 'free'} plan={flags.isPremium ? 'premium' : 'free'} isVisible={isVisible}>
      <s.PhotoLink to={profileUrl} target="_blank">
        <div key={profile.uid} style={{ height: 167, position: 'relative' }}>
          <s.Photo src={photoPath} alt={`Profile of ${profile.name}`} />
          {['visibleOnAccept', 'visibleOnUpgrade'].includes(profile.flags.albumStatus) && (
            <s.PhotoPrivacy albumStatus={profile.flags.albumStatus}>
              <s.PhotoPrivacyLock />
              <s.PhotoPrivacyText>
                {' '}
                {profile.flags.albumStatus === 'visibleOnUpgrade' ? 'Visible to \n Premium Members' : 'Visible on Accept'}{' '}
              </s.PhotoPrivacyText>
            </s.PhotoPrivacy>
          )}
        </div>
      </s.PhotoLink>
      <s.Info>
        <s.NameLink to={profileUrl} target="_blank">
          {profile.name}
        </s.NameLink>
        <s.DetailList>
          {base.infoMap.map(detail => (
            <s.Detail key={detail.key}>
              <s.Label>{detail.label}</s.Label>
              <s.Value>: {detail.value}</s.Value>
            </s.Detail>
          ))}
        </s.DetailList>
        {eoi}
      </s.Info>
    </s.ProfileCard>
  );
};

const detailPropTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

ProfileCard.defaultProps = {
  canInitiateChat: false,
  canCommunicate: false,
};

ProfileCard.propTypes = {
  wwwBaseUrl: PropTypes.string.isRequired,
  doChatWindowAction: PropTypes.func.isRequired,
  canInitiateChat: PropTypes.bool.isRequired,
  canShowUpgradeLink: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    isPaidUser: PropTypes.bool.isRequired,
  }).isRequired,
  hoverCard: PropTypes.shape({
    uid: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    flash: PropTypes.string,
    tooltip: PropTypes.shape(PropTypes.alert).isRequired,
    photoLoading: PropTypes.bool.isRequired,
    eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    photo: PropTypes.string.isRequired,
    slug: PropTypes.string,
    base: PropTypes.shape({
      infoMap: PropTypes.arrayOf(PropTypes.shape(detailPropTypes)).isRequired,
    }).isRequired,
    flags: PropTypes.shape({
      connectionStatus: PropTypes.connectionStatus.isRequired,
      canCommunicate: PropTypes.bool.isRequired,
      connectionAction: PropTypes.string,
      isPremium: PropTypes.bool.isRequired,
      membershipLevel: PropTypes.membershipLevel.isRequired,
      membershipTags: PropTypes.membershipTags.isRequired,
    }).isRequired,
  }).isRequired,
  onProfileAction: PropTypes.func.isRequired,
};

export default ProfileCard;
