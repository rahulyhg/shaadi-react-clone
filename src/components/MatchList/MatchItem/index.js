import React from 'react';
import PropTypes from '../../../PropTypes';
import GridItem from './GridItem';
import ListItem from './ListItem';
import PremiumCarouselItem from './PremiumCarouselItem';
import CarouselItem from './CarouselItem';
import InboxItem from './InboxItem';
import FeaturedItem from './FeaturedItem';
import SimilarItem from './SimilarItem';

import s from './styles';

class MatchItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      isSelected: false,
      isNewMatchHovered: false,
    };
    this.onMouseEnter = () => this.setState({ isHovered: true });
    this.onMouseLeave = () => this.setState({ isHovered: false });
    this.onNewMatchHover = () => this.setState(prevState => ({ isNewMatchHovered: !prevState.isNewMatchHovered }));

    this.onProfileSelect = this.onProfileSelect.bind(this);
    this.onShowContactDetails = () => this.props.onAction(this.props.profile.uid, 'contact');
    this.onShowHoroscope = () => this.props.onAction(this.props.profile.uid, 'showHoroscope');
    this.onChatNow = this.action('chatNow');
    this.onShowWatermarkInfo = this.action('showWatermarkInfo');
    this.onEoiTooltipClose = () => this.props.onAction(this.props.profile.uid, 'closeEoiTooltip');
    this.onHoroscopeTooltipClose = () => this.props.onAction(this.props.profile.uid, 'closeAllTooltips');
    this.onPhotoTooltipClose = () => this.props.onAction(this.props.profile.uid, 'closePhotoTooltip');

    this.onRequestPhoto = () => this.props.onAction(this.props.profile.uid, 'requestPhoto');
    this.onRequestPassword = () => this.props.onAction(this.props.profile.uid, 'requestPassword');
    this.onCallConsultantInvited = () => this.props.onAction(this.props.profile.uid, 'callConsultantInvited');
    this.onShowPhotoClick = this.action('viewAlbum');
    this.onUndoSkip = this.action('skip');

    this.onShortlistOpen = () => {
      if (!this.props.profile.shortlists.ready) {
        this.props.onAction(this.props.profile.uid, 'loadShortlist');
      }
    };
    this.onDirectlyShortlist = () =>
      this.props.onAction(this.props.profile.uid, 'addToShortlist', this.props.shortlistItems.slice(0, 1).map(i => i.id));
    this.onDirectlyRemoveShortlist = () => this.props.onAction(this.props.profile.uid, 'addToShortlist', []);
    this.onDirectlyIgnore = () => this.props.onAction(this.props.profile.uid, 'ignore');
    this.onBlock = this.action('block');
    this.onMisuse = this.action('reportMisuse');
  }

  onProfileSelect() {
    const isSelected = !this.state.isSelected;
    this.setState({ isSelected });
    this.props.onMatchSelectionChange(this.props.profile.uid, isSelected);
  }
  action(type) {
    return e => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.props.onAction(this.props.profile.uid, type);
    };
  }

  render() {
    const np = this.props.np;
    const source = (this.props.source && `&source=${this.props.source}`) || '';
    const sourceList = (this.props.sourceList && `&source_list=${this.props.sourceList}`) || '';
    const tempId = (this.props.profile.tempId && `&tempId=${this.props.profile.tempId}`) || '';
    const profileUrl = !['featuredCard', 'inboxCard'].includes(this.props.type)
      ? `/profile?profileid=${this.props.profile.uid}&pg_show_from=${this.props.page}&np=${np}&evt_ref=${this.props.evt_ref}&navigation=${
          this.props.page
        }&profileNumber=${this.props.order}&pg_searchresults_id=${this.props.results_id}&datasrc=api&pg_ubt=${
          this.props.pg_ubt
        }${source}${sourceList}${tempId}&featured=${this.props.type === 'premiumCarouselItem' ? 'Y' : 'N'}`
      : `/profile?profileid=${this.props.profile.uid}&ubt=${this.props.pg_ubt}&source=${this.props.source}&evt_ref=${
          this.props.evt_ref
        }&datasrc=api`;

    const albumUrl = `${this.props.wwwBaseUrl}/profile/index/view-album-photos/profileid/${this.props.profile.uid}/navigation/${
      this.props.page
    }/profileNumber/${this.props.order}/evt_ref/${this.props.evt_ref}/pg_searchresults_id/${this.props.results_id}`;
    switch (this.props.type) {
      case 'list':
        return (
          <ListItem
            profileUrl={profileUrl}
            albumUrl={albumUrl}
            isSpotLight={this.props.isSpotLight}
            // state
            isSelected={this.state.isSelected}
            isHovered={this.state.isHovered}
            isNewMatchHovered={this.state.isNewMatchHovered}
            // props
            settings={this.props.settings}
            profile={this.props.profile}
            tooltip={this.props.tooltip}
            item={this.props.item}
            shortlistItems={this.props.shortlistItems}
            onAction={this.props.onAction}
            daTracking={this.props.daTracking}
            // this
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onNewMatchHover={this.onNewMatchHover}
            onProfileSelect={this.onProfileSelect}
            onShowContactDetails={this.onShowContactDetails}
            onShowHoroscope={this.onShowHoroscope}
            onChatNow={this.onChatNow}
            onShowWatermarkInfo={this.onShowWatermarkInfo}
            onHoroscopeTooltipClose={this.onHoroscopeTooltipClose}
            onEoiTooltipClose={this.onEoiTooltipClose}
            onPhotoTooltipClose={this.onPhotoTooltipClose}
            onRequestPhoto={this.onRequestPhoto}
            onRequestPassword={this.onRequestPassword}
            wwwBaseUrl={this.props.wwwBaseUrl}
            onCallConsultant={this.onCallConsultant}
            onCallConsultantInvited={this.onCallConsultantInvited}
            membershipTags={this.props.profile.flags.membershipTags}
            onShowPhotoClick={this.onShowPhotoClick}
            onUndoSkip={this.onUndoSkip}
            onShortlistOpen={this.onShortlistOpen}
            onDirectlyShortlist={this.onDirectlyShortlist}
            onDirectlyRemoveShortlist={this.onDirectlyRemoveShortlist}
            onDirectlyIgnore={this.onDirectlyIgnore}
            onBlockClick={this.onBlock}
            onMisuseClick={this.onMisuse}
            order={this.props.order}
            page={this.props.page}
            pg_ubt={this.props.pg_ubt}
            searchType={this.props.searchType}
          />
        );
      case 'grid':
        return (
          <div>
            {this.props.isSpotLight && (
              <s.FeatureYourProfile isExternal to="/payment/membership/shaadi-spotlight" target="_blank">
                Feature your profile here
              </s.FeatureYourProfile>
            )}
            <GridItem
              profileUrl={profileUrl}
              albumUrl={albumUrl}
              isSpotLight={this.props.isSpotLight}
              profile={this.props.profile}
              isNewMatchHovered={this.state.isNewMatchHovered}
              onNewMatchHover={this.onNewMatchHover}
              settings={this.props.settings}
              tooltip={this.props.tooltip}
              item={this.props.item}
              shortlistItems={this.props.shortlistItems}
              onChatNow={this.onChatNow}
              onAction={this.props.onAction}
              onPhotoTooltipClose={this.onPhotoTooltipClose}
              onShowWatermarkInfo={this.onShowWatermarkInfo}
              onRequestPhoto={this.onRequestPhoto}
              onRequestPassword={this.onRequestPassword}
              onEoiTooltipClose={this.onEoiTooltipClose}
              wwwBaseUrl={this.props.wwwBaseUrl}
              plan={this.props.profile.flags.membershipLevel || ''}
              daTracking={this.props.daTracking}
            />
          </div>
        );
      case 'carousel':
        return (
          <CarouselItem
            profileUrl={profileUrl}
            albumUrl={albumUrl}
            profile={this.props.profile}
            settings={this.props.settings}
            tooltip={this.props.tooltip}
            item={this.props.item}
            isNewMatchHovered={this.state.isNewMatchHovered}
            onNewMatchHover={this.onNewMatchHover}
            shortlistItems={this.props.shortlistItems}
            onChatNow={this.onChatNow}
            onAction={this.props.onAction}
            onPhotoTooltipClose={this.onPhotoTooltipClose}
            onShowWatermarkInfo={this.onShowWatermarkInfo}
            onRequestPhoto={this.onRequestPhoto}
            onRequestPassword={this.onRequestPassword}
            onEoiTooltipClose={this.onEoiTooltipClose}
            wwwBaseUrl={this.props.wwwBaseUrl}
            plan={this.props.profile.flags.membershipLevel || ''}
            count={this.props.count}
            hasMore={this.props.hasMore}
            listUrl={this.props.listUrl}
            searchType={this.props.searchType}
            daTracking={this.props.daTracking}
          />
        );
      case 'premiumCarouselItem':
        return (
          <PremiumCarouselItem
            profileUrl={profileUrl}
            albumUrl={albumUrl}
            profile={this.props.profile}
            settings={this.props.settings}
            tooltip={this.props.tooltip}
            item={this.props.item}
            shortlistItems={this.props.shortlistItems}
            onChatNow={this.onChatNow}
            onAction={this.props.onAction}
            onPhotoTooltipClose={this.onPhotoTooltipClose}
            onShowWatermarkInfo={this.onShowWatermarkInfo}
            onRequestPhoto={this.onRequestPhoto}
            onRequestPassword={this.onRequestPassword}
            onEoiTooltipClose={this.onEoiTooltipClose}
            wwwBaseUrl={this.props.wwwBaseUrl}
            plan={this.props.profile.flags.membershipLevel || ''}
            daTracking={this.props.daTracking}
          />
        );
      case 'inboxCard':
        return (
          <InboxItem
            isPremium={this.props.profile.flags.isPremium}
            profileUrl={profileUrl}
            albumUrl={albumUrl}
            // state
            isSelected={this.state.isSelected}
            isHovered={this.state.isHovered}
            // props
            settings={this.props.settings}
            profile={this.props.profile}
            tooltip={this.props.tooltip}
            item={this.props.item}
            requestType={this.props.requestType}
            shortlistItems={this.props.shortlistItems}
            onAction={this.props.onAction}
            onChatNow={this.onChatNow}
            // this
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onProfileSelect={this.onProfileSelect}
            onShowContactDetails={this.onShowContactDetails}
            onShowHoroscope={this.onShowHoroscope}
            onShowWatermarkInfo={this.onShowWatermarkInfo}
            onHoroscopeTooltipClose={this.onHoroscopeTooltipClose}
            onEoiTooltipClose={this.onEoiTooltipClose}
            onPhotoTooltipClose={this.onPhotoTooltipClose}
            onRequestPhoto={this.onRequestPhoto}
            wwwBaseUrl={this.props.wwwBaseUrl}
            membershipTags={this.props.profile.flags.membershipTags}
            membershipLevel={this.props.profile.flags.membershipLevel}
            onCallConsultantInvited={this.onCallConsultantInvited}
            onShowPhotoClick={this.onShowPhotoClick}
          />
        );
      case 'featuredCard':
        return (
          <FeaturedItem
            isPremium={this.props.profile.flags.isPremium}
            profileUrl={profileUrl}
            albumUrl={albumUrl}
            photos={[this.props.profile.photoMedium]}
            // state
            isSelected={this.state.isSelected}
            isHovered={this.state.isHovered}
            // props
            settings={this.props.settings}
            profile={this.props.profile}
            tooltip={this.props.tooltip}
            item={this.props.item}
            requestType={this.props.requestType}
            shortlistItems={this.props.shortlistItems}
            onAction={this.props.onAction}
            onChatNow={this.onChatNow}
            // this
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onProfileSelect={this.onProfileSelect}
            onShowContactDetails={this.onShowContactDetails}
            onShowHoroscope={this.onShowHoroscope}
            onShowWatermarkInfo={this.onShowWatermarkInfo}
            onHoroscopeTooltipClose={this.onHoroscopeTooltipClose}
            onEoiTooltipClose={this.onEoiTooltipClose}
            onPhotoTooltipClose={this.onPhotoTooltipClose}
            onRequestPhoto={this.onRequestPhoto}
            wwwBaseUrl={this.props.wwwBaseUrl}
            membershipTags={this.props.profile.flags.membershipTags}
            membershipLevel={this.props.profile.flags.membershipLevel}
            onCallConsultantInvited={this.onCallConsultantInvited}
            onShowPhotoClick={this.onShowPhotoClick}
          />
        );
      case 'similarItem':
        return (
          <SimilarItem
            photos={[this.props.profile.photoMedium]}
            albumUrl={albumUrl}
            isPremium={this.props.profile.flags.isPremium}
            profileUrl={profileUrl}
            settings={this.props.settings}
            profile={this.props.profile}
            tooltip={this.props.tooltip}
            item={this.props.item}
            onAction={this.props.onAction}
            onShowWatermarkInfo={this.onShowWatermarkInfo}
            onEoiTooltipClose={this.onEoiTooltipClose}
            onPhotoTooltipClose={this.onPhotoTooltipClose}
            wwwBaseUrl={this.props.wwwBaseUrl}
            membershipTags={this.props.profile.flags.membershipTags}
            membershipLevel={this.props.profile.flags.membershipLevel}
            onCallConsultantInvited={this.onCallConsultantInvited}
            shortlistItems={this.props.shortlistItems}
            onRequestPhoto={this.onRequestPhoto}
            daTracking={this.props.daTracking}
            isHovered={this.state.isHovered}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          />
        );
      default:
        return null;
    }
  }
}

