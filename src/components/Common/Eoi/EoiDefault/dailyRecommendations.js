import React from 'react';
import PropTypes from '../../../../PropTypes';
import ChatIcon from '../../../Common/ChatIcon';
import s from './styles';
import ss from '../styles';
import { profile as profileContent } from '../../../../actions/lib/content';

class DailyRecommendations extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
      listId: props.shortlists.selected.pop(),
    };
  }

  componentWillReceiveProps(props) {
    if (props.shortlists !== this.props.shortlists) {
      this.setState({
        listId: props.shortlists.selected.pop(),
      });
    }
  }

  miniEmail(type) {
    if (this.props.settings.isPaidUser) {
      return <ss.ContactSpan onClick={this.props.onSendEmailClick}>Send Email</ss.ContactSpan>;
    }

    return (
      <ss.ContactLink
        to={`${this.props.wwwBaseUrl}/payment?source=profile_sendemail&profileid=${this.props.profileid}&profile_type=${type}`}
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
        to={`${this.props.wwwBaseUrl}/payment?source=profile_callsendSMS&profileid=${this.props.profileid}&profile_type=${type}`}
        target="_blank"
        isExternal
      >
        Call / Send SMS
      </ss.ContactLink>
    );
  }

  renderShortlisted() {
    return (
      <s.ActionMessageWrap>
        <s.TextWrap>
          <ss.ProfileName>{this.props.name}</ss.ProfileName>
          &nbsp;added to your&nbsp;
          <s.MaybeLink
            to={`${this.props.wwwBaseUrl}/profile/shortlist?mode=shortlist&list_id=${this.state.listId}`}
            target="_blank"
            isExternal
          >
            {`Maybe's`}
          </s.MaybeLink>
        </s.TextWrap>
        <ss.ReVisitWrap>
          {this.miniEmail('not_contacted')}|
          {this.miniSms('not_contacted')}
          <ss.ContactLinkBG to={this.props.nextUrl}>{` | Next recommendation`}</ss.ContactLinkBG>
        </ss.ReVisitWrap>
      </s.ActionMessageWrap>
    );
  }

  renderHidden() {
    const hiddenProfileMsg = profileContent.hiddenProfile();
    let visibleLink;
    let title = '';
    hiddenProfileMsg.map(msg => {
      if (typeof msg[0] === 'object') {
        visibleLink = (
          <s.NoteLink isExternal to={msg[0].url} target={msg[0].target}>
            {msg[0].text}
          </s.NoteLink>
        );
      } else {
        title = msg[0];
      }
      return null;
    });

    return (
      <div>
        <s.InvitationHeading isVisible>
          Connect with <ss.ProfileName>{this.props.name}</ss.ProfileName>?
        </s.InvitationHeading>
        <ss.ReVisitMsg isVisible>
          {title}
          {visibleLink}
        </ss.ReVisitMsg>
      </div>
    );
  }

  renderSameGender() { //eslint-disable-line
    return (
      <s.InvitationBtnContainer isVisible>
        <s.InvitationHeading isVisible>Interested? Take the next step...</s.InvitationHeading>
        <s.InvitationProfileBtnWrapper>
          <s.InvitationBtn isVisible isLargeBtn isCancelBtn disabled>
            Yes
          </s.InvitationBtn>
          <s.InvitationBtn isVisible isLargeBtn isCancelBtn disabled>
            Maybe
          </s.InvitationBtn>
        </s.InvitationProfileBtnWrapper>
        <s.Note isVisible>
          You cannot contact other members of the&nbsp;
          <span style={{ color: '#dc5858' }}>same gender</span>
        </s.Note>
      </s.InvitationBtnContainer>
    );
  }

  renderCancelled() {
    return (
      <div>
        <s.InvitationBtnContainer isVisible>
          <s.InvitationHeading isVisible>Cancelled Member. Changed your mind?</s.InvitationHeading>
        </s.InvitationBtnContainer>
        <s.InvitationProfileBtnWrapper>
          <s.InvitationBtn isVisible isLargeBtn type="profile" onClick={this.props.onConnect}>
            Connect
          </s.InvitationBtn>
        </s.InvitationProfileBtnWrapper>
        <s.Note isVisible>This Member will not be able to contact you on Shaadi.com.</s.Note>
      </div>
    );
  }

  renderNo() {
    if (this.props.justNow) {
      return (
        <div>
          <ss.ProfileStatusIcon status={this.props.justNowIcon || 'ignored'} />
          <ss.ProfileStatusText>{this.props.justNowText || 'removed from your recommendations'}&nbsp;</ss.ProfileStatusText>
          <ss.ContactLinkBG to={this.props.nextUrl}>Next recommendation</ss.ContactLinkBG>
        </div>
      );
    }
    return (
      <ss.InvitationBtnContainer isVisible>
        <ss.InvitationHeading isVisible>
          Connect with <ss.ProfileName>{this.props.name}</ss.ProfileName>?
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
          <ss.InvitationBtn isVisible isLargeBtn onClick={this.props.onConnect} title="Tell this Member that you wish to Connect!">
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
        <ss.SubMsg>You had removed this Profile from your recommendations</ss.SubMsg>
      </ss.InvitationBtnContainer>
    );
  }

  render() {
    if (this.props.isSameGender) {
      return this.renderSameGender();
    }

    if (this.props.status === 'shortlisted') {
      return this.renderShortlisted();
    }

    if (this.props.status === 'hidden') {
      return this.renderHidden();
    }

    if (this.props.status === 'cancelled') {
      return this.renderCancelled();
    }

    if (this.props.drAction === 'no') {
      return this.renderNo();
    }

    return (
      <s.InvitationBtnContainer isVisible>
        <s.InvitationHeading isVisible isDr>
          Connect with <ss.ProfileName>{this.props.name}</ss.ProfileName>?
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
          <s.InvitationBtn isVisible isLargeBtn onClick={this.props.onConnect} title="Tell this Member that you wish to Connect!">
            Yes
          </s.InvitationBtn>

          {!this.props.shortlists.count && (
            <s.MaybeBtn isVisible>
              <s.MaybeBtnText
                title={'Not sure? Add this profile to "Maybe\'s" list and decide later.'}
                onClick={this.props.onDirectlyShortlist}
              >
                Maybe
              </s.MaybeBtnText>
            </s.MaybeBtn>
          )}

          <s.InvitationBtn
            isVisible
            isCancelBtn
            onClick={this.props.onIgnore}
            type="profile"
            title="This Profile will not be shown again in your 'Daily Recommendations'."
          >
            No
          </s.InvitationBtn>
          {this.props.request.details &&
            this.props.request.details.count > 0 && (
              <s.RequestCountLink onClick={this.props.onViewRequest}>
                Requests
                <s.RequestCount>{this.props.request.details.count}</s.RequestCount>
              </s.RequestCountLink>
            )}
        </s.InvitationProfileBtnWrapper>
        {!this.props.shortlists.count && <ss.SubMsg>(Click Yes, Maybe or No to move to next recommendation)</ss.SubMsg>}
        {(this.props.shortlists.count &&
          this.props.drAction !== '' && (
            <ss.SubMsg>
              {` You have added this Member to your`}
              <s.MaybeLink
                to={`${this.props.wwwBaseUrl}/profile/shortlist?mode=shortlist&list_id=${this.state.listId}`}
                target="_blank"
                isExternal
              >
                {` Maybe's list`}
              </s.MaybeLink>
            </ss.SubMsg>
          )) ||
          (this.props.shortlists.count &&
            this.props.drAction === '' && <ss.SubMsg>{` (Click Yes or No to move to next recommendation)`}</ss.SubMsg>) ||
          ''}
      </s.InvitationBtnContainer>
    );
  }
}

