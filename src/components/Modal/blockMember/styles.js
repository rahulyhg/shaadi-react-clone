import styled from 'styled-components';

const styles = {};

styles.BlockMember = styled.div`
  border-radius: 3px;
  width: 500px;
  text-align: left;
  background: #fff;
  z-index: 1;
`;
styles.BlockMessage = styled.div`
  font: normal 14px/18px arial;
  color: ${props => (props.color ? '#000' : '#72727d')};
  margin: 0;
`;
styles.ReportMisuseCheck = styled.p`
  font: normal 12px/22px arial;
  color: #989898;
  margin: 16px 0 20px 0;
`;
styles.Checkbox = styled.input`
  margin-right: 5px;
  padding: 0;
  vertical-align: middle;
`;
styles.DontShowLabel = styled.label``;
styles.Footer = styled.div`
  margin-top: 10px;
  text-align: center;
`;
styles.BlockBtn = styled.button`
  margin: 0 20px 0 0;
  outline: 0;
  font: bold 16px arial;
  padding: 8px 74px;
  display: inline-block;
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props => (props.isCancelBtn ? '#f1f1f2' : '#00bcd5')};
  border: 1px solid ${props => (props.isCancelBtn ? '#f1f1f2' : '#00bcd5')};
  border-radius: 3px;
  text-align: center;

  &:hover {
    background: ${props => (props.isCancelBtn ? '#dfe0e3' : '#0194a8')};
    border-color: ${props => (props.isCancelBtn ? '#dfe0e3' : '#0194a8')};
  }
`;
styles.BlockMemberTitle = styled.div`
  flex: 1;
  font: normal 20px/21px arial;
`;

export default styles;
