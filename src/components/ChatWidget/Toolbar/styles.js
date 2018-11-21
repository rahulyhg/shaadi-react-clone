import styled from 'styled-components';

const styles = {};

styles.Toolbar = styled.div`
  display: flex;
  background: #f1f1f2;
  border-bottom: solid 1px #dfe0e3;
  font: normal 12px arial;
  color: #72727d;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

styles.StatusDropdown = styled.div`
  position: relative;
  border-right: solid 1px #dfe0e3;
  width: 97px;
  color: #95959d;
`;

styles.LeftSection = styled.div`
  display: flex;
  flex: 1 1 auto;
`;

styles.Status = styled.div`
  display: flex;
  align-items: center;
  line-height: 20px;
  cursor: pointer;
  background: ${props => (props.isDropdownOpen ? '#fff' : 'transparent')};
`;

styles.StatusIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  margin: 2px 4px;
  height: 10px;
  background-image: ${props => (props.icon === 'offline' ? 'url(/assets/im-icons-v2.gif)' : 'url(/assets/im-icon-sprite-v8.png)')};
  background-repeat: no-repeat;
  background-position: 3px ${props => ({ online: '-251px', invisible: '-276px', dropdown: '-487px', offline: '-1064px' }[props.icon])};
`;

styles.DropdownStatusIcon = styled.span`
  flex: 0 1 14px;
  margin: 2px 4px;
  height: 10px;
  background-image: ${props => (props.icon === 'offline' ? 'url(/assets/im-icons-v2.gif)' : 'url(/assets/im-icon-sprite-v8.png)')};
  background-repeat: no-repeat;
  background-position: 3px ${props => ({ online: '-251px', invisible: '-276px', dropdown: '-487px', offline: '-1064px' }[props.icon])};
`;

styles.DropdownIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin: 4px 4px 0px 0px;
  flex: 0 0 14px;
  height: 10px;
  background-image: url(/assets/im-icons-v2.gif);
  background-repeat: no-repeat;
  background-position: 3px ${props => (props.icon === 'dropdownOpen' ? '-413px' : '-487px')};
`;

styles.StatusText = styled.span`
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  font-size: 11px;
  color: #95959d;
`;

styles.Dropdown = styled.div`
  display: flex;
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  position: absolute;
  top: 100%;
  left: -1px;
  width: 97px;
  border: solid 1px #ccc;
  border-top: 0;
  background: #fff;
  z-index: 2;
  flex-direction: column;
  max-height: ${props => (props.isVisible ? '40px' : 0)};
  overflow: hidden;
  width: 100%;
  transition: 0.5s linear;
`;

styles.StatusToggleBtn = styled.button`
  display: flex;
  flex: 1 0 auto;
  background: #fff;
  border: 0;
  border-top: 1px solid #d9d9d9;
  clear: left;
  padding: 3px 0;
  color: #72727d;
  text-decoration: none;
  cursor: pointer;
  text-align: left;
  outline: none;
  align-self: stretch;

  &:hover {
    background: #fffcd3;
  }
`;

styles.SoundsBtn = styled.button`
  display: inline-block;
  vertical-align: middle;
  outline: none;
  border: 0;
  background-color: transparent;
  height: 20px;
  width: 25px;
  background-image: url(/assets/im-icons-v2.gif);
  background-repeat: no-repeat;
  background-position: 3px ${props => (props.chatSounds === 'on' ? '-70px' : '-87px')};
  border-right: solid 1px #dfe0e3;
`;

styles.MinimiseBtn = styled.div`
  flex: 0 0 22px;
  text-align: right;
  margin: 0 4px;
  outline: none;
  border: 0;
  background-color: transparent;
  width: 15px;
  height: 24px;
  background-image: url(/assets/im-icon-sprite-v8.png);
  background-repeat: no-repeat;
  background-position: 3px -479px;
  cursor: pointer;
`;

export default styles;
