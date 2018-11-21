import styled from 'styled-components';

const s = {};

s.TooltipBtmWrap = styled.div`
  display: block;
  width: 207px;
  background-color: #51505d;
  color: #fff;
  border-radius: 6px;
  text-align: left;
  padding: 11px;
  position: absolute;
  z-index: 4;
  border-radius: 3px;
  right: ${props => props.right};
  top: ${props => props.top};
  font: 300 12px/16px 'Roboto', sans-serif;
  &:before {
    content: '';
    position: absolute;
    right: ${props => props.afterRight};
    top: ${props => props.afterTop};
    margin-left: -5px;
    border-width: 6.5px;
    border-style: solid;
    border-color: transparent transparent #51505d transparent;
    transform: rotate${props => props.rotate};
  }
`;

export default s;
