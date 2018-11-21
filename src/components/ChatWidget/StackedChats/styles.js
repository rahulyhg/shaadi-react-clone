import styled from 'styled-components';

const styles = {};

styles.StackedChats = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  height: 100%;
  font-size: 11px;
`;

styles.ToggleBtn = styled.div`
  background: #dfe0e3;
  width: 30px;
  padding: 8px 0 3px 10px;
  white-space: nowrap;
  height: 20px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  border: 1px solid #e5e5e5;
  border-bottom: 0;
  writing-mode: lr-tb;
`;

styles.ChatList = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  position: absolute;
  bottom: 100%;
  right: 1px;
  width: 145px;
  flex-direction: column;
  writing-mode: bt-lr;
`;

styles.DropdownIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin: 2px 4px;
  flex: 0 0 14px;
  margin: 2px 2px 2px 4px;
  width: 9px;
  height: 9px;
  background-image: url(/assets/im-icons-v2.gif);
  background-repeat: no-repeat;
  background-position: ${props => (props.isDropdownOpen ? '0 -487px' : props.hasUnreadItems ? 'left -903px' : '0 -413px')};
`;

styles.Item = styled.div`
  flex: 1 0 100%;
  border: 1px solid #e5e5e5;
  background: #dfe0e3;
  border-bottom: 0;
  text-align: left;
  color: #000;
  cursor: pointer;
  width: 124px;
  height: 20px;
  padding: 8px 10px 3px;

  &:hover {
    background: #f1f1f1;
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
  writing-mode: lr-tb;
`;

styles.StatusIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin: 2px 4px;
  width: ${props => (props.hasUnread ? '16px' : '14px')};
  height: ${props => (props.hasUnread ? '16px' : '10px')};
  background-image: ${props => (props.hasUnread ? 'url(/assets/ico-chat-highlight.gif)' : 'url(/assets/im-icon-sprite-v8.png)')};
  background-repeat: no-repeat;
  background-position: ${props => (!props.hasUnread ? '3px -251px' : '')};
`;

export default styles;
