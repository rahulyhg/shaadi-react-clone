import styled from 'styled-components';

const styles = {};

styles.InterestsWrapper = styled.div`
  position: relative;
  width: 559px;
  z-index: 3;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
`;
styles.InterestItem = styled.div`
  display: flex;
  padding: 0 0 5px;
  font: normal 13px/20px arial;
`;
styles.InterestLabel = styled.div`
  flex: 0 1 242px;
  text-align: left;
  background: url(/assets/profile-ic-sprite.png) no-repeat 161px -340px;
  color: #b1b3b9;
  margin-right: 0;
`;
styles.InterestDesc = styled.div`
  flex: 0 1 516px;
  text-align: left;
  color: #72727d;
`;

export default styles;
