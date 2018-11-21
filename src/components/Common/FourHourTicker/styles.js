import styled, { keyframes } from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  0% { top: -31px; }
  25% { top: 0; }
  75% { top: 0; }
  100% { top: 37px; }
}
`;

const anchorLink = styled(Link)`
  color: #00bcd5;
  outline: none;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

styles.FourHourTickerWrap = styled.div`
  position: relative;
  z-index: 998;
  background: #fff;
  font-family: 'Roboto', sans-serif;
  animation: ${props => (props.willFade ? fadeOut : null)} 1s linear;
  animation-fill-mode: forwards;
`;
styles.FourHourTickerSubWrap = styled.div`
  display: flex;
  width: 750px;
  margin: 0 auto;
`;
styles.FourHourTickerLeftWrap = styled.div`
  margin: 14px 0 8px;
  width: 511px;
`;
styles.FourHourTickerMsg = styled.div`
  font-size: 16px;
  color: #51505d;
  display: flex;
`;
styles.CountDownHolder = styled.p`
  height: 23px;
  text-align: center;
  display: flex;
  margin: 0 0 0 4px;
`;
styles.CountDownPosition = styled.span`
  display: flex;
  height: 21px;
  position: relative;
  width: 10px;
  overflow: hidden;
`;
styles.CountDigit = styled.span`
  color: #ee4f57;
  display: inline-block;
  width: 10px;
  position: absolute;
  text-align: center;
  animation: ${props => (props.animate ? fadeIn : null)} 1s infinite;
`;
styles.CountText = styled.span`
  color: #ee4f57;
  width: 10px;
`;
styles.CountTextMin = styled.span`
  color: #ee4f57;
  width: 17px;
`;
styles.CountColun = styled.span`
  width: 11px;
  text-align: center;
`;
styles.RequiredDoc = styled.div`
  margin: 10px 0 0;
`;

styles.RequiredDocLink = styled(Link)`
  font: 400 14px/14px "Roboto", sans-serif;
  display: inline-block;
  background-image: url(/assets/4h-workflow-sprite.png);
  background-repeat: no-repeat;
  color: '#00bcd5',
  background-position: left
    ${props =>
      ({
        upload_your_photo: '2px',
        add_career_details: '-18px',
        add_family_details: '-43px',
      }[props.icon])};
  padding: ${props =>
    ({
      upload_your_photo: '0 17px 0 23px',
      add_career_details: '0 23px 0 28px',
      add_family_details: '0 10px 0 29px',
    }[props.icon])};
  margin: 0 10px 0 0;
  border-right: ${props => (props.isLast ? 'none' : '1px solid #e3e4eb')};

  &:hover {
    text-decoration: 'underline',
    cursor: 'pointer',
  }
`;

styles.RequiredDocSpan = styled.span`
  font: 400 14px/14px 'Roboto', sans-serif;
  display: inline-block;
  background-image: url(/assets/4h-workflow-sprite.png);
  background-repeat: no-repeat;
  color: '#95959d';
  background-position: left -86px;
  padding: ${props =>
    ({
      upload_your_photo: '0 17px 0 23px',
      add_career_details: '0 23px 0 28px',
      add_family_details: '0 10px 0 29px',
    }[props.icon])};
  margin: 0 10px 0 0;
  border-right: ${props => (props.isLast ? 'none' : '1px solid #e3e4eb')};

  &:hover {
    text-decoration: 'none';
    cursor: 'default';
  }
`;

styles.RequiredDocLink = styled(anchorLink)`
  font: 400 14px/14px 'Roboto', sans-serif;
  display: inline-block;
  background-image: url(/assets/4h-workflow-sprite.png);
  background-repeat: no-repeat;
  color: '#00bcd5';
  background-position: left
    ${props =>
      ({
        upload_your_photo: '2px',
        add_career_details: '-18px',
        add_family_details: '-43px',
      }[props.icon])};
  padding: ${props =>
    ({
      upload_your_photo: '0 17px 0 23px',
      add_career_details: '0 23px 0 28px',
      add_family_details: '0 10px 0 29px',
    }[props.icon])};
  margin: 0 10px 0 0;
  border-right: ${props => (props.isLast ? 'none' : '1px solid #e3e4eb')};

  &:hover {
    text-decoration: 'underline';
    cursor: 'pointer';
  }
`;
styles.FourHourBtn = styled(Link)`
  border: 0;
  display: inline-block;
  background: #00bcd5;
  border-radius: 3px;
  color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font: 400 14px/33px 'Roboto', sans-serif;
  height: 33px;
  margin: 24px 10px 0 0;
  padding: 0 20px;
  transition: all 300ms ease 0s;
  text-decoration: none;

  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    background: #0194a8;
  }
`;

styles.FourHourClose = styled.span`
  background: url(/assets/reg-layer-new-close.png) no-repeat 9px 8px;
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 2px 0 0;

  &:hover {
    background: url(/assets/reg-layer-new-close.png) no-repeat 9px -22px;
  }
`;

export default styles;
