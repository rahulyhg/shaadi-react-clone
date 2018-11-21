import styled from 'styled-components';

const styles = {};

styles.ChecklistItemWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const ChecklistBoxDefault = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  left: -62px;
  top: 24px;
  z-index: 1;
  width: 147px;
  background: #fff;
  box-shadow: 0 4px 27px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 8px 15px 7px 20px;
`;

styles.ChecklistBoxYouAndMe = ChecklistBoxDefault.extend`
  width: 290px;
`;

styles.VerifiedText = styled.div`
  font: 300 12px 'Roboto', sans-serif;
  padding: 4px 0;
  color: #51505d;
  text-decoration: none;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 0;
  outline: 0;
  background: #fff;
  display: flex;
`;

styles.VerifiedTick = styled.span`
  background: url(/assets/green-tick.svg) no-repeat center;
  display: inline-block;
  width: 13px;
  height: 10px;
  position: relative;
  margin: 0 8px 0 0;
`;

styles.BoxPointerTop = styled.div`
  background: url(/assets/box-pointer-top-v2.png) no-repeat center;
  position: absolute;
  width: 15px;
  height: 7px;
  margin: -15px 0 0 42px;
  border: 0;
  outline: 0;
`;

styles.YouAndMeIcon = styled.span`
  background: url(/assets/you-and-me.svg) no-repeat;
  width: 17px;
  height: 11px;
  margin: 2px 4px 0 0;
  display: inline-block;
  vertical-align: top;
`;

styles.YouAndMeText = styled.span`
  font: 300 14px 'Roboto', sans-serif;
`;

export default styles;
