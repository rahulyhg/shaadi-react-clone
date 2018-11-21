import styled, { css } from 'styled-components';

const styles = {};

const NavLinkCss = (isActive, cssType) => {
  switch (cssType) {
    case 'color': {
      return isActive === true ? '#ff5a60' : isActive === false ? '#ff5a60' : '#72727d';
    }
    case 'font': {
      return isActive === true ? '400' : isActive === false ? '400' : '300';
    }
    case 'transform': {
      return isActive === true ? 'scaleX(1)' : 'scaleX(0)';
    }
    default: {
      return '';
    }
  }
};

styles.tabList = {
  display: 'flex',
  width: '620px',
  flex: '1',
};
styles.tabBorder = {
  borderBottom: '1px solid #d1d2d5',
  display: 'flex',
  padding: '17px 0 0',
};

styles.tab = {
  outlineWidth: '0',
  color: '#72727d',
  display: 'block',
  position: 'relative',
  font: '300 20px Roboto, sans-serif',
  transition: 'all 0.2s ease 1s',
  textDecoration: 'none',
  width: '310px',
  textAlign: 'center',
  cursor: 'pointer',
};
styles.getListStyle = () => ({
  ...styles.tabList,
});
styles.getStyle = ({ isActive, isHover }, defaultStyle) => ({
  ...styles.tab,
  ...(isActive || isHover
    ? {
        color: '#ff5a60',
        font: isHover && !isActive ? '300 20px Roboto, sans-serif' : '400 20px Roboto, sans-serif',
        border: 0,
        bottom: 0,
        left: 0,
        position: 'relative',
        transition: 'font 0.2s ease 1s',
        width: '310px',
      }
    : {}),
});

styles.PaymentContainer = styled.div`
  width: 940px;
  margin: 0 auto;
`;
styles.tabBorder = styled.div`
  border-bottom: 1px solid #d1d2d5;
  display: flex;
  padding: 17px 0 0;
`;
styles.PaymentContainer.displayName = 'PaymentContainer';

styles.NavWrapper = styled.div`
  border-bottom: 1px solid #d1d2d5;
  padding: 17px 0 0;
  display: flex;
`;
styles.TabsContainer = styled.div`
  width: 620px;
  display: flex;
  flex: 1;
`;
styles.NavLink = styled.div`
  color: ${props => NavLinkCss(props.isActive, 'color')};
  display: block;
  position: relative;
  padding: 0 0 6px;
  font: ${props => NavLinkCss(props.isActive, 'font')} 20px 'Roboto', sans-serif;
  transition: color 0.2s ease 0s;
  text-decoration: none;
  width: 310px;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #ff5a60;
    transition: all 0.2s ease;
  }
  &::after {
    background: #ff5a60;
    bottom: 0;
    content: '';
    height: 3px;
    left: 0;
    position: absolute;
    transform: ${props => NavLinkCss(props.isActive, 'transform')};
    transition: transform 0.2s ease 1s;
    width: 100%;
  }
`;

styles.PremiumPromise = styled.div``;

styles.LinkMixin = css`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat right -519px;
  color: #00bcd5;
  font: 300 14px 'Roboto', sans-serif;
  line-height: 22px;
  padding: 0 12px 0 0;
  cursor: pointer;
  text-decoration: none;
`;

styles.ComparePlanMixin = css`
  ${css(styles.LinkMixin)};
`;

styles.CompareWrapper = styled.div`
  text-align: right;
  width: 320px;
`;
// styles.ComparePlan.displayName = 'ComparePlan';

styles.SkipLinkMixin = css`
  ${css(styles.LinkMixin)}, background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat right -518px;
  padding: 0 13px 0 0;
`;
// styles.SkipLink.displayName = 'SkipLink';

styles.MembershipPlan = styled.div`
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  background: #fff;
  padding: 13px 30px;
  margin: 0 0 10px 0;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 14px 50px, rgba(0, 0, 0, 0.16) 0px 2px 20px;
    transition: all 300ms ease;
  }
`;
styles.MembershipWrapper = styled.div`
  font: 300 22px 'Roboto', sans-serif;
  display: flex;
`;
styles.MembershipType = styled.div`
  color: #51505d;
  width: 280px;
  padding: 3px 0 0;
`;
styles.MonthText = styled.div`
  font: 400 16px 'Roboto', sans-serif;
`;
styles.MembershipPrice = styled.div`
  font: 400 28px 'Roboto', sans-serif;
  color: #51505d;
  text-align: right;
  width: 260px;
`;
styles.GreenText = styled.span`
  color: #89c965;
  font: 400 14px 'Roboto', sans-serif;
  vertical-align: middle;
  padding: 2px 0 0;
`;
styles.StrikeThrough = styled.span`
  background: url(https://img2.shaadi.com/assests/2016/payment/strikethrough-big.png) no-repeat left center;
  font: 400 18px 'Roboto', sans-serif;
  color: #72727d;
`;
styles.PerMonthText = styled.div`
  font: 300 16px 'Roboto', sans-serif;
  color: #72727d;
`;
styles.ArrowContainer = styled.div`
  width: 20px;
  text-align: right;
  padding: 15px 0 0;
`;
styles.DownArrow = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat -56px -355px;
  width: 9px;
  height: 6px;
  display: inline-block;
  cursor: pointer;
