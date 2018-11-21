import styled from 'styled-components';

import Link from '../../Common/Link';

const styles = {};

styles.Footer = styled.div`
  width: 100%;
  @media (max-width: 768px) {
    display: none;
  }
`;

styles.CopyrightWrap = styled.div`
  border-top: 1px solid #dfe0e3;
  font: normal 12px 'Roboto', sans-serif;
  color: #72727d;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px 9px 14px;
  width: 960px;
  margin: 27px auto 0;
`;

styles.CopyLeft = styled.span`
  display: flex;
  flex: 1;
`;

styles.CopyRight = styled.span``;

styles.CopyrightLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  display: inline-block;
  &:hover {
    text-decoration: underline;
  }
`;

styles.leftarraw = styled.span`
  background-image: url(/assets/right-gray-arrow.png);
  width: 6px;
  height: 9px;
  display: inline-block;
  margin: 0 0 0 2px;
  vertical-align: middle;
`;

export default styles;
