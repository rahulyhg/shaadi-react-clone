import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

const CssMinProfile = styled.div`
  color: #72727d;
  width: 100%!important
  word-wrap: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
  display: inline-block;
`;

styles.inboxItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 926px;
  padding: 20px 22px 0 12px;
  font-weight: bold;
  box-shadow: 0 1px 2px #e7e7e7;
  border-top: solid 1px #e7e7e7;
  border-radius: 3px;
  background: #fff;
  color: #72727d;
  font: normal 12px arial;
`;
styles.unifiedProfileActivity = styled.div`
  color: #b1b3b9;
  font: normal 11px arial;
  padding: 9px 0 0;
  flex: 1;
  width: 134px;
  text-align: right;
  order: 3;
`;

styles.ItemProfileDetails = styled.div`
  width: 700px;
  padding: 0 0 0 20px;
  order: 2;
`;
styles.userActionBtn = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: row;
`;

styles.inboxcontainer = styled.div``;
styles.msgContainer = styled.div`
  word-wrap: break-word;
  color: #72727d;
  border-top: 1px solid #dbc9dc !important;
  padding: 2px;
`;
styles.premiumDetailSec = styled.ul`
  color: #72727d;
  font: 12px/18px arial;
  list-style: none outside none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
styles.preDetailItems = styled.li`
  display: flex;
  flex-direction: row;
  margin: 0 25px 0 0;
  vertical-align: middle;
  color: #b1b3b9;
`;
styles.preLabels = styled.span`
  display: flex;
  flex-direction: row;
  color: #323d5f;
  width: 122px;
`;
styles.preValue = styled.span`
  color: #72727d;
  max-width: 248px;
  overflow: hidden;
  padding: 0 0 0 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

styles.actionDesc = styled.span`
  background: #f3f3f3;
  font-size: 11px;
  color: #b1b3b9;
`;

styles.contactSummaryEnabled = styled.span`
  background-position: -19px top;
  display: inline-block;
  width: 19px;
  height: 21px;
  background-image: url(/assets/contact-icons.gif);
  background-repeat: no-repeat;
`;
styles.contactSummaryDisabled = styled.span`
  background-position: left top;
  display: inline-block;
  width: 19px;
  height: 21px;
  background: url(/assets/contact-icons.gif) no-repeat 0 0;
`;
styles.hideNumberDisabledNew = styled.span`
  background-position: left top;
  display: inline-block;
  width: 15px;
  height: 21px;
  background: url(/assets/icon-set-1-v2.png) no-repeat -118px top;
`;
styles.contactSummaryVerifying = styled.span`
  background-position: left top;
  display: inline-block;
  width: 15px;
  height: 21px;
  background: url(/assets/contact-icons.gif) no-repeat 0 0;
`;

styles.contactHidden = styled.span`
  display: inline-block;
  color: #72727d;
  background: #ffffbe;
`;

styles.contactSummaryText = styled.span`
  background-position: -19px top;
  display: inline-block;
  width: 19px;
  height: 21px;
  background-image: url(/assets/contact-icons.gif);
  background-repeat: no-repeat;
`;

styles.contactHidden = styled.span`
  font: normal 12px arial;
  background: #ffffbe;
`;

styles.profileShortInfo = CssMinProfile.extend`
  word-wrap: break-word;
`;

styles.unifiedMinProfile = styled.div`
  color: #72727d;
  width: 100%!important
  word-wrap: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
  display: inline-block;
`;

styles.ShowReportBlock = styled.div`
  padding: 0 14px 0 22px;
  height: 38px;
  background: #fff;
`;

styles.noCss = styled.span`
  font-weight: normal !important;
`;
styles.termsLink = styled(Link)`
  color: #00bcd5;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.itemTitle = styled.span`
  display: flex;
  flex-direction: row;
  color: #72727d;
  font-weight: bold;
  padding: 4px 0;
`;
styles.premiumTag = styled.span`
  background: url(/assets/premium-plus-v2.gif) no-repeat left top;
  width: 63px;
  height: 16px;
  display: inline-block;

  vertical-align: text-top;
  margin: -2px 0 0 5px;
`;
styles.noCssDiv = styled.div``;

export default styles;
