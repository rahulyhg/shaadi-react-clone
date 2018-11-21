import styled from 'styled-components';
import Link from '../../components/Common/Link';

const styles = {};

styles.InlineLogin = styled.div`
  display: flex;
  width: 960px;
  border: 0;
  margin: ${props => (props.isChatOpen ? `0px auto 0 ${(props.windowWidth - 247 - 960) / 2}px` : '0px auto')};
  padding-bottom: 20px;
  font: 12px arial;
  color: #72727d;
  align-items: flex-start;
`;

styles.Sidebar = styled.div`
  flex: 0 0 224px;
`;

styles.Sidenav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 204px;
  margin: 46px 0 0;
  background: #fff;
`;

styles.SidenavTitle = styled.div`
  flex: 1 0 100%;
  border-left: 4px solid #e5e5e5;
  border-bottom: solid 1px #f1f1f2;
  height: 30px;
  font: bold 14px arial;
  padding-left: 10px;
  line-height: 30px;
  min-height: 30px;
`;

styles.NavLink = styled(Link)`
  flex: 1 0 100%;
  border-left: 4px solid #e5e5e5;
  border-bottom: solid 1px #f1f1f2;
  padding-left: 10px;
  font: normal 12px arial;
  text-decoration: none;
  outline: 0;
  padding: 7px 6px 6px 12px;
  color: #72727d;
  min-height: 20px;
`;

styles.NavLinkCaption = styled.span`
  display: block;
  font-size: 11px;
  margin-top: 3px;
  margin-left: 7px;
  min-height: 12px;
`;

styles.Title = styled.strong`
  display: block;
  margin-bottom: 3px;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
`;

styles.Message = styled.p`
  margin: 0;
  font: normal 12px arial;
  color: #72727d;
  text-decoration: none;
  line-height: 16px;
`;

styles.SubHeading = styled.p`
  margin-top: 20px;
  color: #d60000;
  font-weight: bold;
`;

styles.Options = styled.ul`
  margin: 24px 0 3px;
  padding: 0;
  list-style: disc inside;
`;

styles.Option = styled.li`
  list-style: disc inside;
  font: bold 14px arial;
  color: #72727d;
  padding-bottom: 12px;
`;

styles.Label = styled.strong``;

styles.LoginLink = styled(Link)`
  font: normal 12px arial;
  text-decoration: none;
  outline: 0;
  color: #00bcd5;

  &:hover {
    text-decoration: underline;
  }
`;

styles.RegisterLink = styled(Link)`
  display: block;
  width: 106px;
  font-weight: normal;
  font-size: 13px;
  text-decoration: none;
  outline: 0;
  background: #00bcd5;
  color: #fff;
  text-transform: uppercase;
  border-radius: 2px;
  outline: 0;
  padding: 10px 20px;
`;

styles.WhyJoinLink = styled(Link)`
  display: inline-block;
  font: normal 10px arial;
  text-decoration: none;
  outline: 0;
  color: #00bcd5;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

styles.Details = styled.div`
  display: block;
  margin-left: 37px;
  margin-top: 10px;
`;

styles.Content = styled.div``;

export default styles;
