import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.AlertMultiLine = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 25px;
  min-height: ${props => (props.size > 1 ? '40px' : 'auto')};
  font: normal ${props => (props.size > 1 ? '16px/22px' : '14px')} arial;
  padding: ${props => (props.size > 1 ? '7px 0 11px' : '12px 0')};
  background: ${props =>
    props.size > 1 ? 'linear-gradient(to bottom, rgba(218,239,172,0.5) 0%,rgba(186,224,105,0.5) 100%)' : 'rgba(193, 236, 170, 0.9)'};

  span:nth-child(2) {
    display: ${props => (props.size > 1 ? 'block' : 'inline-block')};
  }
`;

styles.TooltipSpanLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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
    background: #00bcd5;
  }
  &:hover a {
    text-decoration: none;
  }
`;

styles.TooltipSpanText = styled.span``;

export default styles;
