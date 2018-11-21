import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';
import el from './styles';
import DailyRecommendations from './dailyRecommendations';
import DailyRecommendationsB from './dailyRecommendationsB';
import CustomButton from '../../../Common/CustomButton';
import CustomContactMessage from '../../../Common/CustomContactMessage';

const EoiIgnored = props => {
  const { membershipTags, isHovered } = props;
  const isVip = membershipTags === 'vip';

  switch (props.type) {
    case 'list':
      return <el.IgnoredText>{props.heShe} will not be shown in your Search or Matches the next time you login.</el.IgnoredText>;
    case 'grid':
      return (
        <s.GridStyle>
          <s.InvitationGridStatus isVisible status="ignored">
            Added to Ignored list
          </s.InvitationGridStatus>
        </s.GridStyle>
      );
    case 'chat':
      return null;
    case 'profile':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <s.InvitationBtnContainer isVisible>
            <s.ProfileInvitationHeading isVisible>Ignored Member. Changed your mind?</s.ProfileInvitationHeading>
            <s.ProfileInvitationButtonWrapper>
              <CustomButton isVisible title="Connect Now" onClick={props.onConnect} type="Connect" isVip={isVip} isHovered={isHovered} />
              <CustomContactMessage
                isVisible
                title="Connect Now"
                message="Connect Now"
                onClick={props.onConnect}
                type="Connect"
                isVip={isVip}
                isHovered={isHovered}
              />
            </s.ProfileInvitationButtonWrapper>
          </s.InvitationBtnContainer>
        );
      }

      if (props.justNow) {
        return (
          <div>
            <s.ProfileStatusIcon status={props.justNowIcon || 'ignored'} />
            <s.ProfileStatusText>{props.justNowText || 'Added to Ignored list'}&nbsp;</s.ProfileStatusText>
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
        <div>
          <s.InvitationHeading isVisible>Ignored Member. Changed your mind?</s.InvitationHeading>
          <s.InvitationBtn isVisible isLargeBtn onClick={props.onConnect}>
            Yes
          </s.InvitationBtn>
          {props.note && <s.Note>{props.note}</s.Note>}
        </div>
      );
    case 'dailyRecommendations':
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <DailyRecommendationsB
            justNow={props.justNow}
            justNowText={props.justNowText}
            name={props.name}
            wwwBaseUrl={props.wwwBaseUrl}
            nextUrl={props.nextUrl}
            justNowIcon={props.justNowIcon || 'ignored'}
            isProfileViewed={props.isProfileViewed}
            drAction={props.drAction}
            onConnect={props.onConnect}
            isHovered={isHovered}
            isVip={isVip}
          />
        );
      }
      return (
        <DailyRecommendations
          justNow={props.justNow}
          justNowText={props.justNowText}
          name={props.name}
          wwwBaseUrl={props.wwwBaseUrl}
          nextUrl={props.nextUrl}
          justNowIcon={props.justNowIcon || 'ignored'}
          isProfileViewed={props.isProfileViewed}
          drAction={props.drAction}
        />
      );
    case 'premiumCarousel':
      return (
        <s.carouselConnectedBtn>
          <s.connectedText>Ignored</s.connectedText>
        </s.carouselConnectedBtn>
      );
    default:
      return null;
  }
};

EoiIgnored.defaultProps = {
  note: null,
  justNowText: null,
  justNowIcon: null,
  nextUrl: null,
  isProfileViewed: true,
  name: null,
  wwwBaseUrl: null,
  drAction: '',
  profilePageBucket: 'A',
};

EoiIgnored.propTypes = {
  type: PropTypes.string.isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  onConnect: PropTypes.func.isRequired,
  name: PropTypes.string,
  note: PropTypes.string,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string,
  justNowIcon: PropTypes.string,
  isSearchLinkVisible: PropTypes.bool.isRequired,
  nextUrl: PropTypes.string,
  isProfileViewed: PropTypes.bool,
  wwwBaseUrl: PropTypes.string,
  drAction: PropTypes.string,
  membershipTags: PropTypes.string.isRequired,
  isHovered: PropTypes.bool.isRequired,
  profilePageBucket: PropTypes.string,
};

export default EoiIgnored;
