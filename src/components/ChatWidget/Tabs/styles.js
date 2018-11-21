import styled from 'styled-components';

const styles = {};

styles.Tabs = styled.nav`
  display: flex;
  height: 26px;
  background: #f1f1f2;
  border-top: solid 1px #dfe0e3;
  border-left: solid 1px #dfe0e3;
  border-right: solid 1px #dfe0e3;
  font: 11px arial;
  padding-bottom: 4px;
`;

styles.Tab = styled.button.attrs({
  'data-test-selector': props => props.tabType,
})`
  flex: 0 1 33%;
  padding: 4px;
  margin: -1px 0 0 1px;
  line-height: 17px;
  outline: 0;
  text-align: center;
  line-height: 18px;
  background: ${props => (props.isActive ? '#fff' : 'transparent')};
  border-left: ${props => (props.isActive ? 0 : '1px')} solid #f1f1f2;
  border-right: 1px solid #dfe0e3;
  border-bottom: ${props => (props.isActive ? '1px' : 0)} solid #dfe0e3;
  border-top: 1px solid ${props => (props.isActive ? '#fff' : '#dfe0e3')};
  cursor: ${props => (props.isActive ? 'normal' : 'pointer')};
  white-space: nowrap;

  &:hover {
    background: ${props => (props.isActive ? '#fff' : '#dfe0e3')};
  }
`;

styles.AlertIcon = styled.div`
  background: url(/assets/im-icon-sprite-ver6.png) no-repeat ${props => (props.hasUnread ? '0 -608px' : '0 -581px')};
  display: inline-block;
  height: 15px;
  width: 14px;
  margin: 0 5px 0 0;
  vertical-align: middle;
`;

styles.OnlineIcon = styled.div`
  display: inline-block;
  width: 22px;
  height: 18px;
  margin: 0 3px 0 0;
  vertical-align: middle;
  background-image: url(/assets/im-icon-sprite-v8.png);
  background-repeat: no-repeat;
  background-position: left -331px;
`;

export default styles;
