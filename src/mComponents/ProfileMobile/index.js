import React from 'react';
import Divider from '@material-ui/core/Divider';
import LockedIcon from '@material-ui/icons/Lock';
import LockedOpenIcon from '@material-ui/icons/LockOpen';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import PropTypes from '../../PropTypes';

import CircularProgress from '../Common/Mui/CircularProgress';
import ProfilePhotoMobile from '../../mComponents/Common/ProfilePhotoMobile';
import ProfileCard, { GradientSection, Details, Badge } from '../../mComponents/ProfileCard';
import EoiMobile from '../../mComponents/EoiMobile';
import { NoMatches } from '../../mComponents/Common/NoResult';
import { ProfileDetailList, ProfileContent, PreferenceList } from '../../mComponents/ProfileDetail';
import {
  UpgradeLink,
  SectionTitle,
  SectionCaption,
  ProfileWrapper,
  LoadingWrapper,
  IconStyles,
  PhotoRequestAlert,
  TextLink,
  GimificationBg,
  GimificationFamilyIcon,
  GamificationInfo,
  GamificationLink,
  GimificationHoroscopeIcon,
} from './styles';

class ProfileMobile extends React.PureComponent {
  state = {
    open: false,
  };

  onAction = (type, args) => {
    this.props.onAction(type, args);
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: !this.state.open });
  };

  renderLockIcon = () => {
    const { isPaidUser } = this.props; //eslint-disable-line
    if (!isPaidUser) {
      return (
        <Tooltip
          id="tooltip-controlled"
          title="Full name visible only to Premium Members."
          onClose={this.handleTooltipClose}
          enterDelay={300}
          leaveDelay={300}
          disableTriggerHover={this.state.open}
          open={this.state.open}
          placement="top"
        >
          <IconButton aria-label="Lock" onClick={this.handleTooltipOpen} style={{ height: '16px', padding: '1px', marginLeft: '10px' }}>
            {/* @todo check if removing fontSize props from the Lock Icons has any issues as fontSize props needs to be string instead of boolean */}
            {/* ref: https://material-ui.com/api/svg-icon/#props */}
            {this.state.open ? <LockedOpenIcon style={IconStyles} /> : <LockedIcon style={IconStyles} />}
          </IconButton>
        </Tooltip>
      );
    }
    return null;
  };
  renderEmployerUpgrade = () => {
    const { isPaidUser, upgradeLink } = this.props;
    if (isPaidUser) {
      return null;
    }
    return (
      <div>
        <Divider light />
        <Typography align="center" style={{ padding: '10px' }} variant="body1">
          To view College and Employer name, <br />
          <UpgradeLink to={upgradeLink} isExternal>
            Upgrade Now!
          </UpgradeLink>
        </Typography>
      </div>
    );
  };

  render() {
    const {
      profile,
      uid,
      self,
      onAction,
      justNow,
      justNowText,
      isPaidUser,
      isFamilyGamified,
      memberHidden,
      gaEventActionLabel,
    } = this.props;
    const FamilyGamification = () => (
      <React.Fragment>
        <GimificationBg>
          <GimificationFamilyIcon />
          <GamificationInfo>
            Enter your Family details &amp; unhide her info.{' '}
            <GamificationLink
              isExternal
              to={`${this.props.wwwBaseUrl}/my-shaadi/personal-profile?sec=family&edit_from=gamification&return_url=${encodeURIComponent(
                window.location.href,
              )}`}
            >
              Add my Details
            </GamificationLink>
          </GamificationInfo>
        </GimificationBg>
      </React.Fragment>
    );

    const HoroscopeGamification = () => (
      <React.Fragment>
        <GimificationBg>
          <GimificationHoroscopeIcon />
          <GamificationInfo>
            Enter your Astro details &amp; unhide her info.{' '}
            <GamificationLink
              isExternal
              to={`${this.props.wwwBaseUrl}/my-shaadi/personal-profile/stop-page?gamification=1&go=${encodeURIComponent(
                window.location.href,
              )}`}
            >
              Add my Details
            </GamificationLink>
          </GamificationInfo>
        </GimificationBg>
      </React.Fragment>
    );

    if (!profile.uid) {
      return (
        <LoadingWrapper>
          <CircularProgress color="primary" />
        </LoadingWrapper>
      );
    }
    const { detailed, summary, connectMessages } = profile;
    const hasPhoto = ['noPhoto', 'photoComingSoon', 'photoUnderScreening', 'photoRequestSent'].indexOf(profile.flags.albumStatus) === -1;
    const photoRequested = ((this.props.request || {}).details || {}).count > 0;
    if (profile.flags.isHidden) {
      return (
        <ProfileWrapper style={{ marginTop: '94px', padding: '1px' }}>
          <NoMatches
            heading="Hidden / Deleted Profile"
            message={`This Member may have temporarily hidden \n or deleted his Profile.`}
            buttonText={null}
            onAction={null}
            isButtonVisible={false}
          />
        </ProfileWrapper>
      );
    }
    return (
      <ProfileWrapper>
        <ProfileCard>
          <ProfilePhotoMobile
            uid={uid}
            photosLoading={!detailed.ready}
            gender={profile.gender}
            photo={profile.fullPhoto}
            photoCount={detailed.album.length}
            albumStatus={profile.flags.albumStatus}
            onAction={onAction}
          />
          <Badge tag={profile.flags.membershipTags} plan={profile.flags.membershipLevel} />
          <GradientSection hasPhoto={hasPhoto}>
            <Details
              name={profile.name}
              hisHer={profile.himHer}
              detailList={profile.base.detailList}
              lastOnlineText={profile.presence.lastOnlineText}
              onAction={this.onAction}
              showInterest={!!detailed.commonInterests.length}
            />
            <EoiMobile
              uid={uid}
              gender={profile.gender}
              isPaidUser={isPaidUser}
              membershipLevel={profile.flags.membershipLevel}
              membershipTags={profile.flags.membershipTags}
              connectionStatus={profile.flags.connectionStatus}
              justNow={justNow}
              justNowText={justNowText}
              onAction={onAction}
              canSendRemind={profile.flags.canRemind}
              canCancelInvite={profile.flags.canCancelInvite}
              memberHidden={memberHidden}
              actionSource="profile"
              gaEventActionLabel={gaEventActionLabel}
            />
          </GradientSection>
        </ProfileCard>
        {photoRequested && (
          <PhotoRequestAlert>
            <Typography style={{ color: '#95959d', flex: '1 0 auto' }}>{profile.heShe} has requested you to add your Photo</Typography>
            <TextLink to={`${this.props.wwwBaseUrl}/my-shaadi/photo/advance?lnkref=MyProfileAddPhotoIcon`} isExternal>
              ADD NOW
            </TextLink>
          </PhotoRequestAlert>
        )}
        {!!connectMessages.length && (
          <ProfileContent
            title={`${connectMessages[0].category === 'received' ? profile.heShe : 'You'} sent ${
              connectMessages[0].category === 'received' ? 'You' : profile.himHer
            } a Message`}
            content={connectMessages[0].message}
            loading={!detailed.ready}
          />
        )}
        <SectionTitle>
          About {profile.name} {this.renderLockIcon()}
          <SectionCaption>
            {profile.userHandle || profile.uid} | Profile Created by {summary.profileCreatedBy}
          </SectionCaption>
        </SectionTitle>
        <ProfileContent content={summary.shortBio} />
        <ProfileDetailList title="Lifestyle & Appearance" items={detailed.mLifestyle.items} loading={!detailed.ready} />
        {!!detailed.commonInterests.length && (
          <ProfileDetailList title="Conversation Starter" items={detailed.conversationStarters.items} loading={!detailed.ready} />
        )}
        <ProfileDetailList title={detailed.mBackground.title} items={detailed.mBackground.items} loading={!detailed.ready} />
        {!!detailed.horoscope.items.length && (
          <ProfileDetailList
            title={detailed.horoscope.title}
            items={detailed.horoscope.items.filter(item => item.icon !== 'profile_info').splice(-2)}
            loading={!detailed.ready}
            isGamified={detailed.horoscope.items.length > 1 && detailed.horoscope.isGamified && <HoroscopeGamification />}
          />
        )}
        <ProfileContent
          title={detailed.family.title}
          content={detailed.family.desc}
          loading={!detailed.ready}
          isGamified={isFamilyGamified && <FamilyGamification />}
        />
        <ProfileDetailList title={detailed.education.title} items={detailed.education.items} loading={!detailed.ready}>
          {this.renderEmployerUpgrade()}
        </ProfileDetailList>
        {!!detailed.interests.items.length && (
          <ProfileDetailList title={detailed.interests.title} items={detailed.interests.items} loading={!detailed.ready} />
        )}
        <PreferenceList
          title={`${profile.hisHer} Partner Preferences`}
          items={detailed.preferences.items}
          pronoun={profile.hisHer}
          selfPhoto={self.photo}
          matchCount={detailed.preferences.matchCount || 0}
          profilePhoto={profile.photo}
          loading={!detailed.ready}
        />
      </ProfileWrapper>
    );
  }
}

ProfileMobile.defaultProps = {
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
};

ProfileMobile.propTypes = {
  uid: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string.isRequired,
  upgradeLink: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    userHandle: PropTypes.string,
  }).isRequired,
  self: PropTypes.shape({}).isRequired,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  wwwBaseUrl: PropTypes.string.isRequired,
  isFamilyGamified: PropTypes.string.isRequired,
  memberHidden: PropTypes.bool.isRequired,
  gaEventActionLabel: PropTypes.string.isRequired,
};

export default ProfileMobile;
