import React from 'react';
import * as Animated from 'animated/lib/targets/react-dom';
import Typography from '@material-ui/core/Typography';
import raf from 'raf';
import HorizontalSwipe from '../HorizontalSwipe';
import ProfileMobile from '../ProfileMobile';
import PropTypes from '../../PropTypes';
import BottomEoiBar from '../BottomEoiBar';
import AppBar from '../AppBar';
import EoiMobileDropdown from '../EoiMobile/dropdown';
import ProfileAlert from '../ProfileAlert';
import ProfileFlash from '../ProfileFlash';
import PhotoNavigation from '../../mComponents/Common/PhotoNavigation';

const logger = (debugLevel, prefix) => {
  const info = level => (...args) => {
    if (debugLevel <= level) return;
    console.log(`${prefix}<${level}>`, ...args);
  };
  const ret = level => (retVal, ...args) => {
    info(level)(...args);
    return retVal;
  };
  return {
    info: info(0),
    info1: info(1),
    info2: info(2),
    info3: info(3),
    info4: info(4),
    info5: info(5),
    ret: ret(0),
    ret1: ret(1),
    ret2: ret(2),
    ret3: ret(3),
    ret4: ret(4),
    ret5: ret(5),
  };
};
const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

class ProfileCollection extends React.Component {
  // eslint-disable-next-line react/sort-comp
  debugLevel = 0;
  log = logger(this.debugLevel, '<ProfileCollection>');

  topAnim = new Animated.Value(0);
  bottomAnim = new Animated.Value(0);
  topTarget = 0;
  bottomTarget = 0;
  scrollRefs = (this.props.uids || []).map(() => null);

  target = {
    uid: this.props.uid || null,
    card: (this.props.uids || []).indexOf(this.props.uid),
    w: Math.min(this.props.windowWidth || 0, 720),
    minCard: -0.5,
    maxCard: 0.5 + (this.props.uids || []).length - 1,
  };

  anim = {
    card: new Animated.Value(this.target.card),
    w: new Animated.Value(this.target.w),
  };
  componentDidMount() {
    this.log.info('componentDidMount');
    document.body.style.overflowX = 'hidden';
    document.documentElement.scrollTop = 0;
    raf(this.resetScroll);
  }

  componentWillReceiveProps(props) {
    this.log.info('componentWillReceiveProps');
    const card = props.uids.indexOf(props.uid);
    if (this.props.uids.length !== props.uids.length || props.uids.filter(id => !this.props.uids.includes(id)).length !== 0) {
      this.target.uid = props.uid;
      this.target.card = card;
      this.target.maxCard = 0.5 + props.uids.length - 1;
      this.anim.card.setValue(this.target.card);
      this.scrollRefs = props.uids.map(() => null);
      this.log.info(`uids changed`);
    } else if (this.props.uid !== props.uid) {
      this.log.info(`card changed from ${this.target.card} to ${card}`);
      this.target.card < 0 ? this.anim.card.setValue(card) : Animated.timing(this.anim.card, { toValue: card, duration: 350 }).start();
      this.target.uid = props.uid;
      this.target.card = card;
      raf(this.resetScroll);
    }
    const w = Math.min(props.windowWidth, 720);
    if (w !== this.target.w || props.screenOrientation !== this.props.screenOrientation) {
      this.anim.w.setValue(w);
      this.target.w = w;
    }
  }

  isProfileEqual = (oldProps, newProps, i) => {
    const oldProfile = oldProps.profiles[(oldProps.uids || [])[i]];
    const newProfile = newProps.profiles[(newProps.uids || [])[i]];
    return oldProfile === newProfile;
  };

  shouldComponentUpdate(nextProps) {
    const keys = Object.keys(nextProps).filter(k => k !== 'profiles');
    const changedProps = keys.filter(k => nextProps[k] !== this.props[k]);
    if (changedProps.length > 0) return this.log.ret2(true, 'props changed', changedProps);
    const changedProfiles = nextProps.uids.filter(uid => nextProps.profiles[uid] !== this.props.profiles[uid]);
    if (changedProfiles.length > 0) return this.log.ret2(true, 'profiles changed', changedProfiles);
    return this.log.ret2(false, '(canceling update)');
  }

  componentWillUnmount() {
    document.body.style.overflowX = 'auto';
    this.log.info('componentWillUnmount');
  }

  onAction = (type, ...args) => {
    this.props.doMProfileAction('profile', this.target.uid, type, ...args);
  };

  onCardChange = card => {
    if (card === this.target.card) return this.log.info('Swipe cancelled');
    this.target.card = card;
    this.target.uid = this.props.uids[this.target.card];

    raf(this.loadStableCard);

    this.scrollPosition = 0;
    // raf(() => this.forceUpdate());
    raf(this.resetScroll);
    return this.log.info('Card swiped to ', card);
  };

  loadStableCard = () => {
    let delay = 2000;
    if (this.target.card === 0 || this.target.card === Math.floor(this.target.maxCard)) delay = 250;

    this.props.loadProfile(this.target.uid, delay);
  };

