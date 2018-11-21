import React from 'react';
import EventListener from 'react-event-listener';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import Tooltip from '../../../Common/Tooltip';
import { maskMsg } from '../utils';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
    };
    this.renderDeclined = this.renderDeclined.bind(this);
    this.renderCancelled = this.renderCancelled.bind(this);
    this.renderConnectMessage = this.renderConnectMessage.bind(this);
    this.closeReadMore = this.closeReadMore.bind(this);
    this.showReadMore = this.showReadMore.bind(this);
    this.renderEventListener = this.renderEventListener.bind(this);
    this.renderBothPartyGamification = this.renderBothPartyGamification.bind(this);
  }

  showReadMore(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isReadMoreVisible: true });
  }

  closeReadMore() {
    this.setState({ isReadMoreVisible: false });
  }

  renderTheyDeclined() {
    return (
      <div>
        <s.ContactedTitle isVisible>{this.props.heShe} Declined your Invitation</s.ContactedTitle>
        <s.Note>
          {this.props.note ||
            `You cannot contact this Member on Shaadi.com. We will notify you if ${this.props.heShe.toLowerCase()} changes ${this.props.hisHer.toLowerCase()} mind.`}
        </s.Note>
      </div>
    );
  }

  renderBothPartyGamification() {
    return (
      <s.GamifiedWrapper>
        <s.GamifiedWrapTop>
          <s.GamifiedUpgradeIcon />
          <s.GamifiedText>
            <s.GamifiedUserName>{this.props.profileName || ''}</s.GamifiedUserName> has sent you a message.&nbsp;In the interest of our
            Premium Members, we allow only Premium or Verified users to read messages.
            <s.GamificationUpgradeLink
              isExternal
              to={`/payment?source=message_view&profileid=${this.props.contact.profileid}`}
              target="_blank"
            >
              &nbsp;Upgrade Now
            </s.GamificationUpgradeLink>
            &nbsp;or&nbsp;
            <s.GamificationFacebookLink target="_blank" isExternal to={'/my-shaadi/trust-badge?openfb=true'}>
              Get Facebook Verified
            </s.GamificationFacebookLink>
          </s.GamifiedText>
        </s.GamifiedWrapTop>
        <s.GamifiedWrapBottom />
      </s.GamifiedWrapper>
    );
  }

  renderConnectMessage() {
    let contactStatus = 'hidden';
    if (this.props.isPaidUser === true && this.props.contact && this.props.contact.contact_details_title_status === 'show_all') {
      contactStatus = 'visible';
    }
    const category = this.props.connectMessages[0].category;
    const heSheYou = ['received'].includes(category) ? this.props.heShe : 'You';
    const message = this.props.connectMessages[0].message;
    if (message.length > 76) {
      const displayMessage = maskMsg(message, 73, contactStatus);
      return (
        <s.historyMessage isVisible>
          {`"${displayMessage}..."`}
          <Tooltip
            placement="bottom"
            offset={[0, -5]}
            trigger="click"
            isReadMore
            overlayClassName="readMore connectTooltip"
            onClose={this.closeReadMore}
            isVisible={this.state.isReadMoreVisible}
            tooltip={{
              body: [
                {
                  key: 'beh',
                  items: [
                    {
                      type: 'hybrid',
                      key: 'bleh',
                      text: maskMsg(message, 500, contactStatus),
                    },
                  ],
                },
              ],
              title: `${heSheYou} wrote on ${this.props.connectMessages[0].fullDate}`,
            }}
          >
            <s.RcMsgMoreLink onClick={this.showReadMore} href="#">
              Read more&nbsp; <s.RcMsgMoreLinkArrow />
            </s.RcMsgMoreLink>
          </Tooltip>
        </s.historyMessage>
      );
    }
    return <s.historyMessage isVisible>{maskMsg(message, 500, contactStatus)}</s.historyMessage>;
  }

  renderEventListener() {
    const { isDropdownVisible } = this.state;
    return (
      <EventListener
        target={document}
        onClick={e => {
          if ((!e.target.name || !['declineDropdown', 'blockDropdown'].includes(e.target.name)) && isDropdownVisible)
            this.setState({ isDropdownVisible: !isDropdownVisible });
        }}
      />
    );
  }

  renderDeclined() {
    const { isDropdownVisible } = this.state;
    return (
      <div>
        {this.renderEventListener()}
        <s.InvitationHeading isVisible>Declined Member. Changed your mind?</s.InvitationHeading>
        {this.props.isLoggerBothPartyPayUser && this.props.connectMessages.length > 0 && this.renderBothPartyGamification()}
        {!this.props.isLoggerBothPartyPayUser &&
          this.props.connectMessages[0] &&
          this.props.connectMessages[0].type === 'connect' &&
          this.props.connectMessages[0].message.length > 0 &&
          this.props.connectMessages[0].category === 'received' &&
          this.renderConnectMessage()}
        <s.InvitationBtnWrap>
          <s.InvitationBtn isVisible isLargeBtn onClick={this.props.onAccept}>
            Accept
          </s.InvitationBtn>
          <s.DeclineBtn isLargeBtn isCancelBtn>
            <s.DeclineBtnText onClick={this.props.onBlock}>Block</s.DeclineBtnText>
            <s.DropdownIcon
              name="blockDropdown"
              onClick={e => {
                e.stopPropagation();
                this.setState({ isDropdownVisible: !isDropdownVisible });
              }}
            />
            <s.Dropdown isVisible={isDropdownVisible}>
              <s.DropdownBtn onClick={this.props.onReportMisuse}>Report Profile</s.DropdownBtn>
            </s.Dropdown>
          </s.DeclineBtn>
          {this.props.request.details &&
            this.props.request.details.count > 0 && (
              <s.RequestCountLink onClick={this.props.onViewRequest}>
                Requests
                <s.RequestCount>{this.props.request.details.count}</s.RequestCount>
              </s.RequestCountLink>
            )}
          {this.props.request.details &&
            this.props.request.details.count > 0 &&
            !this.props.isLoggerBothPartyPayUser &&
            this.props.showHistory && <s.separator>|</s.separator>}
          {!this.props.isLoggerBothPartyPayUser &&
            this.props.showHistory && <s.ViewHistoryLink onClick={this.props.onViewHistory}>View History</s.ViewHistoryLink>}
        </s.InvitationBtnWrap>
        <s.Note>{this.props.note || 'This Member will not be able to contact you on Shaadi.com.'}</s.Note>
      </div>
    );
  }

  renderAccepted() {
    const { isDropdownVisible } = this.state;

    let declineBtnHtml = (
      <s.DeclineBtn isLargeBtn isCancelBtn>
        <s.DeclineBtnText onClick={this.props.onDecline}>Decline</s.DeclineBtnText>
      </s.DeclineBtn>
    );

    if ((this.props.isPaidUser || !this.props.isProfileFree) && !this.props.isLoggerBothPartyPayUser) {
      declineBtnHtml = (
        <s.DeclineBtn
          isLargeBtn
          isCancelBtn
          title={`Inform the other member that you do not wish to communicate with ${this.props.himHer.toLowerCase()}`}
        >
          <s.DeclineBtnText onClick={this.props.onDecline}>Decline</s.DeclineBtnText>
          <s.DropdownIcon
            name="declineDropdown"
            onClick={e => {
              e.stopPropagation();
              this.setState({ isDropdownVisible: !isDropdownVisible });
            }}
          />
          <s.Dropdown isVisible={isDropdownVisible}>
            <s.DropdownBtn onClick={this.props.onDeclineWithMessage}>Decline with message</s.DropdownBtn>
          </s.Dropdown>
        </s.DeclineBtn>
      );
    }

    return (
      <div>
        {this.renderEventListener()}
        <s.ContactedTitle isVisible>Accepted Member. Take the next step...</s.ContactedTitle>
        {this.props.isLoggerBothPartyPayUser && this.props.connectMessages.length > 0 && this.renderBothPartyGamification()}
        {!this.props.isLoggerBothPartyPayUser &&
          this.props.connectMessages &&
          this.props.connectMessages[0] &&
          this.props.connectMessages[0].type === 'connect' &&
          this.props.connectMessages[0].message.length > 0 &&
          this.props.connectMessages[0].category === 'received' &&
          this.renderConnectMessage()}
        <s.InvitationBtnWrap>
          <s.InvitationBtn isVisible isLargeBtn onClick={this.props.onSendEmail}>
            Send Email
          </s.InvitationBtn>
          {declineBtnHtml}
          {this.props.request.details &&
            this.props.request.details.count > 0 && (
              <s.RequestCountLink onClick={this.props.onViewRequest}>
                Requests
                <s.RequestCount>{this.props.request.details.count}</s.RequestCount>
              </s.RequestCountLink>
            )}
          {this.props.request.details &&
            this.props.request.details.count > 0 &&
            !this.props.isLoggerBothPartyPayUser &&
            this.props.showHistory && <s.separator>|</s.separator>}
          {!this.props.isLoggerBothPartyPayUser &&
            this.props.showHistory && <s.ViewHistoryLink onClick={this.props.onViewHistory}>View History</s.ViewHistoryLink>}
        </s.InvitationBtnWrap>
      </div>
    );
  }

  renderTheyAccepted() {
    return (
      <div>
        <s.ContactedTitle isVisible>Accepted Member Take the next step...</s.ContactedTitle>
        {this.props.isLoggerBothPartyPayUser && this.props.connectMessages.length > 0 && this.renderBothPartyGamification()}
        {!this.props.isLoggerBothPartyPayUser &&
          this.props.connectMessages &&
          this.props.connectMessages[0] &&
          this.props.connectMessages[0].type === 'connect' &&
          this.props.connectMessages[0].message.length > 0 &&
          this.props.connectMessages[0].category === 'received' &&
          this.renderConnectMessage()}
        <s.InvitationBtnWrap>
          <s.InvitationBtn isVisible isLargeBtn onClick={this.props.onSendEmail}>
            Send Email
          </s.InvitationBtn>
          <s.InvitationBtn
            isVisible
            isLargeBtn
            isCancelBtn
            onClick={this.props.onCancel}
            title={`Inform the other member that you do not wish to communicate with ${this.props.himHer.toLowerCase()}`}
          >
            Cancel
          </s.InvitationBtn>
          {this.props.request.details &&
            this.props.request.details.count > 0 && (
              <s.RequestCountLink onClick={this.props.onViewRequest}>
                Requests
                <s.RequestCount>{this.props.request.details.count}</s.RequestCount>
              </s.RequestCountLink>
            )}
          {this.props.request.details &&
            this.props.request.details.count > 0 &&
            !this.props.isLoggerBothPartyPayUser &&
            this.props.showHistory && <s.separator>|</s.separator>}
          {!this.props.isLoggerBothPartyPayUser &&
            this.props.showHistory && <s.ViewHistoryLink onClick={this.props.onViewHistory}>View History</s.ViewHistoryLink>}
        </s.InvitationBtnWrap>
      </div>
    );
  }

  renderCancelled() {
    return (
      <div>
        <s.ContactedTitle isVisible>Cancelled Member. Changed your mind?</s.ContactedTitle>
        <s.InvitationBtn isVisible isLargeBtn onClick={this.props.onConnect}>
          Connect
        </s.InvitationBtn>
        <s.Note>{this.props.note || 'This Member will not be able to contact you on Shaadi.com.'}</s.Note>
      </div>
    );
  }

  renderTheyCancelled() {
    const headingText = `${this.props.heShe} Cancelled ${this.props.hisHer.toLowerCase()} invitation sent to you.`;
    const subheadingText = `You cannot contact this Member on Shaadi.com. We will notify you if ${this.props.heShe.toLowerCase()} changes ${this.props.hisHer.toLowerCase()} mind.`;
    return (
      <s.TheyCancelledSection>
        <s.MessageHeading>{headingText}</s.MessageHeading>
        <s.MessageSubHeading>{subheadingText}</s.MessageSubHeading>
      </s.TheyCancelledSection>
    );
  }

  render() {
    switch (this.props.status) {
      case 'accepted':
        return this.renderAccepted(this.props);
      case 'theyAccepted':
        return this.renderTheyAccepted(this.props);
      case 'declined':
        return this.renderDeclined(this.props);
      case 'theyDeclined':
        return this.renderTheyDeclined(this.props);
      case 'cancelled':
        return this.renderCancelled(this.props);
      case 'theyCancelled':
        return this.renderTheyCancelled(this.props);
      default:
        return null;
    }
  }
}

Profile.defaultProps = {
  note: null,
  isHovered: false,
  contact: {},
  showHistory: false,
  isProfileFree: false,
  isLoggerBothPartyPayUser: false,
  profileName: null,
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
};

Profile.propTypes = {
  note: PropTypes.string,
  status: PropTypes.connectionStatus.isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  onConnect: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onBlock: PropTypes.func.isRequired,
  onReportMisuse: PropTypes.func.isRequired,
  onSendEmail: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  onDeclineWithMessage: PropTypes.func.isRequired,
  onViewHistory: PropTypes.func.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  connectMessages: PropTypes.arrayOf(PropTypes.shape(PropTypes.connectMessage)).isRequired,
  contact: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  showHistory: PropTypes.bool,
  isProfileFree: PropTypes.bool,
  isLoggerBothPartyPayUser: PropTypes.bool,
  profileName: PropTypes.string,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  onViewRequest: PropTypes.func.isRequired,
};

export default Profile;
