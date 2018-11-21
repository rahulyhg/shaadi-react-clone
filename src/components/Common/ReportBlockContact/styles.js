import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.reportBlockContact = styled.div`
  height: 22px;
  padding: 8px 0 5px;
  display: ${props => (props.isHovered ? 'block' : 'none')};
`;

styles.smallIconTextWrapper = styled.div`
  text-align: right;
  color: #72727d;
`;

const getImage = props => {
  let backgroundImg = '';
  switch (props.iconName) {
    case 'Block':
      backgroundImg = 'url(/assets/pop-icon-web-block-report.png) no-repeat left -51px';
      break;
    case 'Misuse':
      backgroundImg = 'url(/assets/pop-icon-web-block-report.png) no-repeat left -66px';
      break;
    default:
      break;
  }
  return backgroundImg;
};

styles.icon = styled(Link)`
  padding: 0 0 0 17px;
  font: normal 11px/14px arial;
  color: #00bcd5;
  margin: 5px 5px 0;
  text-decoration: none;
  cursor: pointer;
  background: ${props => getImage(props)};
  display: ${props => (props.isDisplay ? 'inline-block' : 'none')};
  &:hover {
    text-decoration: underline;
    outline: 0;
  }
`;

// styles.layerSmBlockIcon = Icon.extend`

// `;
// styles.layerSmReportIcon = Icon.extend`
//   background: url(/assets/pop-icon-web-block-report.png) no-repeat left -66px;
//   display: ${props => (props.isMisuseDisplay ? 'inline-block' : 'none')};
//  `;
export default styles;
