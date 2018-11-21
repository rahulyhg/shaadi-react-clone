import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.BroaderMatches = styled.div`
  width: 622px;
  padding: 16px 10px;
  margin: 8px auto 0;
  background: #fafafa;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
`;

styles.Title = styled.p`
  font: normal 16px arial;
  color: #72727d;
  text-align: center;
  width: 100%;
`;

styles.Content = styled.div`
  margin: 16px 0 0;
  text-align: center;
`;

styles.MatchLink = styled(Link)`
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  background: #fff;
  width: 60px;
  height: 60px;
  padding: 3px;
  margin: 0 18px 0 0;
  border: 1px solid #ddd;
  box-shadow: 0 1px 1px 0 rgba(119, 119, 119, 0.3);
`;

styles.Photo = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

styles.BroaderWrapper = styled.div`
  font: normal 34px arial;
  color: #72727d;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
`;

styles.BroaderLink = styled(Link)`
  display: inline-block;
  margin: 8px 0 0;
  color: #00bcd5;
  text-decoration: none;
  background: url(/assets/gray-big-right.png) no-repeat right center;
`;

styles.BroaderCount = styled.span`
  display: inline-block;
  font: normal 40px arial;
  color: #00bcd5;
  letter-spacing: -1px;
`;

styles.BroaderText = styled.span`
  display: inline-block;
  color: #72727d;
  font: normal 16px/17px arial;
  padding: 14px 0 0 15px;
  text-align: left;
  width: 85px;
  letter-spacing: 1px;
  vertical-align: top;
`;

export default styles;
