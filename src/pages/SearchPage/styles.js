/* eslint-disable */
import styled from 'styled-components';
import Link from '../../components/Common/Link';

const styles = {};

styles.NoMatch = styled.p`
padding: 14px 0 25px;
font: normal 18px arial;
color: #72727d;
text-align: center;
`;

styles.BroaderViewLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  background: url(/assets/gray-arrow-big.png) no-repeat right center;
  padding: 0 10px 0 0;
`;

styles.DiscoverTabWrap = styled.div`
  width: 208px;
  margin: 20px 0 0;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(43,59,93,0.29);
`;

styles.DiscoverTabLink = styled(Link)`
  color: ${props => (props.isActive ? '#00bcd5' : '#72727d')};
  font: ${props => (props.isActive ? 'bold 14px/33px arial' : 'normal 14px/33px arial')};
  padding: 0 10px;
  display: block;
  text-decoration: none;
  border-bottom: 1px solid #dfe0e3;
`;

styles.NoResultWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  padding: 14px 0 25px;
  margin: 0;
  font: normal 18px arial;
  color: #72727d;
  text-align: center;
  width: ${props => (['2-way','reverse'].includes(props.searchType) ? '100%' : '730px')};
`;

styles.ResultSection = styled.div`
  height: 15px;
  font: normal 12px arial;
  position: relative;
`;

styles.ResultText = styled.h2`
margin-top: 18px;
font: normal 18px arial;
color: #72727d;
`;

styles.SearchFor = styled.span`
  cursor: pointer;
`;

styles.MoreDropdown = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  background: url(/assets/search-for-arrow-d-v2.gif) no-repeat right center;
  padding: 0 13px 0 0;
  margin: 0 3px;
  width: 9px;
  height: 7px;
`;

styles.Criteria = styled.span`
  cursor: pointer;
  font: normal 12px arial;
`;

styles.SearchCount = styled.span`
  cursor: pointer;
  font: normal 14px arial;
`;

styles.SearchDetail = styled.div`
    background: #fff;
    margin-left: 13px;
    width: 580px;
    padding-top: 15px;
    margin-bottom: 5px;
    height: 235px;
    overflow: auto;
`;

styles.ItemLable = styled.div`
   width: 142px;
   background: url(/assets/colen-black.gif) 130px 3px no-repeat;
   color: #b1b3b9;
`;

styles.ItemInfo = styled.div`
    width: 405px;
    color: #72717d;
`;

styles.Details = styled.div`
  display: flex;
  padding: 4px;
`;

styles.SearchForMore = styled.div`
    position: absolute;
    background: #fff;
    width: 596px;
    font: normal 12px arial;
    z-index: 30;
    box-shadow: 0 4px 12px rgba(43,59,93,0.35);
}`;

styles.ModifySearchLink = styled(Link)`
  color: #00bcd5!important;
  font-size: 14px;
  cursor: pointer;
  margin: 0 10px 0;
  text-decoration: none;
  outline: 0;
  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
