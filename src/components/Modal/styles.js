import styled, { keyframes } from 'styled-components';
import Link from '../Common/Link';
import { zIndex } from '../../theme';

const styles = {};

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

const color = keyframes`
  0% {
    stroke: #ff5a60;
  }
  40% {
    stroke: #ff5a60;
  }
  66% {
    stroke: #ff5a60;
  }
  80%,
  90% {
    stroke: #ff5a60;
  }
`;

const EIreveal = keyframes`
  from {
    max-height: 0;
  }
  to {
    max-height: 235px;
  }
`;

styles.Modal = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: ${zIndex.modal};
`;

styles.ColorBg = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  border: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  opacity: 0.6;
  cursor: auto;
  z-index: 0;
`;

styles.WatermarkWrapper = styled.div`
  color: #72727d;
  font-size: 14px;
  position: relative;
  width: 500px;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  background: #fff;
`;

styles.CampaignLayer = styled.div`
  font-size: 14px;
  position: relative;
  border: none;
  background: transparent;
`;

styles.CampaignLayerClose = styled.span`
  display: inline-block;
  background: url(/assets/campaign-layer-close.png) no-repeat left top;
  width: 10px;
  height: 12px;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

styles.Header = styled.div`
  display: flex;
  align-items: center;
  color: #51505d;
  padding: ${props =>
    props.isSlim
      ? '10px 19px 10px 15px'
      : props.isReportMisuse ? `19px 19px ${props.source === 'uploadPhoto' ? '13px' : '20px'} 0` : '19px 19px 20px 15px'};
  font: bold 18px arial;
  margin: 0;
  position: relative;
  background: ${props => (props.isReportMisuse ? '#fff' : '#f1f1f2')};
  border-radius: 3px 3px 0 0;
`;

styles.Title = styled.h5`
  font: bold 18px arial;
  color: #51505d;
  margin: 0;
  flex: 1;
`;

styles.CloseModalBtn = styled.button`
  display: block;
  width: 20px;
  height: 20px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: url(/assets/big-close-v2.png) no-repeat left -207px;

  &:hover {
    background: url(/assets/big-close-v2.png) no-repeat left -231px;
  }
`;

styles.Content = styled.div`
  display: ${props => (props.isHidden ? 'none' : 'block')};
  background: #fff;
  padding: ${props => (props.isTextCentered ? 0 : props.isReportMisuse ? '0 15px 20px' : '20px 15px')};
  text-align: ${props => (props.isTextCentered ? 'center' : '')};
  position: relative;
  border-radius: 0 0 3px 3px;
`;

styles.Question = styled.p`
  font-weight: bold;
  margin: 0;
  padding: 0 0 5px;
`;

styles.Answer = styled.p`
  margin: 0;
`;

styles.SvgLoader = styled.div`
  display: block;
  position: relative;
  padding: ${props => (props.vipConsultant ? '46px' : '120px')} 0;
  width: 150px;
  margin: 0 auto;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

styles.SvgPath = styled.svg`
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  transform-origin: center center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

styles.SvgCircle = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dash} 1.5s ease-in-out infinite, ${color} 6s ease-in-out infinite;
  stroke-linecap: round;
`;

styles.TextArea = styled.textarea`
  line-height: 18px;
  transition: none;
  background: transparent;
  height: 100px;
  font: 400 14px 'Roboto', sans-serif;
  color: #72727d;
  padding: 8px;
  border: 1px solid #dfe0e3;
  margin: 0 0 8px;
  border-radius: 3px;
  overflow: auto;
  resize: none;
  outline: 0;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
`;

styles.TextAreaPremium = styles.TextArea.extend`
  background-color: #f7f7f7;
  outline:none;
  border:none;
  border-radius: 15px 15px 0 15px;
  width: 460px;
  padding: 15px;
  font: 300 14px 'Roboto',sans-serif;
  line-height: 20px;
  letter-spacing: 0.2px;
  min-height: 100px;
`;

styles.DraftList = styled.ul`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  border: ${props => (props.isPremium ? '1px solid #cdced1' : '1px solid #bebebe')};
  border-radius: ${props => (props.isPremium ? '10px' : '0')};
  position: absolute;
  top: 20px;
  right: ${props => (props.isPremium ? '-88px' : '0')};
  z-index: 999;
  background: #fff;
  box-shadow: ${props => (props.isPremium ? '0 3px 4px rgba(0, 0, 0, 0.05)' : '0 2px 5px 0 #c1c1c1')};
  padding: ${props => (props.isPremium ? '0' : '0 10px')};
  width: ${props => (props.isPremium ? '532px' : '610px')};
  min-height: 45px;
  list-style: none;
  margin: 0;
`;

styles.DraftItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
  font-size: 12px;
  padding: 9px 0;
