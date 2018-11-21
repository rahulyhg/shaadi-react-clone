import styled from 'styled-components';

const styles = {};

styles.LoadingWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  top: -112px;
  left: 0;
  bottom: 10px;
  width: 100%;
  z-index: 9999;
`;

styles.ColorBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  opacity: 0.6;
`;

styles.LoadingIndicator = styled.div`
  position: relative;
  top: 250px;
  left: 420px;
  width: 252px;
  z-index: 1;
  border: 2px solid #ccccce;
  font: bold 18px arial;
  color: #444;
  text-align: center;
  border-radius: 10px;
  min-width: 222px;
  padding: 0 15px;
  background: #f6f6f6;
`;

styles.LoadingIcon = styled.span`
  display: inline-block;
  width: 31px;
  height: 31px;
  margin: 12px 3px 12px 8px;
  vertical-align: middle;
  background-image: url(/assets/loader-big.gif);
`;
styles.LoadingText = styled.span`
  display: inline-block;
  vertical-align: middle;
  color: #72727d;
  font: normal 18px/52px arial;
`;
export default styles;
