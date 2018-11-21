import styled from 'styled-components';

const styles = {};
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
`;
styles.inboxcontainer = styled.div``;

styles.Image = styled.img`
  border-radius: 50%;
`;
styles.ItemProfileDetails = styled.div`
  width: 700px;
  padding: 0 0 0 20px;
  order: 2;
`;

styles.itemTitle = styled.span`
  display: flex;
  flex-direction: row;
  color: #72727d;
  font-weight: bold;
  padding: 4px 0;
`;
styles.profileShortInfo = styled.div`
  word-wrap: break-word;
  color: #72727d;
  width: 100%!important
  word-wrap: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: normal;
  display: inline-block;
`;
styles.actionDesc = styled.span`
  background: #f3f3f3;
  font-size: 11px;
  color: #b1b3b9;
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
styles.ShowReportBlock = styled.div`
  padding: 0 14px 0 22px;
  height: 22px;
  background: #fff;
`;
styles.viewSmsMsg = styled.div`
  background: url(/assets/dotted-border.gif) repeat-x left top;
  padding: 4px 0 0;
  margin: 6px 0 0;
`;
styles.viewMsgDiv = styled.div``;

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
styles.profilePhoto = styled.div`
  margin: 0 0 0 10px;
  width: 60px;
  height: 60px;
  box-shadow: none;
  background: #fff;
  border-radius: 50%;
  border: 1px solid #d6d6d6;
  order: 1;
  position: relative;
  cursor: default;
`;
export default styles;
