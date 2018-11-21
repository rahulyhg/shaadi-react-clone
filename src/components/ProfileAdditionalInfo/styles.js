import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

styles.ProfileAdditionalInfo = styled.div`
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '653px' : '668px')};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'margin: 20px 0 0'};
  background: #fff;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  border-radius: 3px;
`;

styles.Info = styled.ul`
  display: flex;
  flex-direction: column;
  padding: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '0px 15px 15px' : '15px')};
`;

styles.AboutBio = styled.div`
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '#51505d' : '#72727d')};
  word-wrap: break-word;
  white-space: pre-line;
`;

styles.UpgradeLockIcon = styled.span`
  position: absolute;
  bottom: 23px;
  right: 14px;
  background: url(/assets/lock-V2.png) no-repeat left top;
  width: 16px;
  height: 16px;
  left: 2px;
  top: 9px;
`;

styles.MoreDetails = styled.div`
  position: relative;
  border-top: 1px solid #e7e7e7;
  display: block;
  padding: 7px 0 15px 25px;
  margin: 7px 0 0;
`;

styles.UpgradeLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  font-weight: ${props => (props.isBold ? '400' : '')};
  &:hover {
    text-decoration: underline;
  }
`;

styles.MoreBtn = styled.button`
  background-color: transparent;
  border: 0;
  background-repeat: no-repeat;
  background-position: right;
  padding: 0;
  padding-right: 10px;
  color: #00bcd5;
  background-image: url('/assets/down-arrow.png');
  outline: 0;
`;

styles.AstroLoaderWrap = styled.div`
  border: 1px solid #f6f5e6;
  background: #fdfdf4;
  padding: 9px 26px;
  width: 525px;
  display: flex;
`;
styles.FirstCircleWrap = styled.span`
  width: 55px;
  height: 55px;
  margin: 0 17px 0 0;
`;
styles.FirstCircle = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
`;
styles.FirstCircleCounter = styled.div`
  position: absolute;
  top: 20px;
  width: 55px;
  font: bold 14px arial;
  text-align: center;
  z-index: 2;
  color: #666;
`;
styles.FirstCircleBg = styled.div`
  background: #dbf7fb;
  width: 55px;
  height: 55px;
  position: absolute;
  border-radius: 50%;
`;
styles.FirstCircleClipWrap = styled.div`
  clip: rect(0, 55px, 55px, 28px);
  position: absolute;
  width: 55px;
  height: 55px;
`;
styles.FirstCircleAnimation = styled.div`
  transform: rotate(219.6deg);
  border: 4px solid #00bcd5;
  position: absolute;
  width: 47px;
  height: 47px;
  clip: rect(0, 28px, 55px, 0);
  border-radius: 50%;
`;
styles.FirstCircleAnimation2 = styled.div`
  transform: rotate(180deg) !important;
  border: 4px solid #00bcd5;
  position: absolute;
  width: 47px;
  height: 47px;
  clip: rect(0, 28px, 55px, 0);
  border-radius: 50%;
`;
styles.FirstCircleBg2 = styled.div`
  background: #fff;
  width: 47px;
  height: 47px;
  position: absolute;
  border-radius: 50%;
  left: 4px;
  top: 4px;
  z-index: 1;
`;
styles.HorosLoader = styled.span`
  width: 55px;
  height: 55px;
  margin: 0 17px 0 0;
  display: inline-block;
  vertical-align: middle;
`;
styles.CircularLoader = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
`;
styles.CircularPercent = styled.div`
  position: absolute;
  top: 20px;
  width: 55px;
  font: bold 14px arial;
  text-align: center;
  z-index: 2;
  color: #666;
`;
styles.CircularLoaderTrack = styled.div`
  background: #dbf7fb;
  width: 55px;
  height: 55px;
  position: absolute;
  border-radius: 50%;
`;
styles.CircularLoaderTrack = styled.div`
  background: #dbf7fb;
  width: 55px;
  height: 55px;
  position: absolute;
  border-radius: 50%;
`;
styles.CircularLoaderTrackFill = styled.div`
  background: #fff;
  width: 47px;
  height: 47px;
  position: absolute;
  border-radius: 50%;
  left: 4px;
  top: 4px;
  z-index: 1;
`;
styles.HorosCopyWrap = styled.div`
  color: #333;
  font: 14px/18px arial;
  width: 440px;
`;
styles.HorosTitle = styled.span`
  font-weight: bold;
`;
styles.HorosText = styled.div`
  color: #72727d;
`;
styles.HorosTextLink = styled(Link)`
  color: #00bcd5;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  &:hover {
    text-decoration: underline;
  }
`;

styles.ProfessionDetails = styled.div`
  position: relative;
  border-top: 1px solid #e7e7e7;
  display: block;
  padding: 10px 0 15px;
  margin: 7px 0 0;
  font: 300 16px 'Roboto', sans-serif;
`;

export default styles;
