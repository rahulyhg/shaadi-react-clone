import styled from 'styled-components';

export const WidgetWrapper = styled.div`
  border-radius: 5px;
  padding: 10px;
`;
const alignDirection = {
  X: `flex-direction:row`,
  Y: `flex-direction:column`,
};
export const ItemWrapper = styled.div`
  background: #fff;
  display: flex;
  padding: 10px;
  margin: 2px;
  align-items: center;
  ${props => alignDirection[props.alignAxis || 'X']};
`;
export const InfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 10px;
`;
export const Image = styled.div`
  ${props => {
    switch (props.dimension) {
      case 'medium':
        return `width:100px;height:100px`;
      default:
        return `width:50px;height:50px`;
    }
  }};
  border-radius: 50%;
  background: ${props => `url(${props.src})  center top / cover no-repeat`};
`;

export const WidgetHeader = styled.div`
  padding: 0.5em 0em;
`;

export const Count = styled.span`
  font-weight: bold;
`;
