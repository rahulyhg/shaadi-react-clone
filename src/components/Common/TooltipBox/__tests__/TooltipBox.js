import React from 'react';
import { mount } from 'enzyme';
import s from '../styles';
import TooltipBox from '../index';

const TooltipBoxcomponent = mount(<TooltipBox>Test</TooltipBox>);

describe('TooltipBox component', () => {
  it('TooltipBox component should mount', () => {
    expect(TooltipBoxcomponent).toHaveLength(1);
  });
  // const TooltipBox = shallow(<TooltipBox {...props} />);
});

describe('Tooltip Wraper ', () => {
  it('TooltipBtmWrap should find', () => {
    expect(TooltipBoxcomponent.find(s.TooltipBtmWrap)).toHaveLength(1);
  });
});
