import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.DropdownWrapper = styled.div`
  position: relative;
`;

styles.PhotoUploadBtnsSpace = styled.div``;

styles.AccountDropdown = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 56px;
  z-index: 1000;
  padding: 0;
  width: 390px;
  font-size: 13px;
  background: #fff;
  color: #72727d;
  background-clip: padding-box;
  cursor: text;
  border-radius: 3px;
  box-shadow: 0 4px 12px rgba(43, 59, 93, 0.35);
`;

styles.Thumbnail = styled.img`
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

styles.DropdownLink = styled.div`
  position: relative;
  display: block;
  padding: 12px 10px;
  transition: color 0.2s ease;
  text-decoration: none;
  color: #72727d;
  cursor: pointer;
  line-height: ${props => (props.isProfileDropddown ? '12px' : '28px')};
  color: #fff;
  font-size: 16px;
  background-color: ${props => (props.isActive ? '#f14d53' : 'transparent')};

  &:hover {
    background-color: #f14d53;
    border-bottom-color: transparent;
  }
`;

styles.DropdownArrowIcon = styled.span`
  display: inline-block;
  width: 10px;
  height: 6px;
  margin-left: 7px;
  background-image: url(/assets/top-navabc-pro-help-icn.png);
`;

styles.PhotoUpload = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: #f4f4f7;
  padding: 16px 21px 13px;
  border-radius: 3px 3px 0 0;
`;

styles.PhotoUploadPrompt = styled.div`
  background: url(/assets/privacy-case-v3.png) no-repeat left -138px;
  font-size: 14px;
  padding: 0 0 2px 27px;
  line-height: 16px;
`;

styles.PhotoUploadBtns = styled.div`
  display: flex;
  padding: 8px 0 5px;
`;

styles.PhotoPrivateMsg = styled.div`
  font-size: 12px;
`;

styles.Links = styled.div`
  display: flex;
  padding: 9px 16px 8px;
  flex-wrap: wrap;
`;

styles.Link = styled(Link)`
  display: block;
  flex: 0 0 auto;
  width: 50%;
  color: #72727d;
  font-size: 12px;
  padding: 7px;
  box-sizing: border-box;
  text-decoration: none;

  &:hover {
    background: #f0f0f0;
    text-decoration: none;
    color: #72727d;
  }
`;

styles.Upgrade = styled.div`
  display: 'block';
  margin: 0 16px 0;
  border-top: 1px solid #dfe0e3;
  padding: 11px 0 0;
  text-align: center;
`;

styles.ExpiryDate = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  margin-left: 10px;
  padding-left: 10px;

  &:before {
    background: url(https://img2.shaadi.com/assests/2016/images/small-badge-sprite-v3.png) no-repeat left -70px;
    width: 1px;
    height: 13px;
    display: inline-block;
    margin: 0 10px;
  }
`;

styles.Value = styled.span`
  font-weight: bold;
  color: #ff5a60;
`;

styles.CompareLink = styled(Link)`
  display: block;
  margin: 8px 0 14px;
  padding: 4px 10px;
  color: #00bcd5;
  text-decoration: none;
  outline: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.UpgradeBtn = styled(Link)`
  display: inline-block;
  font-size: 14px;
  padding: 4px 20px 5px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  margin-top: 8px;
  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;

styles.LinkIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  padding: 0 0 0 12px;
  background-image: url(/assets/privacy-case-v3.png);
  background-repeat: no-repeat;
  background-position: left
    ${props =>
      ({
        my_profiles_male: '-206px',
        my_profiles_female: '-224px',
        account_settings: '-242px',
        contact_filters: '-258px',
        sms_alerts: '-272px',
        my_settings: '-289px',
        logout: '-307px',
      }[props.icon])};
`;

export default styles;
