import React from 'react';
import PropTypes from '../../PropTypes';
import Tooltip from '../Common/Tooltip';
import { profile as profileContent } from '../../actions/lib/content';
import s from './styles';

class BenefitsActivity extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderPaidBenefits = this.renderPaidBenefits.bind(this);
    this.showEmailTooltip = this.showEmailTooltip.bind(this);
    this.closeEmailTooltip = this.closeEmailTooltip.bind(this);
  }

  showEmailTooltip(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isEmailTooltipVisible: true });
  }

  closeEmailTooltip() {
    this.setState({ isEmailTooltipVisible: false });
  }

  renderPaidBenefits(sendEmailBtnTitle) {
    return (
      <s.Footer membershipLevel={this.props.profile.flags.membershipLevel}>
        <Tooltip
          trigger="hover"
          offset={[100, 0]}
          placement="bottom"
          tooltip={profileContent.benefitTooltip}
          overlayClassName="benefitTooltip"
        >
          <s.PlanIcon hasPremiumFeatures={false} />
        </Tooltip>
        {(!this.props.justNow || !['Complaint raised for misuse.', 'misuse_already_marked'].includes(this.props.justNowText)) && (
          <s.FooterLink
            isExternal
            to={`${this.props.upgradeUrl}&source=profile_sendemail&profile_type=${this.props.profile.flags.connectionAction}`}
            target={'_blank'}
            isHidden={this.props.profile.flags.connectionStatus === 'accepted'}
            title={sendEmailBtnTitle}
          >
            {this.props.profile.flags.canSendEmail && 'Send Email'}
            {this.props.profile.flags.canSendEmailReminder && 'Send Email / Reminder'}
            {['default', 'shortlisted'].includes(this.props.profile.flags.connectionStatus) && <s.SendEmailIcon />}
          </s.FooterLink>
        )}
        {this.props.profile.flags.showPostOnWall && (
          <s.FooterLink
            isExternal
            to={`${this.props.upgradeUrl}&source=profile_postonwall&profile_type=${this.props.profile.flags.connectionAction}`}
            target={'_blank'}
            title={`Appear on the Premium Wall, on ${this.props.profile.hisHer.toLowerCase()} dashboard and get noticed!`}
          >
            Post on Wall
          </s.FooterLink>
        )}
        {this.props.profile.flags.showChatNow && (
          <s.FooterLink
            isExternal
            to={`${this.props.upgradeUrl}&source=profile_chatnow&profile_type=${this.props.profile.flags.connectionAction}`}
            target={'_blank'}
            title="Connect instantly using Shaadi Chat, our award-winning instant messenger"
          >
            Chat Now
          </s.FooterLink>
        )}
        <s.FooterLink
          isExternal
          to={`${this.props.upgradeUrl}&source=profile_callsendSMS`}
          target={'_blank'}
          title="Connect with him directly on his Mobile"
        >
          {(this.props.profile.flags.canCallSendSMS && 'Call / Send SMS') ||
            (this.props.profile.flags.isSmsAlreadySent && 'SMS (Sent)') ||
            (this.props.profile.flags.canSendSMS && 'Send SMS')}
        </s.FooterLink>
        <s.ConnectInstantly />
      </s.Footer>
    );
  }

  render() {
    let sendEmailBtnTitle = '';
    if (
      ['theyAccepted', 'accepted', 'theyContacted', 'contacted', 'filteredContacted'].includes(this.props.profile.flags.connectionStatus)
    ) {
      sendEmailBtnTitle = 'Send Email';
    } else if (['cancelled', 'ignored', 'default'].includes(this.props.profile.flags.connectionStatus)) {
      sendEmailBtnTitle = 'Send an Email along with your Invitation';
    }

    let title = 'You have already send an SMS to this Member';
    if (
      (this.props.profile.flags.contactStatus === 'available' || this.props.profile.flags.contactStatus === 'availableOnVerification') &&
      this.props.profile.flags.isPhoneNoViewed !== true
    ) {
      title = `Connect with ${this.props.profile.himHer.toLowerCase()} directly via Phone`;
    }
    if (this.props.profile.flags.contactStatus !== 'available' && this.props.profile.flags.isSmsAlreadySent !== true) {
      title = `Connect with ${this.props.profile.himHer.toLowerCase()} directly via SMS`;
    }
    if (!this.props.settings.isPaidUser) {
      return this.renderPaidBenefits(sendEmailBtnTitle);
    }
    return (
      <s.Footer membershipLevel={this.props.profile.flags.membershipLevel}>
        <Tooltip
          isVisible
          placement="bottomLeft"
          offset={[0, -5]}
          trigger="hover"
          overlayClassName={'connectTooltip'}
          tooltip={{
            body: [
              {
                key: 'beh',
                items: [
                  {
                    type: 'text',
                    key: 'bleh',
                    text: `You are currently enjoying these features as a Premium Member.`,
                  },
                  {
                    type: 'spacer_8',
                    key: 'bleh2',
                  },
                  {
                    type: 'text',
                    key: 'bleh3',
                    text: `Your ${this.props.membership} Membership expires on `,
                  },
                  {
                    type: 'text',
                    key: 'bleh6',
                    className: 'bold',
                    text: `${this.props.settings.expiryDate}`,
                  },
                  {
                    type: 'spacer_8',
                    key: 'bleh4',
                  },
                  {
                    type: 'link',
                    key: 'bleh5',
                    text: 'Renew Membership',
                    url: `/payment/index`,
                    className: 'paymentLink',
                  },
                ],
              },
            ],
          }}
        >
          <s.PlanIcon hasPremiumFeatures title="Your Premium Benefits" />
        </Tooltip>
        {this.props.profile.flags.connectionStatus === 'hidden' ? (
          <Tooltip
            isVisible={this.state.isEmailTooltipVisible}
            placement="bottomLeft"
            offset={[0, -5]}
            trigger="click"
            overlayClassName={'connectTooltip emailTooltip'}
            tooltip={{
              title: 'Send Email',
              body: [
                {
                  key: 'beh',
                  items: [
                    {
                      type: 'text',
                      key: 'bleh',
                      text: 'Your profile is currently hidden. To send Emails to other Members, make your profile "Visible"',
                    },
                  ],
                },
              ],
            }}
            onClose={this.closeEmailTooltip}
          >
            <s.FooterBtn title={sendEmailBtnTitle} onClick={this.showEmailTooltip}>
              Send Email
            </s.FooterBtn>
          </Tooltip>
        ) : (
          <s.FooterBtn onClick={this.props.onSendEmailClick} title={sendEmailBtnTitle}>
            {this.props.profile.flags.canSendEmail && 'Send Email'}
            {this.props.profile.flags.canSendEmailReminder && 'Send Email / Reminder'}
          </s.FooterBtn>
        )}
        {this.props.profile.flags.showChatNow && (
          <s.FooterBtn onClick={this.props.onChatNowClick} title="Connect instantly using Shaadi Chat, our award-winning instant messenger">
            Chat Now
          </s.FooterBtn>
        )}
        <s.FooterBtn onClick={this.props.onViewPhoneNoClick} title={title}>
          {(this.props.profile.flags.isPhoneNoViewed && 'Phone No. (Viewed)') ||
            (this.props.profile.flags.isSmsAlreadySent && 'SMS (Sent)') ||
            (this.props.profile.flags.canViewPhoneNo && 'View Phone No.') ||
            (this.props.profile.flags.canSendSMS && 'Send SMS')}
        </s.FooterBtn>
        {!this.props.profile.flags.isPhoneNoViewed &&
          !this.props.profile.flags.isSmsAlreadySent && (
            <Tooltip
              isQuestionMark
              placement="bottom"
              offset={[0, -5]}
              tooltip={{
                body: [
                  {
                    key: 'beh',
                    items: [
                      {
                        type: 'text',
                        key: 'bleh',
                        text: this.props.profile.flags.canViewPhoneNo
                          ? 'Your Contact Balance is deducted and an interest is sent when a phone number is viewed for the first time.'
                          : this.props.profile.flags.canSendSMS
                            ? `${this.props.profile.name}'s Contact details are hidden. You can contact ${
                                this.props.profile.himHer
                              } by sending a text message.`
                            : '',
                      },
                    ],
                  },
                ],
              }}
            />
          )}
        <s.ContactBalanceIcon />
      </s.Footer>
    );
  }
}

