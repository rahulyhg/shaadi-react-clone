import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

class SendDecline extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: props.data.message || '',
      charactersLeft: 500 - (props.data.message || '').length,
      isConfirmBtnActive: false,
      wishToSendMessage: props.data.wishToSendMessage,
    };
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.sendDecline = this.sendDecline.bind(this);
    this.onWishChange = this.onWishChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!this.props.data || this.props.data.message !== props.data.message) {
      this.setState({ message: props.data.message || '', charactersLeft: 500 - (props.data.message || '').length, ready: true });
    }
  }

  onWishChange(wishToSendMessage) {
    this.setState({ wishToSendMessage });
  }

  onTextAreaChange(value) {
    const charactersLeft = 500 - value.length;
    if (charactersLeft >= 0) {
      this.setState({
        charactersLeft,
        message: value,
        isConfirmBtnActive: true,
      });
    }
  }

  sendDecline() {
    this.props.doProfileAction(
      this.props.data.source,
      this.props.data.uid,
      'decline_confirm',
      this.state.wishToSendMessage ? this.state.message : null,
    );
  }

  render() {
    return (
      <s.SendDecline>
        <ss.Header isSlim>
          <ss.Title>{this.props.data.title}</ss.Title>
          <ss.CloseModalBtn onClick={this.props.onModalClose} />
        </ss.Header>
        <ss.Content>
          <s.SendDeclineTitle>Do you wish to send a message along with your Decline?</s.SendDeclineTitle>
          <div>
            <s.RadioInput
              name="wishToSendMessage"
              id="wishToSendMessage"
              type="radio"
              checked={!this.state.wishToSendMessage}
              onChange={() => this.onWishChange(false)}
            />
            <s.SendDeclineLabel htmlFor="wishToSendMessage">No, I {"don't"} wish to send message.</s.SendDeclineLabel>
          </div>
          <div>
            <s.RadioInput
              name="wishToSendMessage"
              id="wishToSendMessage2"
              type="radio"
              checked={this.state.wishToSendMessage}
              onChange={() => this.onWishChange(true)}
            />
            <s.SendDeclineLabel htmlFor="wishToSendMessage2">Yes, I wish to send a message.</s.SendDeclineLabel>
          </div>
          <s.SendDeclineTextArea
            isVisible={this.state.wishToSendMessage}
            value={this.state.message}
            onChange={e => this.onTextAreaChange(e.target.value)}
          />
          <s.SendDeclineCharactersRemaining isVisible={this.state.wishToSendMessage}>
            Characters left:
            <s.SendDeclineCharactersCount>{this.state.charactersLeft}</s.SendDeclineCharactersCount>
          </s.SendDeclineCharactersRemaining>
          <s.ConnectBtn onClick={this.sendDecline} isActive={this.state.isConfirmBtnActive}>
            Confirm
            <s.RightArrow />
          </s.ConnectBtn>
          <s.DontShowCheck>
            <s.Checkbox
              type="checkbox"
              id="willShowAgain"
              selected={this.state.willShowAgain}
              onChange={() => this.setState({ willShowAgain: !this.state.willShowAgain })}
            />
            <s.DontShowLabel htmlFor="willShowAgain">{"Don't"} show me this again</s.DontShowLabel>
          </s.DontShowCheck>
        </ss.Content>
      </s.SendDecline>
    );
  }
}

SendDecline.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    source: PropTypes.string,
    wishToSendMessage: PropTypes.bool,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
};

export default SendDecline;
