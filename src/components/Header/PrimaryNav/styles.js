import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.PrimaryNav = styled.nav`
  flex: 1;
  text-align: center;
`;

styles.PrimaryLink = styled(Link)`
  display: inline-block;
  position: relative;
  padding: 0 25px;
  color: #fdedee;
  color: ${props => (props.isActive ? '#fff' : '#fdedee')};
  font-weight: ${props => (props.isActive ? '500' : 'normal')};
  font-family: Roboto, sans-serif;
  text-decoration: none;
  line-height: 56px;
  transition: 0.2s ease color;

  &:hover {
    color: #fff;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -7px;
    border-bottom: 7px solid ${props => (props.isActive && props.isBottomBarVisible ? '#fff' : 'transparent')};
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
`;

styles.PrimaryLinkCount = styled.span`
  visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
  position: absolute;
  top: 8px;
  left: 78%;
  padding: 0 5px;
  margin: 0 0 0 -3px;
  border-radius: 20px;
  background: #fff;
  color: #51505d;
  line-height: normal;
  font-size: 0.75rem;
`;

export default styles;
