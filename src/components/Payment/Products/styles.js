import styled, { keyframes } from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

const shimmer = keyframes`
  0% {
        background-position: -4rem top;
    }

    70% {
        background-position: 12.5rem top; 
    }

    100% {
        background-position: 12.5rem top; 
    }
`;

const chatIconArr = {
  chat: 'background-position: -98px top;height:18px',
  call: 'background-position: -70px top;width:18px;height:18px',
  'get-highlighted': 'background-position: -127px top;height:14px',
  'top-search': 'background-position: left -554px;height:20px',
  advisor: 'background-position: left top;height:21px',
  handpicked: ' background-position: right top;height:20px',
  meeting: 'background-position: -31px top;height:17px',
  benefits: 'background-position: -222px top;height:18px',
  'all-premium-benefits': 'background-position: -222px top;height:18px',
  dedicated: 'background-position: left top;height:21px',
};

const tagArr = {
  best_value: 'background-position: -31px -554px;',
  top_seller: 'background-position: -31px -592px',
  your_plan: 'background-position: -31px -630px',
};

styles.ProductWrapper = styled.div`
  width: 620px;
`;

styles.PlanContainer = styled.div`
  border-radius: 3px;
  box-shadow: ${props =>
    props.isVisible
      ? 'rgba(0, 0, 0, 0.16) 0px 14px 50px, rgba(0, 0, 0, 0.16) 0px 2px 20px;'
      : 'rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;'} 
  background: #fff;
  padding: 13px 20px;
  margin: 0 0 10px 0;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 14px 50px, rgba(0, 0, 0, 0.16) 0px 2px 20px;
    transition: all 300ms ease;
  }  
`;
styles.PlanContainer.displayName = 'PlanContainer';

styles.PlanDetails = styled.div`
  font: 300 22px 'Roboto', sans-serif;
  display: flex;
`;
styles.PlanDetails.displayName = 'PlanDetails';

styles.Membership = styled.div`
  color: #51505d;
  width: 290px;
  padding: 3px 0 0;
`;
styles.Membership.displayName = 'Membership';

styles.Tag = styled.span`
  width: 81px;
  height: 24px;
  background-image: url(https://img2.shaadi.com/assests/2018/payment/payment-one-v5.png);
  background-repeat: no-repeat;
  ${props => (props.tagName ? tagArr[props.tagName] : '')};
  display: ${props => (props.tagName ? 'inline-block' : 'none')};
`;
styles.Tag.displayName = 'Tag';

styles.Month = styled.div`
  font: 400 16px 'Roboto', sans-serif;
`;

styles.PriceContainer = styled.div`
  font: 400 28px 'Roboto', sans-serif;
  color: #51505d;
  text-align: right;
  width: 270px;
`;
styles.PriceContainer.displayName = 'PriceContainer';

styles.Discount = styled.span`
  color: #89c965;
  font: 500 14px 'Roboto', sans-serif;
  vertical-align: middle;
  padding: 2px 0 0;
`;

styles.StrikeThrough = styled.span`
  background: url(https://img2.shaadi.com/assests/2016/payment/strikethrough-big.png) no-repeat left center;
  font: 400 18px 'Roboto', sans-serif;
  color: #72727d;
`;

styles.PermonthContainer = styled.div`
  font: 300 16px 'Roboto', sans-serif;
  color: #72727d;
`;
styles.PermonthContainer.displayName = 'PermonthContainer';

styles.PerMonth = styled.span`
  font: 300 14px 'Roboto', sans-serif;
`;

styles.FoldingArrow = styled.div`
  width: 20px;
  text-align: right;
  padding: 15px 0 0;
`;
styles.FoldingArrow.displayName = 'FoldingArrow';

styles.DownArrow = styled.span`
  width: 9px;
  height: 6px;
  display: inline-block;
  background-image: url(https://img2.shaadi.com/assests/2018/payment/payment-one-v5.png);
  background-repeat: no-repeat;
  cursor: pointer;
  background-position: ${props => (props.visible ? '-56px -342px' : '-56px -355px')};
  vertical-align: top;
`;

styles.FeaturesContainer = styled.div`
  border-top: 1px solid #dfe0e3;
  padding: 14px 0 7px 0;
  width: 580px;
  cursor: auto;
  margin: 10px 0 0;
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

styles.FeaturesWrapper = styled.div`
  ${props => (props.errorMsg ? 'height:170px' : 'height:145px')};
  overflow: hidden;

  ${props => (!props.isVisible ? 'transition: height .7s ease;height: 0px;' : 'transition: height 1s ease;')};
  position: relative;
  white-space: nowrap;
  z-index: 2;
`;

styles.FeatureList = styled.div`
  font: 400 16px 'Roboto', sans-serif;
  color: #72727d;
  padding: 0 0 10px 0;
  width: 276px;
