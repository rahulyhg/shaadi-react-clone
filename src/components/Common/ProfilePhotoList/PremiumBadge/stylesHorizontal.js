import styled from 'styled-components';

const styles = {};
const tagBackgroundUrl = {
  premium: 'url(/assets/premium-tag.png) left top no-repeat',
  premiumplus: 'url(/assets/premium-tag.png) no-repeat left -38px',
  vip: 'url(/assets/premium-tag.png) no-repeat left -98px',
  select: 'url(/assets/premium-tag.png) no-repeat left -68px',
};
const tagWidth = {
  premium: '72px',
  premiumplus: '82px',
  vip: '55px',
  select: '62px',
};
styles.PremiumBadge = styled.div.attrs({
  'data-test-selector': props =>
    props.plan && props.tag !== 'vip' && props.tag !== 'select' ? `${props.plan}A plan_${props.tag}` : `${props.tag}A plan_${props.tag}`,
})`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: ${props => (props.source === 'inboxCard' ? 'relative' : 'absolute')};
  z-index: 2;
  top: ${props => (props.source === 'inboxCard' ? '2px' : '9px')};
  left: -6px;
  width: ${props =>
    props.plan && props.tag !== 'vip' && props.tag !== 'select' ? tagWidth[props.plan.toLowerCase()] : tagWidth[props.tag.toLowerCase()]};
  height: 30px;
  background: ${props =>
    props.plan && props.tag !== 'vip' && props.tag !== 'select'
      ? tagBackgroundUrl[props.plan.toLowerCase()]
      : tagBackgroundUrl[props.tag.toLowerCase()]};
`;
export default styles;
