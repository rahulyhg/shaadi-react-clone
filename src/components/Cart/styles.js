import styled from 'styled-components';

const styles = {};

styles.Cart = styled.div`
  border: 0px;
`;
styles.LoaderWrapper = styled.div`
  width: 940px;
  text-align: center;
  position: relative;
  padding: 150px 0;
  margin: 0 auto;
`;
styles.CartContent = styled.div`
  width: 940px;
  margin: 24px auto 0;
  display: flex;
`;
styles.Content = styled.div`
  width: ${props => (props.left ? '630px' : '290px')};
  margin: ${props => (props.right ? '0 0 0 20px' : '')};
`;
styles.MatchGuarantee = styled.div`
  background: url(assets/cart-icon.png) no-repeat left -323px;
  width: 66px;
  height: 53px;
`;
styles.MatchGuaranteeText = styled.div`
  background: #fff;
  border-radius: 3px;
  width: 200px;
  height: 50px;
  margin: 0 0 0 10px;
  position: relative;
`;
styles.MatchGuaranteeWrapper = styled.div`
  display: flex;
  padding: 18px 0;
  margin: 0 0 0 7px;
`;
styles.LeftSquare = styled.span`
  background: url(assets/cart-icon.png) no-repeat left -389px;
  width: 20px;
  height: 20px;
  position: absolute;
  left: 0;
  top: 0;
`;
styles.RightSquare = styled.span`
  background: url(assets/cart-icon.png) no-repeat -40px -389px;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
`;
styles.MatchGuaranteeContent = styled.span`
  font: 300 12px 'Roboto', sans-serif;
  line-height: 18px;
  padding: 7px;
  text-align: center;
  color: #51505d;
  display: block;
`;
styles.IpAddressBand = styled.div`
  padding: 20px 0;
  font: 400 11px 'Roboto', sans-serif;
  text-align: center;
`;
styles.IpAddressBand.displayName = 'IpAddress';
styles.InputHidden = styled.input.attrs({ type: 'hidden' })``;
styles.ErrorWrapper = styled.div`
  border: 1px solid #fec6c8;
  background: #fff0ea;
  display: flex;
  color: #e53a41;
  font: 300 14px 'Roboto', sans-serif;
  padding: 15px;
  width: 910px;
  margin: 24px auto 0;
`;
styles.ErrorIcon = styled.div`
  background: url(assets/cart-icon.png) no-repeat left -245px;
  height: 19px;
  width: 23px;
  align-self: center;
`;
styles.ErrorBold = styled.span`
  font: 400 14px 'Roboto', sans-serif;
`;
styles.ErrorDefault = styled.div`
  flex: 1;
  padding: 0 0 0 10px;
`;

export default styles;
