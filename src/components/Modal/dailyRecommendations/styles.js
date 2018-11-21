import styled, { keyframes } from 'styled-components';

const styles = {};

const reveal = keyframes`
  from {
    max-height: 0;
  }
  to {
    max-height: 200px;
  }
`;

styles.DailyRecommendationsWrapper = styled.div`
  position: relative;
  width: 824px;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  background: #fff;
  padding: 20px 19px 32px 28px;
  z-index: 3;
`;
styles.IntentWrapper = styled.div`
  display: flex;
`;
styles.RecommendationIcon = styled.div`
  background: url(/assets/daily-five-sprite-ver2.png) no-repeat left top;
  width: 103px;
  height: 69px;
  margin: 1px -9px 0 2px;
  position: relative;
  bottom: -5px;
`;
styles.RecommendationTitle = styled.div`
  border-bottom: 1px solid #e0dfce;
  display: flex;
`;
styles.LeftQuouteIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
  background: url(/assets/daily-five-sprite-ver2.png) no-repeat -104px -3px;
  width: 19px;
  height: 15px;
  margin: 33px 4px 0 0;
`;
styles.RecommendationTitleText = styled.span`
  display: inline-block;
  font: normal 22px arial;
  color: #72727d;
  padding: 27px 0 0;
`;
styles.RightQuouteIcon = styled.div`
  display: inline-block;
  vertical-align: middle;
  background: url(/assets/daily-five-sprite-ver2.png) no-repeat left -69px;
  width: 19px;
  height: 15px;
  margin: 33px 4px 0 0;
`;
styles.IntentDetails = styled.div``;
styles.Recommendations = styled.div`
  margin: 30px auto 4px;
  text-align: center;
  width: 740px;
  max-height: 0;
  overflow: hidden;
  animation: ${reveal} 0.5s linear;
  animation-iteration-count: once;
  animation-delay: 1.2s;
  animation-fill-mode: forwards;
`;
styles.Recommendation = styled.div`
  display: inline-block;
  overflow: hidden;
  text-align: center;
  width: 244px;
`;
styles.RecommendationPhotoLink = styled.div`
  background-position: center top;
  border: 8px solid #ececec;
  border-radius: 85px;
  display: inline-block;
  height: 150px;
  width: 150px;
  cursor: pointer;
`;
styles.RecommendationPhoto = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 85px;
`;
styles.Name = styled.div`
  font: normal 22px/40px arial;
  color: #72727d;
  height: 38px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
styles.RecommedationIntentBtnsWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;
styles.IntentBtn = styled.button`
  background: ${props => (props.isPrimary ? '#00bcd5' : '#eaeaea')};
  border: ${props => (props.isPrimary ? '#00bcd5' : '#eaeaea')};
  color: ${props => (props.isPrimary ? '#fff' : '#72727d')};
  margin-right: ${props => (props.isPrimary ? '10px' : 0)};
  border-radius: 3px;
  display: inline-block;
  font: normal 22px/41px arial;
  height: 41px;
  text-align: center;
  width: ${props => (props.isLongBtn ? '352px' : '232px')};

  &:hover {
    background: ${props => (props.isPrimary ? '#0194a8' : '#e2e1e1')};
    border: ${props => (props.isPrimary ? '#0194a8' : '#e2e1e1')};
  }
`;
styles.CloseIntentModalBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: block;
  width: 20px;
  height: 20px;
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: url(/assets/big-close-v2.png) no-repeat left -207px;
  &:hover {
    background: url(/assets/big-close-v2.png) no-repeat left -231px;
  }
`;

export default styles;
