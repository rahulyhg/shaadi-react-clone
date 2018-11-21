import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './listStyles';

class List extends React.PureComponent {
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
    if (this.props.isDeleted) {
      return (
        <s.InvitationStatus style={{ textAlign: 'left' }} isVisible>
          <s.InviteStatusIcon status={'declined'} />
          <s.InviteStatusText status={'declined'}>Deleted</s.InviteStatusText>
        </s.InvitationStatus>
      );
    }
    return (
      <s.InvitationBtnContainer isVisible membershipType={this.props.membershipTags}>
        <s.InvitationHeading isVisible membershipTags={this.props.membershipTags}>
          {`${this.props.heShe} invited you to Connect`}
        </s.InvitationHeading>
        <s.ListRequestBtnsWrap isVisible membershipTags={this.props.membershipTags}>
          <s.ListAcceptBtn
            onClick={this.onAccept}
            membershipTags={this.props.membershipTags}
            isHovered={this.props.isHovered}
            title="Accept"
          />
          <s.ListAcceptBtnText onClick={this.onAccept} membershipTags={this.props.membershipTags} isHovered={this.props.isHovered}>
            Accept
          </s.ListAcceptBtnText>
          <s.ListDeclineBtn membershipTags={this.props.membershipTags} onClick={this.onDecline} title="Decline" />
          <s.ListDeclineBtnText onClick={this.onDecline}>Decline</s.ListDeclineBtnText>
        </s.ListRequestBtnsWrap>
        <s.SendPassword isVisible={this.props.canSendPasswordOnConnect && !this.props.canConnectWithMessage}>
          <s.SendPasswordCheck
            id="sendPassword"
            type="checkbox"
            selected={this.state.willSendPassword}
            onChange={this.onPhotoPasswordToggle}
          />
          <s.SendPasswordLabel htmlFor="sendPassword">Send my Photo Password</s.SendPasswordLabel>
        </s.SendPassword>
      </s.InvitationBtnContainer>
    );
  }
}

List.defaultProps = {
  isHovered: false,
};

List.propTypes = {
  // status: PropTypes.connectionStatus.isRequired,
  // justNow: PropTypes.bool.isRequired,
  isDeleted: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  canSendPasswordOnConnect: PropTypes.bool.isRequired,
  onDeclineWithMessage: PropTypes.func.isRequired,
  onDeclineWithDelete: PropTypes.func.isRequired,
  canConnectWithMessage: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string.isRequired,
  heShe: PropTypes.heShe.isRequired,
  isHovered: PropTypes.bool,
};

export default List;
