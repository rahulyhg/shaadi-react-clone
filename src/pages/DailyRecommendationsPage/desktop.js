import { parse } from 'qs';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EventListener from 'react-event-listener';
import PropTypes from '../../PropTypes';
import ProfileNameSection from '../../components/ProfileNameSection';
import ProfileBasicInfo from '../../components/ProfileBasicInfo';
import ProfileAdditionalInfo from '../../components/ProfileAdditionalInfo';
import TrustBadge from '../../components/TrustBadge';
import InlineLogin from '../../components/InlineLogin';
import DrQueue from '../../components/Common/DrQueue';
import { UpgradeBanner } from '../../components/Common/UpgradeBanner';
import ProfileQueue from '../../components/Common/ProfileQueue';
import s from './styles';
import onProfileInit from '../../actions/onProfileInit';
import doProfileAction from '../../actions/doProfileAction';
import RecommendationTicker from '../../components/Common/RecommendationTicker';
import doDaTracking from '../../actions/doDaTracking';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));

const evtRef = encode64('daily5');

class DailyRecommendationsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onAction = this.onAction.bind(this);
    this.daTracking = this.daTracking.bind(this);
    this.renderProfileLoading = this.renderProfileLoading.bind(this);
    this.renderLastPage = this.renderLastPage.bind(this);

    this.onBlock = this.action('block').bind(this);
    this.backToTopClick = this.backToTopClick.bind(this);
    this.onMisuse = this.action('reportMisuse').bind(this);
    this.onToastClose = this.action('onToastClose').bind(this);
    this.startTicking = this.startTicking.bind(this);
    this.getNextLink = this.getNextLink.bind(this);
    this.moveToNextPage = this.moveToNextPage.bind(this);
    this.onTopToastClose = this.action('onTopToastClose').bind(this);

    this.state = {
      movingcount: 5,
      moveToNextPageFlag: false,
      isScrollTracked: false,
      isDrTracked: false,
    };
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

    if (this.props.item.uid !== props.item.uid) {
      this.backToTopClick();
    }
    const queryParams = parse(this.props.location.search.slice(1));
    if (
      this.props.recommendations.items.length !== props.recommendations.items.length &&
      (!props.recommendations.items || !props.recommendations.items.filter(item => item.recommendation.action === '').length) &&
      (!queryParams || !['ty'].includes(queryParams.from))
    ) {
      this.setState({ moveToNextPageFlag: true });
    } else {
      this.setState({ moveToNextPageFlag: false });
    }

    if (this.props.item.uid && !this.state.isDrTracked) {
      this.setState({ isDrTracked: true });
      this.daTracking('profile_view_dr');
    }
  }

  onAction(uid, type, ...args) {
    this.props.doProfileAction('daily-recommendations', this.props.item.uid, type, ...args);
  }

  renderProfileThumb(item) { //eslint-disable-line
    return (
      <s.thumbwrapper to={`/profile/daily-recommendations?profileid=${item.uid}&from=ty`} key={item.uid}>
        <img src={item.thumbnail} width="60" height="60" alt="" />
        <s.actionwrapper action={item.recommendation.action} />
      </s.thumbwrapper>
    );
  }

  getNextLink() {
    let nexturl = `/search`;
    let nextcount = 0;
    let nextText = 'Search for your partner.';
    const preffered = this.props.nav && this.props.nav[1].nav.filter(item => item.key === 'matches-preferred');
    const broader = this.props.nav && this.props.nav[1].nav.filter(item => item.key === 'broader');
    if (preffered[0] && preffered[0].count > 0) {
      nexturl = `${preffered[0].path}`;
      nextcount = preffered[0].count;
      nextText = 'Preferred Matches';
    } else if (broader[0] && broader[0].count > 0) {
      nexturl = `${broader[0].path}`;
      nextcount = broader[0].count;
      nextText = 'Broader Matches';
    }

    return { nexturl, nextcount, nextText };
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

  daTracking(event, args = {}) {
    this.props.doDaTracking('daily-recommendations', event, args.uid || this.props.item.uid || '', args);
  }

  backToTopClick() { //eslint-disable-line
    window.scrollTo(0, 0);
  }

  fetch(loc) {
    this.props.onProfileInit(loc);
  }

  action(...args) {
    return () => this.onAction(null, ...args);
  }

  moveToNextPage() {
    const { nexturl } = this.getNextLink();
    this.setState({ moveToNextPageFlag: false });
    this.onAction(null, 'drThankyouRedirection', { nexturl });
  }

  startTicking(nexturl) {
    if (!this.drInterval) {
      this.drInterval = setInterval(() => {
        const movingcount = this.state.movingcount - 1;
        if (movingcount < 0) {
          clearInterval(this.drInterval);
          this.drInterval = null;
          this.onAction(null, 'drThankyouRedirection', { nexturl });
        } else {
          this.setState({ movingcount });
        }
      }, 1000);
    }
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

  renderNextLink() {
    const queryParams = parse(this.props.location.search.slice(1));
    const { nexturl, nextcount, nextText } = this.getNextLink();
    if (queryParams.from === 'lastprofile') {
      this.startTicking(nexturl);
    }

    return (
      <p>
        Meanwhile, Check out{' '}
        {nexturl && (
          <s.SearchLink to={nexturl}>
            {nextcount} {nextText}.
          </s.SearchLink>
        )}
        {queryParams.from === 'lastprofile' && (
          <s.movinginmsg>
            {' '}
            Moving in <span>{this.state.movingcount}</span> secs...
          </s.movinginmsg>
        )}
      </p>
    );
  }

  renderLastPage() {
    if (!this.props.recommendations.items[0]) {
      return null;
    }

    const queryParams = parse(this.props.location.search.slice(1));

    const acceptedProfile = this.props.recommendations.items.filter(item => item.recommendation.action === 'yes');

    if (acceptedProfile.length > 0 && !this.props.profiles.self.flags.isPremium) {
      const { nexturl } = this.getNextLink();
      return (
        <div>
          <s.likeprofilewrapper>
            {this.renderProfileThumb(acceptedProfile[0])}
            <s.likeprofiletext>
              You liked{' '}
              <s.TermsLink to={`/profile/daily-recommendations?profileid=${acceptedProfile[0].uid}&from=ty`}>{`${
                acceptedProfile[0].name
              } `}</s.TermsLink>
              {acceptedProfile.length > 1 && `and ${acceptedProfile.length - 1}`}{' '}
              {acceptedProfile.length > 1 && acceptedProfile.length > 2 ? 'others' : acceptedProfile.length > 1 ? 'other Member' : ''}
            </s.likeprofiletext>
          </s.likeprofilewrapper>
          {queryParams.from && queryParams.from !== 'menu' && this.startTicking(nexturl)}
          <UpgradeBanner wwwBaseUrl={this.props.wwwBaseUrl} source="daily10_thankyou_page" />
        </div>
      );
    }

    return (
      <s.dayilyRecommendationWrapper>
        <s.thankyouwrapper>
          <s.thankyouleft />
          <s.thankyouright>
            <s.thankyoutitle>
              <s.quoteleft />
              {`You've reviewed today's recommendations!`}
              <s.quoteright />
            </s.thankyoutitle>

            <s.listingwrapper>
              {this.props.recommendations.items.slice(0, 4).map(item => this.renderProfileThumb(item))}
              <s.plussign>+</s.plussign>
              {this.props.recommendations.items.length > 4 && (
                <s.thumbwrapper to={`/profile/daily-recommendations?profileid=${this.props.recommendations.items[4].uid}&from=ty`}>
                  <s.nomoretextwrapper>
                    <span>{this.props.recommendations.items.length - 4}</span>
                    <br />
                    more
                  </s.nomoretextwrapper>
                </s.thumbwrapper>
              )}
            </s.listingwrapper>

            <s.backtolink>
              Changed your mind?{' '}
              <s.SearchLink to={`/profile/daily-recommendations?profileid=${this.props.recommendations.items[0].uid}&from=ty`}>
                {' '}
                Go back to your Recommendations
              </s.SearchLink>
            </s.backtolink>
          </s.thankyouright>
        </s.thankyouwrapper>

        <s.thankyouBotMsg>
          <p>New recommendations will be available tomorrow..</p>
          {this.renderNextLink()}
        </s.thankyouBotMsg>
      </s.dayilyRecommendationWrapper>
    );
  }

  renderDrQueue() {
    return (
      <s.DrHolder>
        <s.DrTextWrap>
          <s.DrIcon />
          <s.DrQuoteLeft />
          <s.DrText>
            {`Hi, here are today's recommendations!`}
            <s.DrQuoteRight />
          </s.DrText>
        </s.DrTextWrap>
        <DrQueue
          queue={this.props.recommendations.items}
          disablePros={this.props.recommendations.disablePros}
          profiles={this.props.profiles}
          defaultProfileId={this.props.item.uid}
          evt_ref={evtRef}
        />
      </s.DrHolder>
    );
  }

  renderDrQueueRevamp(showFlag) {
    const target_time = this.props.recommendations.target_time;
    const { pagination } = this.props;
    return (
      <s.DrHolder profilePageBucket="B">
        <s.DrTextWrap profilePageBucket="B">
          <s.DrText profilePageBucket="B">{`Here are Today's top Matches! Click Yes or No to see your next Match`}</s.DrText>
        </s.DrTextWrap>
        <s.ProfileNameTimeLeftWrapper profilePageBucket="B">
          <s.ProfileNameTimeLeftSection profilePageBucket="B">
            {!pagination.isVisible &&
              !pagination.loading &&
              showFlag &&
              target_time > 0 && <RecommendationTicker target_time={target_time} profilePageBucket="B" />}
          </s.ProfileNameTimeLeftSection>
          <DrQueue
            queue={this.props.recommendations.items}
            disablePros={this.props.recommendations.disablePros}
            profiles={this.props.profiles}
            defaultProfileId={this.props.item.uid}
            evt_ref={evtRef}
            profilePageBucket="B"
          />
        </s.ProfileNameTimeLeftWrapper>
      </s.DrHolder>
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
      message = 'This member has deleted the Profile.';
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
          title={'Daily Recommendations'}
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
    const profile = this.props.profiles[this.props.item.uid] || this.props.profiles.default;
    const { self } = this.props.profiles;

    const queryParams = parse(this.props.location.search.slice(1));

    if (!this.props.item.uid) {
      if (queryParams && ['menu', 'lastprofile'].includes(queryParams.from) && !this.props.item.loading) {
        return (
          <s.ProfilePage
            topSpace={this.props.topSpace}
            windowWidth={this.props.windowWidth}
            isChatOpen={this.props.isChatOpen}
            from={queryParams.from}
            profilePageBucket={profilePageBucket}
          >
            {queryParams.from === 'menu' ? this.renderProfileLoading() : this.renderLastPage()}
          </s.ProfilePage>
        );
      }

      if (this.state.moveToNextPageFlag || (queryParams && queryParams.loc === 'top-nav')) {
        this.moveToNextPage();
      }
      return this.renderProfileLoading();
    }

    if (this.props.item.flash) {
      return this.renderFlash();
    }
    const showTimer = profile.uid === this.props.recommendations.defaultProfileId;
    const { detailed } = profile;
    return (
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
          {['B', 'C'].includes(profilePageBucket) ? this.renderDrQueueRevamp(showTimer) : this.renderDrQueue()}
          <ProfileNameSection
            isDR
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
            timeLeftToConnect={this.props.recommendations.target_time}
            automove={this.props.recommendations.automove}
            defaultProfileId={this.props.recommendations.defaultProfileId}
            onBlockClick={this.onBlock}
            onMisuseClick={this.onMisuse}
            profilePageBucket={profilePageBucket}
            daTracking={this.daTracking}
          />
          <s.Content>
            <s.LeftSection profilePageBucket={profilePageBucket}>
              <TrustBadge
                isDR
                flags={profile.flags}
                items={profile.detailed.trustBadges}
                onAction={this.onAction}
                onBlockClick={this.onBlock}
                onMisuseClick={this.onMisuse}
                himHer={profile.himHer}
                verification={profile.verification}
                profilePageBucket={profilePageBucket}
              />
            </s.LeftSection>
            <s.RightSection>
              {profilePageBucket === 'A' && (
                <ProfileBasicInfo
                  items={detailed.infoMap}
                  interestsUrl="/my-shaadi/profile/hobbies"
                  commonInterests={detailed.commonInterests}
                />
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
                profileContactCard={'B'}
              />
              <s.ProfileQueueWrap>
                <s.BackToTopLink onClick={() => window.scrollTo(0, 0)}>Back to Top</s.BackToTopLink>
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
      </div>
    );
  }
}

DailyRecommendationsPage.propTypes = {
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
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.searchSettings).isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,
  membership: PropTypes.string.isRequired,

  onProfileInit: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  doDaTracking: PropTypes.func.isRequired,
  topSpace: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  gamification: PropTypes.shape({
    flash: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  recommendations: PropTypes.shape({
    defaultProfileId: PropTypes.string,
    target_time: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
    disablePros: PropTypes.arrayOf(PropTypes.string).isRequired,
    automove: PropTypes.bool.isRequired,
  }).isRequired,
  nav: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const selector = (state, { location }) => {
  const { profilePage, dailyRecommendationPage, chat, successStories, profiles, session, view, nav } = state;
  const { wwwBaseUrl } = state.config.app;
  const { item, gamification } = profilePage;
  const { recommendations, pagination } = dailyRecommendationPage;
  return {
    isLoggedOut: session.isLoggedOut,
    item,
    pagination,
    isChatOpen: chat.settings.isOpen,
    successStories,
    gamification,
    profiles,
    location,
    wwwBaseUrl,
    topSpace: view.topSpace,
    windowWidth: view.width,
    settings: session.settings,
    shortlistItems: session.shortlists.items,
    membership: session.membership || '',
    recommendations,
    nav,
  };
};

export default withRouter(
  connect(selector, {
    onProfileInit,
    doProfileAction,
    doDaTracking,
  })(DailyRecommendationsPage),
);
