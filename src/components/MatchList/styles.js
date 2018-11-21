import styled from 'styled-components';

const styles = {};

styles.MatchList = styled.div`
  position: relative;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: ${props => (props.isGridPage ? '730px' : '750px')};
`;
styles.InboxList = styled.div`
  position: relative;
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: 736px;
`;
styles.Header = styled.div`
  ${props =>
    props.sortPosition === 'bottom'
      ? 'display: flex;justify-content: space-between;position: relative;z-index: 3;padding: 16px 0 15px;'
      : 'padding: 0;margin: -5px 0 0;'};
`;

styles.ConnectWrapper = styled.div`
  flex: 1;
  visibility: hidden;
  margin-left: 15px;
`;

styles.ArrowImg = styled.img`
  display: none;
  vertical-align: middle;
  margin-top: 9px;
`;

styles.ConnectLoading = styled.span`
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  padding: 14px;
  margin: 0px 15px;
  outline: 0;
  background-image: url(/assets/loading.gif);
  background-repeat: no-repeat;
`;

styles.ConnectBtn = styled.button`
  display: none;
  vertical-align: middle;
  border: 1px solid #dfe0e3;
  background: #f1f1f2;
  border-radius: 3px;
  color: #72727d;
  overflow: hidden;
  font-size: 12px;
  padding: 3px 10px 4px;
  margin-top: 2px;
  outline: 0;

  &:hover {
    background: #e5e5e5;
    color: #72727d;
  }
`;

styles.SortWrapper = styled.div`
  ${props => (props.sortPosition === 'bottom' ? 'display: flex;margin-top: 5px;' : 'position: absolute;top: -30px;right: -9px;z-index: 5')};
`;

styles.ListStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 68px;
`;

styles.List = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top: ${props => (props.isGridPage ? '1px solid #d9d9d9' : 0)};
  margin-top: ${props => (props.isGridPage ? '-8px' : 0)};
  padding-top: ${props => (props.isGridPage ? '10px' : 0)};
`;

styles.ListStyleBtn = styled.button`
  background: transparent;
  outline: 0;
  border: 0;
  padding: 0;
  margin-right: ${props => (props.isListBtn ? '6px' : 0)};
`;

styles.ListStyleIcon = styled.span`
  display: inline-block;
  background: url(${props => (props.icon === 'grid' ? '/assets/grid-view-v2.gif' : '/assets/list-view-v2.gif')}) left
    ${props => (props.isActive ? 'bottom' : 'top')} no-repeat;
  width: 31px;
  height: 24px;
  margin-top: 2px;

  &:hover {
    background-position: left bottom;
  }
`;

styles.LoadingWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  top: -112px;
  left: 0;
  bottom: 10px;
  width: 100%;
  z-index: 9999;
`;

styles.ColorBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #fff;
  opacity: 0.6;
`;

styles.LoadingIndicator = styled.div`
  position: relative;
  top: 250px;
  left: 250px;
  width: 252px;
  z-index: 1;
  border: 2px solid #ccccce;
  font: bold 18px arial;
  color: #444;
  text-align: center;
  border-radius: 10px;
  min-width: 222px;
  padding: 0 15px;
  background: #f6f6f6;
`;

styles.LoadingIcon = styled.span`
  display: inline-block;
  width: 31px;
  height: 31px;
  margin: 12px 3px 12px 8px;
  vertical-align: middle;
  background-image: url(/assets/loader-big.gif);
`;

styles.LoadingText = styled.span`
  display: inline-block;
  vertical-align: middle;
  color: #72727d;
  font: normal 18px/52px arial;
`;

styles.SaveSearch = styled.span`
  border: 1px solid #dfe0e3;
  background: #f1f1f2;
  border-radius: 3px;
  color: #72727d;
  overflow: hidden;
  font-size: 12px;
  padding: 3px 10px;
  margin: 7px 15px 0 0;
  display: inline-block;
  cursor: pointer;
  height: 17px;
  vertical-align: middle;

  &:hover {
    background: #e5e5e5;
    color: #72727d;
  }
`;

styles.SaveSearchLinkWrapper = styled.div`
  background: #fff;
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  box-shadow: 0 1px 2px rgba(43,59,93,0.29);
  margin-top:10px                                                             
}
`;

styles.searchSaveIcon = styled.span`
  display: inline-block;
  background: url(/assets/save-search.gif) no-repeat right center;
  margin-right: 10px;
  width: 22px;
  height: 15px;
  vertical-align: top;
`;

styles.SaveSearchLink = styled.span`
  cursor: pointer;
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

styles.searchGrayArrow = styled.span`
  display: inline-block;
  background: url(/assets/view-arrow.gif) no-repeat right center;
  padding-right: 5px;
  width: 7px;
  height: 9px;
  vertical-align: middle;
`;

export default styles;