  scrollPosition = 0;
  scrollUpdating = false;

  onScrollChange = event => {
    let updateScroll = true;
    if (event.target.scrollTop <= 0 || event.target.scrollTop > event.target.scrollHeight - event.target.offsetHeight) {
      event.preventDefault();
      updateScroll = false;
    }
    if (updateScroll) {
      if (this.scrollPosition > event.target.scrollTop) {
        this.props.updateHeader(1, false);
      } else {
        this.props.updateHeader(window.screenY + 50, true);
      }
    }
    this.scrollPosition = event.target.scrollTop;
    if (this.scrollUpdating) return;
    this.scrollUpdating = true;
    raf(this.onScrollFrame);
  };

  onScrollFrame = () => {
    const topTarget = clamp(this.scrollPosition / 450, 0, 1);
    const bottomTarget = this.scrollPosition < 420 ? 0 : 1;
    this.log.info4('scroll', this.scrollPosition, topTarget, bottomTarget);
    if (topTarget !== this.topTarget) this.topAnim.setValue(topTarget);
    if (bottomTarget !== this.bottomTarget) Animated.spring(this.bottomAnim, { toValue: bottomTarget }).start();
    this.topTarget = topTarget;
    this.bottomTarget = bottomTarget;
    this.scrollUpdating = false;
  };

  resetScroll = () => {
    this.scrollPosition = this.scrollRefs[this.target.card] ? this.scrollRefs[this.target.card].scrollTop : 0;
    raf(() => raf(this.onScrollFrame));
  };

  actions = {
    onCardChange: this.onCardChange,
  };

  horizontalSwipe = new HorizontalSwipe(this.anim, this.target, this.actions);

  SLIDE_DURATION = 350;
  moveToNextCard = () => this.horizontalSwipe.gesture('swipe-left', { duration: this.SLIDE_DURATION });
  moveToPrevCard = () => this.horizontalSwipe.gesture('swipe-right', { duration: this.SLIDE_DURATION });

  renderLoading = () => {
    this.log.info1(`RENDER-LOADING ${this.target.card} ${this.target.uid}`, this.props.loading, this.props.uids.indexOf(this.props.uid));
    return (
      <div className="profile-collection-loading" style={styles.collection}>
        <div key="loading">
          <div
            className="profile-page-single"
            style={{
              maxWidth: `${this.target.w}px`,
              margin: 'auto',
              marginTop: '0px',
            }}
          >
            <ProfileMobile
              key={'default'}
              uid={'default'}
              wwwBaseUrl={this.props.wwwBaseUrl}
              upgradeLink={''}
              profile={this.props.profiles.default}
              isPaidUser={this.props.isPaidUser}
              self={this.props.profiles.self}
              justNow={this.props.justNow}
              justNowText={this.props.justNowText}
              onAction={this.onAction}
              gaEventActionLabel={this.props.gaEventActionLabel}
            />
          </div>
        </div>
      </div>
    );
  };

  renderError = msg => (
    <div className="profile-collection-loading" style={styles.collection}>
      <div key="loading">
        <p>{msg}</p>
      </div>
    </div>
  );

