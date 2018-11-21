import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.Topbar = styled.div`
  position: relative;
  z-index: 1;
  height: 56px;
  background: #ff5a60;
`;

styles.Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${props => (props.windowWidth <= 1024 ? '960px' : '1060px')};
  margin: ${props =>
    props.isChatOpen && props.windowWidth > 1024
      ? props.windowWidth >= 1280 && props.windowWidth < 1360 ? `0 auto 0 28px` : `0 auto 0 ${(props.windowWidth - 1320) / 2}px`
      : '0 auto'};
`;

styles.LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 95px;
`;

styles.LogoLink = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  color: #fff;
  text-decoration: none;
`;

styles.CornerNav = styled.nav`
  display: flex;
  visibility: ${props => (props.accountType === 'FREE' || props.accountType === 'PAID' ? 'visible' : 'hidden')};
`;

styles.UpgradeLink = styled(Link)`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  background: 0;
  border: 1px solid #ffadb0;
  border-radius: 3px;
  padding: 0 10px;
  line-height: 32px;
  text-align: center;
  margin: 11px 10px;
  width: 76px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: #f14d53;
  }
`;

export default styles;
