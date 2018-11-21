import styled from 'styled-components';
import Link from '../../Link';
import { premiumCtaHover, vipCtaHover } from '../../Eoi/utils';

const styles = {};

styles.RequestWrap = styled.div`
  border-left: 1px solid #dfe0e3;
  text-align: center;
  margin: 14px 0;
  display: flex;
  flex: 1 0 134px;
  justify-content: center;
  align-items: center;
`;

styles.RequestInnerWrap = styled.div`
  width: 100px;
`;
styles.ReqBtn = styled(Link)`
  text-decoration: none;
  display: block;

  background: ${props => {
    const MemberType = props.membershipTags === 'vip' ? 'vip' : 'otherUser';
    const iconType = props.isHovered ? props.imgConfig[MemberType].cardHover : props.imgConfig[MemberType].Icon;
    return `url(${iconType}) left top no-repeat;
           &:hover{background:url(${props.imgConfig[MemberType].hover})left top no-repeat};`;
  }};
  width: 46px;
  height: 46px;
  margin: 10px auto 3px;
  border-radius: 50%;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  border: 0;
  outline: 0;
`;

styles.BtnText = styled(Link)`
  font: 300 13px 'Roboto', sans-serif;
  color: #95959d;
  background: transparent;
  text-decoration: none;
  ${props => props.isHovered === true && (props.membershipTags === 'vip' ? vipCtaHover : premiumCtaHover)};
`;

styles.MemberHiddenWrap = styled.div`
  width: 120px;
  font: 300 12px/16px 'Roboto', sans-serif;
  color: #e53a41;
`;

styles.UnhideLink = styled(Link)`
  color: #e53a41;
  font-weight: 500;
  text-decoration: underline;
  outline: 0;
`;

export default styles;
