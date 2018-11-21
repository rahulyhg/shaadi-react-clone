import styled from 'styled-components';

const styles = {};

styles.Question = styled.div`
  color: #72727d;
  font: 300 18px 'Roboto', sans-serif;
  padding: 8px 0 12px;
`;

styles.Star = styled.div`
  width: 50px;
  height: 50px;
  background: url('https://img2.shaadi.com/assests/2018/images/star.png') no-repeat center center;
  background-size: 30px 28px;
  transform: scale(1);
  transition: 0.1s all ease-in-out;
  cursor: pointer;
  &:hover {
    background: url('https://img2.shaadi.com/assests/2018/images/star-hover.png') no-repeat center center;
    background-size: 34px 32px;
    animation-delay: 3s;
    transform: scale(1);
  }
`;

styles.StarActive = styled.div`
  width: 50px;
  height: 50px;
  background: url('https://img2.shaadi.com/assests/2018/images/star-hover.png') no-repeat center center;
  background-size: 34px 32px;
`;

styles.RatingStars = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

styles.Widget = styled.div`
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
  border-sizing: border-box;
`;

styles.WidgetWapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

styles.RatingReactionLabel = styled.div`
  text-align: center;
  padding: 7px 0 4px;
  color: #72727d;
  font: 700 14px/16px 'Roboto', sans-serif;
  border-radius: 20px;
  background-color: #fdedee;
  width: 97px;
  margin: 30px auto 0;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  display: ${props => (props.isVisible ? 'block' : 'none')};
  transition: 0.2s all ease-in-out;
`;
styles.RateExperienceBanner = styled.div`
  width: 120px;
  height: 144px;
  background: url(${props => (props.imgSrc ? `http://img2.shaadi.com/assests/2018/images/${props.imgSrc}` : '')}) center center no-repeat;
  background-size: 120px 144px;
  margin: 28px auto 8px;
  @media (max-width: 768px) {
    margin: 6px auto 8px;
  }
`;

export default styles;
