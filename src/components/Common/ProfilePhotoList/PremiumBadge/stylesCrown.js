import styled from 'styled-components';

const styles = {};
const tagBackgroundUrl = {
  premium: '#ff5a60',
  premiumplus: '#ff5a60',
  vip: '#ad2241',
  select: '#bd4aff',
};
styles.PremiumBadge = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background: ${props =>
      props.plan && props.tag !== 'vip' && props.tag !== 'select'
        ? tagBackgroundUrl[props.plan.toLowerCase()]
        : tagBackgroundUrl[props.tag.toLowerCase()]}
    url(/assets/crown.svg) no-repeat 4px 3px;
  height: 20px;
  width: 20px;
  left: 6px;
  top: 5px;
  position: absolute;
  border-radius: 50%;
  z-index: 1;
`;
export default styles;
