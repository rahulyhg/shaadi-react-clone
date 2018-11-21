import styled from 'styled-components';
import Link from '../../components/Common/Link';

const styles = {};
styles.InboxPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 990px;
  border: 0;
  min-height: 400px;
  padding: 0;
  font: normal 12px arial;
  color: red;
  padding-top: ${props => `${props.topSpace}px`};
  margin: ${props => (props.isChatOpen ? `0 auto 0 ${(props.windowWidth - 1207) / 2}px` : '0 auto')};
`;

styles.LeftPanel = styled.div`
  width: 207px;
  margin: 0 22px 0 0;
`;

styles.ListWrap = styled.div`
  width: 736px;
  position: relative;
`;

styles.ContentWrap = styled.div`
  display: flex;
  justify-content: center;
`;

styles.InboxList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 35px 0 35px;
  width: 100%;
  min-height: 435px;
`;

styles.InboxTabWrap = styled.ul`
  display: flex;
  border-bottom: 1px solid #cdced1;
  font: 300 18px 'Roboto', sans-serif;
  list-style: none;
  margin: 0 13px 0 239px;
  padding: 0;
`;

styles.TabItem = styled.li`
  font-weight: 400;
  color: ${props => (props.isActive ? '#ff5a60' : '#72727d')};
  transition: color 0.2s ease 0s;
  padding: 3px 50px 6px;
  display: block;
  position: relative;
  cursor: ${props => (props.isActive ? 'default' : 'pointer')};
  &:hover {
    color: #ff5a60;
  }
  ::after {
    background: #ff5a60;
    bottom: 0;
    content: '';
    display: block;
    height: 3px;
    left: 0;
    position: absolute;
    transform: scaleX(${props => (props.isActive ? 1 : 0)});
    transition: transform 250ms ease 0s;
    width: 100%;
  }
`;

styles.TabItem1 = styled.li`
  ${props =>
    props.isActive
      ? `
      font-weight: 400;
      color: #ff5a60;
      transition: color 0.2s ease 0s;
     
      background: #ff5a60;
      bottom: 0;
      content: "";
      display: block;
      height: 3px;
      left: 0;
      position: absolute;
      transform: scaleX(1);
      transition: transform 250ms ease 0s;
      width: 100%;
      
      `
      : `color: #95959d;`} list-style: none;
  margin: 0;
  padding: 3px 50px 6px;
  cursor: ${props => (props.isActive ? 'default' : 'pointer')};
  position: relative;
  &:hover {
    color: #ff5a60;
  }
`;
styles.InboxHeading = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #72727d;
  padding: 14px 5px 2px 261px;
`;
styles.InboxItem = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 20px 0 0;
  width: 100%;
  padding: 14px 22px 10px;
  font-weight: bold;
  border-top: 0;
  margin: 0 0 15px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  border-radius: 3px;
  background: #fff;
  color: #72727d;
`;
styles.itemSeletor = styled.input`
  margin: 0 10px 0 0;
  padding: 0;
  vertical-align: middle;
  color: #72727d;
  font: normal 12px arial;
  border-radius: 3px;
  border: 1px solid #dfe0e3;
`;
styles.profilePhoto = styled(Link)`
  margin: 0 0 0 10px;
  width: 60px;
  height: 60px;

  box-shadow: none !important;
  background: #fff !important;
`;
styles.Image = styled.img`
  border-radius: 50%;
`;

styles.InviteDetails = styled.div`
  width: 796px !important;
  padding: 0 0 0 20px;
`;
styles.userActionBtn = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: row;
`;
styles.filterContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  -webkit-align-items: flex-start; /* Safari 7.0+ */

  align-items: flex-start;
  padding: 2px 10px 10px 22px;
  position: relative;
  z-index: 899;
  color: #72727d;
`;
styles.actionContainer = styled.div`
  flex: 1;
`;
styles.filterOptions = styled.div`
  text-align: right;
  flex: 1;
