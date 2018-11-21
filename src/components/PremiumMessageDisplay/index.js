/* eslint react/no-array-index-key: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import { maskMsg } from '../Common/Eoi/utils';
import { formatText } from '../../utils';

class PremiumMessageDisplay extends React.PureComponent {
  state = {
    showCompleteMessage: false,
  };

  renderMaskedContactDetailMessage = text => {
    const finalHybrid = [];
    let finalMsg = [];
    text.split(' ').map(item => { //eslint-disable-line
      switch (item) {
        case '#Phone_No_Hidden#':
          if (finalMsg.length !== 0) {
            finalHybrid.push({ type: 'text', text: finalMsg.join(' ') });
          }
          finalHybrid.push({
            type: 'phone',
            text: 'Phone Number Visible on Accept',
            title: "This member's contact details will be visible after you Accept the Interest",
          });
          finalMsg = [];
          break;
        case '#Email_Hidden#':
          if (finalMsg.length !== 0) {
            finalHybrid.push({ type: 'text', text: finalMsg.join(' ') });
          }
          finalHybrid.push({
            type: 'email',
            text: 'Email Id Visible on Accept',
            title: "This member's contact details will be visible after you Accept the Interest",
          });
          finalMsg = [];
          break;
        default:
          finalMsg.push(item);
          break;
      }
    });
    if (finalMsg.length !== 0) {
      finalHybrid.push({ type: 'text', text: finalMsg.join(' ') });
    }
    return finalHybrid.map(item => {
      switch (item.type) {
        case 'email':
        case 'phone':
          return <s.MaskedMessageText title={item.title}>{item.text}</s.MaskedMessageText>;

        default:
          return item.text;
      }
    });
  };

  renderMaskedMessage = () => {
    const { name: profileName = '' } = this.props.profile;
    const { connectMessages = {} } = this.props.item;
    const connectMessage = (connectMessages[0] && connectMessages[0].message) || '';
    return (
      <s.PremiumMessageWrapper isBorderDotted>
        <s.DisplayInboxIcon />
        <s.DisplayPremiumMessageWrapper>
          {formatText(
            connectMessage.replace('display_name_profile', profileName),
            profileName,
            new RegExp(/{(.*?)}/),
            <s.DisplayProfileName>{profileName}</s.DisplayProfileName>,
          )}
          <s.DisplayUpgradeLinkWrapper>
            <s.GamificationUpgradeLink
              isExternal
              to={`/payment?source=message_view&profileid=${this.props.item.contact.profileid}`}
              target="_blank"
            >
              Upgrade Now
            </s.GamificationUpgradeLink>{' '}
            or{' '}
            <s.GamificationFacebookLink target="_blank" isExternal to={'/my-shaadi/trust-badge?openfb=true'}>
              Get Facebook Verified
            </s.GamificationFacebookLink>
          </s.DisplayUpgradeLinkWrapper>
        </s.DisplayPremiumMessageWrapper>
      </s.PremiumMessageWrapper>
    );
  };

  renderContactMessage = () => {
    const { showCompleteMessage } = this.state;
    const { connectMessages = {} } = this.props.item;
    const { isPaidUser = false } = this.props.settings;
    const allowedMessageLength = 120;
    const maxAllowedMessageLength = 4000;

    const connectMessage = (connectMessages[0] && connectMessages[0].message) || '';

    let contactStatus = 'hidden';
    if (isPaidUser === true && (this.props.item.contact && this.props.item.contact.contact_details_title_status === 'show_all')) {
      contactStatus = 'visible';
    }
    let displayMessage = `${maskMsg(connectMessage, allowedMessageLength, contactStatus)}...`;

    this.state.showCompleteMessage && (displayMessage = maskMsg(connectMessage, maxAllowedMessageLength, contactStatus));
    return (
      <s.PremiumMessageWrapper>
        <s.DisplayInboxIcon />
        <s.DisplayPremiumMessage>
          &quot;{this.renderMaskedContactDetailMessage(displayMessage)}&quot;
          {!showCompleteMessage &&
            connectMessage.length > allowedMessageLength && (
              <s.ReadMoreLink
                onClick={() => {
                  this.setState({ showCompleteMessage: true });
                }}
              >
                Read More
              </s.ReadMoreLink>
            )}
        </s.DisplayPremiumMessage>
      </s.PremiumMessageWrapper>
    );
  };

  render() {
    const { connectMessages = [] } = this.props.item;
    if (!connectMessages.length) return null;
    if (connectMessages[0].hide_message) {
      return this.renderMaskedMessage();
    }
    return this.renderContactMessage();
  }
}

PremiumMessageDisplay.propTypes = {
  item: PropTypes.shape({
    connectMessages: PropTypes.arrayOf(PropTypes.shape(PropTypes.connectMessage)),
    contact: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    isBothPartyPayUser: PropTypes.bool,
    isPaidUser: PropTypes.bool,
  }).isRequired,
};

export default PremiumMessageDisplay;
