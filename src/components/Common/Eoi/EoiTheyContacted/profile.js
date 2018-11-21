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
      isReadMoreVisible: false,
    };

    this.renderConnectMessage = this.renderConnectMessage.bind(this);
    this.hook = this.hook.bind(this);
    this.closeReadMore = this.closeReadMore.bind(this);
    this.onAccept = this.hook(props.onAccept);
    this.onDecline = this.hook(props.onDecline);
    this.onDeclineWithMessage = this.hook(props.onDeclineWithMessage);
    this.onDeclineWithDelete = this.hook(props.onDeclineWithDelete);
    this.showReadMore = this.showReadMore.bind(this);
    this.renderBothPartyGamification = this.renderBothPartyGamification.bind(this);
    this.renderEventListener = this.renderEventListener.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.modalShowCount !== props.modalShowCount) {
      this.setState({ isReadMoreVisible: false });
    }
  }

  hook(fn) {
    return e => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ isDropdownVisible: false });
      fn();
    };
  }
  closeReadMore() {
    this.setState({ isReadMoreVisible: false });
  }

  showReadMore(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isReadMoreVisible: true });
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

  renderConnectMessage() {
    let contactStatus = 'hidden';
    if (this.props.isPaidUser === true && this.props.contact && this.props.contact.contact_details_title_status === 'show_all') {
      contactStatus = 'visible';
    }
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
              title: `${this.props.heShe} wrote on ${this.props.connectMessages[0].fullDate}`,
            }}
          >
            <s.RcMsgMoreLink onClick={this.showReadMore} href="#">
              Read more<s.RcMsgMoreLinkArrow />
            </s.RcMsgMoreLink>
          </Tooltip>
        </s.historyMessage>
      );
    }
    return <s.historyMessage isVisible>{maskMsg(message, 500, contactStatus)}</s.historyMessage>;
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

  render() {
    const { isDropdownVisible } = this.state;

    const { isPaidUser, isProfileFree, isDeleted } = this.props;

    let declineBtnHtml = (
      <s.DeclineBtn isLargeBtn isCancelBtn>
        <s.DeclineBtnText onClick={this.props.onDecline}>Decline</s.DeclineBtnText>
        <s.DropdownIcon
          isVisible={!isDeleted}
          type={this.props.type}
          name="declineDropdown"
          onClick={e => {
            e.stopPropagation();
            this.setState({ isDropdownVisible: !isDropdownVisible });
          }}
        />
        <s.Dropdown isVisible={isDropdownVisible}>
          <s.DropdownBtn onClick={this.onDeclineWithDelete}>Delete from Inbox</s.DropdownBtn>
        </s.Dropdown>
      </s.DeclineBtn>
    );

    if (isPaidUser || !isProfileFree) {
      declineBtnHtml = (
        <s.DeclineBtn isLargeBtn isCancelBtn>
          <s.DeclineBtnText onClick={this.props.onDecline}>Decline</s.DeclineBtnText>
          <s.DropdownIcon
            isVisible={!isDeleted}
            type={this.props.type}
            name="declineDropdown"
            onClick={e => {
              e.stopPropagation();
              this.setState({ isDropdownVisible: !isDropdownVisible });
            }}
          />
          <s.Dropdown isVisible={isDropdownVisible}>
            <s.DropdownBtn onClick={this.onDeclineWithDelete}>Delete from Inbox</s.DropdownBtn>
          </s.Dropdown>
        </s.DeclineBtn>
      );
    }

    return (
      <s.InvitationBtnContainer isVisible>
        {this.renderEventListener()}
        <s.InvitationReceivedNotice>{this.props.heShe} has invited you to Connect! Respond Now...</s.InvitationReceivedNotice>
        {this.props.isLoggerBothPartyPayUser && this.props.connectMessages.length > 0 && this.renderBothPartyGamification()}
        {!this.props.isLoggerBothPartyPayUser &&
          this.props.connectMessages &&
          this.props.connectMessages[0] &&
          this.props.connectMessages[0].type === 'connect' &&
          this.props.connectMessages[0].message.length > 0 &&
          this.renderConnectMessage()}
        <s.InvitationBtnWrap>
          <s.InvitationBtn isLargeBtn isVisible onClick={this.onAccept}>
            Accept
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
            this.props.showHistory && <s.ViewHistory onClick={this.props.onViewHistory}>View History</s.ViewHistory>}
        </s.InvitationBtnWrap>
        {(this.props.canSendPasswordOnConnect && (
          <s.SendPassword isVisible>
            <s.SendPasswordCheck
              id="sendPassword"
              type="checkbox"
              selected={this.state.willSendPassword}
              onChange={this.onPhotoPasswordToggle}
            />
            <s.SendPasswordLabel htmlFor="sendPassword">Send my Photo Password</s.SendPasswordLabel>
          </s.SendPassword>
        )) ||
          ''}
        <s.Note>
          {this.props.note || `${this.props.heShe} has sent you an invitation.`}
          {!isDeleted &&
            ['profile_filtered_contacted', 'profile_filtered'].includes(this.props.connectionAction) && (
              <Tooltip
                trigger="hover"
                isQuestionMark
                placement="bottom"
                tooltip={{
                  title: '',
                  body: [
                    { key: 'beh', items: [{ type: 'text', key: 'bleh', text: 'You can change this criteria by visiting your' }] },
                    {
                      key: 'beh1',
                      items: [
                        {
                          type: 'link',
                          key: 'bleh',
                          text: 'Contact Filters',
                          url: '/my-shaadi/partner-profile/contact-filter',
                          text2: 'page',
                        },
                      ],
                    },
                  ],
                }}
              />
            )}
        </s.Note>
      </s.InvitationBtnContainer>
    );
  }
}

Profile.defaultProps = {
  note: null,
  contact: {},
  isLoggerBothPartyPayUser: false,
  showHistory: false,
  connectionAction: '',
  profileName: null,
  isProfileFree: false,
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
};

Profile.propTypes = {
  // status: PropTypes.connectionStatus.isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  note: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  onDeclineWithMessage: PropTypes.func.isRequired,
  modalShowCount: PropTypes.number.isRequired,
  onDeclineWithDelete: PropTypes.func.isRequired,
  canSendPasswordOnConnect: PropTypes.bool.isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  connectMessages: PropTypes.arrayOf(PropTypes.shape(PropTypes.connectMessage)).isRequired,
  contact: PropTypes.shape({ contact_details_title_status: PropTypes.string, profileid: PropTypes.string }),
  isLoggerBothPartyPayUser: PropTypes.bool,
  profileName: PropTypes.string,
  onViewHistory: PropTypes.func.isRequired,
  onViewRequest: PropTypes.func.isRequired,
  showHistory: PropTypes.bool,
  connectionAction: PropTypes.string,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  type: PropTypes.oneOf(['grid', 'list', 'profile', 'chat']).isRequired,
  isProfileFree: PropTypes.bool,
  isDeleted: PropTypes.bool.isRequired,
};

export default Profile;
