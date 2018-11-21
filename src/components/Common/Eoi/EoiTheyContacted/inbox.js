import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';

class Inbox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDeclineDropdownVisible: false,
      willSendPassword: false,
    };
    this.onToggleDeclineDropdown = this.onToggleDeclineDropdown.bind(this);
    this.onAccept = () => {
      this.setState({ isDeclineDropdownVisible: false });
      this.props.onAccept();
    };
    this.onDecline = () => {
      this.setState({ isDeclineDropdownVisible: false });
      this.props.onDecline();
    };
    this.onDeclineWithMessage = () => {
      this.setState({ isDeclineDropdownVisible: false });
      this.props.onDeclineWithMessage();
    };
    this.onDeclineWithDelete = () => {
      this.setState({ isDeclineDropdownVisible: false });
      this.props.onDeclineWithDelete();
    };
    this.onPhotoPasswordToggle = this.onPhotoPasswordToggle.bind(this);
  }

  onToggleDeclineDropdown() {
    const isDeclineDropdownVisible = !this.state.isDeclineDropdownVisible;
    this.setState({ isDeclineDropdownVisible });
  }

  onPhotoPasswordToggle() {
    const willSendPassword = !this.state.willSendPassword;
    this.setState({ willSendPassword });
  }

  render() {
    const NegativeTitle = this.props.isHidden ? `Delete` : `Decline`;
    const NegativeAction = this.props.isHidden ? this.props.onDelete : this.onDecline;
    const profileStatus = this.props.isHidden ? this.props.hiddenReason || 'default' : 'default';
    const { type = 'inbox' } = this.props;
    const msgTextMap = {
      selfDeleted: `Member has deleted ${this.props.hisHer.toLowerCase()} Profile`,
      systemDeleted: 'The profile has been deleted.',
      selfHidden: `Member has decided to keep ${this.props.hisHer.toLowerCase()} profile hidden. Please check again after a few days`,
      systemHidden: `The profile has been temporarily hidden. Please check again after a few days.`,
      default: `${this.props.heShe} invited you to Connect`,
    };
    if (this.props.type === 'featured' && profileStatus !== 'default') {
      return msgTextMap[profileStatus];
    }
    return (
      <s.InvitationBtnContainer isVisible>
        {profileStatus === 'default' ? (
          type === 'inbox' && (
            <s.CtaHeading isVisible membershipTags={this.props.membershipTags}>
              {msgTextMap.default}
            </s.CtaHeading>
          )
        ) : (
          <s.InfoHeading
            isVisible
            membershipTags={this.props.membershipTags}
            isHorizontal={this.props.isHorizontal || this.props.listType === 'connect_deleted'}
          >
            {msgTextMap[profileStatus]}
          </s.InfoHeading>
        )}
        <s.InboxRequestBtnsWrap isVisible membershipTags={this.props.membershipTags} type={type} isflexWrap={type !== 'featured'}>
          {profileStatus === 'default'
            ? [
                <s.AcceptGrp key={`accept_${type}_${this.props.profileid}`} type={type}>
                  <s.InboxAcceptBtn
                    onClick={this.onAccept}
                    membershipTags={this.props.membershipTags}
                    title="Accept"
                    isHovered={this.props.isHovered}
                  />

                  <s.InboxAcceptBtnText onClick={this.onAccept} membershipTags={this.props.membershipTags} isHovered={this.props.isHovered}>
                    Accept
                  </s.InboxAcceptBtnText>
                </s.AcceptGrp>,
                <s.DeclineGrp key={`decline_${type}_${this.props.profileid}`}>
                  <s.InboxDeclineBtn
                    membershipTags={this.props.membershipTags}
                    onClick={NegativeAction}
                    title={NegativeTitle}
                    type={type}
                  />
                  <s.InboxDeclineBtnText onClick={NegativeAction}>{NegativeTitle}</s.InboxDeclineBtnText>
                </s.DeclineGrp>,
              ]
            : this.props.listType !== 'connect_deleted' && (
                <s.DeclineGrp>
                  <s.InboxDeclineBtn
                    membershipTags={this.props.membershipTags}
                    onClick={NegativeAction}
                    title={NegativeTitle}
                    type={type}
                  />
                  <s.InboxDeclineBtnText onClick={NegativeAction}>{NegativeTitle}</s.InboxDeclineBtnText>
                </s.DeclineGrp>
              )}
        </s.InboxRequestBtnsWrap>
      </s.InvitationBtnContainer>
    );
  }
}

Inbox.defaultProps = {
  isCtsDisabled: false,
  isHovered: false,
  hiddenReason: '',
  listType: '',
  type: 'inbox',
  isHorizontal: false,
  profileid: '',
};

Inbox.propTypes = {
  type: PropTypes.string,
  isHidden: PropTypes.bool.isRequired,
  hiddenReason: PropTypes.oneOf(['', 'selfHidden', 'systemHidden', 'selfDeleted', 'systemDeleted', 'defaultDeleted']),
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  isHovered: PropTypes.bool,
  onDeclineWithMessage: PropTypes.func.isRequired,
  onDeclineWithDelete: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  membershipTags: PropTypes.string.isRequired,
  heShe: PropTypes.string.isRequired,
  hisHer: PropTypes.string.isRequired,
  listType: PropTypes.string,
  isHorizontal: PropTypes.bool,
  profileid: PropTypes.string,
};

export default Inbox;
