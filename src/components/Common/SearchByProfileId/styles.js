import styled from 'styled-components';

const styles = {};

styles.ListDropdownWrap = styled.div`
  display: inline-block;
  position: relative;
`;

styles.SrcById = styled.div`
  margin: 10px 0;
`;

styles.SrcByIdText = styled.div`
  #72727d;
  display: block;
  font: normal 12px arial;
  margin: 0 0 5px 0;
  text-align: left;
`;

styles.EditProfileInput = styled.input`
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  font: 13px/22px arial;
  height: 22px;
  width: 111px;
  background: #fff;
  color: #72727d;
  margin-right: 5px;
  padding: 1px 1px 0 5px;
  font: normal 12px arial;
  margin: 0 0 5px 0;
`;

styles.EditGoBtn = styled.button`
  background: #00bcd5;
  color: #fff;
  cursor: pointer;
  height: 26px;
  margin: 0 0 0 10px;
  outline: 0;
  border: 0;
  width: 37px;
  display: inline-block;
  border-radius: 3px;
  text-align: center;
  font: normal 14px arial;
  line-height: 25px;
  text-decoration: none;
  &:hover {
    background: #0194a8;
  }
`;

export default styles;
