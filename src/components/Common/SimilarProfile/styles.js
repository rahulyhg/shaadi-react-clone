import styled, { keyframes } from 'styled-components';

const styles = {};

const slideDownCard = keyframes`
  0%{
    transform: translateY(-248px);
    height: 0;
    transition: height 1s ease;
  }
  100%{
    transform: translateY(0);
    height:328px;
    transition: height 1s ease;
  }
  
`;
const slideDownItem = keyframes`
  0%{
    transform: translateY(-210px);
  }
  100%{
    transform:translateY(0) .1s ease-in-out;
  }
`;

styles.SimilarProfileCard = styled.div`
  background: #fff;
  border-radius: 0 0 3px 3px;
  width: ${props => (props.type === 'listing' ? '734px' : '654px')};
  ${props => (props.type === 'listing' ? 'margin: -10px 0 10px 10px;' : '')} box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px,
    rgba(0, 0, 0, 0.12) 0 1px 4px;
  position: relative;
  box-sizing: border-box;
  animation: ${slideDownCard} 1s;
  display: ${props => (props.animateNow ? 'block' : 'none')};
  overflow: hidden;
`;

styles.item = styled.div`
  position: relative;
  width: 150px;
  height: 258px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  top: 0;
  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.39);
  }
`;

styles.itemWrap = styled.div`
  padding: 14px 10px 20px 10px;
  &:first-child {
    padding: 14px 10px 0 20px;
  }
  &:last-child {
    padding: 14px 20px 20px 10px;
  }
`;

styles.carouselWrap = styled.div`
  animation: ${slideDownItem} 1.2s;
`;

styles.CardTitle = styled.div`
  width: 100%;
  color: #51505d;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 0.38px;
  padding: 17px 0 0 19px;
  position: relative;
  top: 0;
`;

styles.ProfileCount = styled.span`
  font-weight: 500;
  letter-spacing: 0.38px;
`;

export default styles;
