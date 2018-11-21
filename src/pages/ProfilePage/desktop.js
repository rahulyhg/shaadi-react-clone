import { parse } from 'qs';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EventListener from 'react-event-listener';
import get from 'lodash/get';
import PropTypes from '../../PropTypes';
import SuccessStories from '../../components/SuccessStories';
import ProfileNameSection from '../../components/ProfileNameSection';
import ProfileBasicInfo from '../../components/ProfileBasicInfo';
import PremiumMessageDisplay from '../../components/PremiumMessageDisplay';
import ProfileAdditionalInfo from '../../components/ProfileAdditionalInfo';
import ProfileList from '../../components/ProfileList';
import TrustBadge from '../../components/TrustBadge';
import InlineLogin from '../../components/InlineLogin';
import Banner from '../../components/Banner';
import Toast from '../../components/Common/Toast';
import AlertContent from '../../components/Common/AlertContent';
import ProfileQueue from '../../components/Common/ProfileQueue';
import s from './styles';
import onProfileInit from '../../actions/onProfileInit';
import doProfileAction from '../../actions/doProfileAction';
import doDaTracking from '../../actions/doDaTracking';
import OverLay from '../../components/Common/OverLay';
import { UpgradeBannerBox } from '../../components/Common/UpgradeBanner';
import SimilarProfile from '../../components/Common/SimilarProfile';
import { isCarouselProfilePage } from '../../components/Common/CarouselPageUtils';

import ContextProvider from '../../components/Common/Context';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));

const similarEvtRef = encode64('widget-profile_similar_profiles');
const newEvtRef = encode64('widget-profile_recently_joined');

