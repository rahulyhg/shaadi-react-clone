import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};
const centerAlign = (WrapHt, bannerHt) => (WrapHt - bannerHt) / 2;
styles.Banner = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  margin-top: ${props => (props.bannerDimension ? centerAlign(0.95 * window.innerHeight, props.bannerDimension.height) : '30')}px;
`;

styles.BannerLink = styled(Link)`
  outline: none;
`;

styles.Bannerimage = styled.img`
  ${props =>
    props.bannerDimension ? `width:${props.bannerDimension.width}px;height:${props.bannerDimension.height}px;` : `width: 264px;`};
`;

export default styles;
