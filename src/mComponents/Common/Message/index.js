import React from 'react';
import PropTypes from 'prop-types';
import { MsgContainer } from './styles';
import GamifiedMsg from './GamifiedMsg';
import UserMsg from './UserMsg';

class Message extends React.Component {
  renderInfo = infoType => {
    const { msgContent } = this.props;
    return <MsgContainer type={infoType}>{msgContent}</MsgContainer>;
  };
  render() {
    const { MsgDisplay } = this.props;
    let Component = null;
    switch (MsgDisplay) {
      case 'gamified':
        Component = <GamifiedMsg {...this.props} />;
        break;
      case 'none':
        return null;
      case 'info':
      case 'warning':
        Component = this.renderInfo(MsgDisplay);
        break;
      default: {
        Component = <UserMsg {...this.props} />;
        break;
      }
    }
    return <div style={this.props.style}>{Component}</div>;
  }
}
Message.defaultProps = {
  msgContent: null,
  profileUrl: '',
  style: {},
};
Message.propTypes = {
  senderName: PropTypes.string.isRequired,
  msgContent: PropTypes.string,
  profileUrl: PropTypes.string, // eslint-disable-line react/forbid-prop-types
  MsgDisplay: PropTypes.string.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
export default Message;