export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.onAction = this.onAction.bind(this);
    this.daTracking = this.daTracking.bind(this);
    this.renderProfileLoading = this.renderProfileLoading.bind(this);
    this.renderFlash = this.renderFlash.bind(this);

    this.onBlock = this.action('block');
    this.onMisuse = this.action('reportMisuse');
    this.onToastClose = this.action('onToastClose');
    this.onTopToastClose = this.action('onTopToastClose');
    this.state = {
      isScrollTracked: false,
      isShidTracked: false,
    };

    this.onViewRequest = this.action('view_request');
    this.RequestData = {
      photo: { text: 'Add your Photo', onClick: this.onViewRequest },
      contact: { text: 'Verify your Phone No', onClick: this.onViewRequest },
    };
  }

  componentDidMount() {
    this.noscroll();
    this.fetch(this.props.location);
  }

  componentWillReceiveProps(props) {
    if (props.location.search !== this.props.location.search) {
      this.fetch(props.location);
    }

    if (props.item.pageTitle !== this.props.item.pageTitle) {
      document.title = props.item.pageTitle;
    }

    if (this.props.item.triggerReportMisuse !== props.item.triggerReportMisuse && props.item.triggerReportMisuse) {
      this.props.doProfileAction('profile', this.props.item.uid, 'reportMisuse', []);
    }

    if (this.props.item.uid !== props.item.uid) {
      this.backToTopClick();
    }

    const queryParams = parse(this.props.location.search.slice(1));
    if (this.props.item.uid && queryParams.txtprofileid && !this.state.isShidTracked) {
      this.setState({ isShidTracked: true });
      this.daTracking('profile_view_shid_search');
    }
  }

  componentDidUpdate() {
    this.noscroll();
  }

  componentWillUnmount() {
    this.props.doProfileAction('profile', this.props.item.uid, 'resetProfile');
    window.removeEventListener('scroll', this.backToTopClick);
  }

  onAction(uid, type, ...args) {
    const { source = 'profile' } = (args.length > 0 && args.filter(i => i.source)[0]) || {};
    if (type === 'decline_with_delete') {
      const query = parse(this.props.location.search.slice(1));
      const ubt = query.ubt || '';
      args.push(ubt);
    }

    this.props.doProfileAction(source, source === 'similar_profile' ? uid : this.props.item.uid, type, ...args);
  }

  daTracking(event, args = {}) {
    if (this.props.doDaTracking) this.props.doDaTracking('profile', event, args.uid || this.props.item.uid || '', args);
  }

  handleScroll(event) {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';

    const percent = Math.floor((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100);

    if (percent > 50 && !this.state.isScrollTracked) {
      this.setState({ isScrollTracked: true });
      this.daTracking('profile_view_to_bottom');
    }
  }

  action(...args) {
    return () => this.onAction(null, ...args);
  }

  backToTopClick() { //eslint-disable-line
    window.scrollTo(0, 0);
  }

  noscroll = () => {
    const isMaskedProfile =
      this.props &&
      this.props.profiles &&
      this.props.item &&
      this.props.item.uid &&
      this.props.profiles[this.props.item.uid] &&
      this.props.profiles[this.props.item.uid].flags &&
      this.props.profiles[this.props.item.uid].flags.isMaskedProfile;
    return isMaskedProfile
      ? window.addEventListener('scroll', this.backToTopClick)
      : window.removeEventListener('scroll', this.backToTopClick);
  };

  fetch(loc) {
    this.props.onProfileInit(loc);
  }

  renderProfileLoading() {
    return (
      <s.ProfilePage topSpace={this.props.topSpace} windowWidth={this.props.windowWidth} isChatOpen={this.props.isChatOpen}>
        <s.LoadingWrapper isVisible>
          <s.ColorBg />
          <s.LoadingIndicator>
            <s.LoadingIcon />
            <s.LoadingText>{this.props.item.loadingText}</s.LoadingText>
          </s.LoadingIndicator>
        </s.LoadingWrapper>
      </s.ProfilePage>
    );
  }

  renderFlash() {
    let message = this.props.item.flash;
    if (message.includes('Terms of Use')) {
      const [p1, p2] = message.split('Terms of Use');
      message = (
        <span>
          {p1}
          <s.TermsLink to={`${this.props.wwwBaseUrl}/shaadi-info/index/terms`} isExternal>
            Terms of Use
          </s.TermsLink>
          {p2}
        </span>
      );
    }
    if (message.toLowerCase() === 'blocked') {
      message = `The member has chosen to hide ${this.props.profiles[this.props.item.uid].hisHer} profile.`;
    }
    if (`${message}`.toLowerCase().includes('service') || `${message}`.toLowerCase().includes('unknown')) {
      message = <span title={this.props.item.flash}>Something went wrong. Please refresh and try again.</span>;
    }
    return (
      <s.ProfilePage topSpace={this.props.topSpace} windowWidth={this.props.windowWidth} isChatOpen={this.props.isChatOpen}>
        <s.Content>
          <s.RightSection>
            <s.ProfileQueueWrap>
              <s.ProfileQueueContainer isHidden>
                {this.props.pagination.isVisible && <ProfileQueue pagination={this.props.pagination} daTracking={this.daTracking} />}
              </s.ProfileQueueContainer>
            </s.ProfileQueueWrap>
          </s.RightSection>
        </s.Content>
        <s.Flash>
          {message}
          <s.FlashSmall>
            (Go to{' '}
            <s.SearchLink to={`${this.props.wwwBaseUrl}/search`} isExternal>
              Partner Search
            </s.SearchLink>)
          </s.FlashSmall>
        </s.Flash>
        <s.LoadingWrapper isVisible={this.props.item.loading}>
          <s.ColorBg />
          <s.LoadingIndicator>
            <s.LoadingIcon />
            <s.LoadingText>{this.props.item.loadingText}</s.LoadingText>
          </s.LoadingIndicator>
        </s.LoadingWrapper>
      </s.ProfilePage>
    );
  }

  render() {
    if (this.props.isLoggedOut) {
      return (
        <InlineLogin
          title={'Profile'}
          path={this.props.location.pathname}
          wwwBaseUrl={this.props.wwwBaseUrl}
          message={
            'This is a shaadi.com profile. You can find partners based on up to 20 different criteria like Age, Height, Community, Education, etc and get the best matches!'
          }
        />
      );
    }
    const expBucketReady = this.props.settings && this.props.settings.experiments;
    if (typeof expBucketReady === 'undefined') {
      return this.renderProfileLoading();
    }
    const profilePageBucket = expBucketReady.profilepage_revamp_abc.bucket || '';
    const profileContactCard = expBucketReady.profile_contact_card.bucket || 'A';
    const profile = this.props.profiles[this.props.item.uid] || this.props.profiles.default;
    const { self } = this.props.profiles;
    if (this.props.item.flash) {
      return this.renderFlash();
    }
    if (!this.props.item.uid) {
      return this.renderProfileLoading();
    }
    const { detailed } = profile;
    const similarExperiment = get(this.props.settings, ['experiments', 'similar_profile', 'bucket'], 'A');
    const query = parse(this.props.location.search.slice(1));
    const ubt = query.ubt || '';
    return (
      <ContextProvider similarProfiles={this.props.similarProfiles} profiles={this.props.profiles}>
        <div>
          <EventListener
            target="document"
            onScroll={event => {
              this.handleScroll(event);
            }}
          />
          <s.ProfilePage
            topSpace={this.props.topSpace}
            windowWidth={this.props.windowWidth}
            isChatOpen={this.props.isChatOpen}
            profilePageBucket={profilePageBucket}
          >
            {isCarouselProfilePage && <s.MyPremiumMatches>My Premium Matches</s.MyPremiumMatches>}
            <Toast
              isVisible={
                this.props.item.topToast.position === 'topToast' &&
                this.props.item.toast.position !== 'toast' &&
                self.flags.isPremium !== this.props.item.topToast.isFreeToast
              }
              onToastCloseClick={this.onTopToastClose}
            >
              <s.ProfileToast>
                <AlertContent alert={this.props.item.topToast} type="toast" source={this.props.pagination.source || ''} />
              </s.ProfileToast>
            </Toast>
            <Toast isVisible={this.props.item.toast.position === 'toast'} onToastCloseClick={this.onToastClose}>
              <s.ProfileToast>
                <AlertContent alert={this.props.item.toast} type="toast" source={this.props.pagination.source || ''} />
              </s.ProfileToast>
            </Toast>
            {profilePageBucket !== 'A' &&
              this.props.item.request &&
              this.props.item.request.details &&
              this.props.item.request.details.count > 0 && (
                <s.DisplayRequestData>
                  {profile.heShe} has requested you
                  {this.props.item.request.details.request_type.map((detail, index) => (
                    <span key={detail}>
                      <span> to </span>
                      <s.DisplayRequesLink onClick={this.RequestData[detail].onClick}>{this.RequestData[detail].text}</s.DisplayRequesLink>
                      <span>
                        {this.props.item.request.details.count > 1 &&
                          index < this.props.item.request.details.request_type.length - 1 &&
                          ' and '}
                      </span>
                    </span>
                  ))}.
                </s.DisplayRequestData>
              )}
            <ProfileNameSection
              item={this.props.item}
              profile={profile}
              settings={this.props.settings}
              shortlistItems={this.props.shortlistItems}
              pagination={this.props.pagination}
              onAction={this.onAction}
              wwwBaseUrl={this.props.wwwBaseUrl}
              isHovered={false}
              tooltip={this.props.item.tooltip}
              photoLoading={this.props.item.photoLoading}
              eoiLoadingStyle={this.props.item.eoiLoadingStyle}
              membership={this.props.membership}
              source={this.props.pagination.source || ''}
              onBlockClick={this.onBlock}
              onMisuseClick={this.onMisuse}
              profilePageBucket={profilePageBucket}
              daTracking={this.daTracking}
            />
            <s.Content>
              <s.LeftSection profilePageBucket={profilePageBucket}>
                <TrustBadge
                  flags={profile.flags}
                  items={profile.detailed.trustBadges}
                  onAction={this.onAction}
                  onBlockClick={this.onBlock}
                  onMisuseClick={this.onMisuse}
                  himHer={profile.himHer}
                  verification={profile.verification}
                  profilePageBucket={profilePageBucket}
                />
                {!isCarouselProfilePage && (
                  <React.Fragment>
                    <ProfileList
                      title="Similar Profiles"
                      results={this.props.similarMatches}
                      profiles={this.props.profiles}
                      evt_ref={similarEvtRef}
                      profilePageBucket={profilePageBucket}
                    />
                    <ProfileList
                      title="New Matches"
                      results={this.props.newMatches}
                      profiles={this.props.profiles}
                      evt_ref={newEvtRef}
                      profilePageBucket={profilePageBucket}
                    />
                    <SuccessStories
                      wwwBaseUrl={this.props.wwwBaseUrl}
                      stories={this.props.successStories}
                      type={'profile'}
                      profilePageBucket={profilePageBucket}
                    />
                    <Banner bannerdetails={this.props.profilePageLeftBanner} />
                  </React.Fragment>
                )}
              </s.LeftSection>
              <s.RightSection>
                {similarExperiment === 'B' &&
                  this.props.item.justNow && (
                    <SimilarProfile
                      profileName={profile.name}
                      uid={this.props.item.uid}
                      settings={this.props.settings}
                      wwwBaseUrl={this.props.wwwBaseUrl}
                      onAction={this.onAction}
                      pg_ubt={ubt}
                      maxComponentsInFrame={3.84}
                      type="profile"
                    />
                  )}
                {profilePageBucket === 'A' && (
                  <ProfileBasicInfo
                    items={detailed.infoMap}
                    interestsUrl="/my-shaadi/profile/hobbies"
                    commonInterests={detailed.commonInterests}
                  />
                )}
                {profilePageBucket !== 'A' && (
                  <PremiumMessageDisplay item={this.props.item} profile={profile} settings={this.props.settings} />
                )}
                <ProfileAdditionalInfo
                  wwwBaseUrl={this.props.wwwBaseUrl}
                  profile={profile}
                  self={self}
                  settings={this.props.settings}
                  onAction={this.onAction}
                  gamification={this.props.gamification}
                  isAstroStatusError={this.props.item.isAstroStatusError}
                  profilePageBucket={profilePageBucket}
                  daTracking={this.daTracking}
                  profileContactCard={profileContactCard}
                />
                <s.ProfileQueueWrap>
                  <s.BackToTopLink onClick={() => window.scrollTo(0, 0)} profilePageBucket={profilePageBucket}>
                    Back to Top
                  </s.BackToTopLink>
                  <s.ProfileQueueContainer>
                    {this.props.pagination.isVisible && (
                      <ProfileQueue
                        pagination={this.props.pagination}
                        daTracking={this.daTracking}
                        profilePageBucket={profilePageBucket}
                        isBottomProfileQueue
                      />
                    )}
                  </s.ProfileQueueContainer>
                </s.ProfileQueueWrap>
              </s.RightSection>
            </s.Content>
            <s.LoadingWrapper isVisible={this.props.item.loading}>
              <s.ColorBg />
              <s.LoadingIndicator>
                <s.LoadingIcon />
                <s.LoadingText>{this.props.item.loadingText}</s.LoadingText>
              </s.LoadingIndicator>
            </s.LoadingWrapper>
            {profile.flags.isMaskedProfile && (
              <OverLay zIndex={99}>
                <s.OverlayDiv>
                  <s.UpgradeBannerDiv windowWidth={this.props.windowWidth} isChatOpen={this.props.isChatOpen}>
                    <UpgradeBannerBox isVisible type="profile" source="newmatches_block_profile" />
                  </s.UpgradeBannerDiv>
                </s.OverlayDiv>
              </OverLay>
            )}
          </s.ProfilePage>
        </div>
      </ContextProvider>
    );
  }
}

