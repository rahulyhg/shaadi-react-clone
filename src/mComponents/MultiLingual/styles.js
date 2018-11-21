import styled, { keyframes } from 'styled-components';
import Link from '../../components/Common/Link';
import radioStyle from '../../components/Common/FormElements/RadioTabGroup/styles';

const fadeUp = keyframes`
  from {
    transform: translateY(100%);
    }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    }
  to {
    opacity: 1;
  }
`;

export const PageWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  height: ${props => (props.fullLenghtPage ? '100%' : 'calc(100vh - 20px)')};
  position: relative;
`;

export const Header = styled.div`
  text-align: center;
  position: relative;
`;

export const Logo = styled.div`
  opacity: ${props => (props.animate ? 0 : 1)};
`;

export const LangPage = styled.div`
  background: ${props => `url(https://img2.shaadi.com/assests/2018/mobile/lite-stop-${props.language}.png) center top/cover no-repeat`};
  width: 100%;
  height: 177px;
  display: inline-block;
  transition: all 0.1s;
`;

export const Content = styled.div`
  text-align: center;
  color: #95959d;
  font-size: 16px;
  font-weight: 300;
  opacity: ${props => (props.animate ? 0 : 1)};
`;

export const ChipWrap = radioStyle.tabwrapper.extend`
  display: block;
  margin: 10px 0 18px;
`;

export const ChipStyle = radioStyle.StyleButton.extend`
  && {
    margin: 8px 10px;
    padding: 0 8px;
    border-radius: 80px;
    height: 40px;
    color: #51505d;
    font-size: 16px;
    font-weight: 500;
    &:hover{
      font-weight: 500;
    }
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  width: ${props => (props.isSuccessBtn ? '200px' : '280px')};
  height: 46px;
  padding: 14px 0 18px;
  box-shadow: 0 5px 9px rgba(11, 226, 255, 0.39);
  border-radius: 23px;
  background: linear-gradient(180deg, #60ced4 0%, #00bcd5 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.19px;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  '-webkit-tap-highlight-color':transparent: ;
`;

export const Divider = styled.div`
  width: 50px;
  border: 1px solid rgba(223, 224, 227, 0.5);
  margin: 15px auto 20px;
`;

export const TickLoad = styled.div`
  animation: ${fadeIn} 0.25s ease;
`;

export const BottomContainer = styled.div`
  animation: ${fadeIn} 2s ease;
`;

export const SuccessMsg = styled.div`
  padding: 0 0 0;
  font-size: 20px;
  font-weight: 300;
  color: #51505d;
  lineheight: 40px;
  '> b' {
    font-size: 28px;
    font-weight: 500;
  }
`;

export const HamburgerWrapper = styled.div`
  margin: 5px 0 32px;
`;

export const Hamburger = styled(Link)`
  background: url(/assets/mobile/menu_hamburger.svg) left top no-repeat;
  width: 18px;
  height: 12px;
  display: inline-block;
  margin: 0 0 0 4px;
`;

export const BackContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const FadeUpDiv = styled.div`
  animation: ${fadeUp} 0.3s ease;
  background: #fff;
  width: 100%;
  height: 178px;
  position: absolute;
  bottom: 0;
  left: 0;
`;
