import styled from 'styled-components';

const styles = {};

styles.Carousel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: relative;
`;

styles.CarouseButton = styled.div`
  flex: 0 0 auto;
  cursor: ${props => (props.hide && props.source === 'premiumCarousel' ? 'default' : 'pointer')};
  line-height: ${props => props.height};
`;

styles.RoundNav = styled.div`
  display: ${props => (props.hide ? 'none' : 'block')};
  background: rgba(0, 0, 0, 0.15) url(${props => (props.direction === 'next' ? '/assets/right-nav.png' : '/assets/left-nav.png')}) no-repeat
    ${props => (props.direction === 'next' ? 13 : 5)}px center;
  width: 25px;
  height: 50px;
  position: absolute;
  top: 84px;
  cursor: pointer;
  z-index: 8;
  ${props => (props.direction === 'next' ? 'border-radius: 0 50px 50px 0;right:-6px' : 'border-radius: 50px 0 0 50px;left:-3px')};
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

styles.RoundNavInnerWrap = styled.div`
  opacity: ${props => (props.hide ? '0' : props.isHovered ? '1' : '0')};
  width: 36px;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  height: 76px;
  top: 90px;
  transform: rotate(180deg);
  ${props => (props.direction === 'next' ? 'border-radius: 0 50px 50px 0;right: -10px' : 'border-radius: 50px 0 0 50px;left: -10px')};
  transition: opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

styles.RoundNavInner = styled.div`
  background: rgba(0, 0, 0, 0.3)
    url(${props => (props.direction === 'next' ? '/assets/left-dirc-arrow.svg' : '/assets/right-dirc-arrow.svg')})
    ${props => (props.direction === 'next' ? 5 : 9)}px center/11px no-repeat;
  width: 26px;
  height: 76px;
  position: absolute;
  top: 0;
  cursor: ${props => (props.hide ? 'default' : 'pointer')};
  z-index: 8;
  ${props => (props.direction === 'next' ? 'right: 0' : 'left: 0')};
  transition: background-color 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    background: rgba(0, 0, 0, 0.6)
      url(${props => (props.direction === 'next' ? '/assets/left-dirc-arrow.svg' : '/assets/right-dirc-arrow.svg')})
      ${props => (props.direction === 'next' ? 5 : 9)}px center/12px no-repeat;
  }
`;

styles.ButtonText = styled.div`
  display: ${props => (props.hide ? 'none' : 'block')};
  background: ${props =>
    !props.isSuccessStory
      ? props.direction === 'next'
        ? 'url(/assets/carousel-outer-arrow.png) no-repeat left -30px;'
        : 'url(/assets/carousel-outer-arrow.png) no-repeat left top;'
      : props.direction === 'next'
        ? 'url(https://img2.shaadi.com/assests/2016/payment/next.png) no-repeat right center;'
        : 'url(https://img2.shaadi.com/assests/2016/payment/previous.png) no-repeat left center;'};
  width: ${props => (props.isSuccessStory ? '29px' : '32px')};
  height: ${props => (props.isSuccessStory ? '29px' : '30px')};
  position: absolute;
  top: ${props => (props.isSuccessStory ? '30px' : '111px')};
  cursor: pointer;
  z-index: 10;
  ${props => (props.direction === 'next' ? 'right:0' : 'left:0')};

  &:hover {
    background: ${props =>
      !props.isSuccessStory
        ? props.direction === 'next'
          ? 'url(/assets/carousel-outer-arrow.png) no-repeat left -90px;'
          : 'url(/assets/carousel-outer-arrow.png) no-repeat left -60px;'
        : props.direction === 'next'
          ? 'url(https://img2.shaadi.com/assests/2016/payment/next-hover.png) no-repeat right center;'
          : 'url(https://img2.shaadi.com/assests/2016/payment/previous-hover.png) no-repeat left center;'};
  }
`;

styles.OuterContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: ${props => props.height};
  width: ${props => props.width};
  ${props => props.source === 'inbox' && `margin: 0 auto;`};
  ${props => (props.isSuccessStory ? 'left:44px' : '')};
`;

styles.Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  left: 0;

  transition: left ${props => ({ inbox: '0.63s', default: '', similarProfile: '0.8s', premiumCarousel: '0.5s' }[props.source])}
    ${props => ({ inbox: 'linear', default: 'linear', similarProfile: 'ease-in-out', premiumCarousel: 'ease-in-out' }[props.source])}
    ${props => ({ inbox: '', default: '500ms' }[props.source])};
  left: ${props => props.left};
`;
styles.shadow = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  width: 10px;
  box-shadow: ${props => (props.navDirection === 'next' ? '2px 1px 1px rgba(43, 59, 93, 0.15)' : '-2px 1px 1px rgba(43, 59, 93, 0.15)')};
  border-radius: 0 3px 3px 0;
  height: 218px;
  ${props => (props.navDirection === 'next' ? 'right:10px;' : 'left:13px;')} z-index:11;
  background: #fff;
`;
export default styles;