BenefitsActivity.defaultProps = {
  justNowText: null,
  settings: {
    expiryDate: '',
  },
};

BenefitsActivity.propTypes = {
  upgradeUrl: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    isPaidUser: PropTypes.bool.isRequired,
    canSendPasswordOnConnect: PropTypes.bool.isRequired,
    expiryDate: PropTypes.string,
  }).isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hisHer: PropTypes.string.isRequired,
    himHer: PropTypes.string.isRequired,
    flags: PropTypes.shape({
      membershipLevel: PropTypes.membershipLevel.isRequired,
      connectionStatus: PropTypes.string.isRequired,
      canRemind: PropTypes.bool.isRequired,
      contactStatus: PropTypes.string.isRequired,
      connectionAction: PropTypes.string.isRequired,
      canCallSendSMS: PropTypes.bool.isRequired,
      canSendEmail: PropTypes.bool.isRequired,
      canSendEmailReminder: PropTypes.bool.isRequired,
      canSendSMS: PropTypes.bool.isRequired,
      canViewPhoneNo: PropTypes.bool.isRequired,
      isPhoneNoViewed: PropTypes.bool.isRequired,
      isSmsAlreadySent: PropTypes.bool.isRequired,
      showChatNow: PropTypes.bool.isRequired,
      showPostOnWall: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  onChatNowClick: PropTypes.func.isRequired,
  onSendEmailClick: PropTypes.func.isRequired,
  justNow: PropTypes.bool.isRequired,
  justNowText: PropTypes.string,
  onViewPhoneNoClick: PropTypes.func.isRequired,
  membership: PropTypes.string.isRequired,
};

export default BenefitsActivity;
