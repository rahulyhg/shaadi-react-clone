import styled from 'styled-components';
import ListingCard from '../../../theme/BoxShadow';

const styles = {};

styles.MatchItem = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
  margin: 10px;
`;

styles.Header = styled.div`
  margin: 0 0 12px;
`;

styles.Name = styled.span`
  display: flex;
  align-items: center;
  margin-top: -3px;
`;

styles.profileName = styled.div`
  height: 31px;
  color: #51505d;
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: 500;
  line-height: 28.8px;
  letter-spacing: 0.26px;
`;

styles.Body = styled.div`
  padding: 8px 10px 13px 10px;
  background: #fff;
  margin-top: -15px;
  height: 128px;
  box-sizing: border-box;
`;

styles.fullPhoto = styled.div`
  height: 120px;
  margin: 34px 20px;
  background: ${props =>
    props.gender === 'Female'
      ? 'url(/assets/silhouette-face-female.png) no-repeat left top'
      : 'url(/assets/silhouette-face-male.png) no-repeat left top'};
`;

styles.vectorWrap = styled.div`
  width: ${props => (props.isExtended === true ? '403px' : '360px')};
  background-image: linear-gradient(136deg, #88c86d 0%, #20bccf 100%);
  margin-left: ${props => (props.isExtended === true ? '0px' : '374px')};
  z-index: -2;
  &::before {
    position: absolute;
    left: ${props => (props.isExtended === true ? '331px' : '374px')};
    content: '';
    width: 0;
    height: 0;
    z-index: -1;
    border-bottom: 248px solid #ffffff;
    border-right: 55px solid transparent;
  }
`;
styles.MatchItemWrap = styled.div`
  border: solid ${props => (props.membershipTags === 'vip' ? '1px #aa1e3c' : '0 transparent')};
  background: #fff;
  display: flex;
  height: 248px;
  position: relative;
  width: 734px;
  border-radius: 3px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: ${props => (props.isExtended === true ? '#ffffff url(/assets/PCbg.svg) no-repeat left top' : '#ffffff')};
  background-position: 15px 28px;
  z-index: 1;
  box-shadow: ${ListingCard['box-shadow']};
  &:hover {
    box-shadow: ${ListingCard.hover_shadow};
  }
`;

styles.addPhotoWrap = styled.div`
  color: #00bcd5;
  font-family: 'Roboto';
  font-weight: 500;
  line-height: 14.4px;
  display: flex;
  margin: 12px 0px 0px 27px;
  position: absolute;
`;

styles.plusIcon = styled.span`
  width: 10px;
  height: 15px;
  font-size: 19px;
  letter-spacing: 0.23px;
  margin-right: 5px;
`;

styles.addPhotoText = styled.div`
  width: 78px;
  height: 19px;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.19px;
`;

styles.infoFirst = styled.div`
  font-size: ${props => (props.isExtended === true ? '20px' : '18px')};
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
`;

styles.infoSecond = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 50px;
`;

styles.addPhoto = styled.div`
  width: 142px;
  height: 36px;
  box-shadow: 0 4px 8px rgba(80, 80, 80, 0.2);
  border-radius: 22px;
  background-color: #ffffff;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    box-shadow: 0 4px 8px rgba(80, 80, 80, 0.51);
  }
`;

styles.profileRight = styled.div`
  width: 262px;
`;

styles.profileLeft = styled.div`
  width: 160px;
`;

styles.photoInfo = styled.div`
  width: 260px;
  height: 43px;
  color: #ffffff;
  font-family: 'Roboto';
  margin: ${props => (props.isExtended === true ? '38px 0px 0px 79px' : '38px 0px 0px 100px')};
`;
styles.profileNameHeader = styled.div`
  display: flex;
  margin: 21px 0 4px 0;
`;

styles.DetailsWrap = styled.div`
  height: 191px;
  display: flex;
`;

styles.ProfileDetailsWrap = styles.DetailsWrap.extend`
  width:422px;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.04);
  background-color: #ffffff;
  border-radius: 3px;
  z-index: 1;
  border: 1px solid #ededed;
  margin: 26px 0px 0px 26px;
  position: absolute;
`;

styles.ProfileDetailsWrapB = styles.DetailsWrap.extend`
  width:266px;
  margin: 40px 0px 0px 65px;
  display:flex;
`;

styles.likes = styled.div`
  width: 8px;
  height: 17px;
  color: #b1b3b9;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 700;
  margin: 3px;
`;

styles.otherLayer = styled.div`
  position: absolute;
  margin: 30px 24px;
`;

styles.ourProfileDetails = styled.div`
  width: 76px;
  height: 16px;
  color: #72727d;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 500;
  margin-top: 5px;
`;

styles.bottomBorder = styled.div`
  width: ${props => (props.Big ? '72px' : '34px')};
  height: 6px;
  border-radius: 3px;
  background-color: #f1f1f2;
  margin-top: 3px;
`;

styles.ourPhoto = styled.div`
  width: 70px;
  height: 70px;
  background: ${props =>
    props.gender === 'Female' ? 'url(/assets/demo_female.png) no-repeat left top' : 'url(/assets/demo_male.png) no-repeat left top'};
`;

styles.yourPhoto = styled.div`
  width: 70px;
  height: 70px;
  background-color: #ffffff;
  margin-bottom: 2px;
  background: ${props =>
    props.gender === 'Female'
      ? 'url(/assets/Silhouette_Female_70.png) no-repeat left top'
      : 'url(/assets/Silhouette_Male_70.png) no-repeat left top'};
`;

styles.topLayer = styled.div`
  display: flex;
  margin: 7px;
  position: absolute;
`;

styles.rightTopLayer = styles.topLayer.extend`
 right: 0;
`;

styles.thumsDown = styled.div`
  width: 20px;
  height: 20px;
  transform: rotate(5deg);
  background-color: #9d9da5;
  background: url(/assets/dislike.svg) no-repeat left top;
`;
styles.thumsup = styled.div`
  width: 20px;
  height: 20px;
  background-color: #7ac62d;
  background: url(/assets/like.svg) no-repeat left top;
`;

styles.hint = styled.div`
  margin: -4px -8px;
`;

styles.disclaimer = styled.div`
  display: flex;
  color: #95959d;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  font-weight: 300;
  position: absolute;
  bottom: 21px;
  margin-left: 16px;
`;

styles.disclaimerText = styled.div`
  width: 167px;
  height: 13px;
`;

styles.yourProfile = styled.div`
  width: 115px;
  height: 150px;
  box-shadow: -4px 5px 5px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  border: 1px solid #cdced1;
  background-color: #ffffff;
  transform: rotate(-10deg);
`;

styles.ourProfile = styled.div`
  width: 115px;
  height: 150px;
  box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  border: 1px solid #cdced1;
  background-color: #ffffff;
  z-index: 1;
  margin-left: 105px;
  transform: rotate(10deg);
  position: absolute;
`;
styles.lineBord = styled.div`
  width: 234px;
  border: 1px solid #dfe0e3;
  margin-left: -4px;
`;

styles.profileInfoWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  margin-top: 14px;
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
  font-family: 'Roboto';
  color: #95959d;
  width: 325px;
`;

styles.extraBorder = styled.div`
  width: ${props => (props.big ? '229px' : '151px')};
  height: 8px;
  border-radius: 4px;
  background-color: #f1f1f2;
  margin-top: 7px;
`;

styles.profileMoreInfo = styled.div`
  width: 60px;
  height: 59px;
  color: #95959d;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
  margin-left: 50px;
`;

styles.profileBasicInfo = styled.div`
  width: 101px;
  height: 59px;
  color: #95959d;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 21px;
`;

styles.ChatIcon = styled.span`
  background: url(/assets/chat-v1.gif) no-repeat left top;
  width: 31px;
  height: 19px;
  margin: 6px;
  display: inline-block;
  vertical-align: middle;
`;

styles.DetailDesc = styled.div`
  width: 160px;
`;

styles.ProfileDetails = styled.div`
  margin: 10px 0 0;
  > span:nth-child(1) {
    margin: 0 10px 0 0;
  }
  > span:nth-child(3) {
    margin: 0 10px 0 0;
  }
  > span:nth-child(5) {
    margin: 0 10px 0 0;
  }
`;

export default styles;