`;

styles.UpArrow = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat -56px -342px;
  width: 9px;
  height: 6px;
  display: inline-block;
  cursor: pointer;
`;

styles.DisplayFlex = styled.div`
  display: flex;
`;
styles.DisplayFlex.displayName = 'DisplayFlex';

styles.PaymentLeft = styled.div`
  width: 620px;
  padding: 10px 20px 0 0;
`;

styles.PaymentLeft.displayName = 'PaymentLeft';

styles.PaymentRight = styled.div`
  width: 300px;
  padding: 10px 0 0;
`;

styles.PaymentRight.displayName = 'PaymentRight';

const PlanTabs = `	
`;

styles.PremiumTab = styled.div`
	${PlanTabs};
	color: ${props => (props.currentTab === 'PremiumTab' ? '#ff5a60' : '#ff5a60;')}
	font-weight: ${props => (props.currentTab === 'PremiumTab' ? '400' : '300')}
`;
styles.PersonaliseTab = styled.div`
	${PlanTabs};
	color: ${props => (props.currentTab === 'PersonaliseTab' ? '#ff5a60' : '#72727d;')}
	font-weight: ${props => (props.currentTab === 'PersonaliseTab' ? '400' : '300')}
`;

styles.BoxShadow = styled.div`
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  background: #fff;
`;
styles.MatchGuarantee = styled.div`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat left -49px;
  width: 260px;
  height: 69px;
  font: 400 15px 'Roboto', sans-serif;
  color: #51505d;
  padding: 116px 20px 0;
  ${props => (props.isCenter ? 'text-align: center' : '')};
`;
styles.SpacerEight = styled.div`
  padding: 8px;
`;
styles.FeaturesList = styled.ul`
  border-top: 1px solid #dfe0e3;
  cursor: auto;
  margin: 10px 0 0;
  padding: 14px 0 9px;
  width: 560px;
  display: flex;
`;

styles.ListWrapper = styled.div`
  display: flex;
  padding: 0 0 10px;
`;
styles.IconWrapper = styled.div`
  align-self: center;
  width: 27px;
`;
styles.ChatIcon = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat -98px top;
  width: 20px;
  height: 18px;
  display: inline-block;
`;
styles.ContactNumber = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat -70px top;
  width: 18px;
  height: 18px;
  display: inline-block;
`;
styles.GetHighlight = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat -127px top;
  width: 20px;
  height: 14px;
  display: inline-block;
`;
styles.TopSearch = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat -157px top;
  width: 20px;
  height: 20px;
  display: inline-block;
`;
styles.FeatureText = styled.div`
  align-self: center;
  font: 400 16px 'Roboto', sans-serif;
  font-weight: 400;
  color: #72727d;
`;

styles.ListLeft = styled.li`
  width: 278px;
  display: inline-block;
  padding: 0;
  margin: 0;
`;

styles.ContinueWrapper = styled.div`
  position: relative;
  text-align: center;
  padding: 0 0 7px;
`;
styles.ContinueBtn = styled.button.attrs({ type: 'button' })`
  display: inline-block;
  position: relative;
  text-align: center;
  width: 200px;
  height: 44px;
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
  line-height: 42px;
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
styles.FeatureStrike = styled.div`
  background: url(https://img2.shaadi.com/assests/2017/payment/strike-through-features.png) no-repeat left center;
  opacity: 0.6;
  display: flex;
`;

styles.TopSeller = styled.div`
  background: url(https://img2.shaadi.com/assests/2017/payment/strike-through-features.png) no-repeat -101px -257px;
  background-position: ;
  width: 81px;
  height: 16px;
  margin: 0 0 0 10px;
  vertical-align: middle;
`;
styles.BestDeal = styled.div`
  background: url(https://img2.shaadi.com/assests/2017/payment/strike-through-features.png) no-repeat left -257px;
  background-position: ;
  width: 81px;
  height: 16px;
  margin: 0 0 0 10px;
  vertical-align: middle;
`;
styles.PlanContainer = styled.div`
  border-radius: 3px;
  box-shadow: ${props =>
    props.isVisible
      ? 'rgba(0, 0, 0, 0.16) 0px 14px 50px, rgba(0, 0, 0, 0.16) 0px 2px 20px;'
      : 'rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;'} 
  background: #fff;
  padding: 13px 30px;
  margin: 0 0 10px 0;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 14px 50px, rgba(0, 0, 0, 0.16) 0px 2px 20px;
    transition: all 300ms ease;
  }  
`;
styles.LoaderContainer = styled.div`
  position: relative;
  height: ${props => (props.height === 'large' ? '577px' : '256px')};
`;
styles.TabId = styled.span``;

export default styles;
