import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.OnlineFlash = styled.div`
  text-align: 'center',
  font-size: 10px,
  padding: 5px,
`;

styles.OnlineGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex: 1;
  height: 100%;
`;

styles.OnlineUser = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-basis: 100%;
  background: #fff;
  outline: none;
  border: 0;
  font-size: 11px;
  overflow: hidden;
  text-decoration: none;
  padding: 3px 6px;
  color: #999;
  height: 30px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f2;
  }
`;

styles.Photo = styled.img`
  padding: 1px;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  margin: 0 5px 0 0;
  border: solid 1px #e7e5e8;
`;

styles.Name = styled.span`
  display: flex;
  flex: 1;
`;

styles.UserList = styled.div`
  max-height: ${props => (props.isVisible ? `${props.height || 1500}px` : 0)};
  overflow: hidden;
  transition: 0.6s linear;
`;

styles.GroupHeading = styled.div`
  display: block;
  text-align: center;
  height: 23px;
  cursor: pointer;
  font: bold 12px arial;
  color: #b1b3b9;
  background: #fff url(/assets/im-icon-sprite-ver6.png) repeat-x left -451px;
  cursor: pointer;
`;

styles.Title = styled.div`
  display: inline-block;
  padding: 0 5px 0 16px;
  line-height: 23px;
  background-color: #fff;
  background-position: 3px ${props => (props.isGroupOpen ? '-400px' : '-421px')};
  background-image: url(/assets/im-icon-sprite-v8.png);
  background-repeat: no-repeat;
`;

styles.Group = styled.div``;

styles.NoData = styled.div`
  display: flex;
  background: #fffbe6;
  color: #72727d;
  padding: 5px 0;
`;

styles.NoDataIcon = styled.div`
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: left -612px;
  margin: 2px 7px 2px 4px;
  width: 16px;
  height: 14px;
  background-image: url(/assets/im-icons-v2.gif);
  cursor: pointer;
`;

styles.NoDataText = styled.div`
  display: inline-block;
  vertical-align: top;
  font: normal 11px arial;
  color: #72727d;
  padding-right: 20px;
  width: 196px;
`;

styles.PartnerLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
