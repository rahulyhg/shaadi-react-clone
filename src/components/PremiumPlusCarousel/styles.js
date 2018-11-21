import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

const styleProperty = {
  fontfamily: 'Roboto, sans-serif',
  greydark: 'color: #51505d',
  displayinline: 'display: inline-block',
  textleft: 'text-align: left',
  textCenter: 'text-align: center',
  positionAbsolute: 'position: absolute',
};
styles.CarouselDetails = styled.div`
  ${styleProperty.positionAbsolute};
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  font-size: 10px;
  opacity: 1;
  transition: 450ms opacity;
`;
styles.BasicWrapper = styled.div`
  font: 300 13px/16px ${styleProperty.fontfamily};
  ${styleProperty.greydark};
  margin: 0 auto;
  ${styleProperty.textCenter};
  overflow: hidden;
  position: relative;
`;
styles.ProfileDescription = styled.div`
  padding: 0 10px;
  opacity: 0;
  height: 0;
  position: relative;
  text-decoration: none;
`;
styles.ProfileSpacer = styled.div`
  padding: 3px;
`;
styles.ContactedText = styled.div`
  font: 500 12px/17px ${styleProperty.fontfamily};
  color: #72727d;
  opacity: 0;
  height: 0;
  position: relative;
  padding: 35px 0 10px;
  ${styleProperty.textCenter};
`;

styles.ExtraFields = styled.div`
  opacity: 0;
  height: 0;
  overflow: hidden;
`;
styles.DetailsWrapper = styled.div`
  opacity: 0;
  font: 300 12px/15px ${styleProperty.fontfamily};
  ${styleProperty.greydark};
  ${styleProperty.textCenter};
  overflow: hidden;
  ${styleProperty.positionAbsolute};
  right: 0;
  top: 0;
  padding: 0 0 0 130px;
`;
styles.ThumbPhotoWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  padding: 0 0 7px 24px;
`;
styles.ThumbPhoto = styled(Link)`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-size: 100%;
  ${styleProperty.positionAbsolute};
  text-decoration: none;
`;
styles.ButtonWrapper = styled.div`
  ${styleProperty.positionAbsolute};
  bottom: -3px;
  left: 50%;
  transform: translate(-50%, -50%);
`;
styles.ContentWrapper = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  margin: 22px 0 0;
  position: relative;
`;
styles.TextHidden = styled.div`
  white-space: nowrap;
  overflow: hidden;
  width: 145px;
  text-overflow: ellipsis;
  color: #72727d;
  font-weight: 300;
`;
styles.ProfileName = styled(Link)`
  font: 500 14px/17px ${styleProperty.fontfamily};
  padding: 0 0 5px;
  text-decoration: none;
  ${styleProperty.greydark};
  ${styleProperty.displayinline};
  &:hover {
    text-decoration: underline;
  }
`;

styles.ProfileLink = styled(Link)`
  text-decoration: none;
  font: 400 12px/15px ${styleProperty.fontfamily};
  color: #72727d;
`;

styles.CarouselTile = styled.div`
  position: relative;
  ${styleProperty.displayinline};
  width: 160px;
  height: 230px;
  margin-right: 10px;
  font-size: 20px;
  transition: 450ms all;
  border-radius: 4px;
  background: #fff;
  transform-origin: center left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;
styles.CarouselTileLast = styled.div`
  position: relative;
  ${styleProperty.displayinline};
  width: 160px;
  height: 230px;
  font-size: 20px;
  transition: 450ms all;
  border-radius: 4px;
  background: #fff;
  transform-origin: center left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;
styles.NoScaleBadge = styled.div`
  ${styleProperty.positionAbsolute};
  top: -17px;
  left: -6px;
`;
styles.seeAllLink = styled.div`
  color: #00bcd5;
  font: 500 15px/30px ${styleProperty.fontfamily};
  cursor: pointer;
  ${styleProperty.displayinline};
  &:hover {
    text-decoration: underline;
  }
`;
styles.SeeAllContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 230px;
  justify-content: center;
  ${styleProperty.textCenter};
`;
styles.SeeAllWrapper = styled.div``;
styles.CarouselInner = styled.div`
  height: 230px;
  transition: 450ms transform;
  font-size: 0;
  white-space: nowrap;
  margin: 25px 0;
`;
styles.CarouselTitle = styled.div`
  padding: 0 5px 10px;
  position: relative;
`;

styles.BottomWrapper = styled.div`
  height: 55px;
  overflow: hidden;
`;

styles.MoreLink = styled(Link)`
  color: #00bcd5;
  cursor: pointer;
  ${styleProperty.displayinline};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.MoreText = styled.span`
  color: #00bcd5;
  cursor: pointer;
  ${styleProperty.displayinline};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.MoreLink.displayName = 'MoreLink';
styles.MainWrapper = styled.div`
  width: 734px;
  margin-left: 10px;
`;
styles.MainWrapper.displayName = 'MainWrapper';

styles.SeeAllArrow = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/profile/see-all-arrow.svg) no-repeat center center;
  width: 56px;
  height: 56px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 56px;
  margin: 20px auto 10px;
  ${styleProperty.displayinline};
`;
styles.PremiumMatches = styled.div`
  ${styleProperty.greydark};
  font: 400 14px/17px ${styleProperty.fontfamily};
`;

styles.TextNormal = styled.div`
  white-space: normal;
  color: #72727d;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  width: 130px;
  text-overflow: ellipsis;
  margin: 0 auto;
`;

export default styles;
