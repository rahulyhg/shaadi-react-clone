import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.ChatWindow = styled.div.attrs({
  'data-test-selector': 'chatWindow',
})`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 11px;
  margin-right: -1px;
  writing-mode: lr-tb;
`;

styles.StatusIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin: 2px 4px;
  width: ${props => (props.icon === 'offline' ? '14px' : '16px')};
  height: ${props => (props.icon === 'offline' ? '10px' : '16px')};
  background-image: ${props => ( //eslint-disable-line
  ) =>
    props.icon === 'highlight'
      ? 'url(/assets/ico-chat-highlight.gif)'
      : props.icon === 'offline'
        ? 'url(/assets/im-icons-v2.gif)'
        : props.icon === 'online' ? 'url(/assets/ico-chat-window.png)' : 'url(/assets/im-icon-sprite-v8.png)'};
  background-repeat: no-repeat;
  background-position: ${props =>
    ({ online: 'left', invisible: '3px -276px', dropdown: '3px -487px', offline: '3px -1064px' }[props.icon])};
`;

styles.CloseBtn = styled.button`
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  background: transparent;
  border: 0;
  outline: 0;
  vertical-align: middle;
  font: bold 12px arial;
  text-decoration: none;
  margin: 0 -10px 0 7px;
  color: #b9b9b9;

  &:hover {
    color: #646464;
  }
`;

styles.Dock = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 1px;
  width: 124px;
  height: 20px;
  padding: 8px 10px 3px;
  font-weight: bold;
  background: ${props => (props.isActive ? '#dfe0e3' : '#f1f1f2')};
  background-position: left -518px;
  border: 1px solid #e5e5e5;
  border-bottom: 0;
  text-align: left;
  color: #000;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  cursor: pointer;

  &:hover {
    background: #dfe0e3;
  }

  &:hover > button {
    visibility: visible;
  }
`;

styles.Name = styled.div`
  display: inline-block;
  width: 78px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: 0;
  vertical-align: middle;
  height: 16px;
  line-height: 14px;
  font-weight: bold;
`;

styles.Window = styled.section`
  display: ${props => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  right: 0;
  bottom: 100%;
  width: 228px;
  color: #72727d;
  border-left: 1px solid #dfe0e3;
  border-right: 1px solid #dfe0e3;
`;

styles.TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ff8b8f;
  font-weight: bold;
  color: #fff;
  padding: 5px 7px;
  border: solid 1px #ff8b8f;
`;

styles.TitleBtn = styled.button`
  background: transparent;
  border: 0;
  outline: 0;
  font: bold ${props => (props.isCloseBtn ? '12px' : '16px')} arial;
  margin: ${props => (props.isCloseBtn ? '0 0 0 7px' : '0')};
  padding: 0;
  vertical-align: ${props => (props.isCloseBtn ? 'inherit' : 'top')};

  &:hover {
    color: #2e7001;
  }
`;

styles.TitleBarBtns = styled.div`
  margin-bottom: -5px;
`;

styles.ChatLinks = styled.div`
  display: block;
  justify-content: space-around;
  font: 11px/20px arial;
  background: #fff;
  border-top: 0;
  border-bottom: 1px solid #dfe0e3;
  width: 226px;
  color: #ccc;
`;

styles.Link = styled(Link)`
  margin: 0 6px;
  color: #00bcd5;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

styles.DetailsTopWrapper = styled.div`
  display: flex;
`;

styles.Details = styled.div`
  position: relative;
  padding: ${props => (props.membershipLevel === 'Free' ? '6px' : '16px')} 0 0;
  background: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;

  &::before {
    display: ${props => (props.membershipLevel === 'Free' ? 'none' : 'block')};
    content: '';
    background: url(/assets/pinterest-sprite-ver3.png) no-repeat left -90px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

styles.PhotoLink = styled(Link)`
  display: block;
  flex: 0 0 60px;
  padding: 3px;
  border: 1px solid #dfe0e3;
  border-radius: 50%;
  height: 68px;
  margin: 0 0 0 8px;
  box-sizing: border-box;
`;

styles.Photo = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

styles.DetailList = styled.div`
  overflow: hidden;
  margin: 2px 8px 0 8px;
  font: 11px/16px arial;
  color: #72727d;
