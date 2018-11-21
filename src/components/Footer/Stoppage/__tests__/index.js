import React from 'react';
import Enzyme from 'enzyme';
import Footer from '../index';

jest.mock('../../../Common/Link');

describe('Stoppage footer', () => {
  const wrapper = Enzyme.mount(<Footer />);
  describe('Mount stoppage footer', () => {
    it('should mount stoppage footer', () => {
      expect(wrapper.length).toEqual(1);
    });
  });
});
