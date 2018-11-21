/* eslint no-mixed-operators: 0 */
import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

styles.Footer = styled.div`
  background: #e6e7e9;
`;

styles.FooterInnerMainWrap = styled.div`
  background: #fff;
`;

styles.FooterInnerWrap = styled.div`
  width: ${props => (props.windowWidth <= 1024 ? '960px' : '1060px')};
  margin: ${props =>
    props.isChatOpen && props.windowWidth > 1024
      ? props.windowWidth >= 1280 && props.windowWidth < 1360 ? `0 auto 0 28px` : `0 auto 0 ${(props.windowWidth - 1320) / 2}px`
      : '0 auto'};
`;

styles.Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 960px;
  margin: 0 auto;
  font: 400 12px 'Roboto', sans-serif;
  color: #72727d;
`;

styles.Nav = styled.nav`
  padding: 9px 5px 10px;
  &:nth-child(2) {
    padding: 13px 5px 0;
  }
`;

styles.Link = styled(Link)`
  position: relative;
  display: inline-block;
  text-decoration: none;
  font: 500 12px 'Roboto', sans-serif;
  color: #72727d;
  padding: 0 37px 0 0;

  &:after {
    content: '';
    position: absolute;
    top: 4px;
    right: 0;
    border-right: 0;
    height: 12px;
    vertical-align: middle;
    width: 1px;
  }

  &:hover {
    text-decoration: underline;
  }

  &:nth-child(7):after {
    border-right: 1px solid #cdced1;
  }

  &:nth-child(7) {
    padding: 0 46px 0 0;
  }
  &:nth-child(8) {
    padding: 0 0 0 42px;
    font-weight: 400;
  }
`;

styles.CopyrightWrap = styled.div`
  font-size: 12px;
  color: #72727d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px 12px 5px;
`;

styles.CopyLeft = styled.span`
  display: flex;
  flex: 1;
  > a {
    font-weight: 400;
  }
`;

styles.CopyRight = styled.span`
  text-align: right;
`;

styles.CopyrightLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.IconLink = styled(Link)`
  display: inline-block;
  width: 18px;
  height: 19px;
  vertical-align: middle;
  margin-left: 10px;
  font-size: 0;
  border-right: 0;
  background-image: url(https://img2.shaadi.com/assests/2018/images/shaadi-sprite-2-v11.png);
  background-repeat: no-repeat;
  background-position: left ${props => ({ apple: '-884px', android: '-904px' }[props.icon])};
`;

styles.CopyRightText = styled.div`
  color: #9b9b9b;
  font-size: 11px;
`;

export default styles;
