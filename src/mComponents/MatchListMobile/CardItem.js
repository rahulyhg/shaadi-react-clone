import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from '../../PropTypes';
import ProfilePhotoMobile from '../../mComponents/Common/ProfilePhotoMobile';
import ProfileCard, { GradientSection, Details, Badge, EoiDropdown } from '../../mComponents/ProfileCard';
import EoiMobile from '../../mComponents/EoiMobile';
import CardContainer from './CardContainer';
import TrackVisiblity from '../../components/TrackVisiblity';

class CardItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hidden: props.item.justNow,
    };
    this.onSwipeLeft = () => this.setState({ hidden: true });
    this.onSwipeRight = () => {
      this.props.onAction('connect_mobile');
      this.setState({ hidden: true });
    };
    this.onTap = () => this.props.profileUrl && this.props.history.push(this.props.profileUrl);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.item.justNow !== this.props.item.justNow || newProps.item.mCardStatus !== this.props.item.mCardStatus) {
      this.setState((state, props) => {
        const { mCardStatus, justNow } = props.item;
        let hidden = state.hidden;
        if (mCardStatus === 'hidden') hidden = true;
        if (mCardStatus === 'unhidden') hidden = false;
        if (justNow && mCardStatus !== 'ignoreJustNow') hidden = true;
        return { hidden };
      });
    }
  }

  render() {
    const { item, profile, shortlistItems, hasPhoto, profileUrl, onAction, isPaidUser, memberHidden, gaEventActionLabel } = this.props;
    const { hidden } = this.state;
    const handleDaTracking = (uid, event = 'profile_view_from_list_dr') => {
      onAction('trackView', item.uid);
    };
    return (
      <div
        key={item.uid}
        style={{
          overflow: hidden ? 'hidden' : 'visible',
          height: '470px',
          width: '100%',
          display: 'block',
          maxHeight: hidden ? '0px' : '470px',
          transition: '0.25s ease max-height',
        }}
      >
        <CardContainer
          classNames="profile-card"
          id={`match-item-${item.uid}`}
          plan={profile.flags.membershipLevel}
          hidden={hidden}
          membershipTag={profile.flags.membershipTags}
          showConnectOverlay={item.justNow || item.eoiLoadingStyle !== 'none'}
          profileUrl={profileUrl}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          onTap={item.justNow ? () => {} : this.onTap}
        >
          <ProfileCard>
            <ProfilePhotoMobile
              lazyLoadImages
              uid={item.uid}
              gender={profile.gender}
              photo={profile.fullPhoto}
              photoCount={profile.summary.listAlbum.length}
              photosLoading={profile.summary.photosLoading}
              albumStatus={profile.flags.albumStatus}
              onAction={onAction}
            />
            <EoiDropdown profile={profile} shortlistItems={shortlistItems} onAction={onAction} />
            <Badge isCard tag={profile.flags.membershipTags} plan={profile.flags.membershipLevel} />
            <GradientSection hasPhoto={hasPhoto}>
              <Details
                name={profile.name}
                hisHer={profile.himHer}
                detailList={profile.base.cardInfo}
                lastOnlineText={profile.presence.lastOnlineText}
                onAction={onAction}
                showInterest={!!profile.detailed.commonInterests.length}
              />
              <TrackVisiblity nodeRef={`true_view_${item.uid}`} daTracking={handleDaTracking}>
                <div id={`true_view_${item.uid}`}>
                  <EoiMobile
                    uid={item.uid}
                    gender={profile.gender}
                    membershipLevel={profile.flags.membershipLevel}
                    membershipTags={profile.flags.membershipTags}
                    connectionStatus={profile.flags.connectionStatus}
                    isPaidUser={isPaidUser}
                    onAction={onAction}
                    justNow={item.justNow}
                    justNowText={item.justNowText}
                    canSendRemind={profile.flags.canRemind}
                    canCancelInvite={profile.flags.canCancelInvite}
                    memberHidden={memberHidden}
                    gaEventActionLabel={gaEventActionLabel}
                    actionSource="list"
                  />
                </div>
              </TrackVisiblity>
            </GradientSection>
          </ProfileCard>
        </CardContainer>
      </div>
    );
  }
}

CardItem.defaultProps = {};

CardItem.propTypes = {
  onAction: PropTypes.func.isRequired,
  item: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    justNow: PropTypes.bool.isRequired,
    mCardStatus: PropTypes.oneOf(['normal', 'hidden', 'unhidden', 'ignoreJustNow']),
  }).isRequired,
  profile: PropTypes.shape(PropTypes.basicProfile).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  hasPhoto: PropTypes.bool.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  profileUrl: PropTypes.string.isRequired,
  history: PropTypes.shape(PropTypes.history).isRequired,
  memberHidden: PropTypes.bool.isRequired,
  gaEventActionLabel: PropTypes.string.isRequired,
};

export default withRouter(CardItem);
