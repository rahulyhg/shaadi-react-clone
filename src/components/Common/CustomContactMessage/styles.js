import styled from 'styled-components';
import { premiumBoldCtaHover, vipBoldCtaHover } from '../Eoi/utils';

const styles = {};

const CustomContactMessage = styled.button`
  font: 300 13px/15px 'Roboto', sans-serif;
  color: #95959d;
  background: transparent;
  border: 0;
  outline: 0;
`;
styles.CustomContactMessageDefault = CustomContactMessage.extend``;

styles.CustomContactMessagePremium = CustomContactMessage.extend`
  ${props => (props.isHovered ? premiumBoldCtaHover : '')};
`;

styles.CustomContactMessageVip = CustomContactMessage.extend`
  ${props => (props.isHovered ? vipBoldCtaHover : '')};
`;

export default styles;
