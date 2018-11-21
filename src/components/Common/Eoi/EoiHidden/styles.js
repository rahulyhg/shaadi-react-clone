import styled from 'styled-components';

const styles = {};
styles.DeactiveBtnContainer = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  ${props =>
    props.isHorizontal &&
    `
  width:474px;
  padding: 10px 20px;
  background: #fcebec;
  color: #51505d;border-radius: 3px;`};
`;
styles.InfoHeading = styled.h5`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  ${props =>
    props.isHorizontal
      ? `color: #51505d;font: 300 14px/20px "Roboto",sans-serif;margin: 0;`
      : `color: #e53a41;font: 300 12px/16px 'Roboto', sans-serif;margin: 0 auto 6px;`} ${props => !props.isHorizontal && 'width: 126px'};
`;

styles.InboxDeclineBtn = styled.button`
  display: block;
  position: relative;
  overflow: hidden;
  width: 44px;
  height: 44px;
  margin: 10px auto 3px;
  background: url(/assets/free/skip.svg) left top no-repeat;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  outline: 0;
  border: 0;

  &:hover {
    background: url(/assets/free/skip-hover.svg) left top no-repeat;
  }
`;

styles.InboxDeclineBtnText = styled.span`
  font: 300 13px 'Roboto', sans-serif;
  color: #95959d;
  display: inline-block;
  background: transparent;
  padding: 0;
  border: 0;
  cursor: pointer;
  outline: 0;
`;

export default styles;
