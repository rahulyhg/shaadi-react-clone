import React from 'react';
import PropTypes from '../../../../PropTypes';
import SvgLoader from '../../../Common/SvgLoader';
import FreeAccessBadge from '../../../FreeAccessBadge';
import s from './listStyles';

class List extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      willSendPassword: false,
    };
    this.onPhotoPasswordToggle = this.onPhotoPasswordToggle.bind(this);
  }

  onPhotoPasswordToggle() {
    const willSendPassword = !this.state.willSendPassword;
    this.setState({ willSendPassword });
  }

  render() {
    if (this.props.isSameGender) {
      return <s.ListHiddenText>You cannot Contact Members of the same gender.</s.ListHiddenText>;
    }
    if (this.props.isHidden) {
      return (
        <s.ListHiddenText>
          Please{' '}
          <s.UnhideLink isExternal to="/my-shaadi/profile/unhide/thank-you/y">
            unhide
          </s.UnhideLink>{' '}
          your profile to Connect with this Member.
        </s.ListHiddenText>
      );
    }
    return (
      <s.InvitationBtnContainer isVisible membershipType={this.props.membershipTags}>
        <s.LoadingWrapper>
          {(!this.props.isPaidUser || this.props.membershipTags === 'vip') && (
            <s.InvitationHeading membershipTags={this.props.membershipTags} isVisible>
              {this.props.membershipTags === 'vip' ? `Take the next step` : `Like this profile?`}
            </s.InvitationHeading>
          )}
          <s.InvitationBtn
            isVisible
            onClick={this.state.willSendPassword ? this.props.onConnectWithPassword : this.props.onConnect}
            title="Connect"
            isHovered={this.props.isHovered}
            isPaidUser={this.props.isPaidUser}
            membershipTags={this.props.membershipTags}
            isConnect
          />
          <s.InvitationBtnText
            onClick={this.state.willSendPassword ? this.props.onConnectWithPassword : this.props.onConnect}
            isHovered={this.props.isHovered}
            membershipTags={this.props.membershipTags}
          >
            Connect Now
          </s.InvitationBtnText>
          <s.SendPassword isVisible={this.props.canSendPasswordOnConnect && !this.props.canConnectWithMessage}>
            <s.SendPasswordCheck
              id="sendPassword"
              type="checkbox"
              selected={this.state.willSendPassword}
              onChange={this.onPhotoPasswordToggle}
            />
            <s.SendPasswordLabel htmlFor="sendPassword">Send my Photo Password</s.SendPasswordLabel>
          </s.SendPassword>
          <FreeAccessBadge
            isPaidUser={this.props.isPaidUser}
            canCommunicate={this.props.canCommunicate}
            himHer={this.props.himHer}
            toolTipPlacement="bottomRight"
          />
          <SvgLoader isVisible={this.props.isPartialLoading} />
          {this.props.membershipTags === 'vip' && (
            <s.InvitationBtn
              isVisible
              onClick={this.props.onCallConsultant}
              title={`Contact ${this.props.hisHer.toLowerCase()} VIP consultant to know more about ${this.props.himHer.toLowerCase()}`}
              membershipTags={this.props.membershipTags}
              isCallConsultant
              isHovered={this.props.isHovered}
            />
          )}
          {this.props.membershipTags === 'vip' && (
            <s.InvitationBtnText
              onClick={this.props.onCallConsultant}
              isHovered={this.props.isHovered}
              membershipTags={this.props.membershipTags}
            >
              Call Consultant
            </s.InvitationBtnText>
          )}
          {this.props.isPaidUser &&
            this.props.membershipTags !== 'vip' && (
              <s.ActiveBtnWrap>
                {this.props.membershipTags === 'vip' ? (
                  <s.WriteMessageBtnVip
                    onClick={this.props.onChatNow}
                    title="Write Message"
                    isHovered={this.props.isHovered}
                    isPaidUser={this.props.isPaidUser}
                  />
                ) : (
                  <s.WriteMessageBtn
                    onClick={this.props.onChatNow}
                    title="Write Message"
                    isHovered={this.props.isHovered}
                    isPaidUser={this.props.isPaidUser}
                  />
                )}
                <s.WriteMessageBtnText
                  onClick={this.props.onChatNow}
                  isPaidUser={this.props.isPaidUser}
                  isHovered={this.props.isHovered}
                  membershipTags={this.props.membershipTags}
                >
                  Write Message
                </s.WriteMessageBtnText>
                {this.props.membershipTags === 'vip' ? (
                  <s.VewContactBtnVip
                    onClick={this.props.isPaidUser ? this.props.onShowContactDetails : this.props.onChatNow}
                    isHovered={this.props.isHovered}
                    isPaidUser={this.props.isPaidUser}
                    title="View Contact"
                  />
                ) : (
                  <s.VewContactBtn
                    onClick={this.props.isPaidUser ? this.props.onShowContactDetails : this.props.onChatNow}
                    isHovered={this.props.isHovered}
                    isPaidUser={this.props.isPaidUser}
                    title="View Contact"
                  />
                )}
                <s.VewContactBtnText
                  onClick={this.props.isPaidUser ? this.props.onShowContactDetails : this.props.onChatNow}
                  isPaidUser={this.props.isPaidUser}
                  isHovered={this.props.isHovered}
                  membershipTags={this.props.membershipTags}
                >
                  View Contact
                </s.VewContactBtnText>
              </s.ActiveBtnWrap>
            )}
        </s.LoadingWrapper>
      </s.InvitationBtnContainer>
    );
  }
}

List.defaultProps = {
  canSendPasswordOnConnect: true,
  isPaidUser: false,
  isHovered: false,
  onChatNow: null,
  onShowContactDetails: null,
  canCommunicate: false,
};

List.propTypes = {
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  isPartialLoading: PropTypes.bool.isRequired,
  canSendPasswordOnConnect: PropTypes.bool.isRequired,
  canConnectWithMessage: PropTypes.bool.isRequired,
  onConnect: PropTypes.func.isRequired,
  onConnectWithPassword: PropTypes.func.isRequired,
  membershipTags: PropTypes.string.isRequired,
  onCallConsultant: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isPaidUser: PropTypes.bool,
  isHovered: PropTypes.bool,
  onChatNow: PropTypes.func,
  onShowContactDetails: PropTypes.func,
  isSameGender: PropTypes.bool.isRequired,
  canCommunicate: PropTypes.bool,
};

export default List;
