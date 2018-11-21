import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.MatchItemWrap = styled.div`
  border: solid 1px ${props => (props.membershipTags === 'vip' ? '#aa1e3c' : 'transparent')};
  background: #fff;
  border-radius: 3px;
  margin: 10px 10px 10px 0;
  position: relative;
  width: 734px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  font: ${props => (props.listType === 'request' ? 300 : 400)} 18px 'Roboto', sans-serif;
  color: #72727d;
`;

styles.CupidImg = styled.span`
  display: inline-block;
  background: url(${props => (props.listType === 'request' ? '/assets/request-zero-cupid.png' : '/assets/zero-cupid.png')}) left top
    no-repeat;
  width: 203px;
  height: ${props => (props.listType === 'request' ? '133px' : '123px')};
  margin: 66px 0 20px;
`;

styles.Statement = styled.div`
  margin: 0 0 60px;
  color: #72727d;
`;

styles.NoResultLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  outline: 0;
  &:hover {
    text-decoration: underline;
  }
`;

styles.LinkArrow = styled.span`
  display: inline-block;
  background: url(/assets/auto-pagnation-sprite.png) left -56px no-repeat;
  width: 9px;
  height: 12px;
  margin: 0 0 0 5px;
`;

export default styles;
