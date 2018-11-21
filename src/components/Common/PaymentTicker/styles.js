import styled from 'styled-components';

const styles = {};

styles.RecommendationTickerWrap = styled.div`
  min-width: 135px;
  margin: 21px 33px 0 0;
  float: right;
`;

styles.RecommendationTickerMsg = styled.div`
  font: normal 9px arial;
  text-transform: uppercase;
  color: #72727d;
  height: 18px;
`;
styles.CountDownHolder = styled.div`
  text-transform: uppercase;
  color: #72727d;
  font: 500 24px 'Roboto', sans-serif;
  vertical-align: middle;
  text-align: center;
`;
styles.CountDownPosition = styled.span`
  float: left;
  height: 24px;
  overflow: hidden;
  position: relative;
  width: 15px;
`;
styles.CountDigit = styled.span`
  top: 0px;
  opacity: 1;
  position: absolute;
  display: block;
  width: 14px;
  text-align: center;
  color: #fff;
`;
styles.CountText = styled.span`
  width: 10px;
  float: left;
  text-align: left;
  color: #fff;
  text-transform: lowercase;
  font: 400 18px 'Roboto', sans-serif;
  padding: 5px 0 0;
`;
styles.CountText.displayName = 'CountText';
styles.CountTextMin = styled.span`
  width: 14px;
  float: left;
  text-align: left;
  color: #fff;
  font: 400 18px 'Roboto', sans-serif;
  padding: 5px 0 0;
  text-transform: lowercase;
`;
styles.CountTextMin.displayName = 'CountTextMin';
styles.CountColun = styled.span`
  color: #fff;
  float: left;
  width: 15px;
  height: 20px;
`;
styles.CountColun.displayName = 'CountColun';
styles.RequiredDoc = styled.div`
  margin: 10px 0 0;
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
