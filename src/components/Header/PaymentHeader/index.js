/* eslint jsx-a11y/img-has-alt: 0 */
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import PropTypes from '../../../PropTypes';
import PaymentHelpDropdown from '../PaymentHelpDropdown';
import guard from '../../../actions/lib/guard';
import s from './styles';
import HelpDropdown from '../../CornerNav/HelpDropdown';
import { isCarouselProfilePage, getReferrerUrl } from '../../Common/CarouselPageUtils';

const communityDomain = guard.myDomain.replace(/shaadi|com|\.in|[.]/g, '') || '';
const logoPath = `${'https://img2.shaadi.com/imgs/logos/payment/'}${!communityDomain ? 'payment-shaadi-logo' : communityDomain}${
  communityDomain === 'nri-' ? '4.png' : '.png'
}`;
const personalisedBtnCLick = () => {
  document.getElementById('panel').classList.add('display_on');
  document.getElementById('view_plans_accordion').classList.add('display_off');
};
class PaymentHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onHelpVisibility = () => this.props.onAction('dropdownClick', null, 'help', this.props.activeDropdown === 'help');
  }
  render() {
    const isRevampPage = !!(window.location.pathname === '/payment' && this.props.paymentPageAB === 'B');
    return (
      <s.PaymentHeader
        scrollVal={this.props.scrollVal > 0}
        id="payment_header"
        paymentPageAB={this.props.paymentPageAB}
        isPaymentPage={window.location.pathname === '/payment'}
      >
        <s.MainHeader isRevampPage={isRevampPage} isProfilePage={isCarouselProfilePage}>
          <s.LogoWrapper isProfilePage={isCarouselProfilePage}>
            {isCarouselProfilePage && (
              <s.BackToMatches>
                <s.MatchesLink to={getReferrerUrl} isExternal>
                  <s.BackArrow />Back to My Matches
                </s.MatchesLink>
              </s.BackToMatches>
            )}
            <s.LogoLink to={`/my-shaadi`} isExternal target="_blank" rel="noreferrer noopener">
              <img src={logoPath} alt={this.props.alt} />
              {isRevampPage && <s.PremiumText>PREMIUM</s.PremiumText>}
            </s.LogoLink>
          </s.LogoWrapper>
          {isRevampPage &&
            window.pageYOffset < 350 && (
              <React.Fragment>
                <AnchorLink href="#personalised_plans">
                  <s.PersonalisedButton data-test-selector="personalised_button" onClick={() => personalisedBtnCLick()} />
                </AnchorLink>
                <s.SpacerTen />
              </React.Fragment>
            )}
          {['/cart', '/payment/thankyou'].includes(window.location.pathname) && <PaymentHelpDropdown />}
          {['/payment', '/compare-plans'].includes(window.location.pathname) && (
            <HelpDropdown isOpen={this.props.activeDropdown === 'help'} onVisibilityChange={this.onHelpVisibility} isPaymentPage />
          )}
        </s.MainHeader>
      </s.PaymentHeader>
    );
  }
}
PaymentHeader.defaultProps = {
  scrollVal: 0,
  activeDropdown: 'help',
  onAction: () => null,
};
PaymentHeader.propTypes = {
  alt: PropTypes.string.isRequired,
  scrollVal: PropTypes.number.isRequired,
  activeDropdown: PropTypes.oneOf(['help', 'premium', 'account', 'none']).isRequired,
  onAction: PropTypes.func.isRequired,
  paymentPageAB: PropTypes.string.isRequired,
};

export default PaymentHeader;
