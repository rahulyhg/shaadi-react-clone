import styled from 'styled-components';

const styles = {};

styles.InviteLimitWrapper = styled.div`
  width: 559px;
  cursor: auto;
  color: #434343;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  z-index: 3;
`;
styles.ProfileRequestSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
`;
styles.RequestSection = styled.div`
  flex: 0 0 auto;
  width: 80%;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  padding: 20px 0;
  justify-content: space-between;
  border-bottom: ${props => `${props.borderBottom}px solid #f3f3f3`};
`;
styles.RequestText = styled.div`
  flex: 0 0 auto;
  width: 65%;
  height: 35px;
  line-height: 35px;
  font: 14px/37px arial;
  color: #72727d;
`;
styles.AcceptRequestButton = styled.a`
  flex: 0 0 auto;
  padding: 10px;
  height: 35px;
  background-color: #00bcd5;
  text-decoration: none;
  font: bold 12px arial;
  outline: none;
  box-sizing: border-box;
  color: #fff !important;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  &:hover {
    background-color: #0194a8;
  }
`;

export default styles;
