import styled, { keyframes, css } from 'styled-components';
import { composeMixins } from '../../../helpers/styleUtils';

const styles = {};

const styleProperty = {
  width: 'width: 30px',
  height: 'height: 30px',
  radius: 'border-radius: 15px',
  common: { position: 'absolute', width: '100%', height: '100%' },
};

const left = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;
const right = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;

styles.LoaderWrapper = styled.div`
  ${styleProperty.width};
  ${styleProperty.height};
  margin: 0 auto;
  background: #f1f1f2;
  border-radius: 15px;
`;
styles.LoaderContainer = styled.div`
  ${styleProperty.width};
  ${styleProperty.height};
  margin: 0 auto;
  position: relative;
`;
styles.OuterShadow = styled.div`
  z-index: 4;
  ${styleProperty.common};
  ${styleProperty.radius};
`;
styles.InnerShadow = styles.OuterShadow.extend` 
  top: 50%;
  left: 50%;
  width: 26px;
  height: 26px;
  margin-left: -13px;
  margin-top: -13px;
  ${styleProperty.radius};
  background: #fff;
`;
styles.InnerHold = css`
  ${styleProperty.common};
  clip: rect(0px, 30px, 30px, 15px);
  ${styleProperty.radius};
  background: #f1f1f2;
`;
styles.InnerFill = styled.div`
  ${styleProperty.common};
  ${styleProperty.radius};
  clip: rect(0px, 15px, 30px, 0px);
  background: #8cc971;
`;
styles.InnerLeft = css`
  ${styles.InnerFill} {
    z-index: 1;
    animation: ${left} 0.5s linear both;
  }
`;
styles.InnerRight = css`
  z-index: 3;
  transform: rotate(180deg);
  ${styles.InnerFill} {
    z-index: 3;
    animation: ${right} 0.5s linear both;
    animation-delay: 0.5s;
  }
`;
styles.DefaultLeft = styled.div`
  ${composeMixins(styles.InnerHold, styles.InnerLeft)};
`;

styles.DefaultRight = styled.div`
  ${composeMixins(styles.InnerHold, styles.InnerRight)};
`;

export default styles;
