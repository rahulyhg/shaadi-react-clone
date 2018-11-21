import React from 'react';
import { shallow } from 'enzyme';
import AppearanceFields from './index';
import BodyTypeField from './BodyTypeField';
import HeightField from './HeightField';
import SkinToneField from './SkinToneField';

describe('Appearance Fields', () => {
  const component = shallow(<AppearanceFields />);
  it('should have Body Type', () => {
    expect(component.find(BodyTypeField)).toHaveLength(1);
  });
  it('should have Height Field', () => {
    expect(component.find(HeightField)).toHaveLength(1);
  });
  it('should have Skin Tone Field', () => {
    expect(component.find(SkinToneField)).toHaveLength(1);
  });
});
