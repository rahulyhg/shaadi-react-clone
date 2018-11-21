import styled from 'styled-components';

const styles = {};

styles.SendDecline = styled.div`
  color: #72727d;
  font-size: 14px;
  position: relative;
  width: 578px;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  background: #fff;
  h5 {
    font: 500 18px 'Roboto', sans-serif;
  }
`;
styles.SendDeclineTitle = styled.p`
  font: normal 16px/28px arial;
  color: #72727d;
  margin: 0;
`;
styles.RadioInput = styled.input`
  margin: 0 5px 0 0;
  padding: 0;
  vertical-align: middle;
`;
styles.SendDeclineLabel = styled.label`
  font: normal 14px/25px arial;
  color: #72727d;
`;
styles.SendDeclineTextArea = styled.textarea`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: 515px;
  height: 100px;
  margin: 8px 0 10px;
  border: 1px solid #cce5bd;
  font: normal 12px arial;
  color: #72727d;
  padding: 12px 10px 12px 10px;
  border-radius: 3px;
  overflow: auto;
  resize: none;
  text-align: left;
  outline: 0;
`;
styles.SendDeclineCharactersRemaining = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  padding-right: 10px;
  text-align: right;
`;
styles.SendDeclineCharactersCount = styled.span`
  display: inline-block;
  background: #f0f0f0;
  color: #72727d;
  border-radius: 2px;
  margin: 0 0 0 2px;
  text-align: center;
  font: bold 16px arial;
  border: 0;
  padding: 2px 0;
  width: 45px;
`;
styles.ConnectBtn = styled.button`
  display: block;
  margin: 9px auto 0;
  font: 400 16px 'Roboto', sans-serif;
  padding: 7px 18px;
  transition: all 300ms ease;
  border: none;
  margin-top: 9px;
  border-radius: 3px;
  color: #fff;
  background: #00bcd5;
  outline: 0;
  &:hover {
    background: #0194a8;
  }
`;
styles.RightArrow = styled.span`
  display: inline-block;
  background: url(/assets/shaadi-sprite-2-v5.gif) no-repeat left -46px;
  height: 13px;
  width: 6px;
  font-size: 0;
  margin-left: 7px;
  margin-top: 6px;
`;
styles.DontShowCheck = styled.div`
  font: normal 12px arial;
  color: #b1b3b9;
`;
styles.Checkbox = styled.input`
  margin: 0 12px 2px 0;
`;
styles.DontShowLabel = styled.label``;

export default styles;
