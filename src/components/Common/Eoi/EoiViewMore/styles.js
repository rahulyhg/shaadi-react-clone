import styled from 'styled-components';

const styles = {};

styles.GridStyle = styled.div`
  position: relative;
  background: #f1f1f2;
  cursor: pointer;
  border-top: 1px solid #f1f1f2;
  text-align: center;
  height: '57px';
  padding: 13px 10px 14px;
`;

styles.InvitationBtnContainer = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

styles.InvitationHeading = styled.h5`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  font: normal ${props => (props.isGridItem ? '16px' : props.membershipTags === 'vip' ? '18px' : '20px')}/22px arial;
  color: #72727d;
  margin: 0 0 7px 0;
  white-space: nowrap;
`;

/* eslint no-nested-ternary: 0 */
styles.InvitationBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  text-align: center;
  width: ${props =>
    props.type && props.type === 'profile' && props.isCancelBtn ? '62px' : props.isLargeBtn ? 'auto' : props.isCarousel ? '100%' : '136px'};
  margin: 3px 3px 3px 0;
  padding: ${props => (props.type && props.type === 'profile' && props.isCancelBtn ? '7px 5px' : props.isLargeBtn ? '7px 30px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn || (props.type && props.type === 'profile' && props.isCancelBtn) ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn || (props.type && props.type === 'profile' && props.isCancelBtn) ? 'normal' : 'bold')};
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props =>
    props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : props.membershipTags === 'vip' ? '#ad2241' : '#00bcd5'};
  border: 1px solid
    ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : props.membershipTags === 'vip' ? '#ad2241' : '#00bcd5')};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: ${props => (props.membershipTags === 'vip' ? '#88152f' : props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
    border: 1px solid ${props => (props.membershipTags === 'vip' ? '#88152f' : props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
  }
`;

styles.InvitationGridWrap = styled.div`
  display: flex;
`;

export default styles;
