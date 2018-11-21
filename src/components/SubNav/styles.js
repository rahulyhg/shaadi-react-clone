import styled from 'styled-components';

const styles = {};
styles.InboxTabWrap = styled.ul`
  display: flex;
  border-bottom: 1px solid #cdced1;
  font: 300 16px 'Roboto', sans-serif;
  list-style: none;
  margin: 0 13px 0 240px;
  padding: 0;
`;

styles.TabItem = styled.li`
  font-weight: 400;
  color: ${props => (props.isActive ? '#ff5a60' : '#72727d')};
  transition: color 0.2s ease 0s;
  padding: 3px 0 6px;
  display: block;
  position: relative;
  cursor: ${props => (props.isActive ? 'default' : 'pointer')};
  width: 247px;
  text-align: center;
  &:hover {
    color: #ff5a60;
  }
  ::after {
    background: #ff5a60;
    bottom: 0;
    content: '';
    display: block;
    height: 3px;
    left: 0;
    position: absolute;
    transform: scaleX(${props => (props.isActive ? 1 : 0)});
    -webkit-transform: scaleX(${props => (props.isActive ? 1 : 0)});
    -ms-transform: scaleX(${props => (props.isActive ? 1 : 0)});
    transition: transform 250ms ease 0s;
    width: 100%;
  }
`;
export default styles;
