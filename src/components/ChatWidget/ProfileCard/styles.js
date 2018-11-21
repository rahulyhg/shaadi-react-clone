import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.ProfileCard = styled.div`
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  display: flex;
  align-items: flex-start;
  width: 380px;
  min-height: 173px;
  background: #fff;
  border-radius: ${props => (props.plan === 'premium' ? '3px' : '5px')};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
  padding: 10px 8px 8px;
  z-index: 5;
  border-top: ${props => (props.plan === 'premium' ? '5px' : 0)} solid #ff5a60;
  transform: translateX(-10px) translateY(-50%);

  label {
    text-align: left !important;
  }

  &:hover {
    visibility: visible;
  }

  &:after {
    content: '';
    display: ${props => (props.plan === 'premium' ? 'block' : 'none')};
    position: absolute;
    right: 0;
    top: -1px;
    width: 40px;
    height: 40px;
    border-radius: 0 3px 0 0;
    background: url(/assets/pinterest-sprite-ver3.png) no-repeat left -90px;
  }
`;

styles.PhotoLink = styled(Link)`
  background: #fff;
  padding: 3px;
  display: block;
  border: 1px solid #dfe0e3;
`;

styles.Photo = styled.img`
  width: 125px;
  height: 167px;
`;

styles.Info = styled.div`
  flex: 1;
  margin: 0 0 0 9px;
`;

styles.NameLink = styled(Link)`
  display: inline-block;
  font: bold 12px/20px arial;
  color: #00bcd5;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 3px 0;
  text-decoration: none;
`;

styles.DetailList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  font: 11px/16px arial;
  color: #72727d;
`;

styles.Detail = styled.li`
  width: 100%;
`;

styles.Label = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 110px;
  color: #999;
`;
styles.Value = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding: 0 0 0 4px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

styles.ChatNowBtn = styled.button`
  justify-content: flex-start;
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  margin: 9px 5px 0 0;
  padding: 6px 12px;
  font: bold 12px arial;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  outline: 0;
`;

styles.ChatNowIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 13px;
  height: 14px;
  margin-left: 6px;
  background-position: left -168px;
  background-image: url(/assets/im-icon-sprite-ver2.png);
  background-repeat: no-repeat;
`;

styles.ChatInvitationLinkWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  padding: 0 0 10px;
  text-align: center;
  background: #fff;
`;

styles.ChatInvitationLink = styled(Link)`
  font: normal 11px/18px arial;
  text-align: center;
  color: #00bcd5;
  padding: 1px 20px 0 0;
  text-decoration: none;
  background: url(/assets/im-icon-sprite-ver2.png) no-repeat right -80px;
  &:hover {
    text-decoration: underline;
  }
`;

styles.InvitationNote = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  color: #999;
  font: normal 11px/16px arial;
  margin: 8px 0 0;
`;

styles.HiddenNote = styled.div`
  color: #dc5858;
  font: normal 11px/19px arial;
  margin: 10px 0 0;
`;

styles.Hiddenspan = styled.span`
  color: #72727d;
  font: normal 11px/19px arial;
  display: inline-block;
`;

styles.UnhideLink = styled(Link)`
  text-decoration: none;
  color: #00bcd5;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

styles.PhotoPrivacy = styled.div`
  top: ${props => (props.albumStatus === 'visibleOnAccept' ? '53px' : '42px')};
  left: 1px;
  font-family: 'Roboto', sans-serif !important;
  position: absolute;
  width: 124px;
  text-align: center;
`;

styles.PhotoPrivacyText = styled.span`
  display: block;
  color: #fff;
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.75);
  width: 125px;
  font: 400 12px 'Roboto', sans-serif;
  text-align: center;
  cursor: pointer;
`;

styles.PhotoPrivacyLock = styled.span`
  margin: 0 auto 6px;
  background: url(/assets/icn-photo-protected-v2.png) no-repeat center center;
  height: 40px;
  width: 31px;
  display: block;
  cursor: pointer;
`;

export default styles;
