import styled, { keyframes } from 'styled-components';

const styles = {};

const albumSliderHt = 0.133 * window.innerHeight;

const zoom = keyframes`
  from {-webkit-transform:scale(0)} 
  to {-webkit-transform:scale(1)}
`;

const thumbfade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const thumbopen = keyframes`
  0% {
    width:0;
  }
  100% {
    width:62px;
  }
`;

styles.ModalLayer = styled.div`
  width: 80%;
  height: 95%;
`;
styles.AlbumModalClose = styled.span`
  clear: both;
  cursor: pointer;
  display: block;
  height: 30px;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 30px;
  transition: all 300ms ease;

  background: url(/assets/close-normal.png) no-repeat 11px 11px;

  &:hover {
    background: rgba(0, 0, 0, 0.08) url(/assets/close-hover.png) no-repeat 11px 11px;
  }
`;
styles.AlbumMain = styled.div`
  display: flex;
  height: 100%;
  animation-name: ${zoom};
  animation-duration: 0.6s;
  border-radius: 4px;
  padding: ${props => (props.showBanner ? `0 2px` : `2px`)};
  background-color: rgba(0, 0, 0, 0.9);
`;
styles.AlbumSlidesContainer = styled.div`
  position: relative;
  padding: 0;
  height: 100%;
  flex: 88%;
  max-width: ${props => (props.showBanner ? `88%` : `100%`)};
`;
styles.AlbumContainer = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.9);
  height: 86.1%;
  align-items: center;
  justify-content: space-between;
`;
styles.AlbumTitle = styled.div`
  position: absolute;
  left: 0;
  color: #fff;
  top: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  z-index: 2;
  padding: 14px;
  font: normal 12px 'Roboto', sans-serif;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
`;
styles.AlbumNav = styled.span`
  ${props => (props.isDisable ? 'opacity:0.3;' : 'cursor: pointer;')};
  ${props => (props.navNext ? 'right: 15px;' : 'left: 15px;')};
  visibility: ${props => (props.isVisible ? '' : 'hidden')};
  background: ${props =>
    props.navNext ? 'url(/assets/lightbox-left-arrow.png) no-repeat left top' : 'url(/assets/lightbox-right-arrow.png) no-repeat left top'};
  width: 19px;
  height: 30px;
  position: absolute;
  transition: all 300ms ease;
  top: 50%;
  margin-top: -15px;
  ${props =>
    !props.isDisable &&
    `&:hover{ 
	    transition: all 300ms ease;
	    background:${
        props.navNext
          ? `url(/assets/lightbox-left-arrow-hover.png) no-repeat left top;`
          : `url(/assets/lightbox-right-arrow-hover.png) no-repeat left top;`
      }}`};
`;
styles.AlbumPhotosWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: relative;
  margin: 0 auto;
`;
styles.AlbumPhotos = styled.div`
  position: relative;
  justify-content: center;
  align-items: center;
  display: flex;
`;
styles.AlbumSlides = styled.img`
  max-width: 100%;
  visibility: ${props => (props.canShowImage ? '' : 'hidden')};
  width: ${props => `${props.width}`};
  height: ${props => `${props.height}`};
  transition: opacity 600ms ease;
`;
styles.AlbumSlider = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  height: 14%;
  overflow: hidden;
  min-width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`;
styles.ThumbnailNav = styled.div`
  visibility: ${props => (props.isVisible === false ? 'hidden' : '')};
  width: 55px;
  z-index: 2;
  justify-content: center;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 23, 0.98);
`;
styles.NavSpan = styled.span`
  ${props => (props.isDisabled ? 'opacity:0.3;' : 'cursor: pointer;')};
  width: 12px;
  height: 17px;
  display: inline-block;
  transition: all 300ms ease;
  background: rgba(20, 20, 23, 0.98)
    ${props =>
      props.navNext
        ? 'url(/assets/lightbox-small-rig-arrow.png) no-repeat left top;'
        : 'url(/assets/lightbox-small-left-arrow.png) no-repeat left top;'};
  ${props =>
    !props.isDisabled &&
    `&:hover{ 
        transition: all 300ms ease;
        background: rgba(20, 20, 23, 0.98) ${
          props.navNext
            ? `url(/assets/lightbox-small-rig-arrow-hover.png) no-repeat left top`
            : `url(/assets/lightbox-small-left-arrow-hover.png) no-repeat left top;`
        }}`};
`;
styles.ThumbnailContainer = styled.ul`
  display: flex;
  overflow: hidden;
  padding: 0 !important;
  -moz-transition: margin 1s;
  -ms-transition: margin 1s;
  -webkit-transition: margin 1s;
  -o-transition: margin 1s;
  transition: all 1s;
  animation: 1s ease 0s 1 ${zoom};
`;
styles.ThumbList = styled.li`
  position: relative;
  list-style: none;
  padding: 1px;
  transition: all 1s;
  animation: ${thumbfade} 0.4s ease-in, ${thumbopen} 0.4s ease-in;
`;
styles.ThumbnailImg = styled.img`
  width: 60px;
  height: 60px;
  opacity: 0.3;
  cursor: pointer;
  text-align: center;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  transition: all 300ms ease;
  ${props => (props.isActive ? 'opacity: 1; border: 1px solid #fff;' : 'border: 1px solid rgba(20,20,23,0.98);')};
  &:hover {
    opacity: 1;
    transition: all 300ms ease;
  }
`;
styles.AlbumSlidesNumber = styled.div`
  color: #f2f2f2;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: normal 12px 'Roboto', sans-serif;
  padding: 8px 0;
  position: absolute;
  bottom: ${albumSliderHt + 30}px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 16px;
  left: 0;
  width: 74px;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
  text-align: center;
`;
styles.PromoBanner = styled.div`
  background-color: rgba(20, 20, 23, 0.98);
  align-items: center;
  z-index: 1;
  justify-content: center;
  border-radius: 0 4px 4px 0;
  padding: 5px;
  box-sizing: border-box;
`;

export default styles;
