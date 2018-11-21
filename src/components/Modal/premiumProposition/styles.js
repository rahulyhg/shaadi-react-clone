import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.PremiumBannerWrap = styled.div`
  display: block;
  background: #fff;
  padding: 0 96px 41px;
  position: relative;
  text-align: center;
  box-shadow: 0px 5px 39px 6px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
`;
styles.PremiumHead = styled.div`
  font: 500 20px 'Roboto', sans-serif;
  position: relative;
  margin: 29px 0;
  left: 12px;
  color: #51505d;
  &:before {
    content: '';
    background: url(/assets/premium-lock.png) no-repeat left top;
    width: 15px;
    height: 20px;
    position: absolute;
    left: 64px;
    top: 0;
  }
`;
styles.PremiumCloseBtn = styled.button`
  display: block;
  position: absolute;
  top: 14px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: url(/assets/close-normal.png) no-repeat 11px 11px;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  &:hover {
    background: rgba(0, 0, 0, 0.08) url(/assets/close-hover.png) no-repeat 11px 11px;
  }
`;
styles.MemberInfo = styled.div`
  border-bottom: 1px solid #dfe0e3;
  width: 307px;
  margin: 0 auto;
  display: flex;
  text-align: left;
  color: #72727d;
  font: 300 16px 'Roboto', sans-serif;
  align-items: center;
  padding: 0 0 19px;
`;
styles.PremiumPhoto = styled.img`
  border-radius: 50%;
  box-shadow: none;
  background: #fff;
  width: 80px;
  height: 80px;
  border: 1px solid #d6d6d6;
  display: inline-block;
  position: relative;
  margin: 0 14px 0 0;
`;
styles.MemberMoreInfo = styled.div``;
styles.PremiumName = styled.div`
  color: #51505d;
  font: 500 16px 'Roboto', sans-serif;
  margin: 0 0 4px;
`;
styles.PremiumMobile = styled.div``;
styles.PremiumEmail = styled.div`
  margin: 3px 0 0;
`;
styles.PremiumTxt = styled.div`
  font: 500 16px 'Roboto', sans-serif;
  margin: 0 0 20px;
  position: relative;
  width: 320px;
  margin: 21px auto 21px 78px;
  color: #51505d;
  &:before {
    content: '';
    background: url(/assets/premium-icon.png) no-repeat left top;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 68px;
    top: -1px;
  }
`;
styles.PremiumListWrap = styled.div`
  display: flex;
  display: flex;
  width: 448px;
  margin: 0 auto 28px;
`;
styles.PremiumWrap = styled.div`
  display: flex;
`;
styles.PremiumListUl = styled.ul`
  text-align: left;
  margin: 0 2px 0 0;
`;
styles.PremiumList = styled.li`
  list-style: none;
  font: normal 14px 'Roboto', sans-serif;
  position: relative;
  margin: 0 0 9px;
  &:before {
    content: '';
    background: url(/assets/premium-benefits-tick.png) no-repeat left top;
    width: 12px;
    height: 9px;
    position: absolute;
    left: -22px;
    top: 5px;
  }
`;
styles.DiscountMsgWrapper = styled.div``;
styles.PremiumViewPlan = styled(Link)`
  font: 500 18px 'Roboto', sans-serif;
  background: #00bcd5;
  text-decoration: none;
  border-radius: 3px;
  display: inline-block;
  padding: 10px 21px;
  margin: 11px 0 0;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  &:hover {
    background-color: #0194a8;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15) !important;
  }
`;

export default styles;
