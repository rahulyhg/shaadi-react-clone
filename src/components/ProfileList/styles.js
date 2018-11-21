import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

styles.ProfileList = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '311px' : '258px')};
  margin: 2px 0 0;
  margin-top: 20px;
  border: 3px solid #fff;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
`;

styles.Heading = styled.h4`
  margin: 0;
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'font-weight: normal'};
  text-transform: ${props => (['B', 'C'].includes(props.profilePageBucket) ? 'capitalize' : 'uppercase')};
  padding: 0 12px;
  background: #f1f1f2;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 16px/39px 'Roboto', sans-serif" : '14px/36px arial')};
  height: 36px;
  color: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '#51505d' : '#72727d')};
`;

styles.Item = styled.div`
  display: flex;
  background: #fff;
  padding: 12px 0;
  margin: 0 12px;
  border-bottom: 1px solid #d9d9d9;

  &:last-child {
    border-bottom: 0;
  }
`;

styles.PhotoLink = styled(Link)`
  display: inline-block;
  border-radius: 50px;
  border: 3px solid #e7e7e7;
  overflow: hidden;
  height: 66px;
  box-sizing: border-box;
`;

styles.Photo = styled.img`
  display: inline-block;
  width: 60px;
  height: 60px;
`;

styles.Details = styled.div`
  width: 155px;
  padding: 0 0 0 7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
`;

styles.NameLink = styled(Link)`
  display: block;
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'font-weight: bold'};
  padding: 0 0 4px;
  cursor: pointer;
  color: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '#51505d' : '#72727d')};
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 14px 'Roboto', sans-serif" : '')};
  text-decoration: none;
  &:hover {
    color: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '#51505d' : '#72727d')};
    text-decoration: underline;
  }
`;

styles.Detail = styled.div`
  color: #72727d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && "font: 300 14px 'Roboto', sans-serif"};
`;

styles.Loading = styled.div`
  background-image: url(/assets/loader-big.gif);
  background-repeat: no-repeat;
  display: inline-block;
  height: 107px;
  margin: 0;
  width: 100%;
  background-position: center;
`;

export default styles;
