import React from 'react';
import Enzyme from 'enzyme';
import TopBar from '../topbar';
import factory from './utils/factory';

jest.mock('../../../Common/Link');

describe('Stoppage topbar', () => {
  describe('Stoppage tobbar should mount', () => {
    const props = factory;
    const wrapper = Enzyme.mount(<TopBar {...props} />);

    it('mounted element should have length', () => {
      expect(wrapper.length).toEqual(1);
    });
  });
});
