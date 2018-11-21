import React from 'react';
import { mount } from 'enzyme';
import VipSection from '../../Products/vipSection';

jest.mock('../../../Common/Link');

describe('vipSection', () => {
  describe('Should Render', () => {
    describe('Vip Section', () => {
      it('Contain Features', () => {
        const vipsectionHTML = mount(<VipSection />);
        expect(vipsectionHTML.find('VipShaadiDiv').exists()).toBe(true);
        expect(
          vipsectionHTML
            .find('VipShaadiDiv')
            .find('VipLogo')
            .exists(),
        ).toBe(true);
      });
    });
  });
});
