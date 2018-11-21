import React from 'react';
import PropTypes from '../../../../PropTypes';
import Profile from './profile';
import ProfileB from './profileB';
import DailyRecommendations from './dailyRecommendations';
import DailyRecommendationsB from './dailyRecommendationsB';
import EoiMessage from '../EoiMessage';

import s from '../styles';

const EoiBlocked = props => {
  switch (props.type) {
    case 'profile':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <ProfileB
            note={props.note}
            himHer={props.himHer}
            canUnblock={props.canUnblock}
            unblockMessage={props.unblockMessage}
            onUnblock={props.onUnblock}
            onReportMisuse={props.onReportMisuse}
            isHovered={props.isHovered}
            membershipTags={props.membershipTags}
          />
        );
      }
      if (props.justNow) {
        return (
          <div>
            <s.ProfileStatusIcon status={props.justNowIcon || 'user_block'} />
            <s.ProfileStatusText>{props.justNowText || 'Blocked user'}&nbsp;</s.ProfileStatusText>
            <s.ProfileSearchLinkWrap isVisible={props.isSearchLinkVisible}>
              {'('}Go to&nbsp;
              <s.ProfileSearchLink to="/search" isExternal>
                Partner Search
              </s.ProfileSearchLink>
              {')'}
            </s.ProfileSearchLinkWrap>
          </div>
        );
      }
      return (
        <Profile
          note={props.note}
          himHer={props.himHer}
          canUnblock={props.canUnblock}
          unblockMessage={props.unblockMessage}
          onUnblock={props.onUnblock}
          onReportMisuse={props.onReportMisuse}
        />
      );
    case 'list':
      if (props.connectionAction === 'member_blocked') {
        return <s.ListBlockText>You have blocked this Member.</s.ListBlockText>;
      } else if (props.connectionAction === 'profile_blocked') {
        return <s.ListBlockText>This Member has hidden or deleted {props.hisHer.toLowerCase()} profile.</s.ListBlockText>;
      }
      return null;
    case 'grid':
      return props.status === 'blocked' ? (
        <s.GridStyle>
          <s.InvitationGridStatus isVisible={props.status === 'blocked'} status={props.status}>
            <s.StatusText isGrid>{`Blocked Member`}</s.StatusText>
          </s.InvitationGridStatus>
        </s.GridStyle>
      ) : null;
    case 'premiumCarousel':
      return (
        <s.carouselConnectedBtn>
          <s.connectedText>Blocked</s.connectedText>
        </s.carouselConnectedBtn>
      );
    case 'dailyRecommendations':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <DailyRecommendationsB
            profileName={props.profileName}
            status={props.status}
            drAction={props.drAction}
            nextUrl={props.nextUrl}
            himHer={props.himHer}
            canUnblock={props.canUnblock}
            unblockMessage={props.unblockMessage}
            onUnblock={props.onUnblock}
            onReportMisuse={props.onReportMisuse}
            isHovered={props.isHovered}
            membershipTags={props.membershipTags}
          />
        );
      }
      return (
        <DailyRecommendations profileName={props.profileName} status={props.status} drAction={props.drAction} nextUrl={props.nextUrl} />
      );
    case 'similarProfile':
      return (
        <EoiMessage
          type={props.type}
          justNow={props.justNow}
          justNowText={`Member has hidden ${props.hisHer.toLowerCase()} Profile`}
          justNowIcon={props.justNowIcon}
        />
      );
    case 'dashboard':
      return <EoiMessage type={props.type} status={props.status} connectionAction={props.connectionAction} />;
    default:
      return null;
  }
};

EoiBlocked.defaultProps = {
  note: null,
  unblockMessage: undefined,
  justNowText: null,
  justNowIcon: null,
  connectionAction: '',
  profileName: null,
  drAction: '',
  nextUrl: '',
  isHovered: false,
  profilePageBucket: 'A',
};

EoiBlocked.propTypes = {
  type: PropTypes.oneOf(['grid', 'list', 'profile', 'chat', 'premiumCarousel', 'dailyRecommendations']).isRequired,
  status: PropTypes.connectionStatus.isRequired,
  connectionAction: PropTypes.string,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string,
  justNowIcon: PropTypes.string,
  himHer: PropTypes.string.isRequired,
  hisHer: PropTypes.string.isRequired,
  note: PropTypes.string,
  isSearchLinkVisible: PropTypes.bool.isRequired,
  canUnblock: PropTypes.bool.isRequired,
  unblockMessage: PropTypes.string,
  onUnblock: PropTypes.func.isRequired,
  onReportMisuse: PropTypes.func.isRequired,
  profileName: PropTypes.string,
  drAction: PropTypes.string,
  nextUrl: PropTypes.string,
  isHovered: PropTypes.bool,
  membershipTags: PropTypes.string.isRequired,
  profilePageBucket: PropTypes.string,
};

export default EoiBlocked;
