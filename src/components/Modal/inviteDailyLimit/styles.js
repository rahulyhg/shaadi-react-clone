import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.InviteLimitWrapper = styled.div`
  width: 559px;
  cursor: auto;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  z-index: 3;
`;
styles.Info = styled.div`
  font: bold 14px/18px arial;
  color: #434343;
  margin: 0;
  padding: 0 0 10px;
`;
styles.LockIcon = styled.div`
  display: inline-block;
  background: url(/assets/limit-lock.png) no-repeat left top;
  width: 22px;
  height: 22px;
  vertical-align: middle;
  margin: 0 5px 0 0;
`;
styles.UpgradeWrapper = styled.div`
  border: 1px solid #e7e5c3;
  border-radius: 3px;
  background: #f7f5da;
  padding: 15px 10px;
  line-height: 18px;
  font: normal 14px arial;
`;
styles.UpgradePara = styled.div``;
styles.ProfileLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.UpgradeLinkWrapper = styled.div`
  text-align: center;
  padding-top: 14px;
`;
styles.InviteUpgradeLink = styled(Link)`
  display: inline-block;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  box-shadow: none;
  font-size: 18px;
  padding: 6px 14px;
  text-decoration: none;
  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;
styles.Or = styled.div`
  background: url(/assets/or.png) no-repeat center top;
  width: 490px;
  height: 10px;
  margin: 23px 0 10px;
`;
styles.Shortlist = styled.p`
  font: normal 14px arial;
  color: #434343;
  margin: 0;
  padding: 0 0 10px;
`;
styles.ShorlistLink = styled(Link)`
  background: url(/assets/right-gray-arrow.png) no-repeat right center;
  padding: 0 11px 0 0;
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
