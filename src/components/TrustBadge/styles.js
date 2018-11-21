import styled from 'styled-components';

const styles = {};

styles.TrustBadge = styled.div`
  display: ${props => (props.isHide ? 'none' : 'block')};
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '310px' : '258px')};
  margin-top: ${props => (props.isShieldView ? '20px' : '11px')};
  border: 3px solid #fff;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
`;

styles.BadgeIcon = styled.span`
  display: inline-block;
  vertical-align: top;
  margin: -15px 10px 0 2px;
  width: 45px;
  height: 55px;
  background: ${props => (props.isShieldView === 'green' ? 'url(/assets/shield-green-v2.svg)' : 'url(/assets/shield-white-v2.svg)')} left
    top no-repeat;
`;

styles.iconDivider = styled.span`
  color: #cdced1;
`;

styles.Heading = styled.h4`
  margin: 0;
  font-weight: normal;
  padding: 0 12px;
  background: #f1f1f2;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 16px/40px 'Roboto', sans-serif" : 'normal 16px/40px arial')};
  height: 45px;
  color: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '#51505d' : '#72727d')};
`;

styles.Details = styled.div`
  padding: 10px;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 14px/21px 'Roboto', sans-serif" : '14px/21px arial')};
  color: #72727d;
`;

styles.Actions = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
  border-top: ${props => (props.isBorderVisible ? '1px solid #d9d9d9' : '0')};
`;

styles.Btn = styled.button`
  display: inline-block;
  margin: 0 20px 0 15px;
  text-align: center;
  padding: 10px 0;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 12px/16px 'Roboto', sans-serif" : '12px/16px arial')};
  color: #00bcd5;
  background: transparent;
  border: 0;
  outline: 0;
  white-space: nowrap;
`;

styles.QuestionIcon = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 0 8px 0 -14px;
  cursor: default;
  vertical-align: middle;
  background: url(/assets/tooltip-icon.gif) no-repeat left top;
  cursor: help;

  &:hover {
    background: url(/assets/tooltip-icon.gif) no-repeat left bottom;
  }
`;

export default styles;