`;

styles.selectedFilter = styled.span`
  background: url(https://img2.shaadi.com/imgs/unified/grey-down-arrow-v2.gif) no-repeat right center;
  padding: 0 15px 0 0;
  display: inline-block;
  margin: 5px 0;
  color: #00bcd5;
  cursor: pointer;
`;
styles.allFilter = styled.span`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  text-align: right;
  border: 1px solid #bebebe;
  position: absolute;
  top: 23px;
  right: 0;
  z-index: 999;
  background: #fff;
  box-shadow: -1px 2px 5px #c1c1c1;
  white-space: nowrap;

  padding: 8px 15px;

  display: ${props => (props.isVisible ? 'flex' : 'none')};
`;
styles.filterLink = styled.div`
  text-decoration: none;
  color: #00bcd5;
  cursor: pointer;
  display: block;
  padding: 5px 0;
`;
styles.LoadingWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: relative;
  top: 206px;
  left: 0;
  width: 100%;
  z-index: 9999;
`;

styles.MergeReqContainer = styled.ul`
display: flex;
  flex-direction: row;
    list-style: nonwidth :100%;
        -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    width: 930px;
    overflow:hidden;

`;
styles.ReqContainer = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0 10px 5px 0;
  padding: 14px 22px 10px;
  font-weight: bold;
  border-top: 0;

  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);

  border-radius: 3px;
  background: #fff;
  color: #72727d;

  width: 406px;
  height: auto;
  list-style: outside none;
  position: relative;
`;
styles.ReqTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #72727d;
  padding: 0 0 8px;
`;
styles.ReqMsg = styled.div`
  font-size: 14px;
  font-weight: normal;
  height: 40px;
  font-weight: normal;
  width: 406px;
`;
styles.ReqProfileBrief = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
styles.reqViewAll = styled(Link)`
  margin: 10px 0 0 20px;

  text-decoration: none;
  display: inline-block;
  padding: 4px 10px;
  font: bold 14px arial;
  cursor: pointer;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  vertical-align: middle;
  line-height: 16px;
  height: 16px;
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
  width: ${props => (props.multi ? '310px' : '100px')};
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

  ${props => (props.order === '1' || props.order === '2' ? `background-image:url(${props.img})` : '')} ${props =>
      props.order === '3'
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
    props.order === '2'
      ? ` margin: 0 0 0 -15px;
                                       z-index: 1;`
      : ''};
  width: 40px;
  height: 40px;
`;
styles.SReqContainer = styled.li`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0 10px 5px 0;
  padding: 14px 22px 10px;
  font-weight: bold;
  border-top: 0;

  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);

  border-radius: 3px;
  background: #fff;
  color: #72727d;

  width: 100%;
  height: auto;
  list-style: outside none;
`;
styles.SReqDesc = styled.div`
  margin: 0 40px 0 0;
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
styles.declineBtn = styled.span`
  background: #f1f1f2;
  border: 1px solid #dfe0e3;
  vertical-align: middle;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  padding: 4px 8px;
  text-decoration: none;
  ${props => (!props.isSelected ? 'color: #ccc' : '')};
`;
styles.deleteBtn = styled.span`
  background: #f1f1f2;
  border: 1px solid #dfe0e3;
  vertical-align: middle;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  padding: 4px 8px;
  text-decoration: none;
  margin-right: 2px;
  ${props => (!props.isSelected ? 'color: #ccc' : '')};
`;
styles.itemSeletor = styled.input`
  margin: 0 10px 0 0;
  padding: 0;
  vertical-align: middle;
  color: #72727d;
  font: normal 12px arial;
  border-radius: 3px;
  border: 1px solid #dfe0e3;
`;
styles.FeaturedWrap = styled.div`
  width: 966px;
  margin: 0 auto;
`;
styles.Title = styled.div`
  font: 400 18px 'Roboto', sans-serif;
  color: #51505d;
  text-align: center;
  margin: 26px 0 15px;
`;
styles.textCount = styled.span``;

export default styles;
