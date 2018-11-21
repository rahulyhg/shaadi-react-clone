import styled from 'styled-components';

const styles = {};

styles.ChatFlash = styled.div`
  text-align: 'center',
  font-size: 10px,
  padding: 5px,
`;

styles.ChatList = styled.div.attrs({
  'data-test-selector': 'chatList',
})`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex: 1;
  height: 100%;
`;

styles.ChatItem = styled.button.attrs({
  'data-test-selector': 'chatItem',
})`
  display: flex;
  position: relative;
  flex: 1;
  flex-basis: 100%;
  background: #fff;
  outline: none;
  border: 0;
  padding: 8px 3px 8px 6px;
  font-size: 11px;
  border-bottom: 1px solid #f1f1f2;
  overflow: hidden;
  width: 100%;
  flex-wrap: nowrap;

  &:hover {
    background-color: #f1f1f2;
  }

  &:before {
    content: '';
    position: absolute;
    right: 247px;
    width: 10px;
    height: 20px;
    margin: -12px 0 0;
    background-image: url(/assets/im-icon-sprite-ver6.png);
    background-position: left -106px;
    z-index: 5000;
  }
`;
styles.Photo = styled.img`
  width: 38px;
  height: 38px;
  margin-left: 10px;
  border: solid 1px #e7e5e8;
  border-radius: 50%;
`;

styles.Info = styled.div`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 16px;
`;

styles.TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

styles.Name = styled.strong`
  display: inline-block;
  flex: 1;
  font: bold 12px/20px arial;
  color: #51505d;
  text-align: left;
  padding: 0 3px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

styles.Time = styled.div`
  width: 51px;
  font-size: 11px;
  color: #b1b3b9;
  line-height: 20px;
  padding: 0 9px 0 0;
  text-align: right;
`;

styles.Message = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 5px;
`;

styles.StatusIcon = styled.span`
  display: ${props => (props.status === 'none' ? 'none' : 'inline-block')};
  padding: 0 4px 0 0;
  height: 12px;
  width: 12px;
  background: url(https://img2.shaadi.com/assests/2016/chat/im-icon-sprite-v8.png) right -626px;
  background-position: ${props => (props.status === 'read' ? '16px -585px' : '10px -624px')};
`;

styles.MessageText = styled.span`
  display: block;
  flex: 1;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 10px;
`;

styles.unreadCount = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  border-radius: 50px;
  background: #89c965;
  color: #fff;
  padding: 2px 6px;
  margin: 0 9px 0 0;
`;

styles.NoChatItems = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  text-align: center;
  top: 40%;
  left: 50%;
  margin: -77px 0 0 -114px;
`;

styles.ChatIcon = styled.span`
  display: inline-block;
  background: url(/assets/new-chat-icon-v3.png) no-repeat left -20px;
  background-size: 89px;
  width: 79px;
  height: 72px;
`;

styles.NoChatMessage = styled.p`
  font-size: 16px;
  color: #51505d;
  padding: 14px 0 12px;
  margin: 0;
`;

styles.NoChatCta = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #95959d;
  margin: 0;
`;

styles.OnlineMembersLink = styled.button`
  color: #00bcd5;
  text-decoration: none;
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0;
`;

export default styles;
