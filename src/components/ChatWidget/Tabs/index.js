import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const Tabs = props => {
  if (props.status === 'offline') {
    return (
      <s.Tabs>
        <s.Tab isActive={false} onClick={() => props.onTabClick('alerts')} tabType="Alerts">
          <s.AlertIcon hasUnread={false} />
          Alerts
        </s.Tab>
        <s.Tab isActive={false} onClick={() => props.onTabClick('chats')} tabType="Chats">
          Chats
        </s.Tab>
        <s.Tab isActive={false} onClick={() => props.onTabClick('online')} tabType="Go Online">
          <s.OnlineIcon />
          Go Online
        </s.Tab>
      </s.Tabs>
    );
  }
  return (
    <s.Tabs>
      <s.Tab isActive={props.activeTab === 'alerts'} onClick={() => props.onTabClick('alerts')} tabType="Alerts">
        <s.AlertIcon hasUnread={props.counts.alerts} />
        Alerts {props.counts.alerts ? `(${props.counts.alerts})` : ''}
      </s.Tab>
      <s.Tab isActive={props.activeTab === 'chats'} onClick={() => props.onTabClick('chats')} tabType="Chats">
        Chats {props.counts.chats ? `(${props.counts.chats})` : ''}
      </s.Tab>
      <s.Tab isActive={props.activeTab === 'online'} onClick={() => props.onTabClick('online')} tabType="Active">
        Active ({props.counts.online})
      </s.Tab>
    </s.Tabs>
  );
};

Tabs.propTypes = {
  status: PropTypes.oneOf(['invisible', 'online', 'offline']).isRequired,
  activeTab: PropTypes.oneOf(['alerts', 'chats', 'online', 'none']).isRequired,
  counts: PropTypes.shape({
    alerts: PropTypes.number.isRequired,
    chats: PropTypes.number.isRequired,
    online: PropTypes.number.isRequired,
  }).isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default Tabs;
