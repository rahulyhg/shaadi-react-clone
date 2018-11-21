import styled from 'styled-components';

const s = {};

s.quickLinksUl = styled.ul`
  background: #fff;
  width: 204px;
  padding: 0;
  margin: 0;
`;

s.quickLinkWrap = styled.li`
  font: ${props => (props.isHeading ? 'bold 14px arial' : 'normal 12px arial')};
  list-style:none;
  display:flex;
  &:before {
    content:'';
    border-left:4px solid #e5e5e5;
    display;block;
  }
`;

s.quickLink = styled.a`
  color: #72727d;
  text-decoration: none;
  padding: ${props => (props.isHeading ? '7px 10px 7px 10px' : '7px 10px 7px 16px')};
  border-bottom: solid 1px #f1f1f2;
  background: ${props => (props.isHeading ? 'none' : 'url(/assets/left-nav-dash.gif) no-repeat left 13px')};
  width: 180px;
  &:hover {
    text-decoration: underline;
  }
`;

export default s;
