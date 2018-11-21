import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

const styleProperty = {
  fontfamily: 'Roboto, sans-serif',
  displayinline: 'display: inline-block',
};

styles.ContactDetails = styled.div`
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  padding: 15px;
  width: 208px;
  position: relative;
`;
styles.ContactDetails.displayName = 'ContactDetails';

styles.ContactWrapper = styled.div`
  display: flex;
`;
styles.ContactUpgrade = styled.div`
  color: #51505d;
  font: 300 16px ${styleProperty.fontfamily};
  padding: 0 25px;
  align-self: center;
`;
styles.NumberText = styled.div`
  color: #72727d;
  font: 400 14px/20px ${styleProperty.fontfamily};
  ${styleProperty.displayinline};
  padding: 0 0 0 8px;
`;
styles.NumberText.displayName = 'NumberText';

const IconArr = {
  mobile: 'width: 15px;height: 17px;background-position: left -1189px',
  inbox: 'width: 15px;height: 15px;background-position: left -1212px',
  lock: 'width: 28px;height: 28px;background-position: left -1267px',
  cancel: 'width: 28px;height: 28px;background-position: left -1096px',
  view: 'width: 28px;height: 28px;background-position: left -1233px',
};
styles.ProfileCardIcon = styled.span`
  ${styleProperty.displayinline};
  background-image: url(https://img2.shaadi.com/assests/2018/profile/pp-icon-sprite-v7.png);
  background-repeat: no-repeat;
  vertical-align: top;
  ${props => (props.icon ? IconArr[props.icon] : '')};
`;

styles.ProfileCardIcon.displayName = 'ProfileCardIcon';
styles.IconWrapper = styled.div`
  right: -14px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;
styles.SpacerTen = styled.div`
  padding: 10px;
`;

styles.UpgradeLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;
styles.ViewBtn = styled.button.attrs({ type: 'button' })`
  cursor: pointer;
  outline: 0;
  padding: 0;
  background: none;
  border: none;
  color: #00bcd5;
  font-weight: 400;
  &:hover {
    text-decoration: underline;
  }
`;
export default styles;
