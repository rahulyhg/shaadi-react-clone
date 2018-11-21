import styled, { keyframes } from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

const zoomIn = keyframes`
  from{
   opacity: 0;
 }
 to {
   opacity: 1;
 }
`;

styles.NameBg = styled.span`
  display: inline-block;
  max-width: 174px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: text-top;
`;
styles.LayerWrap = styled.div`
  position: relative;
`;
styles.CloseIcon = styled.button`
  background: url(/assets/white-layer-close.png) center center no-repeat;
  width: 14px;
  height: 14px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
  padding: 15px;
  border: 0;
  outline: 0;
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
styles.MonetizationWrap = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  width: 460px;
  position: relative;
  z-index: 3;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.21);
  border-radius: 3px;
  background: #fff;
  text-align: center;
  overflow: hidden;
`;
styles.LayerLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  outline: 0;
`;
styles.TopSectionWrap = styled.div`
  background: linear-gradient(115deg, #88c86c 0%, #20bccf 100%);
  height: 317px;
  border-radius: 3px 3px 80% 80%;
  color: #fff;
  width: 620px;
  position: absolute;
  left: -80px;
`;
styles.LayerTitle = styled.div`
  background: url(/assets/it-s-an-accept.png) center top no-repeat;
  height: 55px;
  margin: 40px 0 0;
`;
styles.TopMsg = styled.div`
  padding: 1px 0 28px;
  font-size: 16px;
  font-weight: 400;
`;
styles.PhotoWrap = styled.div`
  display: flex;
  justify-content: center;
`;
styles.ProfileName = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.26px;
  margin: 10px 0 0;
`;
styles.ProfilePhoto = styled.div`
  width: 110px;
  height: 110px;
  background: #d7d7d7 ${props => `url(${props.profilePhoto}) center top/cover no-repeat`};
  animation: ${zoomIn} 1s;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.35);
`;
styles.BtmSection = styled.div`
  padding: 348px 0 40px;
`;
styles.BtmMsg = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #51505d;
`;
styles.UpgradeCopy = styled.div`
  font-size: 14px;
  line-height: 25px;
  font-weight: 300;
  color: #51505d;
`;
styles.ActionBtnWrap = styled.div.attrs({
  'data-test-selector': 'accept_match_cta',
})`
  display: flex;
  justify-content: center;
  margin: 16px 0 0;
`;
styles.ContactLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font: 500 16px 'Roboto', sans-serif;
  background: linear-gradient(180deg, #60cdd4 0%, #00bbd5 100%);
  box-shadow: 0 5px 9px rgba(10, 226, 255, 0.39);
  height: 45px;
  line-height: 45px;
  width: 237px;
  border-radius: 36px;
  color: #fff;
  outline: 0;
  text-decoration: none;
  transition: ease;
  &:hover {
    background: #00bcd5;
    box-shadow: 0 5px 9px 0 rgba(11, 226, 255, 0.39);
  }
`;

styles.ButtonCrown = styled.span`
  display: inline-block;
  background: url(/assets/white-crown-shadow.svg) no-repeat;
  background-size: 16px 16px;
  width: 16px;
  height: 16px;
  margin: -3px 6px 0 0;
  vertical-align: middle;
`;

styles.premiumBannerGoldenBtn = styled.div`
  padding: 13px 0 0;
  box-shadow: 0 3px 6px rgba(77, 64, 64, 0.2);
  color: #fff;
  font: 500 14px/17px 'Roboto', sans-serif;
  background: linear-gradient(
    to right,
    rgba(199, 147, 36, 1) 0%,
    rgba(237, 203, 124, 1) 31%,
    rgba(237, 203, 124, 1) 70%,
    rgba(199, 147, 36, 1) 100%
  );
  height: 28px;
  width: 210px;
  border-radius: 50px;
  text-transform: uppercase;
  margin-top: 10px;
  display: inline-block;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    text-decoration: none;
    background: linear-gradient(to right, rgba(199, 147, 36, 1) 0%, rgba(237, 203, 124, 1) 73%, rgba(237, 203, 124, 1) 100%);
  }

  &:active {
    box-shadow: none !important;
  }
`;

export default styles;
