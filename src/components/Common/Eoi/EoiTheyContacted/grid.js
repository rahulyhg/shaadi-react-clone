import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import Tooltip from '../../Tooltip';

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
    return (
      <s.GridStyle isSendPasswordVisible={this.props.canSendPasswordOnConnect && !this.props.canConnectWithMessage}>
        <s.InvitationBtnContainer isVisible>
          <s.InvitationHeading isGridItem isVisible>
            Respond to {this.props.hisHer.toLowerCase()} Invitation
            <Tooltip
              isQuestionMark
              placement="top"
              offset={[0, -5]}
              tooltip={{
                body: [
                  {
                    key: 'para-1',
                    items: [{ type: 'text', key: 'sentence-1', text: 'This member has sent you an Invitation. Respond now.' }],
                  },
                ],
              }}
            />
          </s.InvitationHeading>
          <s.InvitationGridBtnWrap>
            <s.GridInvitationBtn onClick={this.props.onAccept}>Accept</s.GridInvitationBtn>
            <s.GridDeclineBtn onClick={this.props.onDecline}>Decline</s.GridDeclineBtn>
          </s.InvitationGridBtnWrap>
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
};

Grid.propTypes = {
  // status: PropTypes.connectionStatus.isRequired,
  // justNow: PropTypes.bool.isRequired,
  hisHer: PropTypes.oneOf(['His', 'Her']).isRequired,
  canSendPasswordOnConnect: PropTypes.bool.isRequired,
  canConnectWithMessage: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default Grid;
