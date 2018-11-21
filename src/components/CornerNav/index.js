/* eslint jsx-a11y/img-has-alt: 0 */
import React from 'react';
import cookie from 'cookie';
import PropTypes from '../../PropTypes';
import { createCookie } from './../../api/helpers';
import HelpDropdown from './HelpDropdown';
import AccountDropdown from './AccountDropdown';
import PremiumDropdown from './PremiumDropdown';
import s from './styles';

class CornerNav extends React.PureComponent {
  constructor(props) {
    super(props);

    this.onPremiumVisibility = () => this.props.onAction('dropdownClick', null, 'premium', this.props.activeDropdown === 'premium');
    this.onHelpVisibility = () => this.props.onAction('dropdownClick', null, 'help', this.props.activeDropdown === 'help');
    this.onAccountVisibility = () => this.props.onAction('dropdownClick', null, 'account', this.props.activeDropdown === 'account');
    this.state = {
      showRipple: false,
    };
  }

  componentDidMount() {
    this.manageRippleIconState();
  }

  manageRippleIconState() {
    const cookies = cookie.parse(document.cookie);
    const rippleUpgradeShown = cookies.rippleUpgradeShown || false;
    if (!rippleUpgradeShown) {
      createCookie('rippleUpgradeShown', true, 60 * 60 * 24);
      this.setState({ showRipple: true });
    }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <div style={{ width: 200 }} />;
    }
    const cookies = cookie.parse(document.cookie);
    const memberAccType = cookies.memberAccType;
    const upgradeType = memberAccType === 'PAID' ? 'extend' : memberAccType === 'RENEW' ? memberAccType : this.props.membership.upgradeType;
    const wasPaidUser = memberAccType === 'RENEW' || this.props.membership.wasPaidUser;
    const showUpgradeBtn = this.props.membership.accountType === 'FREE' && memberAccType !== 'PAID';
    const showPremiumDropdown = memberAccType === 'PAID' || this.props.membership.accountType === 'PAID';
    return (
      <s.CornerNav accountType={this.props.membership.accountType}>
        {showUpgradeBtn && (
          <s.UpgradeLink
            renewButton={wasPaidUser}
            isVisible={showUpgradeBtn}
            to={this.props.membership.headerUpgradeLink}
            isExternal
            target={'_blank'}
          >
            <s.CrownIcon renewButton={wasPaidUser} showRipple={this.state.showRipple} /> {wasPaidUser ? 'Renew Premium' : 'Upgrade Now'}
          </s.UpgradeLink>
        )}
        {showPremiumDropdown && (
          <PremiumDropdown
            isVisible
            isOpen={this.props.activeDropdown === 'premium'}
            upgradeLink={this.props.membership.headerUpgradeLink}
            plan={this.props.membership.plan}
            planExpiryDate={this.props.membership.planExpiryDate}
            daysToExpiry={this.props.membership.planDaysToExpiry}
            callSmsViewed={this.props.membership.callSmsViewed}
            callSmsBalance={this.props.membership.callSmsBalance}
            services={this.props.membership.services}
            onVisibilityChange={this.onPremiumVisibility}
            upgradeType={upgradeType}
            showRipple={this.state.showRipple}
            wasPaidUser={wasPaidUser}
          />
        )}
        <HelpDropdown isOpen={this.props.activeDropdown === 'help'} onVisibilityChange={this.onHelpVisibility} />
        <AccountDropdown
          accountType={this.props.membership.accountType}
          plan={this.props.membership.plan}
          expiryDate={this.props.membership.planExpiryDate}
          thumbnail={this.props.userThumbnail}
          settings={this.props.settings}
          onAction={this.props.onAction}
          isOpen={this.props.activeDropdown === 'account'}
          onVisibilityChange={this.onAccountVisibility}
          daysToExpiry={this.props.membership.planDaysToExpiry}
          upgradeType={this.props.membership.upgradeType}
        />
      </s.CornerNav>
    );
  }
}

CornerNav.defaultProps = {
  isBottomBarVisible: true,
};

const imgPropTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
};

const membershipProptypes = {
  accountType: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  headerUpgradeLink: PropTypes.string.isRequired,
};

CornerNav.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  activeDropdown: PropTypes.oneOf(['help', 'premium', 'account', 'none']).isRequired,
  userThumbnail: PropTypes.shape({ img: PropTypes.shape(imgPropTypes) }).isRequired,
  membership: PropTypes.shape(membershipProptypes).isRequired,
  onAction: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    hasUploadedPhoto: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CornerNav;
