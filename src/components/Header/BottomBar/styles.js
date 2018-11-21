import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.BottomBarWrapper = styled.div`
  position: relative;
  background: #fff;
  top: 0;
  transform: translate3d(0, 0, 0);
  will-change: top;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
`;

styles.BottomBar = styled.div`
  display: block;
  width: ${props => (props.windowWidth <= 1024 ? '960px' : '1060px')};
  height: 41px;
  margin: ${props =>
    props.isChatOpen && props.windowWidth > 1024
      ? props.windowWidth >= 1280 && props.windowWidth < 1360 ? `0 auto 0 28px` : `0 auto 0 ${(props.windowWidth - 1320) / 2}px`
      : '0 auto'};
  transform: translate3d(0, 0, 0);
`;

styles.BottomNav = styled.nav`
  display: flex;
  justify-content: center;
  width: 850px;
  margin: 0 auto;
`;

styles.Link = styled(Link)`
  position: relative;
  display: flex;
  padding: ${props => (props.item === 'recommendations' ? `0 6px` : `12px 6px 10px`)};
  transition: color 0.2s ease;
  text-decoration: none;
  margin-right: 19px;
  border-bottom: 3px solid ${props => (props.isActive && props.isVisible ? '#ff5a60' : 'transparent')};
  font: ${props => (props.isNew ? '600' : '400')} 0.9em 'Roboto', sans-serif;
  color: ${props => (props.isActive ? '#ff5a60' : '#72727d')};
  cursor: pointer;
  &:hover {
    color: #ff5a60;
  }

  &:hover > div {
    display: block;
  }
  &:after {
    ${props => props.isNew && `content: '';background: #ff585c;width:6px;height:6px;border-radius:50%;position:absolute;right:-1px;`};
  }
`;

styles.DropdownArrow = styled.span`
  display: inline-block;
  width: 10px;
  height: 6px;
  margin-left: 7px;
`;

styles.DropdownNav = styled.div`
  display: none;
  position: absolute;
  left: 1px;
  top: 40px;
  z-index: 1;
  width: 174px;
  background: #fff;
  box-shadow: 0 1px 12px rgba(43, 59, 93, 0.35);
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  font-size: 14px;
  text-align: left;

  &:before {
    content: '';
    position: absolute;
    left: 40px;
    top: -7px;
    border-bottom: 7px solid #fff;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
`;

styles.DropdownLink = styled(Link)`
  display: block;
  padding: 10px 14px;
  color: #72727d;
  text-decoration: none;

  &:hover {
    background: #f1f1f2;
  }
`;

styles.RefineSearchBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  top: 100%;
  border: 0;
  background: #dfe0e3;
  font: normal 16px arial;
  color: #72727d;
  padding: 10px 0;
  text-align: center;
  width: 207px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  cursor: default;
  left: ${props =>
    props.windowWidth < 960 && !props.isChatOpen
      ? 0
      : props.isChatOpen ? `${(props.windowWidth - 1207) / 2}px` : `${(props.windowWidth - 960) / 2}px`};

  &::after {
    content: '';
    display: ${props => (props.isFacetOffScreen ? 'block' : 'none')};
    background: url(/assets/search-refine-notch-v2.png) no-repeat left bottom;
    width: 20px;
    height: 13px;
    position: absolute;
    bottom: -13px;
    left: 93px;
  }
`;
styles.Count = styled.div`
  width: 25px;
  height: 25px;
  background: url(/assets/CountBg.png) no-repeat;
  margin: 8px 0 0 6px;
  font: 700 14px 'San Francisco', sans-serif;
  text-align: center;
  color: #fff;
`;
styles.DRItem = styled.div`
  display: flex;
  flex-direction: column;
`;

styles.Label = styled.div`
  font: ${props => ({ small: `400 15px/9px 'Caveat' , sans-serif`, large: `700 20px 'Caveat' , sans-serif` }[props.size])};
`;
styles.Number = styled.div`
  margin: 4px 0;
`;
export default styles;
