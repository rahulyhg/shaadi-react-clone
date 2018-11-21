import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

styles.searchGp = styled.div`
  background: #fff;
  margin: 20px 0;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  font: normal 12px arial;
`;
styles.title = styled.div`
  padding: 17px 11px 0;
  font: bold 16px/19px arial;
  color: #51505d;
`;
styles.header = styled.div`
  padding: 0 11px 0;
  font: normal 14px/21px arial;
  color: #72727d;
`;
styles.count = styled.span`
  font: normal 16px/19px arial;
  color: #51505d;
`;
styles.profileName = styled.span`
  font: bold 14px arial;
  color: #00bcd5;
`;
styles.slideContainer = styled.div`
  margin: 15px 9px 0;
`;
styles.listingRedirection = styled.div`
text-align: center;
    border-top: 1px solid #dfe0e3;
    margin: 20px 20px 0;
    padding: 6px 0 0;import Link from '../Common/Link';

`;
styles.seeAllLink = styled(Link)`
  text-decoration: none;
  color: #00bcd5;
  font: bold 14px/30px arial;

  &:hover {
    text-decoration: underline;
  }
`;
styles.profileInfo = styled.span`
  font: normal 12px/15px arial;
  color: #72727d;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

styles.sendEmail = styled.div`
  font: normal 14px/28px arial;
  color: #00bcd5;
  border: 1px solid #00bcd5;
  text-align: center;
  border-radius: 3px;

  width: 100%;
  bottom: 0;
`;

styles.viewedWrapper = styled.div`
  padding: 0 0 7px;
  position: relative;
`;
styles.viewedInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0 0;
  margin: 15px 8px 0 10px;
  height: 140px;
  text-align: center;
  background: #f8f8f8;
`;

styles.multiProfileWrap = styled.div`
  cursor: pointer;
  display: inline-block;
  height: 48px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 100px;
`;
styles.multiProfileText = styled.div`
  font: normal 16px arial;
  line-height: 22px;
  width: 378px;
  margin: 14px auto 0;
`;
styles.profileLink = styled(Link)`
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  border: 2px solid #dfe0e3;
  background-repeat: no-repeat;
  border-radius: 50px;
  background-size: 100%;
  text-decoration: none;

  ${props => (props.order === 1 || props.order === 2 ? `background-image:url(${props.img})` : '')} ${props =>
      props.order === 3
        ? `margin: 0 0 0 -15px;
                                      z-index: 2;
                                      background: #fff;
                                      color: #00bcd5;
                                      border: 1px solid #00bcd5;
                                      width: 42px;
                                      position:relative;
                                      height: 42px;`
        : ''};
  ${props =>
    props.order === 2
      ? ` margin: 0 0 0 -15px;
                                       z-index: 1;`
      : ''};
  width: 40px;
  height: 40px;
`;
styles.reqCount = styled.span`
  left: 0;
  margin: -8px 0 0;
  font-size: 14px;
  position: absolute;
  top: 50%;
  display: block;
  right: 0;
`;
styles.innerWrap = styled.div`
  width: 960px;
`;
styles.multiProfile = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  height: 48px;
  text-align: left;
  overflow: hidden;
  vertical-align: middle;
  position: relative;
`;

styles.userGuide = styled.div`
  font: normal 16px arial;
  line-height: 22px;
  width: 378px;
  margin: 14px auto 0;
`;
styles.exceptionAction = styled(Link)`
  font: 14px/28px arial;
  color: #00bcd5;
  border: 1px solid #00bcd5;
  text-align: center;
  border-radius: 3px;
  display: inline-block;
  margin: 15px auto 0;
  width: 220px;
  bottom: 0;
  text-decoration: none;
  position: static;
`;
export default styles;
