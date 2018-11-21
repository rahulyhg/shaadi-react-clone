/* eslint camelcase: 0 */
import React from 'react';
import { shallow } from 'enzyme';
import factory from './utils/factory';
import MatchList from '../../MatchList';

describe('Matches listings', () => {
  const matchListingsProps = factory.props;

  describe('PremiumBanner cases', () => {
    describe('banner in no search result case', () => {
      const bannerProps = { ...matchListingsProps, result: {} };
      it('should not render premium banner if no search result', () => {
        const MatchListWrapper = shallow(<MatchList {...bannerProps} />);
        expect(MatchListWrapper.find('InterestListBanner').length).toEqual(0);
      });
    });

    describe('banner in search result with list view case', () => {
      const bannerProps = { ...matchListingsProps, searchPremiumBanner: { isPremiumBannerVisible: true, premiumBanner: {} } };
      it('should render banner if atleast one profiles in list view', () => {
        const MatchListWrapper = shallow(<MatchList {...bannerProps} />);
        const profilesLength = Object.keys(factory.profiles).length;
        expect(profilesLength).toBeGreaterThanOrEqual(1);
        expect(MatchListWrapper.find('InterestListBanner').length).toEqual(1);
      });
    });

    describe('banner in search result with grid view case', () => {
      const bannerProps = {
        ...matchListingsProps,
        listStyle: 'grid',
        searchPremiumBanner: { isPremiumBannerVisible: true, premiumBanner: {} },
      };
      it('should render banner if atleast three profiles in grid view', () => {
        const MatchListWrapper = shallow(<MatchList {...bannerProps} />);
        const profilesLength = Object.keys(factory.profiles).length;
        expect(profilesLength).toBeGreaterThanOrEqual(3);
        expect(MatchListWrapper.find('InterestListBanner').length).toEqual(1);
      });
    });
  });
});
