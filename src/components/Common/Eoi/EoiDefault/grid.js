import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import ShortlistDropdown from '../../ShortlistDropdown';

class Grid extends React.PureComponent {
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
    if (this.props.status === 'shortlisted' && this.props.justNow) {
      return (
        <s.GridStyle>
          <s.InvitationGridStatus isVisible status="shortlisted">
            <s.StatusText style={{ color: '#72727d' }}>{this.props.justNowText || "Added to My Maybe's"}</s.StatusText>
          </s.InvitationGridStatus>
        </s.GridStyle>
      );
    }

    if (this.props.isHidden) {
      return (
        <s.GridStyle>
          <s.HiddenGridText>
            <s.UnhideLinkGrid isExternal to="/my-shaadi/profile/unhide/thank-you/y">
              Unhide
            </s.UnhideLinkGrid>{' '}
            your profile to Connect with this Member.
          </s.HiddenGridText>
        </s.GridStyle>
      );
    }

    if (this.props.status === 'hidden') {
      return (
        <s.GridStyle>
          <s.IgnoredGridHeading />
          <s.IgnoredGridText>
            {this.props.heShe} has hidden or deactivated {this.props.hisHer.toLowerCase()} profile.
          </s.IgnoredGridText>
        </s.GridStyle>
      );
    }

    if (this.props.status === 'sameGender') {
      return (
        <s.GridStyle>
          <s.IgnoredGridHeading />
          <s.IgnoredGridText>You cannot Contact Members of the same gender.</s.IgnoredGridText>
        </s.GridStyle>
      );
    }

    return (
      <s.GridStyle
        isSendPasswordVisible={this.props.canSendPasswordOnConnect && !this.props.canConnectWithMessage}
        isCarousel={this.props.isCarousel}
      >
        <s.InvitationBtnContainer isVisible>
          <s.InvitationHeading isGridItem isVisible>
            Connect with {this.props.himHer.toLowerCase()}?
          </s.InvitationHeading>
          <s.InvitationGridWrap>
            <s.InvitationBtn
              isVisible
              isCarousel={this.props.isCarousel}
              title="Tell this Member that you wish to Connect!"
              onClick={this.state.willSendPassword ? this.props.onConnectWithPassword : this.props.onConnect}
            >
              Yes
            </s.InvitationBtn>
            {this.props.status !== 'cancelled' &&
              this.props.isCarousel !== true && (
                <s.InvitationGridBtnWrapper>
                  <ShortlistDropdown
                    type="grid"
                    status={this.props.status}
                    items={this.props.shortlistItems}
                    shortlists={this.props.shortlists}
                    onAddToShortlist={this.props.onAddToShortlist}
                    onCreateShortlist={this.props.onCreateShortlist}
                    onDirectlyShortlist={this.props.onDirectlyShortlist}
                    onShortlistOpen={this.props.onShortlistOpen}
                  />
                  <s.RoundIconBtn
                    isVisible
                    onClick={this.props.onIgnore}
                    title="This Profile will not be shown again in your Search Results"
                  >
                    <s.NoIcon />
                  </s.RoundIconBtn>
                </s.InvitationGridBtnWrapper>
              )}
          </s.InvitationGridWrap>
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
      </s.GridStyle>
    );
  }
}

Grid.defaultProps = {
  isHovered: false,
  isCarousel: false,
  isSendPasswordVisible: false,
  justNowText: null,
  isHidden: false,
};

Grid.propTypes = {
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  heShe: PropTypes.oneOf(['He', 'She']).isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  status: PropTypes.connectionStatus.isRequired,
  canSendPasswordOnConnect: PropTypes.bool.isRequired,
  canConnectWithMessage: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool,
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
  justNow: PropTypes.bool.isRequired,
  isCarousel: PropTypes.bool,
  justNowText: PropTypes.string,
  onShortlistOpen: PropTypes.func.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onAddToShortlist: PropTypes.func.isRequired,
  onCreateShortlist: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onConnectWithPassword: PropTypes.func.isRequired,
  onIgnore: PropTypes.func.isRequired,
};

export default Grid;
