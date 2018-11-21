import { parse } from 'qs';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from '../../PropTypes';
import SuccessStories from '../../components/SuccessStories';
import ProfileNameSection from '../../components/ProfileNameSection';
import ProfileBasicInfo from '../../components/ProfileBasicInfo';
import ProfileAdditionalInfo from '../../components/ProfileAdditionalInfo';
import ProfileList from '../../components/ProfileList';
import InlineLogin from '../../components/InlineLogin';
import Banner from '../../components/Banner';
import Toast from '../../components/Common/Toast';
import AlertContent from '../../components/Common/AlertContent';
import ProfileQueue from '../../components/Common/ProfileQueue';
import s from './styles';
import onProfileInit from '../../actions/onProfileInit';
import doProfileAction from '../../actions/doProfileAction';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));

const similarEvtRef = encode64('widget-profile_similar_profiles');
const newEvtRef = encode64('widget-profile_recently_joined');

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.onAction = this.onAction.bind(this);
    this.renderProfileLoading = this.renderProfileLoading.bind(this);
    this.renderFlash = this.renderFlash.bind(this);

    this.onBlock = this.action('block');
    this.onMisuse = this.action('reportMisuse');
    this.onToastClose = this.action('onToastClose');
    this.onTopToastClose = this.action('onTopToastClose');
  }

  componentDidMount() {
    this.backToTopClick();
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
  }

  componentWillUnmount() {
    this.props.doProfileAction('profile', this.props.item.uid, 'resetProfile');
  }

  onAction(uid, type, ...args) {
    if (type === 'decline_with_delete') {
      const query = parse(this.props.location.search.slice(1));
      const ubt = query.ubt || '';
      args.push(ubt);
    }

    this.props.doProfileAction('profile', this.props.item.uid, type, ...args);
  }

  action(...args) {
    return () => this.onAction(null, ...args);
  }

  backToTopClick() { //eslint-disable-line
    window.scrollTo(0, 0);
  }

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
      message = '';
    }
    if (`${message}`.toLowerCase().includes('service') || `${message}`.toLowerCase().includes('unknown')) {
      message = <span title={this.props.item.flash}>Something went wrong. Please refresh and try again.</span>;
    }

    return (
      <s.ProfilePage topSpace={this.props.topSpace} windowWidth={this.props.windowWidth} isChatOpen={this.props.isChatOpen}>
        <s.Content>
          <s.RightSection>
            <s.ProfileQueueWrap>
              <s.ProfileQueueContainer>
                {this.props.pagination.isVisible && <ProfileQueue pagination={this.props.pagination} />}
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
          message={
            'This is a shaadi.com profile. You can find partners based on up to 20 different criteria like Age, Height, Community, Education, etc and get the best matches!'
          }
        />
      );
    }

    const profile = this.props.profiles[this.props.item.uid] || this.props.profiles.default;
    const { self } = this.props.profiles;
    if (this.props.item.flash) {
      return this.renderFlash();
    }
    if (!this.props.item.uid) {
      return this.renderProfileLoading();
    }
    const { detailed } = profile;
    console.log('render ProfilePage');
    return (
      <s.ProfilePage topSpace={this.props.topSpace} windowWidth={this.props.windowWidth} isChatOpen={this.props.isChatOpen}>
        <Toast
          isVisible={
            this.props.item.topToast.position === 'topToast' &&
            this.props.item.toast.position !== 'toast' &&
            self.flags.isPremium !== this.props.item.topToast.isFreeToast
          }
          onToastCloseClick={this.onTopToastClose}
        >
          <s.ProfileToast>
            <AlertContent alert={this.props.item.topToast} type="toast" />
          </s.ProfileToast>
        </Toast>
        <Toast isVisible={this.props.item.toast.position === 'toast'} onToastCloseClick={this.onToastClose}>
          <s.ProfileToast>
            <AlertContent alert={this.props.item.toast} type="toast" />
          </s.ProfileToast>
        </Toast>
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
        />
        <s.Content>
          <s.LeftSection>
            <ProfileList
              title="Similar Profiles"
              results={this.props.similarMatches}
              profiles={this.props.profiles}
              evt_ref={similarEvtRef}
            />
            <ProfileList title="New Matches" results={this.props.newMatches} profiles={this.props.profiles} evt_ref={newEvtRef} />
            <SuccessStories wwwBaseUrl={this.props.wwwBaseUrl} stories={this.props.successStories} type={'profile'} />
            <Banner bannerdetails={this.props.profilePageLeftBanner} />
          </s.LeftSection>
          <s.RightSection>
            <ProfileBasicInfo
              items={detailed.infoMap}
              interestsUrl="/my-shaadi/profile/hobbies"
              commonInterests={detailed.commonInterests}
            />
            <ProfileAdditionalInfo
              wwwBaseUrl={this.props.wwwBaseUrl}
              profile={profile}
              self={self}
              settings={this.props.settings}
              onAction={this.onAction}
              gamification={this.props.gamification}
              isAstroStatusError={this.props.item.isAstroStatusError}
            />
            <s.ProfileQueueWrap>
              <s.BackToTopLink onClick={() => window.scrollTo(0, 0)}>Back to Top</s.BackToTopLink>
              <s.ProfileQueueContainer>
                {this.props.pagination.isVisible && <ProfileQueue pagination={this.props.pagination} />}
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
      </s.ProfilePage>
    );
  }
}

ProfilePage.propTypes = {
  item: PropTypes.shape({
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
};

const selector = (state, { location }) => {
  const { profilePage, chat, successStories, profiles, session, view } = state;
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
  };
};

export default withRouter(
  connect(selector, {
    onProfileInit,
    doProfileAction,
  })(ProfilePage),
);