`;

styles.DraftItemPremium = styles.DraftItem.extend`
  &:hover{background: #f1f1f1;}
  padding: 10px 14px;
  border-bottom: 1px solid #f1f1f1;
  cursor: pointer;
  padding: 0;
  &:nth-child(1) {
    border-radius:10px 10px 0 0;
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
  position: relative;
`;

styles.DraftMessageWrapper = styled.div`
  display: flex;
  padding: ${props => (props.isPremium ? '15px 10px 15px 15px' : '0')};
`;

styles.DraftMessage = styled.p`
  max-width: 444px;
  color: #72727d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
`;

styles.DraftMessagePremium = styles.DraftMessage.extend`
  max-height: ${props => (props.showMore ? '780px' : '20px')};
  transition: 1s linear max-height;
  white-space: ${props => (props.showMore ? 'normal' : 'nowrap')};
  text-overflow: ${props => (props.showMore ? 'unset' : 'ellipsis')};
  overflow: ${props => (props.showMore ? 'visible' : 'hidden')};
  text-align: left;
  max-width: ${props => (props.showMore ? '478px' : '416px')};
  min-width: 416px;
  letter-spacing: 0.1px;
  font-weight: 300;
  &:hover{
    font-weight: 320;
    transition: unset;
    color: #51505d;
  }
  line-height: 18px;
`;

styles.DraftBtnsWrapper = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  justify-content: space-between;
  color: #95959d;
  font: 400 14px 'Roboto', sans-serif;
  border-bottom: 0;
  position: relative;
  ${props => (props.isPremium ? 'padding: 10px 0' : '')};
`;

styles.CloseIntentModalBtn = styled.button`
  position: absolute;
  top: ${props => (props.isReportMisuse ? '16px' : '20px')};
  right: ${props => (props.isReportMisuse ? '13px' : '20px')};
  display: block;
  width: ${props => (props.isSlim ? '30px' : '20px')};
  height: ${props => (props.isSlim ? '30px' : '20px')};
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: ${props =>
    props.isSlim ? 'url(/assets/reg-layer-close.png) no-repeat 7px 7px' : 'url(/assets/big-close-v2.png) no-repeat left -207px'};
  &:hover {
    background: ${props =>
      props.isSlim ? 'url(/assets/reg-layer-close.png) no-repeat 7px -24px' : 'url(/assets/big-close-v2.png) no-repeat left -231px'};
  }
`;

styles.ContentWrap = styled.div`
  padding: ${props => (props.isHelpMeLayer ? '46px 25px' : '25px')};
  border-radius: ${props => (props.isHelpMeLayer ? '3px' : '0')};
  font-size: 14px;
  font-family: arial;
  line-height: 18px;
  background: #fff;
  position: relative;
`;

styles.CampaignLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;

styles.UploadPhotoLayer = styled.div`
  display: block;
  width: ${props => (props.isHelpMeLayer ? '365px' : '588px')};
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
`;

styles.ExitIntentWrapper = styled.div`
  position: relative;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  z-index: 3;
  width: 747px;
  padding: 21px 39px 30px;
  background: #f1f1f2;
`;

styles.ExitIntentTitleText = styled.div`
  font: bold 28px/33px arial !important;
  color: #72727d;
  text-align: center;
`;

styles.ExitIntentSubTitleText = styled.div`
  font: normal 20px/33px arial !important;
  color: #72727d;
  text-align: center;
`;

styles.ExitIntentDetails = styled.div`
  margin: 15px auto 0;
  text-align: center;
  width: 760px;
`;

styles.EIRecommendations = styled.div`
  margin: 18px auto 4px;
  text-align: center;
  max-height: 0;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  width: 760px;
  animation: ${EIreveal} 0.5s linear;
  animation-iteration-count: once;
  animation-delay: 1.2s;
  animation-fill-mode: forwards;
`;

styles.RecommedationIntentBtnsWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

styles.IntentBtn = styled.button`
  background: ${props => (props.isPrimary ? '#00bcd5' : '#eaeaea')};
  border: ${props => (props.isPrimary ? '#00bcd5' : '#eaeaea')};
  color: ${props => (props.isPrimary ? '#fff' : '#72727d')};
  margin-right: ${props => (props.isPrimary ? '10px' : 0)};
  border-radius: 3px;
  display: inline-block;
  font: normal 22px/41px arial;
  height: 41px;
  text-align: center;
  width: ${props => (props.isLongBtn ? '352px' : '232px')};
  &:hover {
    background: ${props => (props.isPrimary ? '#0194a8' : '#e2e1e1')};
    border: ${props => (props.isPrimary ? '#0194a8' : '#e2e1e1')};
  }
`;

styles.miniProfile = styled.div`
  text-align: center;
  display: flex;
  height: 86px;
  width: 220px;
  background: #fff;
  border-radius: 3px;
  padding: 10px;
  margin: 5px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
`;

styles.EIRecommendationPhotoLink = styled.div`
  border: 3px solid #fff;
  border-radius: 85px;
  display: inline-block;
  height: 82px;
  width: 82px;
  float: left;
  margin: 0 12px;
`;

styles.EIRecommendationPhoto = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 85px;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 90px;
`;

styles.OtherData = styled.div`
  width: 108px;
  padding: 2px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
`;

styles.OtherDataSpan = styled.span`
  font: normal 16px arial;
  color: #72727d;
  display: block;
  text-align: left;
  margin: 5px 0;
  width: 108px;
`;

export default styles;
