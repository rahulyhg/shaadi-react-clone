import styled from 'styled-components';

const styles = {};
const tagBackgroundUrl = {
  premium: 'url(/assets/premium-plus-ribbon-v3.gif) no-repeat left -74px',
  premiumplus: 'url(/assets/premium-plus-ribbon-v3.gif) no-repeat left top',
  vip: 'url(/assets/premium-tag-icon-v3.png) no-repeat -130px -62px',
  select: 'url(/assets/shaadi-select-ribbon-v2.gif) no-repeat left top',
};
styles.PremiumBadge = styled.div.attrs({
  'data-badge': props => (props.plan && props.tag !== 'vip' && props.tag !== 'select' ? `${props.plan}A` : `${props.tag}A`),
})`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  z-index: 2;
  top: -5px;
  left: -5px;
  width: 65px;
  height: 65px;
  background: ${props =>
    props.plan && props.tag !== 'vip' && props.tag !== 'select'
      ? tagBackgroundUrl[props.plan.toLowerCase()]
      : tagBackgroundUrl[props.tag.toLowerCase()]};
`;
export default styles;
