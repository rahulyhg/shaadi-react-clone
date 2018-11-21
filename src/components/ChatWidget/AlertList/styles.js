import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.AlertFlash = styled.div`
  text-align: 'center',
  font-size: 10px,
  padding: 5px,
`;

styles.AlertList = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  flex: 1;
  height: 100%;
`;

styles.AlertItem = styled(Link)`
  display: flex;
  flex: 1;
  flex-basis: 100%;
  background: #fff;
  outline: none;
  border: 0;
  padding: 3px 3px 3px 6px;
  font-size: 11px;
  border-bottom: 1px solid #f1f1f2;
  overflow: hidden;
  width: 100%;
  text-decoration: none;
  box-sizing: border-box;

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

styles.Info = styled.div`
  flex: 1;
  overflow: hidden;
`;

styles.AlertMsg = styled.div`
  color: #95959d;
  font-size: 11px;
  word-wrap: break-word;
  line-height: ${props => (props.isSystem ? 'normal' : props.isRead ? '8px' : '13px')};
`;

styles.Name = styled.div`
  display: ${props => (props.isSystem ? 'none' : 'inline')};
  font: bold 11px/20px arial;
  color: #00bcd5;
`;

styles.Time = styled.div`
  margin-top: 2px;
  color: #999;
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

styles.NoDataList = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font-size: 12px;
  margin: -7px 0 0;
  position: absolute;
  text-align: center;
  top: 50%;
  width: 245px;
`;

styles.AlertLinkWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: #fff;
  border: solid 1px #dfe0e3;
  padding: 7px 0;
  font-size: 11px;
  text-align: center;
`;

styles.AlertLink = styled(Link)`
  text-decoration: none;
  color: #00bcd5;
  background: url(/assets/grey-arrow.gif) no-repeat right center;
  padding: 0 7px 0 0;

  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
