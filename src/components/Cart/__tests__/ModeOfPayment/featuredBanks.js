import React from 'react';
import { mount } from 'enzyme';
import FeaturedBanks from '../../ModeOfPayment/NetBanking/JusPayForm/FeaturedBanks';
import factory from '../utils/factory';

describe('FeaturedBanks - JusPay', () => {
  const onBankClick = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      onBankClick.mockClear();
    });
    const props = { ...factory.featuredProps, onBankClick };
    describe('FeaturedBanks : First Three', () => {
      const featuredBanksProps = { ...props };
      const featuredBanks = mount(<FeaturedBanks {...featuredBanksProps} />);
      expect(featuredBanks.find('HdfcIcon').exists()).toBe(true);
      expect(featuredBanks.find('IciciIcon').exists()).toBe(true);
      expect(featuredBanks.find('AxisIcon').exists()).toBe(true);
      expect(featuredBanks.find('SbiIcon').exists()).toBe(false);
      expect(featuredBanks.find('IdbiIcon').exists()).toBe(false);
      expect(featuredBanks.find('PunjabIcon').exists()).toBe(false);
    });
    describe('FeaturedBanks : Last Three', () => {
      const featuredBanksProps = { ...props, lastThree: true };
      const featuredBanks = mount(<FeaturedBanks {...featuredBanksProps} />);
      expect(featuredBanks.find('HdfcIcon').exists()).toBe(false);
      expect(featuredBanks.find('IciciIcon').exists()).toBe(false);
      expect(featuredBanks.find('AxisIcon').exists()).toBe(false);
      expect(featuredBanks.find('SbiIcon').exists()).toBe(true);
      expect(featuredBanks.find('IdbiIcon').exists()).toBe(true);
      expect(featuredBanks.find('PunjabIcon').exists()).toBe(true);
    });
  });
});
