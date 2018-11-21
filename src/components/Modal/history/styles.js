import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.NoMessages = styled.div`
  width: 528px;
  height: 193px;
  padding: 105px 0 0;
  background: #fff;
  text-align: center;
`;
styles.ChatIcon = styled.div`
  width: 39px;
  height: 31px;
  background: url(/assets/no-chat.png) no-repeat center center;
  display: inline-block;
`;
styles.NoMessageLabel = styled.div`
  font: normal 18px/24px arial;
  color: #72727d;
`;
styles.LoadingWrapper = styled.div`
  position: relative;
  min-height: 50px;
  top: 50px;
`;
styles.InviteLimitWrapper = styled.div`
  width: 559px;
  cursor: auto;
  color: #434343;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  z-index: 3;
`;
styles.Main = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.Actions = styled.div`
  padding: 3px 5px;
  text-align: right;
  padding-bottom: 20px;
`;
styles.HistoryLink = styled.div`
  display: inline-block;
  font: normal 11px/14px arial;
  color: #00bcd5;
  margin: 5px 5px 0;
  text-decoration: none;
  padding: 0 0 0 17px;
  background: url(/assets/pop-icon-web-block-report.png) no-repeat ${props => (props.type === 'block' ? 'left -51px' : 'left -66px')};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
styles.Day = styled.div``;
styles.DayHeading = styled.div`
  text-align: center;
  background: url(/assets/dot.gif) center center repeat-x;
  font-size: 12px;
  color: #fff;
`;
styles.DayText = styled.span`
  display: inline-block;
  background: #95959d;
  border: 1px solid #95959d;
  width: 91px;
  line-height: 18px;
  border-radius: 10px;
`;
styles.Top = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
  color: #72727d;
  font-size: 12px;
`;
styles.TopNameLink = styled(Link)`
  font-weight: bold;
  background: url(/assets/org-arrow.gif) no-repeat left 1px;
  padding: 0 0 0 8px;
  text-decoration: none;
  color: ${props => (props.isSelf ? '#72727d' : '#00bcd5')};
  &:hover {
    text-decoration: underline;
  }
`;
styles.Time = styled.div``;
styles.Message = styled.div`
  margin-left: 7px;
  padding-bottom: 10px;
  color: #72727d;
  font-size: 12px;
  width: ${props => (props.ViewHistory ? '390px' : 'auto')};
`;

export default styles;
