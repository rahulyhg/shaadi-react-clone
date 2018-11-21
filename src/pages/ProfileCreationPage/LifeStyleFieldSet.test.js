import React from 'react';
import { shallow } from 'enzyme';
import LifeStyleFieldSet from './LifeStyleFieldSet';
import DietField from './DietField';
import AppearanceFields from './AppearanceFields';
import HabbitFields from './HabbitFields';

describe('Profile Creation Step (4) LifeStyle ', () => {
  const component = shallow(<LifeStyleFieldSet />);
  it('should have diet field', () => {
    expect(component.find(DietField)).toHaveLength(1);
  });
  it('should have appearances fields', () => {
    expect(component.find(AppearanceFields)).toHaveLength(1);
  });
  it('should have habbit fields', () => {
    expect(component.find(HabbitFields)).toHaveLength(1);
  });
});
