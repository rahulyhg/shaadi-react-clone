import styled from 'styled-components';

const s = {};

s.UsefulHead = styled.div`
  font: bold 12px arial;
  color: #72727d;
`;

s.UseFulLinks = styled.div`
  display: flex;
  margin: 10px 0;
`;

s.InviteFrnds = styled.span`
  width: 18px;
  height: 17px;
  background: url(/assets/icon-set-1-v1.gif) no-repeat left top;
  margin-right: 10px;
`;

s.InviteFrndsTxt = styled.a`
  border-bottom: solid 1px #e5e5e5;
  height: 17px;
  color: #00bcd5;
  font: normal 12px arial;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

s.NeedHelpIcon = styled.span`
  width: 18px;
  height: 17px;
  background: url(/assets/icon-set-1-v1.gif) no-repeat -18px top;
  margin-right: 10px;
`;

s.SecurityTips = styled.span`
  width: 18px;
  height: 17px;
  background: url(/assets/icon-set-1-v1.gif) no-repeat -36px top;
  margin-right: 10px;
`;

s.OtherLinkWrapper = styled.div``;

export default s;
