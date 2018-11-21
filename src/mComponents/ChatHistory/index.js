/* eslint camelcase: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
// import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from '../../PropTypes';
import {
  MainWrapper,
  ChatPopHeaderWrap,
  MChatWrap,
  ChatWindowProDetailsWrap,
  ChatInputMsgWrap,
  ChatInput,
  SubmitChatMsgBtn,
  UpgradeNowWrap,
  UpgradeNow,
  ChatErrorMsg,
} from './styles';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatWindowDetails from './ChatWindowDetails';

class ChatHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
      minScrollItems: props.history.items.filter(m => m.isSelf || m.status === 'read').length,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onMessageSubmit = this.onMessageSubmit.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(props) {
    // console.log('scroll componentWillReceiveProps', this.props.history.items, this.state.minScrollItems);
    this.scrollToBottom();
    if (this.props.history.mark !== props.history.mark) {
      this.scrollToBottom();
    }
    if (this.props.history.flash !== props.history.flash) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() { //eslint-disable-line
    if (this.props.history.items.length > this.state.minScrollItems) {
      this.markRead();
        const el = ReactDOM.findDOMNode(this.node); //eslint-disable-line
      if (el) {
        el.scrollIntoView(false);
      }
    }
  }

  markRead() {
    const unread = [];
    this.props.history.items.forEach(item => (item.status !== 'read' && !item.isSelf ? unread.push(item.messageId) : null));
    if (unread.length === 0) {
      return;
    }
    this.props.markAsRead(this.props.profile.uid, unread);
  }

  renderUpgrade = () => (
    <UpgradeNowWrap>
      <ChatErrorMsg>Chats can only be initiated by Premium Members.</ChatErrorMsg>
      <UpgradeNow to={`/payment/index?pg=pym&profileid=${this.props.profile.uid}`} isExternal>
        Upgrade Now
      </UpgradeNow>
    </UpgradeNowWrap>
  );

  onMessageSubmit(event) {
    event.preventDefault();
    this.props.onAction('chatActivity', 'sendMessage', this.state.chatInput);
    this.setState({
      chatInput: '',
      typedAt: 0,
      isTyping: false,
      minScrollItems: -1,
    });
  }

  handleChange(event) {
    this.setState({ chatInput: event.target.value });
  }

  render() {
    const { onBack } = this.props;
    const canSendMessage = this.props.history.flash !== 'free_member';
    return ReactDOM.createPortal(
      <MainWrapper ref={node => (this.node = node)}>
        <ChatPopHeaderWrap>
          <ChatHeader profile={this.props.profile} onBack={onBack} />
          <ChatWindowProDetailsWrap>
            <ChatWindowDetails profile={this.props.profile} settings={this.props.settings} onAction={this.props.onProfileAction} />
          </ChatWindowProDetailsWrap>
          <MChatWrap>
            {!canSendMessage ? this.renderUpgrade() : null}
            <ChatMessages
              chatWindow={this.props.chatWindow}
              flash={this.props.history.flash}
              settings={this.props.settings}
              items={this.props.history.items}
              skew={this.props.skew}
              profile={this.props.profile}
              history={this.props.history}
            />
          </MChatWrap>
        </ChatPopHeaderWrap>
        <ChatInputMsgWrap onSubmit={this.onMessageSubmit}>
          <ChatInput placeholder="Type a message" type="text" value={this.state.chatInput} onChange={this.handleChange} />
          <SubmitChatMsgBtn onClick={this.onMessageSubmit} disabled={!this.state.chatInput.trim().length}>
            Send
          </SubmitChatMsgBtn>
        </ChatInputMsgWrap>
      </MainWrapper>,
      document.getElementById('portal-full-screen'),
    );
  }
}

ChatHistory.propTypes = {
  profile: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    loading: PropTypes.string,
    typing: PropTypes.string,
    flash: PropTypes.string,
    flashType: PropTypes.oneOf(['default', 'fatal', 'success', 'error', 'loading']).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatHistoryMessageItem)).isRequired,
    mark: PropTypes.number.isRequired,
  }).isRequired,
  skew: PropTypes.shape(PropTypes.skew).isRequired,
  onAction: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onProfileAction: PropTypes.func.isRequired,
  markAsRead: PropTypes.func.isRequired,
  chatWindow: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({
    gender: PropTypes.string.isRequired,
    isBothPartyPayUser: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ChatHistory;
