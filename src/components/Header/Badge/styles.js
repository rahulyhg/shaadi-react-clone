import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.Badge = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: relative;
  padding: 3px 0 0;
  width: 88px;
  margin: 0 auto;

  &:hover img {
    top: 0;
  }
`;

styles.BadgeRibbon = styled.div`
  position: relative;
  margin: -5px 0 0;
  background: url(https://img2.shaadi.com/assests/2016/images/hbadge-curve-v2.png) no-repeat left top;
  width: 88px;
  height: 6px;
`;

styles.BadgeLink = styled(Link)`
  position: absolute;
  left: 5px;
  z-index: 900;
  overflow: hidden;
`;

styles.BadgeImg = styled.img`
  position: relative;
  top: -44px;
  transition: 0.2s ease top;
  width: 78px;
  height: 120px;
`;

export default styles;
