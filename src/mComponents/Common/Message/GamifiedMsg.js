import React from 'react';
import PropTypes from 'prop-types';
import { MsgContainer, Icon, Anchor } from './styles';

const GamifiedMsg = props => (
  <MsgContainer>
    <Icon type="bothPartyPay" />
    <Icon type="lock" />
    <Anchor isExternal to="www.shaadi.com">
      {props.senderName}
    </Anchor>{' '}
    has sent you a message. In the interest of our Premium Members, we allow only Premium or Verified users to read messages.
    <MsgContainer type="divider" />
    <Anchor type="upgradeText" isExternal to="www.shaadi.com">
      <Anchor isExternal to="/payment" type="upgradeLink">
        Upgrade Now
      </Anchor>{' '}
      Or{' '}
      <Anchor type="upgradeLink" src="arrow" isExternal to="https://www.facebook.com">
        Get Facebook Verified
      </Anchor>
    </Anchor>
  </MsgContainer>
);

GamifiedMsg.propTypes = {
  senderName: PropTypes.string.isRequired,
};
export default GamifiedMsg;
