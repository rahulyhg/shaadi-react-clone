import React from 'react';
import s from './styles';
import PropTypes from '../../../PropTypes';

class ChatIcon extends React.PureComponent {
  render() {
    const { viewType, chatDetails, clickFn } = this.props;
    const { profilePageBucket } = this.props;
    switch (viewType) {
      case 'inbox':
      case 'list':
        return (
          <s.ListChatIcon
            isVisible={['Online', 'Offline', 'Idle'].includes(chatDetails.onlineStatus)}
            icon={chatDetails.chatIcon}
            alignIcon={chatDetails.onlineStatus === 'Online'}
            onClick={clickFn}
            title={(chatDetails.onlineStatus === 'Online' && 'Chat Now') || ''}
          />
        );
      case 'grid':
      case 'carousel':
        return (
          <s.GridChatIcon
            isVisible={['Online', 'Offline', 'Idle'].includes(chatDetails.onlineStatus)}
            icon={chatDetails.chatIcon}
            onClick={clickFn}
            alignIcon={chatDetails.onlineStatus === 'Online'}
          />
        );
      case 'onlineTabChat':
        return <s.OnlineTabChatIcon icon={chatDetails.chatIcon} />;
      case 'profile':
      case 'dr':
        if (chatDetails.onlineStatus === 'Online') {
          return (
            <s.ProfileOnlineChatIcon onClick={clickFn} icon={chatDetails.chatIcon} profilePageBucket={profilePageBucket}>
              &nbsp;
            </s.ProfileOnlineChatIcon>
          );
        }
        return (
          <s.ProfileOtherChatIcon
            isVisible={['Offline', 'Idle'].includes(chatDetails.onlineStatus)}
            icon={chatDetails.chatIcon}
            onClick={clickFn}
            profilePageBucket={profilePageBucket}
          />
        );
      default:
        break;
    }

    return null;
  }
}
ChatIcon.defaultProps = {
  clickFn: () => {},
  profilePageBucket: 'A',
};
ChatIcon.propTypes = {
  viewType: PropTypes.string.isRequired,
  chatDetails: PropTypes.shape({
    onlineStatus: PropTypes.string.isRequired,
    chatIcon: PropTypes.string.isRequired,
  }).isRequired,
  clickFn: PropTypes.func,
  profilePageBucket: PropTypes.string,
};

export default ChatIcon;
