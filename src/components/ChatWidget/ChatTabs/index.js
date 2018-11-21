/* global window */
import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../Toolbar';
import ChatList from '../ChatList';
import AlertList from '../AlertList';
import OnlineGroups from '../OnlineGroups';
import ProfileCard from '../ProfileCard';
import Tabs from '../Tabs';
import s from './styles';

class ChatTabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.chatSettings.activeTab,
      isPopoverVisible: false,
      popoverPos: {},
      popoverIconPos: {},
      popoverUid: null,
      source: 'none',
    };
    this.onTabClick = this.onTabClick.bind(this);
    this.onItemHover = this.onItemHover.bind(this);
    this.onItemBlur = this.onItemBlur.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.chatSettings.activeTab !== this.state.activeTab) {
      this.setState({
        activeTab: props.chatSettings.activeTab,
      });
    }
  }

  componentWillUnmount() {
    if (this.popoverTimeout) {
      clearTimeout(this.popoverTimeout);
    }
  }

  onTabClick(activeTab) {
    if (this.props.chatSettings.status === 'offline') {
      this.props.changeSettings('status', 'online');
    }
    this.setState({ activeTab });
    this.props.changeSettings('activeTab', activeTab);
    this.props.changeSettings('isOpen', true);
  }

  onItemHover(event, uid, source) {
    if (!uid) {
      return;
    }
    this.setState({ isPopoverVisible: false });
    if (this.popoverTimeout) {
      clearTimeout(this.popoverTimeout);
    }

    const position = event.target.getBoundingClientRect();
    const popoverPos = {
      top: position.top + position.height / 2, // eslint-disable-line no-mixed-operators
      arrow: `${position.top + position.height / 2}`, // eslint-disable-line no-mixed-operators
    };

    popoverPos.top = Math.min(popoverPos.top, window.innerHeight - 100);

    if (position.top < 150) {
      popoverPos.top = position.top + 80;
    }

    if (!this.props.isHeaderBarVisible) {
      popoverPos.top += 35;
    }

    this.popoverTimeout = setTimeout(() => {
      this.setState({ popoverPos, popoverUid: uid, isPopoverVisible: true, source });
      this.props.hideAllPopups(uid);
      this.props.showHideProfileCard('profileCardDisplay', true);
    }, 750);
  }

  onItemBlur() {
    if (this.popoverTimeout) {
      clearTimeout(this.popoverTimeout);
    }
    this.popoverTimeout = setTimeout(() => {
      this.setState({ isPopoverVisible: false });
      this.props.showHideProfileCard('profileCardDisplay', false);
    }, 100);
  }

  render() {
    return (
      <s.ChatTabs isOpen={this.props.chatSettings.isOpen}>
        <Toolbar chatSettings={this.props.chatSettings} changeSettings={this.props.changeSettings} />
        <s.Content activeTab={this.state.activeTab}>
          <AlertList
            items={this.props.sidebarItems.alerts}
            flash={this.props.flash}
            onItemHover={this.onItemHover}
            onItemBlur={this.onItemBlur}
            chatScrollHeight={this.props.chatScrollHeight}
          />
          <ChatList
            items={this.props.sidebarItems.chats}
            flash={this.props.flash}
            skew={this.props.skew}
            onItemHover={this.onItemHover}
            onItemBlur={this.onItemBlur}
            chatScrollHeight={this.props.chatScrollHeight}
            doChatWindowAction={this.props.doChatWindowAction}
            onOnlineMembeShow={() => this.onTabClick('online')}
          />
          <OnlineGroups
            items={this.props.sidebarItems.online}
            flash={this.props.flash}
            onItemHover={this.onItemHover}
            onItemBlur={this.onItemBlur}
            chatScrollHeight={this.props.chatScrollHeight}
            doChatWindowAction={this.props.doChatWindowAction}
          />
        </s.Content>
        <Tabs
          status={this.props.chatSettings.status}
          activeTab={this.state.activeTab}
          counts={this.props.chatCounts}
          onTabClick={this.onTabClick}
        />
        <s.Popover style={{ top: `${this.state.popoverPos.top}px` }} isVisible={this.state.isPopoverVisible}>
          <ProfileCard
            profile={this.props.profiles[this.state.popoverUid] || this.props.profiles.default}
            settings={this.props.settings}
            wwwBaseUrl={this.props.wwwBaseUrl}
            canInitiateChat={this.props.canInitiateChat}
            canShowUpgradeLink={this.state.activeTab !== 'alerts'}
            source={this.state.source}
            isVisible={this.state.isPopoverVisible}
            hoverCard={this.props.hoverCard}
            onProfileAction={this.props.onProfileAction}
            doChatWindowAction={this.props.doChatWindowAction}
          />
          <s.PopoverIcon style={{ top: `${this.state.popoverPos.arrow}px` }} />
        </s.Popover>
      </s.ChatTabs>
    );
  }
}

ChatTabs.defaultProps = {
  flash: null,
};

ChatTabs.propTypes = {
  flash: PropTypes.string,
  hoverCard: PropTypes.shape(PropTypes.hoverCard).isRequired,
  canInitiateChat: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  chatSettings: PropTypes.shape({
    activeTab: PropTypes.oneOf(['alerts', 'chats', 'online', 'none']).isRequired,
    status: PropTypes.oneOf(['invisible', 'online', 'offline']).isRequired,
    sounds: PropTypes.oneOf(['on', 'off']).isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  chatCounts: PropTypes.shape({
    alerts: PropTypes.number.isRequired,
    chats: PropTypes.number.isRequired,
    online: PropTypes.number.isRequired,
  }).isRequired,
  sidebarItems: PropTypes.shape({
    alerts: PropTypes.arrayOf(PropTypes.shape(AlertList.itemPropType)),
    chats: PropTypes.arrayOf(PropTypes.shape(ChatList.itemPropType)),
    online: PropTypes.shape({
      accepted: PropTypes.arrayOf(OnlineGroups.itemPropType).isRequired,
      shortlisted: PropTypes.arrayOf(OnlineGroups.itemPropType).isRequired,
      matches: PropTypes.arrayOf(OnlineGroups.itemPropType).isRequired,
    }).isRequired,
  }).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  skew: PropTypes.shape(PropTypes.skew).isRequired,
  isHeaderBarVisible: PropTypes.bool.isRequired,
  chatScrollHeight: PropTypes.number.isRequired,
  profiles: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  doChatWindowAction: PropTypes.func.isRequired,
  changeSettings: PropTypes.func.isRequired,
  onProfileAction: PropTypes.func.isRequired,
  hideAllPopups: PropTypes.func.isRequired,
  showHideProfileCard: PropTypes.func.isRequired,
};

export default ChatTabs;
