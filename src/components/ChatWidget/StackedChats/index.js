import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

class StackedChats extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isListVisible: false,
    };
    this.onToggleBtnClick = this.onToggleBtnClick.bind(this);
    this.onSelectFromList = this.onSelectFromList.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  onToggleBtnClick() {
    const isListVisible = !this.state.isListVisible;
    this.props.doChatWindowAction(null, 'minimizeAll');
    this.setState({ isListVisible });
  }

  onSelectFromList(uid) {
    this.props.doChatWindowAction(uid, 'open');
    this.setState({ isListVisible: !this.state.isListVisible });
  }

  renderItem(item, profile) {
    return (
      <s.Item key={item.uid} onClick={() => this.onSelectFromList(item.uid)}>
        <s.Name>{profile.name || item.uid}</s.Name>
        <s.StatusIcon hasUnread={item.hasUnread} />
      </s.Item>
    );
  }

  render() {
    const { items, profiles } = this.props;
    const hasUnreadItems = this.props.items.filter(i => i.hasUnread).length;
    return (
      <s.StackedChats isVisible={items.length}>
        <s.ToggleBtn hasUnreadItems={hasUnreadItems} onClick={this.onToggleBtnClick}>
          {items.length}
          <s.DropdownIcon hasUnreadItems={hasUnreadItems} isDropdownOpen={this.state.isListVisible} />
        </s.ToggleBtn>
        <s.ChatList isVisible={this.state.isListVisible}>
          {items.map(item => this.renderItem(item, profiles[item.uid] || profiles.default))}
        </s.ChatList>
      </s.StackedChats>
    );
  }
}

StackedChats.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      hasUnread: PropTypes.bool.isRequired,
      uid: PropTypes.string.isRequired,
    }),
  ).isRequired,
  doChatWindowAction: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default StackedChats;
