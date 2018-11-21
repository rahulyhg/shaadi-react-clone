import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.TooltipContent = styled.div`
  position: relative;
  line-height: 16px;
`;

styles.TooltipBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  width: 12px;
  height: 12px;
  top: -7px;
  right: -8px;
  background: url(/assets/profile-icon-sprite.png) no-repeat left -150px;
  cursor: pointer;
  border: 0;
  outline: 0;
  &:hover {
    background: url(/assets/profile-icon-sprite.png) no-repeat left -162px;
  }
`;

styles.spacer8 = styled.div`
  padding: 8px;
`;

styles.TooltipTitleP = styled.p`
  padding: 0 0 10px;
  font: bold 14px/18px arial;
  color: #72727d;
`;

styles.TooltipTitle = styled.div`
  font-weight: bold;
`;

styles.TooltipBody = styled.div``;
styles.TooltipPara = styled.p`
  margin-top: ${props => (props.hasNoMargin ? 0 : '')};
  margin-bottom: 0;
`;
styles.TooltipSpanLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  .paymentLink {
    cursor: hand;
  }
`;

styles.TooltipSpanBtn = styled.span`
  display: inline-block;
  background: #00bcd5;
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 2px;
  outline: 0;
  margin-top: 5px;

  a {
    color: #fff;
  }

  &:hover {
    background: #0194a8;
  }
  &:hover a {
    text-decoration: none;
  }
`;

styles.TooltipSpanText = styled.span`
  color: ${props => (props.isRed ? 'red' : 'inherit')};
  .bold {
    font-weight: 600;
  }
`;
styles.TooltipSpanHText = styled.span`
  color: #c1690b;
  background: #ffffbe;
`;

styles.QuestionIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 2px 8px;
  cursor: default;
  vertical-align: middle;
  background: url(/assets/new-tt-icon-normal.png) no-repeat center 0px;
  transition: all 300ms ease;
  cursor: help;

  &:hover {
    background: url(/assets/new-tt-icon-hover.png) no-repeat center 0px;
  }
`;

export default styles;
