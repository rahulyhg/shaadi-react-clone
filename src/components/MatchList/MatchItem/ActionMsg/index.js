import React from 'react';
import s from './styles';
import PropTypes from '../../../../PropTypes';
import SvgLoader from '../../../Common/SvgLoader';

class ActionMsg extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      delay: 10990,
    };
    setTimeout(() => {
      this.setState({ visible: false });
    }, this.state.delay);
    this.rendersection = this.renderSection.bind(this);
  }
  renderSection() {
    const { loadingStyle, reqType } = this.props;
    if (loadingStyle !== 'none') {
      return (
        <s.LoaderWrap>
          <SvgLoader isVisible />
        </s.LoaderWrap>
      );
    }
    switch (this.props.eoiReqType) {
      case 'decline':
      case 'decline_with_delete':
      case 'decline_confirm': {
        return (
          <s.ActionMsg>
            You have declined {this.props.name}
            {`'`}s Invitation to connect.{<br />}
            This item has been moved to the{' '}
            <s.FolderLink isExternal to="/inbox/archived/interests">
              Deleted{' '}
            </s.FolderLink>
            folder.{<br />}
          </s.ActionMsg>
        );
      }
      case 'cancel_invitation': {
        return (
          <s.ActionMsg>
            You have Cancelled your Invitation in {this.props.name}
            {<br />}
            This item has been moved to the{' '}
            <s.FolderLink isExternal to="/inbox/archived/interests">
              Deleted{' '}
            </s.FolderLink>
            folder.{<br />}
          </s.ActionMsg>
        );
      }
      case 'delete': {
        if (reqType === 'connect') {
          return (
            <s.ActionMsg>
              You have declined {this.props.name}
              {`'`}s Invitation to connect.{<br />}
              This item has been moved to the{' '}
              <s.FolderLink isExternal to="/inbox/archived/interests">
                Deleted{' '}
              </s.FolderLink>
              folder.{<br />}
            </s.ActionMsg>
          );
        }
        if (['photo', 'contact'].includes(reqType)) {
          return (
            <s.ActionMsg>
              You have Deleted {this.props.name}
              {`'`}s Request
            </s.ActionMsg>
          );
        }
        return null;
      }
      default:
        return null;
    }
  }
  render() {
    return <s.MessageContainer isVisible={this.state.visible}>{this.renderSection()}</s.MessageContainer>;
  }
}
ActionMsg.defaultProps = {
  loadingStyle: 'none',
  source: 'inbox',
};
ActionMsg.propTypes = {
  loadingStyle: PropTypes.string,
  name: PropTypes.string.isRequired,
  eoiReqType: PropTypes.string.isRequired,
  reqType: PropTypes.string.isRequired,
};
export default ActionMsg;
