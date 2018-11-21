/* eslint-disable */
import styled from 'styled-components';
import Link from '../components/Common/Link';

const styles = {};

styles.SearchPageWrapper = styled.div`
  display: flex;
  width: 960px;
  padding-top: ${props => props.topSpace + 'px'};
  margin: ${props => (props.isChatOpen ? '0 auto 0 ' + ((props.windowWidth - 1207)/ 2) + 'px' : '0 auto')};
`;

styles.SearchPartnerPage = styled.div`
  display: flex;
  flex: 1;
  border: 0;
  padding-bottom: 30px;
  padding-top: 6px;
  font: 12px arial;
  color: #72727d;
  align-items: flex-start;
`;

styles.Sidebar = styled.div`
  width: 207px;
`;

styles.SearchResults = styled.div`
  margin-left: 17px;
`;

styles.NoDataWrapper = styled.p`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  padding: 14px 0 25px;
  margin: 0;
  font: normal 18px arial;
  color: #72727d;
  text-align: center;
  width: 730px;
`;

styles.SubHeading = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  padding: 29px 0 10px 10px;
  font-size: 16px;
  margin: 0;
`;

styles.SubHeadingLink = styled(Link)`
  display: inline-block;
  color: #00bcd5;
  background: url(/assets/right-arrow.png) no-repeat right center;
  padding: 0 10px 0 11px;
  text-decoration: none;

  &:hover { text-decoration: underline; }
`;

styles.IncludeMatches = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  margin-top: 5px;
  font-size: 14px;

  &:not(:root:root){
    width: 270px;
  }
  `;

styles.IncludeStatus = styled.span`
  color: ${props => (props.hasMoreMatches ? '#00bcd5' : 'inherit')};
`;


styles.CarouselBackArrow = styled.span`
  background: url(/assets/carrousel-back-arrow.png) no-repeat left 1px;
  width: 14px;
  height: 12px;
  vertical-align: absmiddle;
  display: inline-block;
  margin: 0 5px 0 0;
`;
styles.CarouselBackLink = styled(Link)`
  display: inline-block;
  color: #00bcd5;
  margin: 0 5px 0 0;
  text-decoration: none;
  font: 400 16px 'Roboto', sans-serif;
  vertical-align:absmiddle;
  line-height: 17px;
  &:hover { text-decoration: underline; }
`;
styles.CarouselBackWrapper = styled.div`
  display: flex;
`;
styles.CarouselBackLeft = styled.div`
  flex: 1;
`;
export default styles;
