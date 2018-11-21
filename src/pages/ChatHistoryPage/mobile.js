import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from '../../PropTypes';
import ChatHistory from '../../mComponents/ChatHistory';
import onChatInit from '../../actions/onChatInit';
import doMChatAction from '../../actions/doChatAction/mobile';
import doMProfileAction from '../../actions/doProfileAction/mobile';
import InlineLogin from '../../mComponents/InlineLogin';

const goBack = history => (history.length ? history.goBack() : history.push('/inbox/chats/recent-chats'));

class ChatHistoryPage extends React.PureComponent {
  componentDidMount() {
    const { match: { params: { uid } } } = this.props;
    this.props.onChatInit(true);
    this.props.doMChatAction('chat', uid, 'fetchChatHistory');
    document.body.style.overflowX = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflowX = 'auto';
  }

  onAction = (type, ...args) => {
    const { match: { params: { uid } } } = this.props;
    this.props.doMChatAction('chat', uid, type, ...args);
  };

  onProfileAction = (type, ...args) => {
    const { match: { params: { uid } } } = this.props;
    this.props.doMProfileAction('chat', uid, type, ...args);
  };

  markAsRead = (uid, unreadIds) => {
    this.props.doMChatAction('chat', uid, 'chatActivity', 'markAsRead', unreadIds);
  };

  renderToast = () => {
    const { message } = this.props.toast;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!message}
        onClose={() => {}}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
    );
  };

  render() {
    if (!this.props.profile || !this.props.history) {
      return null;
    }
    if (this.props.isLoggedOut) {
      return (
        <div>
          <AppBar>
            <Toolbar />
          </AppBar>
          <InlineLogin
            title={'Chat'}
            wwwBaseUrl={this.props.wwwBaseUrl}
            message="Here, you can chat with matching Profiles based on criteria specified by you in your partner requirements. You can set up to 20 different criteria like Age, Height, Community, Education, etc and get the best matches!"
            styles={{ marginTop: '96px' }}
          />
        </div>
      );
    }
    const { history, profile } = this.props;
    return (
      <div style={{ touchAction: 'none' }}>
        <ChatHistory
          profile={profile}
          history={this.props.chatHistory}
          onAction={this.onAction}
          onBack={() => goBack(history)}
          onProfileAction={this.onProfileAction}
          markAsRead={this.markAsRead}
          skew={this.props.skew}
          settings={this.props.settings}
          chatWindow={this.props.chatWindow}
        />
        {this.renderToast()}
        <style>{`body { height: auto !important; }`}</style>
      </div>
    );
  }
}
ChatHistoryPage.defaultProps = {
  profile: null,
  chatWindow: {},
};

ChatHistoryPage.propTypes = {
  profile: PropTypes.shape(PropTypes.basicProfile),
  skew: PropTypes.shape(PropTypes.skew).isRequired,
  chatHistory: PropTypes.shape(PropTypes.chatHistoryMessage).isRequired,
  onChatInit: PropTypes.func.isRequired,
  doMChatAction: PropTypes.func.isRequired,
  doMProfileAction: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string,
    }),
  }).isRequired,
  toast: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape(PropTypes.goBack).isRequired,
  chatWindow: PropTypes.shape(PropTypes.gamifiedCount).isRequired,
  settings: PropTypes.shape({
    gender: PropTypes.string.isRequired,
    isBothPartyPayUser: PropTypes.bool.isRequired,
  }).isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
};

ChatHistoryPage.displayName = 'ChatHistoryPage/mobile';

export { ChatHistoryPage };

const selector = (state, { match: { params: { uid } } }) => {
  const { chat, profiles, mView, session } = state;
  const { wwwBaseUrl } = state.config.app;
  return {
    profile: profiles[uid],
    chatHistory: chat.messages[uid] || chat.messages.initial,
    skew: chat.skew,
    toast: mView.toast,
    settings: session.settings,
    chatWindow: chat.windows.normal.find(item => item.uid === uid),
    isLoggedOut: session.isLoggedOut,
    wwwBaseUrl,
  };
};

export default withRouter(connect(selector, { onChatInit, doMChatAction, doMProfileAction })(ChatHistoryPage));
