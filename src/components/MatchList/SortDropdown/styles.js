import styled from 'styled-components';

const styles = {};

styles.SortDropdown = styled.div`
  position: relative;
`;

styles.Selected = styled.div`
  background: url(/assets/selectbg-v2.png) no-repeat;
  cursor: pointer;
  padding: 5px 0 6px 10px;
  position: relative;
  width: 109px;
  font: 12px arial;
  color: #72727d;
  margin-top: 2px;
  border-radius: 1px;
  margin-right: 15px;
`;

styles.Dropdown = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 24px;
  width: 116px;
  list-style: none;
  border: 1px solid #e5e5e5;
  border-top: 0;
  margin: 0;
  padding: 0;
  background: #fff;
`;

styles.Item = styled.button`
  display: block;
  width: 100%;
  list-style: none;
  text-align: left;
  margin: 0;
  padding: 5px 0 5px 10px;
  color: #72727d;
  background: ${props => (props.isActive ? '#f1f1f2' : '#fff')};
  text-decoration: none;
  border: 0;
  outline: 0;

  &:hover {
    background: #f1f1f2;
  }
`;

export default styles;
