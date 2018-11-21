import styled from 'styled-components';

const styles = {};
const tagBackgroundUrl = {
  default_premiumplus: 'url(https://img2.shaadi.com/assests/2018/profile/premium-crown.svg) no-repeat center center',
  default_select: 'url(https://img2.shaadi.com/assests/2018/profile/select-crown.svg) no-repeat center center',
  small_premiumplus: 'url(https://img2.img.shaadi.com/assests/2018/images/premiumplus-crown-small.svg) no-repeat center center',
  small_premium: 'url(https://img2.img.shaadi.com/assests/2018/images/premium-crown-small.svg) no-repeat center center',
  small_select: 'url(https://img2.img.shaadi.com/assests/2018/images/select-crown-small.svg) no-repeat center center',
  small_vip: 'url(https://img2.img.shaadi.com/assests/2018/images/vip-crown-small.svg) no-repeat center center',
  medium_premium: 'url(https://img2.img.shaadi.com/assests/2018/images/premium-crown-medium.svg) no-repeat center center',
  medium_premiumplus: 'url(https://img2.img.shaadi.com/assests/2018/images/premiumplus-crown-medium.svg) no-repeat center center',
  medium_select: 'url(https://img2.img.shaadi.com/assests/2018/images/select-crown-medium.svg) no-repeat center center',
  medium_vip: 'url(https://img2.img.shaadi.com/assests/2018/images/vip-crown-medium.svg) no-repeat center center',
};
styles.CrownBadge = styled.span.attrs({
  'data-badge': props => (props.plan && props.tag !== 'select' ? `${props.plan}` : `${props.tag}`),
})`
  width: ${props => (props.plan.toLowerCase() === 'select' ? '54px' : '48px')};
  height: 20px;
  display: inline-block;
  background: ${props =>
    props.plan && props.tag !== 'select'
      ? tagBackgroundUrl[`${props.crownType}_${props.plan.toLowerCase()}`]
      : tagBackgroundUrl[`${props.crownType}_${props.tag.toLowerCase()}`]};
  ${props => props.styles};
`;
export default styles;
