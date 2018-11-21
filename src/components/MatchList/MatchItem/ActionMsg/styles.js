import styled from 'styled-components';
import Link from '../../../Common/Link';

const styles = {};

styles.MessageContainer = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  background: #fff;
  border-radius: 3px;
  text-align: center;
  box-sizing: border-box;
  max-height: ${props => (props.isVisible ? '80px' : 0)};
  padding: ${props => (props.isVisible ? '14px 22px 10px' : 0)};
  margin: ${props => (props.isVisible ? '10px 0' : 0)};
  overflow: ${props => (props.isVisible ? 'visible' : 'hidden')};
  transition: 0.5s linear all;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

styles.ActionMsg = styled.div`
  width: 400px;
  margin: 0 auto;
  font: 300 14px/20px 'Roboto', sans-serif;
  color: #51505d;
`;
styles.FolderLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
`;

styles.LoaderWrap = styled.div`
  position: relative;
  height: 39px;
`;

export default styles;
