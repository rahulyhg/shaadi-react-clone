import React from 'react';
import { shallow } from 'enzyme';
import HabbitFields from './index';
import DrinkingHabbitField from './DrinkingHabbitField';
import SmokingHabbitField from './SmokingHabbitField';

describe('Habbit Fields', () => {
  const component = shallow(<HabbitFields />);
  it('should have Drinking Habbit Field', () => {
    expect(component.find(DrinkingHabbitField)).toHaveLength(1);
  });
  it('should have Smoking Habbit Field', () => {
    expect(component.find(SmokingHabbitField)).toHaveLength(1);
  });
});