DailyRecommendations.defaultProps = {
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
  justNowText: null,
  justNow: false,
  isSameGender: false,
  justNowIcon: null,
  drAction: null,
  onSendEmailClick: null,
  onViewPhoneNoClick: null,
  onChatNow: null,
};

DailyRecommendations.propTypes = {
  status: PropTypes.connectionStatus.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onSendEmailClick: PropTypes.func,
  onViewPhoneNoClick: PropTypes.func,

  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  settings: PropTypes.shape({
    isPaidUser: PropTypes.bool,
  }).isRequired,
  onViewRequest: PropTypes.func.isRequired,
  onChatNow: PropTypes.func,
  profileCreatedBy: PropTypes.string.isRequired,
  lastOnlineDetails: PropTypes.string.isRequired,
  profileid: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string.isRequired,
  shortlists: PropTypes.shape({
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  presence: PropTypes.shape({
    onlineStatus: PropTypes.onlineStatus.isRequired,
    lastOnlineDetails: PropTypes.string.isRequired,
    chatIcon: PropTypes.string.isRequired,
  }).isRequired,
  isSameGender: PropTypes.bool,
  justNowText: PropTypes.string,
  justNow: PropTypes.bool,
  justNowIcon: PropTypes.string,
  drAction: PropTypes.string,
};

export default DailyRecommendations;
