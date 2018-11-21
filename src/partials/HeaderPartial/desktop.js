/* eslint react/require-default-props: 0 */
import React from 'react';
import { connect } from 'react-redux';
import EventListener from 'react-event-listener';

import PropTypes from '../../PropTypes';
import doHeaderAction from '../../actions/doHeaderAction';
import onDocumentClick from '../../actions/onDocumentClick';

import Header from '../../components/Header';
import CornerNav from '../../components/CornerNav';
import { isNotPaymentPage } from '../../components/Common/CarouselPageUtils';

class HeaderPartial extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onAction = this.onAction.bind(this);
  }

  componentDidMount() {
    if (isNotPaymentPage) {
      this.props.doHeaderAction('header', 'fetchHeaderBadge');
      this.props.doHeaderAction('header', 'fetchFourHourTicker');
    }
  }

  onAction(...args) {
    this.props.doHeaderAction('header', ...args);
  }

  render() {
    return (
      <div>
        <EventListener target="document" onClick={this.props.onDocumentClick} />
        <Header
          isLoggedIn={this.props.isLoggedIn}
          isLoggedOut={this.props.isLoggedOut}
          isChatOpen={this.props.isChatOpen}
          isProfileCardDisplay={this.props.isProfileCardDisplay}
          isBottomBarVisible={this.props.isBottomBarVisible}
          isFacetTitleFixed={this.props.isFacetTitleFixed}
          isFacetOffScreen={this.props.isFacetOffScreen}
          windowWidth={this.props.windowWidth}
          fourHourTicker={this.props.fourHourTicker}
          logo={this.props.logo}
          activeDropdown={this.props.activeDropdown}
          thumbnail={this.props.thumbnail}
          settings={this.props.settings}
          scrollVal={this.props.scrollVal}
          headerBadge={this.props.headerBadge}
          activeIndex={this.props.activeIndex}
          topNavItems={this.props.topNavItems}
          bottomNavItems={this.props.bottomNavItems}
          membership={this.props.membership}
          membershipLevel={this.props.membershipLevel}
          onAction={this.onAction}
          activeTopNavItem={this.props.topNavItems[this.props.activeIndex].key}
        >
          <CornerNav
            userThumbnail={this.props.thumbnail}
            membership={this.props.membership}
            membershipLevel={this.props.membershipLevel}
            isChatOpen={this.props.isChatOpen}
            windowWidth={this.props.windowWidth}
            activeDropdown={this.props.activeDropdown}
            settings={this.props.settings}
            isBottomBarVisible={this.props.isBottomBarVisible}
            onAction={this.onAction}
            isLoggedIn={this.props.isLoggedIn}
          />
        </Header>
      </div>
    );
  }
}

HeaderPartial.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isBottomBarVisible: PropTypes.bool.isRequired,
  isFacetTitleFixed: PropTypes.bool.isRequired,
  isFacetOffScreen: PropTypes.bool.isRequired,
  isProfileCardDisplay: PropTypes.bool.isRequired,

  logo: Header.propTypes.logo,
  thumbnail: Header.propTypes.thumbnail,
  headerBadge: Header.propTypes.headerBadge,
  activeIndex: PropTypes.number.isRequired,
  topNavItems: Header.propTypes.topNavItems,
  bottomNavItems: Header.propTypes.bottomNavItems,
  membership: Header.propTypes.membership,
  membershipLevel: Header.propTypes.membershipLevel,
  fourHourTicker: Header.propTypes.fourHourTicker,

  settings: PropTypes.shape({
    hasUploadedPhoto: PropTypes.bool.isRequired,
  }).isRequired,
  activeDropdown: PropTypes.oneOf(['help', 'premium', 'account', 'none']).isRequired,

  doHeaderAction: PropTypes.func.isRequired,
  onDocumentClick: PropTypes.func.isRequired,
  scrollVal: PropTypes.number.isRequired,
};

const selector = state => {
  const { header, nav, chat, profiles, session, view } = state;
  let activeIndex = -1;
  for (let i = 0; i < nav.length; i += 1) {
    if (nav[i].isActive) {
      activeIndex = i;
      break;
    }
  }
  activeIndex = activeIndex < 0 ? 1 : activeIndex;
  const bottom = nav[activeIndex].nav;
  return {
    settings: session.settings,
    isLoggedIn: session.isLoggedIn,
    isLoggedOut: session.isLoggedOut,
    isChatOpen: chat.settings.isOpen,
    isProfileCardDisplay: chat.settings.profileCardDisplay,
    windowWidth: view.width,
    isBottomBarVisible: view.isHeaderBarVisible,
    isFacetTitleFixed: view.isFacetTitleFixed,
    isFacetOffScreen: view.isFacetOffScreen,
    scrollVal: view.scroll,

    logo: header.logo,
    thumbnail: header.thumbnail,
    headerBadge: header.headerBadge,
    activeDropdown: header.activeDropdown,
    activeIndex,
    topNavItems: nav,
    bottomNavItems: bottom,
    membership: header.membership,
    membershipLevel: profiles.self.flags.membershipLevel,
    fourHourTicker: header.fourHourTicker,
  };
};

export default connect(state => selector(state), {
  doHeaderAction,
  onDocumentClick,
})(HeaderPartial);
