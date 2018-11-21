import React from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../PropTypes';
import onChatInit from '../../actions/onChatInit';
import BuddyList from '../../mComponents/BuddyList';
import doMChatAction from '../../actions/doChatAction/mobile';
import InlineLogin from '../../mComponents/InlineLogin';
import constants from '../../constants/constants';

class BuddyListPage extends React.Component {
  componentDidMount() {
    this.props.onChatInit(true, 'buddyList');
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
      <BuddyList
        online={this.props.items}
        profiles={this.props.profiles}
        loading={this.props.loading}
        onAction={this.onAction}
        downloadBannerVisible={this.props.downloadBannerVisible && !this.props.isLiteApp}
      />
    );
  }
}
BuddyListPage.propTypes = {
  onChatInit: PropTypes.func.isRequired,
  items: PropTypes.shape({
    accepted: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatOnlineItem).isRequired).isRequired,
    shortlisted: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatOnlineItem).isRequired).isRequired,
    matches: PropTypes.arrayOf(PropTypes.shape(PropTypes.chatOnlineItem).isRequired).isRequired,
  }).isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.basicProfile)).isRequired,
  loading: PropTypes.bool.isRequired,
  downloadBannerVisible: PropTypes.bool.isRequired,
  doMChatAction: PropTypes.func.isRequired,
  isLoggedOut: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  isLiteApp: PropTypes.bool.isRequired,
};

const selector = state => {
  const { chat, profiles, mView, session, config } = state;
  const { wwwBaseUrl, platform } = config.app;
  return {
    items: chat.sidebar.online,
    profiles,
    wwwBaseUrl,
    loading: chat.sidebar.loading,
    isLoggedOut: session.isLoggedOut,
    downloadBannerVisible: mView.downloadBanner,
    isLiteApp: platform === constants.LITE_APP_PLATFORM,
  };
};

BuddyListPage.displayName = 'BuddyListPage/mobile';

export { BuddyListPage };

export default connect(selector, { onChatInit, doMChatAction })(BuddyListPage);
