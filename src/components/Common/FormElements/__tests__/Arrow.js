import React from 'react';
import { shallow } from 'enzyme';
import Arrow from '../Arrow';

describe('Arrow component', () => {
  const wrapper = shallow(<Arrow />);
  it('should render', () => {
    expect(wrapper).toHaveLength(1);
  });
});