MatchItem.defaultProps = {
  np: 'search-result',
  count: 0,
  hasMore: false,
  listUrl: '',
  searchType: '',
  source: '',
  sourceList: '',
  onMatchSelectionChange: null,
  isSpotLight: false,
  requestType: {},
  daTracking: null,
  shortlistItems: [],
};

MatchItem.propTypes = {
  type: PropTypes.oneOf(['list', 'grid', 'carousel', 'premiumCarouselItem', 'inboxCard', 'featuredCard', 'similarItem']).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  source: PropTypes.string,
  sourceList: PropTypes.string,
  profile: PropTypes.shape(PropTypes.searchProfile).isRequired,
  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  item: PropTypes.shape({
    justNow: PropTypes.bool.isRequired,
    photoLoading: PropTypes.bool.isRequired,
    eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
  }).isRequired,
  tooltip: PropTypes.shape(PropTypes.tooltip).isRequired,

  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)),
  evt_ref: PropTypes.string.isRequired,
  results_id: PropTypes.string.isRequired,
  pg_ubt: PropTypes.string.isRequired,
  np: PropTypes.string,
  page: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
  onAction: PropTypes.func.isRequired,
  isSpotLight: PropTypes.bool,
  count: PropTypes.number,
  hasMore: PropTypes.bool,
  listUrl: PropTypes.string,
  searchType: PropTypes.string,
  onMatchSelectionChange: PropTypes.func,
  daTracking: PropTypes.func,
  requestType: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default MatchItem;
