import styled, { keyframes } from 'styled-components';
import Link from '../Common/Link';

const styles = {};

const ripple = keyframes`
 0%,35%{transform: scale(0);
    opacity: 1;} 
 50%{transform: scale(1.5);
    opacity: 0.8;} 
 100%{opacity: 0;
    transform: scale(4);}
 `;

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

styles.CornerNav = styled.nav.attrs({
  'data-test-selector': 'topband_cta',
})`
  display: flex;
  visibility: ${props => (props.accountType === 'FREE' || props.accountType === 'PAID' ? 'visible' : 'hidden')};
`;

styles.UpgradeLink = styled(Link)`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  background: #fc5c64;
  border: 1px solid #ffadb0;
  border-radius: 3px;
  padding: 1px 10px 0 10px;
  line-height: 31px;
  text-align: center;
  margin: 11px 10px;
  width: ${props => (!props.renewButton ? '140px' : '155px')};
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  &:hover {
    background: #f14d53;
  }
`;

styles.CrownIcon = styled.div`
  display: inline-block;
  background: center center url(/assets/white-crown.svg) no-repeat;
  background-size: 16px 16px;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin: ${props => (['extend', 'RENEW'].includes(props.upgradeType) ? '4px 6px 0 0' : '-4px 1px 0 0')};

  &:after {
    display: ${props => (props.showRipple ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: ${props => (props.upgradeType === 'RENEW' ? '20px' : '12px')};
    left: ${props => (props.upgradeType === 'RENEW' ? '15px' : '20px')};
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.9);
    opacity: 0;
    border-radius: 100%;
    transform-origin: 50% 50%;
    animation: ${ripple} 1.2s ease-out infinite;
    animation-delay: 1s;
    animation-iteration-count: 30;
  }
`;

export default styles;
