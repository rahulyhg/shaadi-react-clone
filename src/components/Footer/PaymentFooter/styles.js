/* eslint no-mixed-operators: 0 */
import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.PaymentFooter = styled.div`
  background: #f1f1f2;
`;

styles.PaymentFooterInnerWrap = styled.div`
  width: ${props => (props.isRevampPage ? '1200px' : props.isProfilePage ? '990px' : '940px')};
  margin: 0 auto;
`;

styles.PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => (props.isRevampPage ? '1200px' : props.isProfilePage ? '990px' : '940px')};
  margin: 0 auto;
  font: 300 11px 'Roboto', sans-serif;
  color: #72727d;
`;

styles.Nav = styled.nav`
  padding: 19px 5px 0;
  &:nth-child(2) {
    padding: 13px 5px 0;
  }
`;

styles.Link = styled(Link)`
  position: relative;
  display: inline-block;
  text-decoration: none;
  font: normal 12px 'Roboto', sans-serif;
  color: #72727d;
  padding: 0 19px 0 14px;

  &:after {
    content: '';
    position: absolute;
    top: 4px;
    right: 0;
    border-right: 1px solid #cdced1;
    height: 12px;
    vertical-align: middle;
    width: 1px;
  }

  &:hover {
    text-decoration: underline;
  }

  &:nth-child(6):after {
    border-right: 0;
  }

  &:nth-child(6) {
    padding: 0 3px 0 11px;
  }
`;

styles.CopyrightWrap = styled.div`
  border-top: 1px solid #cdced1;
  font-size: 12px;
  color: #95959d;
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  padding: 12px 12px 12px 14px;
`;

styles.CopyLeft = styled.span`
  display: flex;
  flex: 1;
`;

styles.CopyRight = styled.span``;

styles.CopyrightLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  cursor: pointer;
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
  background-image: url(/assets/shaadi-sprite-2-v10.png);
  background-repeat: no-repeat;
  background-position: left ${props => ({ android: '-904px', apple: '-884px' }[props.icon])};
`;

styles.FooterBg = styled.div`
  background: url(/assets/footer-bottom.gif) repeat-x left top;
  border-top: 1px solid #dfdfdf;
  padding: 15px 18px;
  text-align: left;
  display: flex;
`;

styles.BottomLogo = styled.div`
  background: url(/assets/cart-icon.png) no-repeat left -520px;
  height: 64px;
  width: 64px;
`;

styles.CompanyInfo = styled.div`
  color: #72727d;
  font: 300 11px 'Roboto', sans-serif;
  line-height: 16px;
  width: ${props => (props.isRevampPage ? '816px' : props.isProfilePage ? '608px' : '566px')};
  padding: 0 20px 0 10px;
`;

styles.GreySmallArrow = styled.span`
  background: url(/assets/cart-icon.png) no-repeat -49px -214px;
  height: 9px;
  width: 5px;
  margin: 0 0 0 3px;
  display: inline-block;
  cursor: pointer;
`;

styles.HeadingMatrimony = styled.h3`
  display: inline;
  font: inherit;
  cursor: pointer;
`;

styles.SecureWrapper = styled.div`
  width: 251px;
`;

styles.SecureImage = styled(Link)`
  background: url(/assets/secure-match.png) no-repeat left top;
  width: 251px;
  height: 66px;
  display: inline-block;
  cursor: pointer;
`;
styles.ShaadiBold = styled.span`
  font-weight: 500;
`;

styles.ImproveShaadi = styled.span`
  background: #b1b3b9;
  border-radius: 3px;
  height: 18px;
  padding: 3px 0 0 5px;
  margin: 5px 0 0 0;
  text-align: center;
  width: 246px;
  display: inline-block;
`;

styles.HelpShaadiLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font: 500 12px 'Roboto', sans-serif;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
styles.FooterBorder = styled.div`
  padding: 15px 15px 0 15px;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd;
  margin: 0 18px;
`;
styles.CopyrightsWrap = styled.div`
  margin: 0 auto;
  background: #f0f0f0;
  width: ${props => (props.isRevampPage ? '1200px' : props.isProfilePage ? '990px' : '944px')};
  padding: ${props => (props.isRevampPage || props.isProfilePage ? '12px 0' : '12px 8px')};
  display: flex;
  font: 400 11px 'Roboto', sans-serif;
  color: #999;
`;
styles.CopyrightsLeft = styled.div`
  margin: ${props => (props.isProfilePage ? '0' : '0 0 0 18px')};
  color: #999;
  line-height: 11px;
  flex: 1;
`;

styles.CopyrightsLink = styled(Link)`
  font: 400 11px 'Roboto', sans-serif;
  color: #999;
  line-height: 11px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.CopyrightsRight = styled.div`
  margin: 0 18px 0 0;
`;
export default styles;
