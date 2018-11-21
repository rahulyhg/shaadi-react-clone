import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import onChatInit from '../../actions/onChatInit';
import doMChatAction from '../../actions/doChatAction/mobile';
import RecentChatList from '../../mComponents/RecentChatList';
import InlineLogin from '../../mComponents/InlineLogin';
import constants from '../../constants/constants';

class RecentChatPage extends React.Component {
  componentDidMount() {
    this.props.onChatInit(true, 'recentChats');
  }

  onAction = (type, ...args) => {
    this.props.doMChatAction('chat', null, type);
  };

  render() {
    if (this.props.isLoggedOut) {
      return (
        <InlineLogin
          title={'Chat'}
          wwwBaseUrl={this.props.wwwBaseUrl}
          message="Here, you can chat with matching Profiles based on criteria specified by you in your partner requirements. You can set up to 20 different criteria like Age, Height, Community, Education, etc and get the best matches!"
          styles={{ marginTop: '96px' }}
        />
      );
    }
    return (
      <RecentChatList
        items={this.props.items}
        profiles={this.props.profiles}
        loading={this.props.loading}
        onAction={this.onAction}
        downloadBannerVisible={this.props.downloadBannerVisible && !this.props.isLiteApp}
      />
    );
  }
}
RecentChatPage.propTypes = {
  onChatInit: PropTypes.func.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.basicProfile)).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatItem)).isRequired,
  downloadBannerVisible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  doMChatAction: PropTypes.func.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  isLiteApp: PropTypes.bool.isRequired,
};

const selector = state => {
  const { chat, profiles, mView, session, config } = state;
  const { wwwBaseUrl, platform } = config.app;
  return {
    isLoggedOut: session.isLoggedOut,
    items: chat.sidebar.chats,
    loading: chat.sidebar.loading,
    profiles,
    wwwBaseUrl,
    downloadBannerVisible: mView.downloadBanner,
    isLiteApp: platform === constants.LITE_APP_PLATFORM,
  };
};

export { RecentChatPage };

export default connect(selector, { onChatInit, doMChatAction })(RecentChatPage);
