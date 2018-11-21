import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

const PremiumDropdown = props => {
  if (props.isVisible) {
    return (
      <s.DropdownWrapper>
        <s.DropdownLink
          onClick={e => {
            e.stopPropagation();
            props.onVisibilityChange('premium');
          }}
          isActive={props.isOpen}
          title={`My Plan: ${props.plan}`}
        >
          <ss.CrownIcon
            renewButton={props.wasPaidUser}
            showRipple={props.showRipple && props.upgradeType !== 'extend'}
            upgradeType={props.upgradeType}
          />
          {props.upgradeType === 'RENEW' && 'Renew '}Premium<s.DropdownArrowIcon />
        </s.DropdownLink>
        <s.PremiumDropdown isVisible={props.isOpen}>
          <s.Details isVisible>
            <s.PlanTitle>{props.plan}</s.PlanTitle>
            <s.Desc>
              Expiry:
              <s.Value> {props.planExpiryDate}</s.Value>
            </s.Desc>
          </s.Details>
          <s.Details isVisible>
            <s.Title>Call / SMS Balance</s.Title>
            <s.Desc>
              Viewed
              <s.Value> {props.callSmsViewed} </s.Value>
              | Balance
              <s.Value> {props.callSmsBalance}</s.Value>
            </s.Desc>
          </s.Details>
          {props.services.length !== 0 && (
            <s.Details isVisible>
              <s.Title>Other Services</s.Title>
              {props.services.map(service => (
                <s.Desc key={service.name}>
                  {service.name} (Expiry:
                  <s.Value> {props.planExpiryDate}</s.Value>
                  )
                </s.Desc>
              ))}
            </s.Details>
          )}
          {props.upgradeType === 'RENEW' ? (
            <s.ExtendBrownLink target="_blank" isExternal to={props.upgradeLink} className="pure-button pure-button-primary">
              <s.ButtonCrown />
              Renew premium
            </s.ExtendBrownLink>
          ) : (
            <s.ExtendLink target="_blank" isExternal to={props.upgradeLink} className="pure-button pure-button-primary">
              {props.upgradeType && props.upgradeType} Membership
            </s.ExtendLink>
          )}
        </s.PremiumDropdown>
      </s.DropdownWrapper>
    );
  }
  return <div />;
};

PremiumDropdown.defaultProps = {
  services: [],
  isVisible: false,
  callSmsViewed: 0,
  showRipple: false,
};

const servicePropTypes = {
  name: PropTypes.string.isRequired,
};

PremiumDropdown.propTypes = {
  plan: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  planExpiryDate: PropTypes.string.isRequired,
  callSmsViewed: PropTypes.number,
  callSmsBalance: PropTypes.number.isRequired,
  upgradeLink: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(PropTypes.shape(servicePropTypes)),
  isVisible: PropTypes.bool,
  onVisibilityChange: PropTypes.func.isRequired,
  upgradeType: PropTypes.string.isRequired,
  showRipple: PropTypes.bool,
  wasPaidUser: PropTypes.bool.isRequired,
};

export default PremiumDropdown;
