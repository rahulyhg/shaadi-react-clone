import styled, { keyframes } from 'styled-components';

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

styles.CallConsultant = styled.div`
  color: #72727d;
  font-size: 14px;
  position: relative;
  width: 516px;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  background: #fff;
`;
styles.VipContainer = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.VipHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => (props.isSlim ? '10px 19px 10px 15px' : '19px 19px 20px 15px')};
  position: relative;
`;
styles.VipCloseModalBtn = styled.button`
  display: inline-block;
  width: 10px;
  height: 10px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  float: right;
  background: url(/assets/vip-layer.png) no-repeat left -53px;
  &:hover {
    background: url(/assets/vip-layer.png) no-repeat -21px -53px;
  }
`;
styles.VipContainerError = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font-size: 21px;
  padding: 3px;
  color: #ad2241;
  text-align: center;
  padding: 50px 0px;
`;
styles.ModalLoader = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
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
styles.Title = styled.h5`
  font: bold 18px arial;
  color: #51505d;
  margin: 0;
  flex: 1;
`;
styles.VipContent = styled.div`
  font: 300 16px 'Roboto', sans-serif;
  color: #51505d;
  text-align: center;
  padding: 0 10px 45px;
`;
styles.VipLogo = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  display: ;
  width: 162px;
  height: 22px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: url(/assets/vip-layer.png) no-repeat left -77px;
`;
styles.SpacerThree = styled.div`
  padding: 3px;
`;
styles.MobileNoWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
`;
styles.VIPConsultant = styled.span`
  font-weight: bold;
`;
styles.VipMobile = styled.div`
  font-size: 28px;
  padding: 13px 0 0;
`;
styles.SepVip = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.VipSeparatorOrange = styled.div`
  display: inline-block;
  height: 1px;
  width: 80px;
  background: #cc9966;
  margin: 13px 0 0;
`;
styles.VipSeparatorGrey = styled.div`
  display: inline-block;
  height: 3px;
  width: 80px;
  background: #dfe0e3;
  margin: 13px 0 0;
`;
styles.ConsultantWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  padding-top: 24px;
`;
styles.VipManageProfile = styled.div`
  font-size: 12px;
  padding: 0px 0 3px;
`;
styles.vipLink = styled.span`
  color: #aa1e3c;
  font-size: 12px;
  cursor: pointer;
`;
styles.VipFormInner = styled.div`
  text-align: left;
  font-size: 12px;
  padding: 0 0 0 50px;
`;
styles.VipLabelName = styled.div`
  padding: 10px 0 5px;
`;
styles.VipInput = styled.input`
  background: #fff;
  width: 218px;
  height: 20px;
  padding: 5px 0 5px 8px;
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  font: 300 14px 'Roboto', sans-serif;
  color: #51505d;
`;
styles.VipError = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font-size: 11px;
  padding: 3px;
  color: #ad2241;
`;
styles.SpacerEight = styled.div`
  padding: 8px;
`;
styles.VipSubmitBtn = styled.button`
  color:#fff;
  background:#ad2241;
  border:none;
  display:inline-block;
  border-radius:3px;
  cursor:pointer;
  font-size:18px;
  font-family:'Roboto',sans-serif;
  font-weight:400;
  line-height:42px;
  height:42px;
  width:140px;
  text-align:center;
  vertical-align:middle;
  box-shadow:0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition:all 300ms ease;
  &:hover {
  background-color:#ad2241;
  box-shadow:0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  text-decoration:none;
`;
styles.VipThankuWrapper = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  padding: 38px 0 0;
  font-size: 16px;
`;
styles.VipGreenTick = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: url(/assets/vip-layer.png) no-repeat left top;
`;
styles.VipThankuHeading = styled.div`
  font-size: 22px;
  padding: 10px 0 6px;
`;

export default styles;
