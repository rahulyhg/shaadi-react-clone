import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};
styles.carouselProfile = styled.div.attrs({
  'data-carousel-item': props => (props.key ? `${props.key}` : ''),
})``;
styles.profileSlideWrapper = styled.div`
  width: 220px;
  height: 220px;
  border: 1px solid #dfe0e3;
  position: relative;
  margin: 15px 10px 0;
  position: relative;
`;
styles.profileImg = styled.span`
  display: block;
  height: 100%;
  border-radius: 0;
  background-size: 220px 273px;
  ${props => (props.image ? `background-image:url(${props.image});height:100%;background-repeat:no-repeat;` : '')};
`;
styles.ProfileBriefInfo = styled.div`
  margin: 6px 0;
`;

styles.Carousel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
`;

styles.CarouseButton = styled.div`
  flex: 0 0 auto;
  cursor: pointer;
  line-height: ${props => props.height};
`;

styles.ButtonText = styled.div`
  display: ${props => (props.hide ? 'none' : 'block')};
  background: ${props =>
    props.direction === 'next'
      ? 'url(https://img2.shaadi.com/community/images/discover-carousel-arrow.png) no-repeat left -30px;'
      : 'url(https://img2.shaadi.com/community/images/discover-carousel-arrow.png) no-repeat left top;'};

  width: 32px;
  height: 30px;
  position: absolute;
  top: 111px;
  cursor: pointer;
  z-index: 10;
  ${props => (props.direction === 'next' ? 'right:0' : 'left:0')};
`;

styles.OuterContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: ${props => props.height};
  width: ${props => props.width};
`;

styles.Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  left: 0;

  transition: left linear 500ms;
  left: ${props => props.left};
`;

styles.searchGp = styled.div`
  margin: 20px 0 0;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  font: normal 12px arial;
`;
styles.title = styled.div`
  ${props => (props.listBucket === 'A' ? 'padding: 8px 44px 0;' : 'padding: 8px 54px 0;')};
  align-self: center;
  display: flex;
`;
styles.titleHeading = styled.div`
  font: 500 20px 'Roboto', sans-serif;
  color: #72727d;
  margin: 0;
  flex: 1;
`;
styles.titleGoPremium = styled.div`
  font: 300 14px 'Roboto', sans-serif;
  color: #95959d;
  padding: 3px 0 0;
`;

styles.GoPremiumLink = styled(Link)`
  text-decoration: none;
  color: #00bcd5;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
styles.seeAllContainer = styled.div`
  text-align: center;
  border-top: 1px solid #dfe0e3;
  margin: 0 20px;
  padding: 6px 0;
`;
styles.seeAllLink = styled.div`
  text-decoration: none;
  color: #00bcd5;
  font: 500 15px/30px 'Roboto', sans-serif;
  cursor: pointer;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;
styles.PremiumCarouselItem = styled.div`
  width: 200px;
  margin: 10px;
  cursor: pointer;
  position: relative;
  transition-duration: 0.2s;
`;
styles.PremiumCarouselItem.displayName = 'ViewMoreItem';
styles.carouselProfilePhoto = styled.div`
  flex: 0 0 100%;
  height: 248px;
  margin-right: 0;
  position: relative;
`;
styles.carouselSlides = styled.div`
  position: relative;
  padding: 0;
  height: 248px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`;
styles.viewMore = styled.div`
  background: ${props => (props.gender === 'Male' ? 'url(/assets/view-all-female.png)' : 'url(/assets/view-all-male.png)')} no-repeat left
    top;
  font: 400 24px 'Roboto', sans-serif;
  color: #fff;
  width: 200px;
  margin-right: 0;
  height: 248px;
`;
styles.viewMorePad = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
`;
styles.viewMoreLink = styled.div`
  color: #fff;
  cursor: pointer;
  text-decoration: none;
`;
export default styles;