  renderTop = () => {
    const profile = this.props.profiles[this.target.uid];
    if (!profile || !profile.flags || !profile.flags.connectionStatus) return null;
    if (profile.flags.connectionStatus === 'unknown') return null;
    const renderActions =
      profile.flags.connectionStatus !== 'theyDeclined' &&
      (handleClose => (
        <EoiMobileDropdown
          shortlists={profile.shortlists}
          connectionStatus={profile.flags.connectionStatus}
          shortlistItems={this.props.shortlistItems || []}
          onAction={this.onAction}
          handleClose={handleClose}
        />
      ));
    return (
      <div
        style={{
          position: 'fixed',
          top: `${this.props.navHidden ? '0px' : '44px'}`,
          zIndex: 3000,
          width: '100%',
          transition: 'top .3s linear',
        }}
      >
        <AppBar onBack={this.props.onBack} renderActions={renderActions}>
          <Animated.div style={{ flex: 1 }}>
            <Animated.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgb(252, 91, 99)',
                willChange: 'opacity',
                opacity: this.topAnim,
              }}
            />
            <Animated.div style={{ willChange: 'opacity', opacity: this.bottomAnim }}>
              <Typography variant="title" color="inherit" style={{ fontWeight: 400 }}>
                {profile.name || ''}
              </Typography>
            </Animated.div>
          </Animated.div>
        </AppBar>
      </div>
    );
  };

  renderBottom = () => {
    const { tooltip, toast, isPaidUser, justNow, justNowText, memberHidden, gaEventActionLabel } = this.props;
    const profile = this.props.profiles[this.target.uid];
    if (!profile || !profile.flags || !profile.flags.connectionStatus) return null;
    if (profile.flags.connectionStatus === 'unknown') return null;
    return (
      <React.Fragment>
        {toast.message ? null : (
          <Animated.div
            style={{
              position: 'fixed',
              top: '100%',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
              transform: [
                {
                  translateY: Animated.multiply(this.bottomAnim, memberHidden ? -95 : -72),
                },
              ],
              width: '100%',
            }}
          >
            <BottomEoiBar
              onAction={this.onAction}
              isPaidUser={isPaidUser}
              profile={profile}
              justNow={justNow}
              justNowText={justNowText}
              memberHidden={memberHidden}
              gaEventActionLabel={gaEventActionLabel}
            />
          </Animated.div>
        )}
        <ProfileAlert tooltip={tooltip} onAction={this.onAction} />
      </React.Fragment>
    );
  };

  render() {
    const { uid, uids, profiles, loading, wwwBaseUrl, memberHidden } = this.props;
    const { upgradeLink, isPaidUser, justNow, justNowText, request, isFamilyGamified, flash } = this.props;
    if (loading) return this.renderLoading();
    if (!uid) return this.renderError('Profile failed to load.');
    if (uids.length === 0) return this.renderError('No profiles found.');
    if (uids.indexOf(uid) < 0) return this.renderError('Invalid search. Please try again.');
    this.log.info1(`RENDER ${this.target.card} w: ${this.target.w}`);
    return (
      <React.Fragment>
        {this.renderTop()}
        <div className="profile-collection" style={{ ...styles.collection, top: this.props.navHidden ? 0 : '47px' }}>
          <div className="collection-track" style={{ ...styles.track, width: this.target.w }}>
            <Animated.div
              className="collection-movable"
              style={{
                ...styles.movable,
                transform: [
                  {
                    translateX: Animated.multiply(Animated.multiply(this.anim.w, this.anim.card), -1),
                  },
                ],
              }}
            >
              {uids.map((profileUid, index) => (
                <div
                  key={profileUid}
                  id={`profile-card-${profileUid}`}
                  className={`collection-card-${index}`}
                  style={{
                    ...styles.card,
                    width: `${this.target.w}px`,
                  }}
                  onScroll={this.onScrollChange}
                  ref={node => (this.scrollRefs[index] = node)}
                >
                  <PhotoNavigation isVisible={profiles[profileUid] && index >= 1} type="movePrevProfile" onClick={this.moveToPrevCard} />
                  <PhotoNavigation
                    isVisible={profiles[profileUid] && index < uids.length - 1}
                    type="moveNextProfile"
                    onClick={this.moveToNextCard}
                  />

                  {flash.msg && flash.flashUid === uid && uid === profileUid ? (
                    <ProfileFlash flash={flash.msg} wwwBaseUrl={wwwBaseUrl} flashType={flash.flashType} />
                  ) : (
                    <div>
                      <ProfileMobile
                        key={profileUid}
                        uid={profileUid}
                        upgradeLink={upgradeLink}
                        profile={profiles[profileUid] || {}}
                        isPaidUser={isPaidUser}
                        self={profiles.self}
                        justNow={justNow}
                        justNowText={justNowText}
                        onAction={this.onAction}
                        request={request}
                        wwwBaseUrl={wwwBaseUrl}
                        isFamilyGamified={isFamilyGamified}
                        memberHidden={memberHidden}
                        gaEventActionLabel={this.props.gaEventActionLabel}
                      />
                    </div>
                  )}
                </div>
              ))}
            </Animated.div>
          </div>
        </div>
        {this.renderBottom()}
      </React.Fragment>
    );
  }
}

const styles = {
  track: {
    touchAction: 'none',
    height: '100%',
    overflow: 'hidden',
  },
  collection: {
    userSelect: 'none',
    position: 'fixed',
    top: '47px',
    bottom: 0,
    width: '100%',
    overflow: 'hidden',
  },
  movable: {
    height: '100%',
    whiteSpace: 'nowrap',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
  },
  card: {
    display: 'inline-block',
    height: '100%',
    touchAction: 'pan-y',
    overflowX: 'hidden',
    overflowY: 'scroll',
    backfaceVisibility: 'hidden',
    '-webkit-overflow-scrolling': 'touch',
    '-webkit-transform': 'translate3d(0,0,0)',
  },
};

ProfileCollection.defaultProps = {
  uid: null,
  uids: [],
  flash: '',
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
  navHidden: false,
};

ProfileCollection.propTypes = {
  uid: PropTypes.string,
  uids: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool.isRequired,
  screenOrientation: PropTypes.oneOf(['portrait', 'landscape']).isRequired,
  windowWidth: PropTypes.number.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.basicProfile)).isRequired,
  loadProfile: PropTypes.func.isRequired,
  upgradeLink: PropTypes.string.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string.isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tooltip: PropTypes.shape(PropTypes.alert).isRequired,
  toast: PropTypes.shape(PropTypes.toast).isRequired,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  onBack: PropTypes.func.isRequired,
  doMProfileAction: PropTypes.func.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  flash: PropTypes.string,
  isFamilyGamified: PropTypes.bool.isRequired,
  memberHidden: PropTypes.bool.isRequired,
  updateHeader: PropTypes.func.isRequired,
  navHidden: PropTypes.bool,
  gaEventActionLabel: PropTypes.string.isRequired,
};

export default ProfileCollection;
