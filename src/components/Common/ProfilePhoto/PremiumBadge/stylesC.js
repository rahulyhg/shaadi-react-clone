import styled from 'styled-components';

const styles = {};
const tagBackgroundUrl = {
  gold_plus: 'url(/assets/premium-tag-icon-v3.png) no-repeat -130px top',
  diamond_plus: 'url(/assets/premium-tag-icon-v3.png) no-repeat -65px -62px',
  platinum_plus: 'url(/assets/premium-tag-icon-v3.png) no-repeat left top',
  gold: 'url(/assets/premium-tag-icon-v3.png) no-repeat left -130px',
  diamond: 'url(/assets/premium-tag-icon-v3.png) no-repeat -70px -130px',
  platinum: 'url(/assets/premium-tag-icon-v3.png) no-repeat -140px -130px',
  special: 'url(/assets/premium-tag-icon-v3.png) no-repeat left -199px',
  special_plus: 'url(/assets/premium-tag-icon-v3.png) no-repeat -195px top',
  vip: 'url(/assets/premium-tag-icon-v3.png) no-repeat -130px -62px',
  select: 'url(/assets/shaadi-select-ribbon-v2.gif) no-repeat left top',
};
const tagHeight = {
  gold_plus: '62px',
  diamond_plus: '65px',
  platinum_plus: '62px',
  gold: '65px',
  diamond: '65px',
  platinum: '65px',
  special: '65px',
  special_plus: '62px',
  vip: '65px',
  select: '65px',
};
styles.PremiumBadge = styled.div.attrs({ 'data-badge': props => `${props.tag}C` })`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  z-index: 2;
  top: -5px;
  left: -5px;
  width: 65px;
  height: ${props => (props.tag ? tagHeight[props.tag] : '')};
  background: ${props => (props.tag ? tagBackgroundUrl[props.tag] : '')};
`;
export default styles;
