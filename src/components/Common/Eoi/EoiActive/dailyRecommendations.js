import React from 'react';
import PropTypes from '../../../../PropTypes';
import ChatIcon from '../../../Common/ChatIcon';
import s from './styles';
import ss from '../styles';
import ds from '../EoiDefault/styles';

class DailyRecommendations extends React.PureComponent {
  miniEmail(type) {
    if (this.props.settings.isPaidUser) {
      return <ss.ContactSpan onClick={this.props.onSendEmailClick}>Send Email</ss.ContactSpan>;
    }

    return (
      <ss.ContactLink
        to={`${this.props.wwwBaseUrl}/payment?source=profile_sendemail&profileid=${this.props.uid}&profile_type=${type}`}
        target="_blank"
        isExternal
      >
        Send Email
      </ss.ContactLink>
    );
  }

  miniSms(type) {
    if (this.props.settings.isPaidUser) {
      return <ss.ContactSpan onClick={this.props.onViewPhoneNoClick}>Call / Send SMS</ss.ContactSpan>;
    }
    return (
      <ss.ContactLink
        to={`${this.props.wwwBaseUrl}/payment?source=profile_callsendSMS&profileid=${this.props.uid}&profile_type=${type}`}
        target="_blank"
        isExternal
      >
        Call / Send SMS
      </ss.ContactLink>
    );
  }

  renderAccepted() {
    return (
      <div>
        <s.ContactedTitle>
          {`Accepted `}
          <ss.ProfileName>{this.props.profileName}</ss.ProfileName>
          {`'s Invitation`}
        </s.ContactedTitle>
        <ss.GotoLinkWrap>
          (Go to
          <ss.ContactLink to={`${this.props.wwwBaseUrl}/inbox/accepted/interests`} target="_blank" isExternal>
            Accepted Members
          </ss.ContactLink>
          )
        </ss.GotoLinkWrap>
        <ss.ReVisitWrap>
          <ss.SubHeading>{`Want to contact ${this.props.himHer.toLowerCase()} right away?`}&nbsp;</ss.SubHeading>
          {this.miniEmail('member_accepted')}|
          {this.miniSms('member_accepted')}
        </ss.ReVisitWrap>
      </div>
    );
  }

  renderTheyAccepted() {
    return (
      <div>
        <s.ContactedTitle>
          <ss.ProfileName>{this.props.profileName}</ss.ProfileName> Accepted your Invitation
        </s.ContactedTitle>
        <ss.GotoLinkWrap>
          (Go to
          <ss.ContactLink to={`${this.props.wwwBaseUrl}/inbox/accepted/interests`} target="_blank" isExternal>
            Accepted Members
          </ss.ContactLink>
          )
        </ss.GotoLinkWrap>
        <ss.ReVisitWrap>
          <ss.SubHeading>{`Want to contact ${this.props.himHer.toLowerCase()} right away?`}&nbsp;</ss.SubHeading>
          {this.miniEmail('profile_accepted')}|
          {this.miniSms('profile_accepted')}
        </ss.ReVisitWrap>
      </div>
    );
  }

  renderDeclined() {
    if (this.props.justNow) {
      return (
        <div>
          <ss.ProfileStatusIcon status="invitation_cancelled" />
          <ss.ProfileStatusText>
            <ss.ProfileName>{this.props.profileName}</ss.ProfileName>
            {`'s Invitation has been Declined`}
          </ss.ProfileStatusText>
          <ss.ContactLinkBG to={this.props.nextUrl}>Next recommendation</ss.ContactLinkBG>
        </div>
      );
    }
    return (
      <ss.InvitationBtnContainer isVisible>
        <ds.TheyContactedBar>
          This Member has invited you to connect!
          <ds.ArrowImage />
        </ds.TheyContactedBar>
        <ss.InvitationHeading isVisible>
          Are you Interested in <ss.ProfileName>{this.props.profileName}</ss.ProfileName> too?
        </ss.InvitationHeading>
        <ss.SubHeading>
          {this.props.userHandle && `${this.props.userHandle} | `}
          Profile created by {this.props.profileCreatedBy || '...'}
          {' | '}
          {this.props.lastOnlineDetails}
          {['Online', 'Offline', 'Idle'].includes(this.props.presence.onlineStatus) && (
            <ChatIcon viewType="dr" chatDetails={this.props.presence} clickFn={this.props.onChatNow} />
          )}
        </ss.SubHeading>

        <s.InvitationProfileBtnWrapper>
          <ss.InvitationBtn isVisible isLargeBtn onClick={this.props.onAccept} title="Tell this Member that you wish to Connect!">
            Yes
          </ss.InvitationBtn>

          <s.MaybeBtn isVisible>
            <s.MaybeBtnText
              title={'Not sure? Add this profile to "Maybe\'s" list and decide later.'}
              onClick={this.props.onDirectlyShortlist}
            >
              Maybe
            </s.MaybeBtnText>
          </s.MaybeBtn>
        </s.InvitationProfileBtnWrapper>
        <ss.SubMsg>You had removed this Profile from recommendations</ss.SubMsg>
      </ss.InvitationBtnContainer>
    );
  }

  renderTheyCancelled() {
    return (
      <s.TheyCancelledSection>
        <s.MessageHeading>
          <ss.ProfileName>{this.props.profileName}</ss.ProfileName> Cancelled {this.props.hisHer} invitation sent to you.
        </s.MessageHeading>
        <s.MessageSubHeading>This member cannot be contacted.</s.MessageSubHeading>
      </s.TheyCancelledSection>
    );
  }

  renderTheyDeclined() {
    return (
      <div>
        <s.ContactedTitle>
          <ss.ProfileName>{this.props.profileName}</ss.ProfileName> Declined your Invitation
        </s.ContactedTitle>
        <s.Note>This member cannot be contacted.</s.Note>
      </div>
    );
  }

  render() {
    switch (this.props.status) {
      case 'accepted':
        return this.renderAccepted();
      case 'theyAccepted':
        return this.renderTheyAccepted();
      case 'declined':
        return this.renderDeclined();
      case 'theyDeclined':
        return this.renderTheyDeclined();
      case 'theyCancelled':
        return this.renderTheyCancelled();
      default:
        return null;
    }
  }
}

DailyRecommendations.defaultProps = {
  justNow: false,
  onSendEmailClick: null,
  onViewPhoneNoClick: null,
  onChatNow: null,
};

DailyRecommendations.propTypes = {
  status: PropTypes.connectionStatus.isRequired,
  profileName: PropTypes.string.isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  profileCreatedBy: PropTypes.string.isRequired,
  lastOnlineDetails: PropTypes.string.isRequired,
  onSendEmailClick: PropTypes.func,
  onViewPhoneNoClick: PropTypes.func,
  onChatNow: PropTypes.func,
  settings: PropTypes.shape({
    isPaidUser: PropTypes.bool,
  }).isRequired,
  presence: PropTypes.shape({
    onlineStatus: PropTypes.onlineStatus.isRequired,
    lastOnlineDetails: PropTypes.string.isRequired,
    chatIcon: PropTypes.string.isRequired,
  }).isRequired,
  userHandle: PropTypes.string.isRequired,
  nextUrl: PropTypes.string.isRequired,
  justNow: PropTypes.bool,
};
export default DailyRecommendations;
