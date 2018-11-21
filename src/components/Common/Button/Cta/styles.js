import styled from 'styled-components';

const buttonType = {
  green: {
    shadow: `0 2px 2px rgba(39, 189, 200, 0.3)`,
    WrapperBackGround: `linear-gradient(to bottom, #8cc971 0%,#8cc971 10%,#86c877 17%,#3dbccf 100%)`,
    tickAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/prem-connect-tick.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/button-white-tick.svg',
      backgroundColor: '#fff',
    },
    mesageAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/prem-write-msg.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/prem-write-msg-hover.svg',
      backgroundColor: '#fff',
    },
    contactAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/prem-view-contact.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/prem-view-contact-hover.svg',
      backgroundColor: '#fff',
    },
    declineAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/decline-cross.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/decline-cross-hover.svg',
      backgroundColor: '#fff',
    },
  },
  red: {
    shadow: `0 2px 2px rgba(39, 189, 200, 0.3)`,
    WrapperBackGround: '#af1f3f',
    tickAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/vip-connect-tick.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/button-white-tick.svg',
      backgroundColor: '#fff',
    },
    mesageAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/vip-write-msg.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/prem-write-msg-hover.svg',
      backgroundColor: '#fff',
    },
    contactAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/vip-view-contact.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/prem-view-contact-hover.svg',
      backgroundColor: '#fff',
    },
    declineAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/decline-cross.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/decline-cross-hover.svg',
      backgroundColor: '#fff',
    },
  },
  grey: {
    shadow: ``,
    WrapperBackGround: '#dfe0e3',

    mesageAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/disable-write-msg.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/disable-write-msg.svg',
      backgroundColor: '#fff',
    },
    contactAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/disable-view-contact.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/disable-view-contact.svg',
      backgroundColor: '#fff',
    },
    declineAction: {
      default: 'https://img2.shaadi.com/assests/2018/images/decline-cross.svg',
      hover: 'https://img2.shaadi.com/assests/2018/images/decline-cross-hover.svg',
      backgroundColor: '#fff',
    },
  },
};

export const Wrapper = styled.div`
  width: 36px;
  height: 36px;
  position: relative;
  box-shadow: ${props => buttonType[props.versionType].shadow};
  background: ${props => buttonType[props.versionType].WrapperBackGround};
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  margin: 0 auto;
`;
const btnHover = props => ` background: ${`url(${buttonType[props.versionType][props.actionType].hover}) center center no-repeat ,${
  buttonType[props.versionType].WrapperBackGround
} `};
border: 2px solid #fff;
width: 32px;
height: 32px;
top: 2px;
left: 2px;`;
export const InnerWrapper = styled.button`
  background: ${props =>
    `${buttonType[props.versionType][props.actionType].backgroundColor} url(${
      buttonType[props.versionType][props.actionType].default
    }) center center no-repeat`};
  position: absolute;
  top: 1px;
  left: 1px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: block;
  border: 0;
  outline: 0;
  ${props => props.isHovered && btnHover(props)};
  &:hover {
    ${props => btnHover(props)};
  }
`;
export const CtaWrapper = styled.div``;