ProfilePage.defaultProps = {
  similarProfiles: {},
};

ProfilePage.propTypes = {
  item: PropTypes.shape({
    justNow: PropTypes.bool,
    flash: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    loadingText: PropTypes.string.isRequired,
    uid: PropTypes.string,
    toast: PropTypes.shape(PropTypes.alert).isRequired,
    topToast: PropTypes.shape(PropTypes.alert).isRequired,
    tooltip: PropTypes.shape(PropTypes.alert).isRequired,
    photoLoading: PropTypes.bool.isRequired,
    eoiLoadingStyle: PropTypes.oneOf(['full', 'partial', 'none']).isRequired,
    connectMessages: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
    contact: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    pageTitle: PropTypes.string.isRequired,
    triggerReportMisuse: PropTypes.bool.isRequired,
    isAstroStatusError: PropTypes.bool.isRequired,
    request: PropTypes.shape({
      details: PropTypes.shape({
        count: PropTypes.number,
        request_type: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  }).isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  pagination: PropTypes.shape(PropTypes.profilePagination).isRequired,
  similarMatches: PropTypes.shape(PropTypes.profileList).isRequired,
  newMatches: PropTypes.shape(PropTypes.profileList).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  successStories: PropTypes.shape(PropTypes.successStories).isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  membership: PropTypes.string.isRequired,

  onProfileInit: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  topSpace: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  gamification: PropTypes.shape({
    flash: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  profilePageLeftBanner: PropTypes.shape({
    url: PropTypes.string,
    img: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
    }),
  }).isRequired,
  doDaTracking: PropTypes.func.isRequired,
  similarProfiles: PropTypes.shape(),
};

const selector = (state, { location }) => {
  const { profilePage, chat, successStories, profiles, session, view, similarProfiles = {} } = state;
  const { wwwBaseUrl } = state.config.app;
  const { item, similarMatches, newMatches, pagination, gamification, profilePageLeftBanner } = profilePage;
  return {
    isLoggedOut: session.isLoggedOut,
    item,
    similarMatches,
    newMatches,
    pagination,
    gamification,
    isChatOpen: chat.settings.isOpen,
    successStories,
    profiles,
    location,
    wwwBaseUrl,
    topSpace: view.topSpace,
    windowWidth: view.width,
    settings: session.settings,
    shortlistItems: session.shortlists.items,
    profilePageLeftBanner,
    membership: session.membership || '',
    similarProfiles,
  };
};

export default withRouter(
  connect(selector, {
    onProfileInit,
    doProfileAction,
    doDaTracking,
  })(ProfilePage),
);
