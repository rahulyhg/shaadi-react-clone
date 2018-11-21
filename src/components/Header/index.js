import React from 'react';
import TopBar from './TopBar';
import PropTypes from '../../PropTypes';
import BottomBar from './BottomBar';
import FourHourTicker from '../Common/FourHourTicker';
import PaymentHeader from './PaymentHeader';
import { isPaymentPage } from '../Common/CarouselPageUtils';
import s from './styles';

const Header = props => (
  <s.HeaderContainer profilecardDisplay={props.isProfileCardDisplay}>
    {!isPaymentPage && props.fourHourTicker.isVisible && <FourHourTicker onAction={props.onAction} ticker={props.fourHourTicker} />}
    {isPaymentPage ? (
      <PaymentHeader
        alt="Shaadi.com - World's No.1 Matrimonial &amp; Matchmaking Service"
        onAction={props.onAction}
        scrollVal={props.scrollVal}
        activeDropdown={props.activeDropdown}
        paymentPageAB={
          (props.settings.experiments && props.settings.experiments.payment_page && props.settings.experiments.payment_page.bucket) || ''
        }
      />
    ) : (
      <TopBar
        logo={props.logo}
        userThumbnail={props.thumbnail}
        headerBadge={props.headerBadge}
        activeIndex={props.activeIndex}
        navItems={props.topNavItems}
        membership={props.membership}
        membershipLevel={props.membershipLevel}
        isChatOpen={props.isChatOpen}
        windowWidth={props.windowWidth}
        activeDropdown={props.activeDropdown}
        settings={props.settings}
        isBottomBarVisible={props.isBottomBarVisible}
        onAction={props.onAction}
        isLoggedIn={props.isLoggedIn}
      >
        {props.children}
      </TopBar>
    )}
    {!isPaymentPage && (
      <BottomBar
        isVisible={props.isBottomBarVisible}
        navItems={props.bottomNavItems}
        isChatOpen={props.isChatOpen}
        isFacetTitleFixed={props.isFacetTitleFixed}
        windowWidth={props.windowWidth}
        isFacetOffScreen={props.isFacetOffScreen}
        membership={props.membership}
        activeTopNavItem={props.activeTopNavItem}
        experiments={props.settings.experiments}
        onAction={props.onAction}
      />
    )}
  </s.HeaderContainer>
);

Header.defaultProps = {
  isChatOpen: true,
  isBottomBarVisible: true,
};

const imgPropTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
};

const imagePropTypes = {
  img: PropTypes.shape(imgPropTypes).isRequired,
  url: PropTypes.string,
  isExternal: PropTypes.bool.isRequired,
};

const navItemPropTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isExternal: PropTypes.bool,
  isActive: PropTypes.bool,
  count: PropTypes.number,
};

const membershipProptypes = {
  accountType: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  headerUpgradeLink: PropTypes.string.isRequired,
};

Header.propTypes = {
  logo: PropTypes.shape(imagePropTypes).isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  isProfileCardDisplay: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isBottomBarVisible: PropTypes.bool,
  isFacetTitleFixed: PropTypes.bool.isRequired,
  thumbnail: PropTypes.shape({ img: PropTypes.shape(imgPropTypes) }).isRequired,
  fourHourTicker: PropTypes.shape(PropTypes.fourHourTicker).isRequired,
  headerBadge: PropTypes.shape({
    ...imagePropTypes,
    isVisible: PropTypes.bool.isRequired,
  }).isRequired,
  activeDropdown: PropTypes.oneOf(['help', 'premium', 'account', 'none']).isRequired,
  activeIndex: PropTypes.number.isRequired,
  topNavItems: PropTypes.arrayOf(PropTypes.shape(navItemPropTypes)).isRequired,
  bottomNavItems: PropTypes.arrayOf(PropTypes.shape(navItemPropTypes)).isRequired,
  windowWidth: PropTypes.number.isRequired,
  membership: PropTypes.shape(membershipProptypes).isRequired,
  membershipLevel: PropTypes.membershipLevel.isRequired,
  onAction: PropTypes.func.isRequired,
  isFacetOffScreen: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    hasUploadedPhoto: PropTypes.bool.isRequired,
    experiments: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  activeTopNavItem: PropTypes.string.isRequired,
  scrollVal: PropTypes.number.isRequired,
};

export default Header;
