import styled from 'styled-components';

const styles = {};
const styleProperty = {
  gradient: 'linear-gradient(to bottom, #8cc971 0%,#8cc971 10%,#86c877 17%,#3dbccf 100%)',
};

styles.ConnectNow = styled.div`
  position: relative;
  margin: 0 auto; 
  border-radius: 15px;   
  width: ${props => (props.btnType === 'accept' ? '82px' : '120px')};  
  height: 30px;
  box-shadow: 0 2px 2px rgba(39, 189, 200, 0.3);
  background: #fff ${styleProperty.gradient}; 
  &:hover {  
    background: ${styleProperty.gradient};
    }
  }
`;
styles.ConnectInner = styled.button`
  font: 400 13px/17px 'Roboto', sans-serif;
  background: ${props =>
    props.hideTick ? '#fff' : '#fff url(https://img2.shaadi.com/assests/2018/profile/caruousel-tick.svg) no-repeat 10px center'};
  width: ${props => (props.btnType === 'accept' ? '80px' : '118px')};
  height: 28px;
  color: #00bcd5;
  padding: ${props => (props.hideTick ? '0' : '0 0 0 15px')};
  line-height: 28px;
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 15px;
  transition: all 300ms ease;
  outline: 0;
  border: none;
  text-decoration: none;
  &:before {
    content: ${props => `'${props.btnText}'`};
  }
  &:hover {
    background: ${props =>
      props.hideTick ? 'transparent' : 'url(https://img2.shaadi.com/assests/2018/profile/caruousel-tick-hover.svg) no-repeat 9px center'};
    &:before {
      color: #fff;
    }
  }
`;

export default styles;
