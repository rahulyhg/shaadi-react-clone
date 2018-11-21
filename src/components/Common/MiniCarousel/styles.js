import styled from 'styled-components';

const styles = {};

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
      ? 'url(/assets/carousel-outer-arrow.png) no-repeat left -30px;'
      : 'url(/assets/carousel-outer-arrow.png) no-repeat left top;'};
  width: 32px;
  height: 30px;
  position: absolute;
  top: 111px;
  cursor: pointer;
  z-index: 10;
  ${props => (props.direction === 'next' ? 'right:0' : 'left:0')};

  &:hover {
    background: ${props =>
      props.direction === 'next'
        ? 'url(/assets/carousel-outer-arrow.png) no-repeat left -90px;'
        : 'url(/assets/carousel-outer-arrow.png) no-repeat left -60px;'};
  }
`;

styles.OuterContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: ${props => props.height};
  width: ${props => props.width};
  ${props => (props.premiumCarousel ? 'left:45px' : '')};
  margin: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '0 0 0 5px' : '')};
`;

styles.Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  left: 0;

  transition: left linear 500ms;
  left: ${props => props.left};
`;

styles.DrQueuePrevWrap = styled.div`
  margin: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '11px 0 0' : '18px 9px 0px 0px')};
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '25px' : '16px')};
  height: auto;
  float: left;
  overflow: hidden;
`;

styles.DrQueuePrev = styled.span`
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);'};
  display: ${props => (['B', 'C'].includes(props.profilePageBucket) ? 'inline-block' : 'block')};
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '25px' : '16px')};
  height: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '25px' : '18px')};
  cursor: pointer;
  background: ${props =>
    ['B', 'C'].includes(props.profilePageBucket)
      ? `${
          props.hide
            ? 'url(/assets/profile-prev-arrow-light.png) no-repeat 8px 6px'
            : 'url(/assets/profile-prev-arrow-dark.png) no-repeat 8px 6px'
        }`
      : `url(/assets/sprite.png) ${props.hide ? 'left -680px' : '-52px -680px'} no-repeat`};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'border: 0;'};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'outline: 0;'};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'border-radius: 50%;'};
  &:hover {
    ${props => ['B', 'C'].includes(props.profilePageBucket) && !props.hide && 'background-color: #dfe0e3'};
  }
`;

styles.DrQueueNextWrap = styled.div`
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '25px' : '16px')};
  height: auto;
  overflow: hidden;
  margin: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '10px -4px 0' : '16px 0 0 5px')};
  padding: 0px;
`;

styles.DrQueueNext = styled.span`
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);'};
  display: ${props => (['B', 'C'].includes(props.profilePageBucket) ? 'inline-block' : 'block')};
  cursor: pointer;
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '25px' : '16px')};
  height: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '25px' : '18px')};
  margin: 2px 0px 0px 0px;
  background: ${props =>
    ['B', 'C'].includes(props.profilePageBucket)
      ? `${
          props.hide
            ? 'url(/assets/profile-next-arrow-light.png) no-repeat 9px 6px'
            : 'url(/assets/profile-next-arrow-dark.png) no-repeat 9px 6px'
        }`
      : `url(/assets/sprite.png) ${props.hide ? '-26px -680px' : '-79px -680px'} no-repeat`};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'border: 0;'};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'outline: 0;'};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'border-radius: 50%;'};
  &:hover {
    ${props => ['B', 'C'].includes(props.profilePageBucket) && !props.hide && 'background-color: #dfe0e3'};
  }
`;

export default styles;
