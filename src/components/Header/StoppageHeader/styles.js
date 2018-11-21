import styled from 'styled-components';
import Link from '../../Common/Link';

const s = {};

s.Topbar = styled.div`
  position: relative;
  height: 56px;
  background: #ffffff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
  @media (max-width: 768px) {
    height: 54px;
  }
`;

s.Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 960px;
  margin: 0 auto;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

s.LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

s.LogoLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  @media (max-width: 768px) {
    margin-left: 15px;
  }
`;

s.RightWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;

s.SkipLinkHoverEffect = styled.span`
  display: flex;
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  align-items: center;
  opacity: 0.4;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }
`;

s.SkipLink = styled(Link)`
  border: 1px solid rgba(177, 179, 185, 0.5);
  border-width: 0 2px 2px 0;
  padding: 3px 2px 2px 3px;
  background: transparent;
  cursor: pointer;
  z-index: 2;
  transform: rotate(
    ${props =>
      ({
        up: -135,
        down: 45,
        right: -45,
        left: 135,
      }[props.arrow])}deg
  );
  width: 4px;
  height: 4px;
  margin-right: 2px;
  margin-left: 8px;
  &:focus {
    outline: none;
  }
  &:active {
    color: #fff;
  }
`;

s.Nextlink = styled(Link)`
  align-items: center;
  text-decoration: none;
`;

s.SkiplinkImg = styled.div`
  background: url(/assets/photo-cases-sprite-v3.png) -71px -134px;
  width: 30px;
  height: 30px;
  float: right;
  margin: 10px 16px 0 0;
  cursor: pointer;
  position: relative;
`;

s.BottomBar = styled.div`
  height: 120px;
  width: 100%;
  background: #42bbb9; /* Old browsers */
  background: linear-gradient(to right, #42bbb9 0%, #73c47c 100%);
`;

s.TooltipMainWrap = styled.div`
  position: relative;
  -webkit-tap-highlight-color: transparent;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 16px 0 0;
`;

s.TooltipWrap = styled.div`
  width: 18px;
  height: 18px;
  transition: all 300ms ease;
  cursor: help;
  width: 21px;
  height: 21px;
  background: url${props => (props.isActive ? '(/assets/stoppage-tooltip-hover.png)' : '(/assets/stoppage-tooltip.png)')} no-repeat left 0px;
  background-size: 21px;
`;

export default s;
