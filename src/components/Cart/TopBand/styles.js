import styled from 'styled-components';

const styles = {};

styles.TopBand = styled.div`
  width: 100%;
  height: 68px;
  background: #39b9c4;
  background: linear-gradient(to right, #39b9c4 0%, #42bbb7 17%, #6ec382 77%, #7cc671 100%);
  margin: -50px 0 0 0;
`;
styles.TopBand.displayName = 'CartTopBand';
styles.TopHeader = styled.div`
  width: 940px;
  margin: 0 auto;
  text-align: center;
`;

styles.NormalLeft = styled.div.attrs({
  'data-topbadge': 'discountMessage',
})`
  color: #fff;
  font: 300 22px 'Roboto', sans-serif;
  height: 68px;
  line-height: 68px;
`;
styles.HeaderScrolled = styled.div`
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 5px, rgba(0, 0, 0, 0.08) 0px 1px 10px;
  transition: all 300ms ease;
`;

styles.FontBold = styled.span`
  font: 500 24px 'Roboto', sans-serif;
`;

export default styles;
