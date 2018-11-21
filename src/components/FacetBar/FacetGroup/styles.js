import styled from 'styled-components';

const styles = {};

styles.Title = styled.div`
  display: flex;
  justify-content: space-between;
  font: bold 12px/20px arial;
  padding: 5px 8px;
  background: #f5f5f5;
  border-top: solid 1px #f5f5f5;
  border-bottom: solid 1px #f5f5f5;
  color: #72727d;
  background-image: ${props => (props.isLoading ? 'url(/assets/loading.gif)' : '')};
  background-position: center right;
  background-repeat: no-repeat;
`;

styles.ToggleBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  border: 1px solid #eee;
  width: 16px;
  height: 15px;
  line-height: 3px;
  outline: none;
  background: #f1f1f2 ${props => (props.isOpen ? 'url(/assets/minus-icon-v2.gif)' : 'url(/assets/plus-icon-v2.gif)')} 0px 0px no-repeat;
  cursor: pointer;
  padding: 0;
  border: 0;
  margin-top: 3px;
  margin-right: -3px;
`;

styles.Options = styled.div`
  padding: 8px 5px 13px 5px;
  background: #fff;
`;

styles.Option = styled.div`
  padding: 3px 0;
  font-size: ${props => (props.source === 'inbox' ? 12 : 11)}px;
`;

styles.Input = styled.input`
  vertical-align: middle;
  margin: 0 ${props => (props.type === 'checkbox' ? '6px' : '10px')} 0 3px;
  font: normal 11px arial;
`;

styles.Label = styled.label`
  display: inline-block;
  vertical-align: middle;
  color: #95959d;
  font-weight: ${props => (props.isAllLabel ? 'bold' : 'normal')};
`;

styles.Count = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  color: #bcbbbb;
  margin-left: 4px;
`;

styles.TitleText = styled.div`
  flex: 1;
`;

styles.OptionsWrapper = styled.div`
  max-height: ${props => (props.isOpen ? (props.itemCount ? `${props.itemCount * 30}px` : '500px') : 0)};
  overflow: ${props => (props.isMorePopoverVisible ? 'visible' : 'hidden')};
  transition: 0.5s linear max-height;
`;

export default styles;