`;

styles.Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 325px;
  background: #fff;
  border-top: 0;
  overflow: auto;
`;

styles.Messages = styled.div`
  background: #fff;
`;

styles.Message = styled.div`
  padding: 3px;
  border-bottom: 1px solid #dfe0e3;
`;

styles.MessageLine = styled.div`
  margin: 0 0 3px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 12px;
`;

styles.MessagePhotoLink = styled(Link)`
  display: inline-block;
  vertical-align: top;
  width: 31px;
  padding: 1px;
  height: 31px;
  border-radius: 50%;
  box-sizing: border-box;
  margin: 0 10px 0 0;
  border: solid 1px #e7e5e8;
`;

styles.MessageDetails = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 180px;
`;

styles.Time = styled.div`
  text-align: right;
  font: 10px/11px arial;
  color: #acacac;
`;

styles.ReadIcon = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  vertical-align: bottom;
  background: url(/assets/im-icon-sprite-v8.png) right
    ${props =>
      props.status === 'read' ? '-587px' : props.status === 'delivered' ? '-667px' : props.status === 'sent' ? '-626px' : '-710px'};
  height: 11px;
  padding: 0 18px 0 0;
`;

styles.Desc = styled.div`
  width: 136px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

styles.ChatForm = styled.form`
  display: flex;
  border: solid 1px #dfe0e3;
  background: #fff;
  min-height: 24px;
`;

styles.MessageIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
  background-image: url(https://img2.shaadi.com/imgs/shbar/im-icons-v2.gif);
  background-position: left -334px;
  margin: 0 7px 0 4px;
  width: 14px;
  height: 24px;
`;

styles.Input = styled.input`
  background-color: #fff;
  border: 0;
  font: 11px arial;
  padding: 4px 4px 0;
  text-align: left;
  width: 193px;
  height: 20px;
  max-height: 60px;
  overflow: hidden;
  resize: none;
  outline: none;
`;

styles.InviatationInfo = styled.p`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: #fffab9 none repeat scroll 0 0;
  color: #72727d;
  font: 11px/31px arial;
  margin: 6px 0 0;
  text-align: center;
`;

styles.ChatInvitationLinkWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  padding: ${props => (props.showUpgardeText ? '10px 0' : '0')};
  text-align: center;
  background: #fff;
  border-bottom: 1px solid #ccc;
  font: normal 12px/18px arial;
  color: #9a9a99;
`;

styles.ChatInvitationTwoWayLinkWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  text-align: center;
  background: #fff;
  font: normal 12px/18px arial;
  border-bottom: none;
  position: absolute;
  bottom: 9px;
  color: #ff5a60;
  left: 28px;
`;

styles.ChatInvitationLink = styled(Link)`
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  display: ${props => (props.showUpgardeText ? 'inline-block' : 'none')};
  font: 12px/18px arial;
  text-align: center;
  color: #00bcd5;
  padding: 0 20px 0 0;
  text-decoration: none;
  background-position: right -82px;
  background-image: url(/assets/im-icon-sprite-ver2.png);
  background-repeat: no-repeat;
`;

styles.Flash = styled.div`
  font-size: 11px;
  color: #95959d;
  font-style: italic;
  text-align: center;
  padding: 0 0 3px;
  background: #fff;
`;

styles.GamificationWrap = styled.div.attrs({
  'data-test-selector': 'both_party_ab',
})`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: 210px;
  background: #fcffd0;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  margin: 9px 0 0 9px;
  padding: 0;
  display: flex;
  flex-direction: row;
`;

styles.GamifiedPeel = styled.div`
  background: #fff url(https://img2.shaadi.com/assests/2016/chat/gamification.png) no-repeat left top;
  width: 42px;
  height: 40px;
  padding: 10px 0;
  margin: 0;
`;

styles.GamifiedMessage = styled.div`
  font-size: 12px;
  background: #fcffd0;
  padding: 8px 6px 8px 0;
  width: 162px;
  line-height: 15px;
  margin: 0;
`;

styles.GamificationUpgradeLink = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  outline: 0;
  color: #00bcd5;

  &:hover {
    text-decoration: underline;
  }
`;

styles.ChatInviteText = styled.span`
  color: #ff0000;
`;

export default styles;
