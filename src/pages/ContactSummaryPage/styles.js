import styled from 'styled-components';
import Link from '../../components/Common/Link';

const styles = {};
styles.filterContainer = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-align-items: flex-start; /* Safari 7.0+ */
  align-items: flex-start;
  padding: 20px 0 10px 10px;
  border-bottom: 1px solid #e5e5e5;
  position: relative;
  z-index: 899;
  color: #72727d;
`;

styles.InboxHeading = styled.h2`
  font: normal 18px arial;
  color: #72727d;
  padding: 0;
  margin: 0;
`;
styles.actionContainer = styled.div`
  flex: 1;
`;
styles.callSmsBalanceInfo = styled.div`
  padding: 6px 8px 0 0;
`;
styles.smsContacts = styled.div`
  padding: 1px 7px;
  border: 1px solid #e5e5e5;
  background: #f5f5f5;
  border-radius: 2px;
  float: left;
  color: #e54955;
  font-size: 18px;
`;

styles.ofSpan = styled.span`
  color: #72727d;
  font-size: 14px;
  display: inline-block;
  vertical-align: top;
  padding: 3px 3px 0;
`;
styles.InboxPage = styled.div`
  display: flex;
  width: 960px;
  font: normal 12px arial;
  color: #72727d;
  padding-top: ${props => `${props.topSpace}px`};
  margin: ${props => (props.isChatOpen ? `0 auto 0 ${(props.windowWidth - 1207) / 2}px` : '0 auto')};
`;
styles.InboxList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 0 20px 0;
  width: 100%;
`;
styles.noResultDiv = styled.div`
  border-bottom: solid 1px #e7e7e7;
  padding: 28px 10px 18px;
  color: #72727d;
  text-align: center;
  overflow: hidden;
  border-top: 1px solid #e7e7e7;
  font-size: 18px;
`;
styles.linkGoToInbox = styled(Link)`
  color: #00bcd5 !important;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  padding: 0 5px 0;
`;
styles.blueArrow = styled.span`
  display: inline-block;
  background: url(/assets/gray-arrow-big.png) no-repeat left top;
  width: 6px;
  height: 12px;
  font-size: 0;
  margin: 0 0 0 4px;
  cursor: pointer;
`;

export default styles;
