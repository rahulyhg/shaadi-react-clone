import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import { profile as profileContent } from '../../../../actions/lib/content';
import ShortlistDropdown from '../../../Common/ShortlistDropdown';
import Tooltip from '../../../Common/Tooltip';

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
    };
    this.renderSameGender = this.renderSameGender.bind(this);
    this.renderCancelled = this.renderCancelled.bind(this);
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

  renderCancelled() { //eslint-disable-line
    return (
      <div>
        <s.InvitationBtnContainer isVisible>
          <s.InvitationHeading isVisible>Cancelled Member. Changed your mind?</s.InvitationHeading>
        </s.InvitationBtnContainer>
        <s.InvitationProfileBtnWrapper>
          <s.InvitationBtn isVisible isLargeBtn type="profile" onClick={this.props.onConnect}>
            Connect
          </s.InvitationBtn>
          {!this.props.isLoggerBothPartyPayUser &&
            this.props.showHistory && <s.ViewHistory onClick={this.props.onViewHistory}>View History</s.ViewHistory>}
        </s.InvitationProfileBtnWrapper>
        <s.Note isVisible>{this.props.note || 'This Member will not be able to contact you on Shaadi.com.'}</s.Note>
      </div>
    );
  }

  renderHidden() { //eslint-disable-line

    const hiddenProfileMsg = profileContent.hiddenProfile();

    let visibleLink;
    let title = '';
    // eslint-disable-next-line array-callback-return
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
    });

    return (
      <div>
        <s.MessageHeading>Do you like {this.props.name}&apos;s profile?</s.MessageHeading>
        <s.HiddenNote isVisible>
          {title}
          {visibleLink}
        </s.HiddenNote>
      </div>
    );
  }

  render() {
    if (this.props.isSameGender) {
      return this.renderSameGender();
    }
    if (this.props.status === 'cancelled') {
      return this.renderCancelled();
    }
    if (this.props.status === 'hidden') {
      return this.renderHidden();
    }
    return (
      <s.InvitationBtnContainer isVisible>
        <s.InvitationHeading isVisible>Connect with {this.props.himHer.toLowerCase()}?</s.InvitationHeading>
        <s.InvitationProfileBtnWrapper>
          <s.InvitationBtn isVisible isLargeBtn onClick={this.props.onConnect} title="Tell this Member that you wish to Connect!">
            Yes
          </s.InvitationBtn>
          {!this.props.shortlists.count && (
            <ShortlistDropdown
              type="profile"
              items={this.props.shortlistItems}
              shortlists={this.props.shortlists}
              onCreateShortlist={this.props.onCreateShortlist}
              onAddToShortlist={this.props.onAddToShortlist}
              onShortlistOpen={this.props.onShortlistOpen}
              onDirectlyShortlist={this.props.onDirectlyShortlist}
              isUpdateDropdown={this.props.shortlists.count > 0}
            />
          )}
          <s.InvitationBtn
            isVisible
            isCancelBtn
            onClick={this.props.onIgnore}
            type="profile"
            title="This Profile will not be shown again in your Search Results"
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
        {this.props.note && (
          <s.Note isVisible>
            {this.props.note}
            {['member_filtered'].includes(this.props.connectionAction) && (
              <Tooltip
                trigger="hover"
                isQuestionMark
                placement="bottom"
                tooltip={{
                  title: '',
                  body: [
                    {
                      key: 'beh',
                      items: [
                        {
                          type: 'text',
                          key: 'bleh',
                          text: `You may still choose to send ${this.props.himHer.toLowerCase()} an Interest, but ${this.props.heShe.toLowerCase()} may not respond.`,
                        },
                      ],
                    },
                  ],
                }}
              />
            )}
          </s.Note>
        )}
        {(!this.props.note &&
          this.props.shortlists.count && (
            <s.Note isVisible>
              You have added this member to
              <ShortlistDropdown
                type="profileUpdate"
                items={this.props.shortlistItems}
                shortlists={this.props.shortlists}
                isVisible={this.state.isShortlistDropdownVisible}
                onCreateShortlist={this.props.onCreateShortlist}
                onAddToShortlist={this.props.onAddToShortlist}
                onDirectlyShortlist={this.props.onDirectlyShortlist}
                onShortlistOpen={this.props.onShortlistOpen}
                isUpdateDropdown={this.props.shortlists.count > 0}
              />
            </s.Note>
          )) ||
          ''}
      </s.InvitationBtnContainer>
    );
  }
}

Profile.defaultProps = {
  note: null,
  isHovered: false,
  isLoggerBothPartyPayUser: false,
  showHistory: false,
  request: {
    details: {
      count: 0,
      request_type: [],
    },
  },
  connectionAction: '',
};

Profile.propTypes = {
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  note: PropTypes.string,
  status: PropTypes.connectionStatus.isRequired,
  // justNow: PropTypes.bool.isRequired,
  isSameGender: PropTypes.bool.isRequired,
  canSendPasswordOnConnect: PropTypes.bool.isRequired,
  shortlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  shortlists: PropTypes.shape({
    ready: PropTypes.bool.isRequired,
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
    count: PropTypes.number.isRequired,
  }).isRequired,
  onShortlistOpen: PropTypes.func.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onAddToShortlist: PropTypes.func.isRequired,
  onCreateShortlist: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isLoggerBothPartyPayUser: PropTypes.bool,
  showHistory: PropTypes.bool,
  onViewHistory: PropTypes.func.isRequired,
  request: PropTypes.shape({
    details: PropTypes.shape({
      count: PropTypes.number,
      request_type: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
  onViewRequest: PropTypes.func.isRequired,
  connectionAction: PropTypes.string,
};

export default Profile;
