/* eslint-disable */
import styled from 'styled-components';
import Link from '../../components/Common/Link';


const styles = {};

styles.MatchesGroupWrapper = styled.div`
  display: flex;
  width: 960px;
  min-height: 400px;
  position:relative;
  padding-top: ${props => props.topSpace + 'px'};
  margin: ${props => (props.isChatOpen ? '0 auto 0 ' + ((props.windowWidth - 1207)/ 2) + 'px' : '0 auto')};
`;
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
  opacity: .6;
`;

styles.LoadingIndicator = styled.div`
  position: relative;
  top: 250px;
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
  margin: 0 auto;
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
styles.NoMoreMatches = styled.div`
    padding: 14px 0 25px;
    font: 18px arial;
    color: #72727d;
    text-align: center;
    margin : 0 auto;
`;
styles.searchLink = styled(Link)`
color: #00bcd5;
text-decoration:none;
`; 
export default styles;