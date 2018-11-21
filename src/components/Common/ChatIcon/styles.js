import styled, { keyframes } from 'styled-components';

const styles = {};

const blink = keyframes`
 0%{opacity:1;} 
 50%{opacity:0;}
 100%{opacity:1;}`;

const ChatIconMain = styled.span`
  width: 22px;
  height: 15px;
  margin: 0 0 0 5px;
  cursor: pointer;
  vertical-align: middle;
  background-image: url(/assets/online-status-icons.png);
  background-repeat: no-repeat;
  background-size: 22px;
  background-position: left -52px;
  animation: ${props => (props.icon === 'app_online' || props.icon === 'web_online' ? '1.5s' : '')} ${blink} normal infinite ease-in-out;
`;

styles.ListChatIcon = ChatIconMain.extend`
  margin: 0;
  background-position: ${props =>
    ({
      web_online: 'left -52px',
      app_online: 'left -52px',
      web_offline: 'left -96px',
      app_offline: 'left -96px',
      web_idle: 'left -74px',
      app_idle: 'left -74px',
    }[props.icon])};
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  vertical-align: ${props => (props.alignIcon ? 'sub' : 'middle')};
`;

styles.ListChatIcon.displayName = 'listChatIcon';

styles.GridChatIcon = ChatIconMain.extend`
  background-position: ${props =>
    ({
      web_online: 'left -52px',
      app_online: 'left -52px',
      web_offline: 'left -96px',
      app_offline: 'left -96px',
      web_idle: 'left -74px',
      app_idle: 'left -74px',
    }[props.icon])};
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  vertical-align: ${props => (props.alignIcon ? 'sub' : 'middle')};
`;

styles.GridChatIcon.displayName = 'gridChatIcon';

styles.ProfileOtherChatIcon = ChatIconMain.extend`
  background-position: ${props =>
    ({
      web_offline: 'left -96px',
      app_offline: 'left -96px',
      web_idle: 'left -74px',
      app_idle: 'left -74px',
    }[props.icon])};
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'margin: 0;'};
`;

styles.ProfileOtherChatIcon.displayName = 'profileOtherChatIcon';

styles.OnlineTabChatIcon = styled.span`
  flex: 0 15px;
  display: inline-block;
  width: 9px;
  height: 9px;
  background-image: url(/assets/online-status-icons.png);
  background-repeat: no-repeat;
  background-size: 9px;
  background-position: ${props =>
    ({
      web_online: 'left -10px',
      app_online: 'left -10px',
      web_idle: 'left top',
      app_idle: 'left top',
    }[props.icon])};
`;

styles.OnlineTabChatIcon.displayName = 'onlineTabChatIcon';

styles.ProfileOnlineChatIcon = styled.button`
  padding: 0;
  outline: 0;
  background: transparent;
  border: 0;
  line-height: initial;
  display: inline-block;
  vertical-align: text-top;

  &::after {
    content: '';
    background-image: url(/assets/online-status-icons.png);
    background-repeat: no-repeat;
    background-size: 22px;
    background-position: ${props =>
      ({
        web_online: 'left -52px',
        app_online: 'left -52px',
      }[props.icon])};
    width: 22px;
    height: 15px;
    display: inline-block;
    vertical-align: top;
    margin: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '-2px 0 0 -2px' : '-2px 0 0 5px')};
    animation: ${props => (props.icon === 'app_online' || props.icon === 'web_online' ? '1.5s' : '')} ${blink} normal infinite ease-in-out;
  }
`;

styles.ProfileOnlineChatIcon.displayName = 'profileOnlineChatIcon';

export default styles;
