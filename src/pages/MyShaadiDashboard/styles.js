import styled from 'styled-components';

const widgetWrapper = {
  single: `
    padding:10px 10px 36px;
    width:362px;
    `,
  carousal: `
   overflow:hidden;
    width:744px;
    margin-left: 10px;
    `,
  listView: `display: flex;flex-direction:column;`,
  default: `display: flex;`,
};

export const WidgetWrapper = styled.div`
  ${props => widgetWrapper[props.type || 'default'] || ''};
`;
