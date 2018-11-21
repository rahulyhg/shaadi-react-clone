import styled from 'styled-components';

const styles = {};

const getBackgroundImage = ({ isPrev, disabled }) =>
  isPrev
    ? disabled ? 'url(https://img2.shaadi.com/imgs/unified/prev.png)' : 'url(https://img2.shaadi.com/imgs/unified/prev-active.png)'
    : disabled ? 'url(https://img2.shaadi.com/imgs/unified/next.png)' : 'url(https://img2.shaadi.com/imgs/unified/next-active.png)';

styles.Pagination = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: #f1f1f2;
  padding: 7px 10px;
  font-size: 12px;
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;

styles.desc = styled.span`
  color: #72727d;
  margin-right: 8px;
`;
styles.navigation = styled.span`
  display: flex;
`;
styles.prev = styled.button`
  background-image: ${props => getBackgroundImage(props)};
  height: 20px;
  width: 20px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center center;
  display: inline-block;
  border: 1px solid #c8c8c8;
  vertical-align: middle;
  line-height: 0;
`;

export default styles;
