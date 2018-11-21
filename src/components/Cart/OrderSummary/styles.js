import styled from 'styled-components';

const styles = {};

styles.OrderSummaryShadow = styled.div`
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  background: #fff;
`;

styles.OrderSummery = styled.div`
  padding: 18px 20px;
  border-bottom: 1px dashed #cdced1;
  width: 250px;
`;

styles.OrderSummery.displayName = 'OrderSummery';

styles.TotalSummery = styled.div`
  padding: 10px 20px;
  width: 250px;
`;
styles.TotalSummeryWrapper = styled.div`
  background: #f4f4f7;
  padding: 16px 20px;
  width: 250px;
  border-top: 1px solid #dfe0e3;
  border-radius: 0 0 3px 3px;
`;
styles.TotalSummeryWrapper.displayName = 'TotalSummery';

styles.TitleSummery = styled.div`
  font: 500 14px 'Roboto', sans-serif;
  color: #51505d;
  padding: 0 0 25px;
`;
styles.ProductName = styled.span`
  font: 500 14px 'Roboto', sans-serif;
`;

styles.ProductSummery = styled.div`
  display: flex;
`;
styles.ProductSummeryDis = styled.div`
  display: flex;
  padding: 15px 0 0;
`;

styles.ProductSummeryDis.displayName = 'OfferSummary';

styles.PlanSummery = styled.div`
  width: 160px;
  font: 400 14px 'Roboto', sans-serif;
  color: #72727d;
  flex: 1;
  align-self: center;
`;

styles.PlanSummery.displayName = 'PlanName';

styles.PlanSummaryTotal = styled.div`
  width: 110px;
  font: 400 14px 'Roboto', sans-serif;
  color: #72727d;
  flex: 1;
  align-self: center;
`;
styles.PriceSummaryTotal = styled.div`
  width: 130px;
  font: 500 24px 'Roboto', sans-serif;
  color: #51505d;
  text-align: right;
`;

styles.PriceSummaryTotal.displayName = 'TotalPrice';

styles.PriceSummery = styled.div`
  width: 90px;
  font: 500 16px 'Roboto', sans-serif;
  color: #72727d;
  text-align: right;
`;

styles.PriceSummery.displayName = 'ProductPrice';

styles.PriceSummeryDark = styled.div`
  width: 90px;
  font: 500 16px 'Roboto', sans-serif;
  color: #51505d;
  text-align: right;
`;

styles.DiscountSummery = styled.div`
  width: 150px;
  color: #81c96c;
  font: 400 14px 'Roboto', sans-serif;
  flex: 1;
`;

styles.DiscountPriceSummery = styled.div`
  width: 90px;
  color: #81c96d;
  font: 500 16px 'Roboto', sans-serif;
  text-align: right;
`;

styles.ProfileBoosterBox = styled.div`
  margin: 5px 10px 2px;
  padding: 10px;
`;
styles.ProfileBoosterBox.displayName = 'ProfileBoosterBox';

styles.ShaadiCaresBox = styled.div`
  padding: 10px;
  margin: 0 10px;
`;

styles.ShaadiCaresBox.displayName = 'ShaadiCaresBox';

styles.CheckBox = styled.input.attrs({
  'data-status': props => (props.checked === true ? 'checked' : 'unchecked'),
})``;

styles.CheckBoxWrapper = styled.div`
  width: 20px;
`;

styles.CheckBoxContainer = styled.div`
  display: flex;
`;

styles.ProfileBooster = styled.div`
  width: 158px;
  font: 400 14px 'Roboto', sans-serif;
  color: #51505d;
`;

styles.ProfileBooster.displayName = 'BoxHtml';

styles.SubText = styled.div`
  font: 400 12px 'Roboto', sans-serif;
  padding: 3px 0 0 20px;
  color: #51505d;
`;
styles.BoosterPriceSummery = styled.div`
  width: 72px;
  color: ${props => (props.isChecked === true ? '#72727d' : '#95959d')};
  font: 500 16px 'Roboto', sans-serif;
  text-align: right;
`;

styles.BoosterPriceSummery.displayName = 'BoxPrice';

styles.UpArrow = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -312px;
  width: 7px;
  height: 4px;
  display: inline-block;
  position: absolute;
  top: 2px;
  left: 0;
  &:hover {
    background: url(assets/cart-icon.png) no-repeat -7px -312px;
  }
`;

styles.DownArrow = styled.span`
  background: url(assets/cart-icon.png) no-repeat -14px -312px;
  width: 7px;
  height: 4px;
  display: inline-block;
  position: absolute;
  bottom: 2px;
  left: 0;
  &:hover {
    background: url(assets/cart-icon.png) no-repeat -21px -312px;
  }
`;

styles.ArrowWrapper = styled.span`
  position: relative;
`;

styles.MatchGuarantee = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -323px;
  width: 66px;
  height: 53px;
  display: inline-block;
`;

export default styles;
