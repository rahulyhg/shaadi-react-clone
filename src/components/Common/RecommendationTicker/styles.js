import styled from 'styled-components';

const styles = {};

styles.RecommendationTickerWrap = styled.div`
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'min-width: 135px'};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'margin: 37px 33px 0 0'};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'float: right'};
`;

styles.RecommendationTickerMsg = styled.div`
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 12px 'Roboto', sans-serif" : 'normal 9px arial')};
  color: #72727d;
  height: 18px;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'display: inline-block'};
`;
styles.CountDownHolder = styled.div`
  text-transform: uppercase;
  color: #72727d;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "700 14px 'Roboto', sans-serif" : 'bold 18px arial')};
  vertical-align: middle;
  text-align: center;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'display: inline-block'};
  margin-top: 2px;
`;
styles.CountDownPosition = styled.span`
  float: left;
  height: 20px;
  overflow: hidden;
  position: relative;
  width: 10px;
`;
styles.CountDigit = styled.span`
  top: 0px;
  opacity: 1;
  position: absolute;
  display: block;
  width: 10px;
  text-align: center;
  color: #e53a41;
`;
styles.CountText = styled.span`
  width: 13px;
  float: left;
  text-align: left;
  color: #f2a4aa;
  text-transform: lowercase;
`;
styles.CountTextMin = styled.span`
  width: 17px;
  float: left;
  text-align: left;
  color: #f2a4aa;
  text-transform: lowercase;
`;
styles.CountColun = styled.span`
  color: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '#e53a41' : '#72727d')};
  float: left;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "700 14px 'Roboto', sans-serif" : 'bold 18px/23px arial')};
  text-align: center;
  text-align: ${props => (['B', 'C'].includes(props.profilePageBucket) ? 'left' : 'center')};
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '8px' : '16px')};
  height: 20px;
`;
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
