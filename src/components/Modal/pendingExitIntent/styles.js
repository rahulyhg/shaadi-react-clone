import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.PendingIntentWrapper = styled.div`
  position: relative;
  background: #fff;
  width: 824px;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  padding: 35px 40px;
  color: #72727d;
  border-radius: 3px;
`;
styles.PhotoFakeLink = styled.div`
  flex: 0 0 180px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
`;
styles.PhotoLink = styled(Link)`
  background-position: center top;
  border: 5px solid #ececec;
  border-radius: 85px;
  width: 150px;
  height: 150px;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  cursor: pointer;
`;
styles.Photo = styled.span`
  position: relative;
  flex: 0 0 185px;
  border-radius: 85px;
  display: inline-block;
  width: 100%;
  height: 100%;
`;
styles.IntentDetails = styled.div``;
styles.IntentTitle = styled.div`
  font: normal 25px arial;
`;
styles.TitleFakeLink = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: text-bottom;
  white-space: nowrap;
  max-width: 150px;
  color: #00bcd5;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
styles.IntentDesc = styled.div`
  font: normal 16px arial;
  display: inline-block;
  padding: 9px 0 20px;
`;
styles.IntentBtnsWrapper = styled.div``;
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
  width: 232px;
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
