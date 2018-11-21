import React from 'react';
import PropTypes from '../../../../PropTypes';
import ChatIcon from '../../../Common/ChatIcon';
import s from '../EoiDefault/styles';
import ss from '../styles';

class DailyRecommendations extends React.PureComponent {
  render() {
    return (
      <s.InvitationBtnContainer isVisible>
        <s.TheyContactedBar>
          This Member has invited you to connect!
          <s.ArrowImage />
        </s.TheyContactedBar>
        <s.InvitationHeading isVisible>
          Are you Interested in <ss.ProfileName>{this.props.profileName}</ss.ProfileName> too?
        </s.InvitationHeading>
        <s.SubHeading>
          {this.props.userHandle && `${this.props.userHandle} | `}
          Profile created by {this.props.profileCreatedBy || '...'}
          {' | '}
          {this.props.lastOnlineDetails}
          {['Online', 'Offline', 'Idle'].includes(this.props.presence.onlineStatus) && (
            <ChatIcon viewType="dr" chatDetails={this.props.presence} clickFn={this.props.onChatNow} />
          )}
        </s.SubHeading>
        <s.InvitationProfileBtnWrapper>
          <s.InvitationBtn isVisible isLargeBtn onClick={this.props.onAccept} title="Tell this Member that you wish to Connect!">
            Yes
          </s.InvitationBtn>

          <s.MaybeBtn isVisible>
            <s.MaybeBtnText
              title={'Not sure? Add this profile to "Maybe\'s" list and decide later.'}
              onClick={this.props.onDirectlyShortlist}
            >
              Maybe
            </s.MaybeBtnText>
          </s.MaybeBtn>

          <s.InvitationBtn
            isVisible
            isCancelBtn
            onClick={this.props.onDecline}
            type="profile"
            title="This Profile will not be shown again in your 'Daily Recommendations'."
          >
            No
          </s.InvitationBtn>
        </s.InvitationProfileBtnWrapper>
        <s.SubHeading>(Click Yes, Maybe or No to move next recommendation)</s.SubHeading>
      </s.InvitationBtnContainer>
    );
  }
}

DailyRecommendations.defaultProps = {
  justNowText: null,
  onChatNow: null,
};

DailyRecommendations.propTypes = {
  onDirectlyShortlist: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  profileName: PropTypes.string.isRequired,
  profileCreatedBy: PropTypes.string.isRequired,
  lastOnlineDetails: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  onChatNow: PropTypes.func,
  presence: PropTypes.shape({
    onlineStatus: PropTypes.onlineStatus.isRequired,
    lastOnlineDetails: PropTypes.string.isRequired,
    chatIcon: PropTypes.string.isRequired,
  }).isRequired,
};

export default DailyRecommendations;
