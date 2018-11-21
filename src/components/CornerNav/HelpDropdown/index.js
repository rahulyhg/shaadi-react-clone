import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'cookie';
import s from './styles';

const hasABPremiumSupport = () => {
  const cookies = cookie.parse(document.cookie);
  const premiumSupportAb = cookies.premium_support_ab;
  return !['b'].includes(premiumSupportAb);
};

class HelpDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onToggleDropdown = this.onToggleDropdown.bind(this);
  }

  onToggleDropdown(e) {
    e.stopPropagation();
    this.props.onVisibilityChange('help');
  }

  render() {
    return (
      <s.DropdownWrapper isPaymentPage={this.props.isPaymentPage}>
        <s.DropdownLink isPaymentPage={this.props.isPaymentPage} onClick={e => this.onToggleDropdown(e)} isActive={this.props.isOpen}>
          Help
          <s.DropdownArrowIcon isPaymentPage={this.props.isPaymentPage} />
        </s.DropdownLink>
        <s.HelpDropdown isVisible={this.props.isOpen} isPaymentPage={this.props.isPaymentPage}>
          <s.Details>
            {hasABPremiumSupport() && <s.Number isPaymentPage={this.props.isPaymentPage}>India -1860 200 3456</s.Number>}
            <s.RegionalOfficeLabel>
              For regional offices&nbsp;<s.RegionalOfficeLink
                isExternal
                to="/shaadi-info/index/contact-us"
                rel="noopener noreferrer"
                target="_blank"
              >
                click here
              </s.RegionalOfficeLink>
            </s.RegionalOfficeLabel>
            <s.Timings>We are available between 10 am to 7pm. </s.Timings>
            <s.Help isPaymentPage={this.props.isPaymentPage} extraPadding={!hasABPremiumSupport() ? '26px 0 0' : '18px 0 0'}>
              {!hasABPremiumSupport() ? 'Need help' : 'To get instant help'} &nbsp;
              <s.HelpLink isExternal to="/customer-relations/faq/call?hlp=emVuZGhlbHA%3D" rel="noopener noreferrer" target="_blank">
                click here
              </s.HelpLink>
            </s.Help>
          </s.Details>
          <s.Nav>
            <s.Link
              isPaymentPage={this.props.isPaymentPage}
              isExternal
              to="/customer-relations/faq/call?hlp=emVuZGhlbHA%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              Help Desk
            </s.Link>
            <s.Link
              isPaymentPage={this.props.isPaymentPage}
              isExternal
              to="/customer-relations/faq/call"
              target="_blank"
              rel="noopener noreferrer"
            >
              My Requests
            </s.Link>
            <s.Link
              isPaymentPage={this.props.isPaymentPage}
              isExternal
              to="/customer-relations/faq/privacy-tips"
              target="_blank"
              rel="noopener noreferrer"
            >
              Be Safe Online
            </s.Link>
            <s.Link isPaymentPage={this.props.isPaymentPage} isExternal to="/my-shaadi?evt=c3RvdXI%3D">
              Quick Tour
            </s.Link>
          </s.Nav>
        </s.HelpDropdown>
      </s.DropdownWrapper>
    );
  }
}

HelpDropdown.defaultProps = {
  isPaymentPage: false,
};

HelpDropdown.propTypes = {
  onVisibilityChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isPaymentPage: PropTypes.bool,
};

export default HelpDropdown;
