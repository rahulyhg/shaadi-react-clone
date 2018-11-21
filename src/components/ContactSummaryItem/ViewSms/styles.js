import styled from 'styled-components';

const styles = {};
styles.viewSms = styled.span`
  margin: 11px 0 0;
  color: #00bcd5;
  cursor: pointer;
  outline: 0;
  font-weight: normal;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

styles.contact = styled.span`
  font: normal 12px arial;
`;
styles.viewSmsGrayBg = styled.span`
  display: inline-block;
  color: #8e8e8e;
  background: #f0f0f0;
  border-radius: 2px;
  padding: 4px 6px;
  margin: 7px 0 0;
  font: normal 11px arial;
  &:hover {
    background: #fff0ea;
    color: #dc5858;
  }
`;

styles.hideNumberUpArrow = styled.span`
  display: ${props => (props.isVeiwMsgClick ? 'inline-block' : 'none')};
  width: 10px;
  height: 7px;
  cursor: pointer;
  background: url(/assets/view_sms_arrow.gif) no-repeat left top;
`;

styles.hideNumberDownArrow = styled.span`{
    display : ${props => (props.isVeiwMsgClick ? 'inline-block' : 'none')};
    width: 10px;
    height: 7px;
    cursor: pointer;
    background-image: url(/assets/view_sms_arrow.gif);
    background-repeat: no-repeat;
    background-position: left -7px;
  `;
styles.viewSmsGrayBox = styled.div`
  min-height: ${props => (props.isVeiwMsgClick ? '25px' : '0')};
  background:  ${props => (props.isVeiwMsgClick ? '#f0f0f0' : '#fff')}; 
  border: ${props => (props.isVeiwMsgClick ? '1px' : '0')}; solid #ececec;
  border-radius: ${props => (props.isVeiwMsgClick ? '5px' : '0px')}; 
  padding: ${props => (props.isVeiwMsgClick ? '8px 11px' : '0px 11px')};
  font: normal 12px arial;
  color: ${props => (props.isVeiwMsgClick ? '#8e8e8e' : '#fff')};
  margin:  ${props => (props.isVeiwMsgClick ? '6px 0 0 !important' : '0px')};
  transition: height, 0.5s linear;  
`;

styles.viewSmsMsg = styled.div`
  background: url(/assets/dotted-border.gif) repeat-x left top;
  padding: 4px 0 0;
  margin: 6px 0 0;
`;

styles.viewMsgDiv = styled.div``;

export default styles;
