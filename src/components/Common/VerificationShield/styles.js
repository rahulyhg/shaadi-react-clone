import styled from 'styled-components';

const styles = {};

styles.VerificationBoxWrap = styled.div`
  display: inline-block;
  position: relative;
`;

styles.VerificationBox = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  left: ${props => (props.source === 'inboxCard' ? '-78px' : '-70px')};
  top: 30px;
  z-index: 1;
  width: 147px;
  background: #fff;
  box-shadow: 0 4px 27px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 8px 15px 8px 20px;
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
  margin: -15px 0 0 61px;
  border: 0;
  outline: 0;
`;

styles.ShieldIcon = styled.span`
  background: ${props => (props.shieldView === 'green' ? 'url(/assets/shield-tag-green-v2.svg)' : 'url(/assets/shield-tag-white-v2.svg)')}
    left top no-repeat;
  width: 16px;
  height: 20px;
  display: inline-block;
  margin: ${props => (props.source === 'inboxCard' ? '0 0 0 2px' : '0 0 0 10px')};
  cursor: pointer;
`;

export default styles;
