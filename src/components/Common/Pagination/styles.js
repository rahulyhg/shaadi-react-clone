import styled from 'styled-components';

const styles = {};

styles.Pagination = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  text-align: center;
  margin-top: 33px;
`;

styles.Btn = styled.button`
  background: #fff;
  display: inline-block;
  text-decoration: none;
  padding: 7px 12px 8px;
  margin-right: 3px;
  cursor: pointer;
  border: 1px solid #dfe0e3;
  outline: 0;
  color: ${props => (props.isActive ? '#72727d' : props.disabled ? '#b1b3b9' : '#00bcd5')};

  span {
    padding: 0 5px;
  }
`;

export default styles;
