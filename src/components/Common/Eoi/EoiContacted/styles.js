import styled from 'styled-components';
import { premiumCtaHover, vipCtaHover } from '../../Eoi/utils';

const styles = {};

styles.InvitationStatus = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 100%;
  margin: 6px 0;
  text-align: center;
  height: 25px;
`;

styles.InviteStatusIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 15px;
  display: ${props => props.status};
  background-image: url(/assets/im-icon-sprite-ver2.png);
  background-repeat: no-repeat;
  background-position: left
    ${props => ({ accepted: '-34px', declined: '-10px', cancelled: '-10px', contacted: '-58px', misuseReported: '-58px' }[props.status])};
`;

styles.InviteStatusText = styled.span`
  vertical-align: middle;
  font: 14px/27px arial;
  color: #72727d;
`;

styles.RemindBtn = styled.button`
  display: block;
  background: ${props =>
      !props.isDisabled && props.isHovered
        ? (props.membershipTags === 'vip' && 'url(/assets/prem/remind-vip-hover.svg)') || 'url(/assets/prem/remind-hover.svg)'
        : props.isDisabled
          ? (props.membershipTags === 'vip' && 'url(/assets/prem/remind-vip-disabled.svg)') || 'url(/assets/prem/remind-disabled.svg)'
          : (props.membershipTags === 'vip' && 'url(/assets/prem/remind-vip.svg)') || 'url(/assets/prem/remind.svg)'}
    left top no-repeat;
  ${props => props.isDisabled && 'cursor: default;'} width: 46px;
  height: 46px;
  margin: 10px auto 3px;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: 0;
  outline: 0;
  ${props =>
    !props.isDisabled &&
    `&:hover {
    background: ${
      props.membershipTags === 'vip' ? 'url(/assets/prem/remind-vip-hover-hover.svg)' : 'url(/assets/prem/remind-hover-hover.svg)'
    }
    }  left top no-repeat;`};
`;
styles.RemindBtnBtnText = styled.button`
  font: 300 13px 'Roboto', sans-serif;
  color: #95959d;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  ${props => !props.isDisabled && props.isHovered === true && (props.membershipTags === 'vip' ? vipCtaHover : premiumCtaHover)};
  ${props => props.isDisabled && 'cursor: default;'};
`;
styles.SkipBtn = styled.button`
  display: block;
  position: relative;
  overflow: hidden;
  width: 44px;
  height: 44px;
  margin: 12px auto 3px;
  background: ${props => (props.isDisabled ? 'url(/assets/free/skip-disabled.svg)' : 'url(/assets/free/skip.svg)')} left top/44px no-repeat;
  ${props => props.isDisabled && 'cursor: default;'} border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  outline: 0;
  border: 0;
  ${props =>
    !props.isDisabled &&
    `
  &:hover {
    background: url(/assets/skip-hover.svg) left top/44px no-repeat;
  }
  `};
`;

styles.SkipBtnText = styled.button`
  font: 300 13px 'Roboto', sans-serif;
  color: #95959d;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  ${props => props.isDisabled && 'cursor: default;'};
`;
styles.btnWrap = styled.div`
  ${props => props.isDisabled && 'opacity:.3'};
  width: 46px;
  margin: 0 auto;
`;
styles.btnChildWrap = styled.span``;
styles.note = styled.div`
  color: #72727d;
`;
export default styles;