`;

styles.FeaturesIcon = styled.div`
  align-self: center;
  width: 27px;
  ${props =>
    !props.available
      ? 'background: url(https://img2.shaadi.com/assests/2017/payment/strike-through-features.png) no-repeat left center;opacity: .6;'
      : ''};
`;

styles.FeaturesText = styled.span`
  align-self: center;
  font: 400 16px 'Roboto', sans-serif;
  color: #72727d;
  ${props =>
    !props.available
      ? 'background: url(https://img2.shaadi.com/assests/2017/payment/strike-through-features.png) no-repeat left center;opacity: .6;'
      : ''};
`;
styles.PlainDiv = styled.div`
  display: flex;
`;

styles.Icon = styled.span`
  background-image: url(https://img2.shaadi.com/assests/2018/payment/payment-one-v5.png);
  background-repeat: no-repeat;
  ${props => (props.icon ? chatIconArr[props.icon] : '')};
  display: inline-block;
  width: 20px;
  vertical-align: middle;
`;

styles.ContinueContainer = styled.div`
  position: relative;
  text-align: center;
  cursor: auto;
`;
styles.ContinueBtn = styled.button.attrs({ type: 'button' })`
  display: inline-block;
  position: relative;
  text-align: center;
  width: 160px;
  height: 42px;
  font: 400 18px 'Roboto', sans-serif;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  line-height: 40px;
  padding: 0;
  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
  &:active {
    padding: 0;
  }
`;
styles.DiscountError = styled.div`
  color: #e53a41;
  font: 300 14px 'Roboto', sans-serif;
  padding: 12px 0 0;
`;
styles.DiscountError.displayName = 'DiscountError';

styles.SelectLogo = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one-v5.png) no-repeat left -289px;
  width: 135px;
  height: 16px;
  display: inline-block;
  margin: 5px 0 0;
`;
styles.SelectLogo.displayName = 'SelectLogo';

styles.VipLogo = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one-v5.png) no-repeat left -316px;
  width: 103px;
  height: 14px;
  display: inline-block;
  margin: 0 0 10px;
`;
styles.VipLogo.displayName = 'VipLogo';

styles.SpacerFive = styled.div`
  padding: 5px;
`;

styles.VipShaadi = styled.div`
  font: 400 15px 'Roboto', sans-serif;
  color: #51505d;
  padding: 0 10px;
  text-align: center;
`;
styles.VipShaadi.displayName = 'VipShaadiDiv';
styles.GetInvited = styled(Link)`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one-v5.png) no-repeat right -519px;
  color: #00bcd5;
  font-weight: 500;
  line-height: 18px;
  padding: 0 13px 0 0;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.PlanWrapper = styled.div``;
styles.PersonalisedMonth = styled.span`
  font: 400 20px 'Roboto', sans-serif;
  color: #72727d;
`;
styles.PersonalisedTotal = styled.span`
  font: 400 16px 'Roboto', sans-serif;
  color: #51505d;
`;

styles.FeatureAdded = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  display: inline-block;
  display: inline-block;
  color: #fff;
  color: rgba(255, 255, 255, 0.1);
  background: -webkit-gradient(linear, left top, right top, from(#bf9b30), to(#bf9b30), color-stop(0.5, #fccb75));
  background: -moz-gradient(linear, left top, right top, from(#a67c00), to(#a67c00), color-stop(0.5, #fff));
  background: gradient(linear, left top, right top, from(#a67c00), to(#a67c00), color-stop(0.5, #fff));
  animation-iteration-count: infinite;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #a67c00;
  background-position: -4rem top;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation-name: ${shimmer};
  -webkit-animation-duration: 3.2s;
  -webkit-animation-iteration-count: infinite;
  -webkit-background-size: 4rem 100%;
  background-size: 50px 100%;
  width: 125px;
`;
styles.YourPlanWrapper = styled.div`
  margin: 0 0 0 -29px;
  width: 100px;
  height: 24px;
`;

styles.NewBadge = styled.span`
  background: #ffb400;
  font: 400 9px/13px Roboto, sans-serif;
  color: #fff;
  padding: 0 4px;
  border-radius: 3px;
  height: 13px;
  position: absolute;
  right: 4px;
  bottom: 22px;
`;
styles.TooltipWrapper = styled.div`
  display: flex;
`;
styles.Bullet = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #fff;
  margin: 6px 0 0;
`;
styles.TooltipText = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 2px 0 2px 4px;
`;
styles.ShimmerDefault = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  display: inline-block;
  color: #a67c01;
`;

styles.PersonalisedPlan = styled.div`
  color: #51505d;
  width: 620px;
  margin: 0 auto;
`;
styles.SelectPlanWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: #51505d;
`;

export default styles;
