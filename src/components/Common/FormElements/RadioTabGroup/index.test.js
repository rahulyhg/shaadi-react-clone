import React from 'react';
import { mount } from 'enzyme';
import RadioTabGroup from './index';
import s from './styles';

const options = [{ value: 'value1', label: 'label1' }, { value: 'value2', label: 'label2' }];
const props = { options };

describe('Radio Tab Group having options single select', () => {
  const component = mount(<RadioTabGroup {...props} />);
  it('should have a button wrapper element', () => {
    expect(component.find(s.BodyTypeLabel)).toHaveLength(2);
  });
  describe('on radio tab click', () => {
    it('should change value to value2 on click on radio tab label2', () => {
      const radioOpt = component.find(s.BodyTypeLabel).first();
      radioOpt.simulate('click');
      expect(radioOpt.props('isSelected')).toBeTruthy();
    });
    it('should change value to value1 on click on radio tab label1', () => {
      const radioOpt = component.find(s.BodyTypeLabel).at(1);
      radioOpt.simulate('click');
      expect(radioOpt.props('isSelected')).toBeTruthy();
    });
  });
});

describe('Tab Group having options multi select', () => {
  const component = mount(<RadioTabGroup {...props} type="checkbox" value="value1" />);
  it('should have selected tab group highlighted', () => {
    const radioOpt = component.find(s.BodyTypeLabel).first();
    expect(radioOpt.props('isSelected')).toBeTruthy();
  });
});
