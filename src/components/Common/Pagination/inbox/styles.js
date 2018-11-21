import styled from 'styled-components';

const styles = {};

styles.Pagination = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  padding: 10px;
  font: 300 13px 'Roboto', sans-serif;
  text-align: center;
`;

styles.desc = styled.span`
  color: #51505d;
  margin: 0 9px;
`;

styles.Count = styled.span`
  font-weight: 500;
`;

styles.prev = styled.button`
  background: #fff;
  display: inline-block;
  text-decoration: none;
  padding: ${props => (props.isPrev ? '7px 16px 7px 8px' : '7px 8px 7px 16px')};
  margin-right: 2px;
  cursor: pointer;
  border: 1px solid #dfe0e3;
  outline: 0;
  color: ${props => (props.disabled ? '#b1b3b9' : '#00bcd5')};
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 3px;
  span {
    padding: 0 5px;
  }
  &:hover {
    ${props => !props.disabled && 'box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);'};
  }
`;

export default styles;
