import React from 'react';
import { mount } from 'enzyme';
import SimilarProfile from '../../SimilarProfile';
import ContextProvider from '../../Context';
import MatchItem from '../../../MatchList/MatchItem';
import Carousel from '../../Carousel';
import factory from './utils/factory';

describe('Similar Profile', () => {
  describe('Zero result', () => {
    it('component should mount', () => {
      const similarProfile = mount(
        <ContextProvider similarProfiles={factory.noResults} profiles={factory.profiles}>
          <SimilarProfile {...factory.props} />
        </ContextProvider>,
      );
      expect(similarProfile.length).toBe(1);
    });

    it('should not mount MatchItem', () => {
      const similarProfile = mount(
        <ContextProvider similarProfiles={factory.noResults} profiles={factory.profiles}>
          <SimilarProfile {...factory.props} />
        </ContextProvider>,
      );
      expect(similarProfile.find(MatchItem)).toHaveLength(0);
    });
  });

  describe('With results', () => {
    it('MatchItem length should be equal to count', () => {
      const similarProfile = mount(
        <ContextProvider similarProfiles={factory.withResults} profiles={factory.profiles}>
          <SimilarProfile {...factory.props} />
        </ContextProvider>,
      );
      expect(similarProfile.find(MatchItem)).toHaveLength(factory.withResults.SHID1.count);
    });

    it('Carousel should mount', () => {
      const similarProfile = mount(
        <ContextProvider similarProfiles={factory.withResults} profiles={factory.profiles}>
          <SimilarProfile {...factory.props} />
        </ContextProvider>,
      );
      expect(similarProfile.find(Carousel)).toHaveLength(1);
    });
  });

  describe('First text should contain Profile name and count', () => {
    it('Text should contain profileName', () => {
      const similarProfile = mount(
        <ContextProvider similarProfiles={factory.withResults} profiles={factory.profiles}>
          <SimilarProfile {...factory.props} />
        </ContextProvider>,
      );
      expect(similarProfile.text()).toContain(factory.props.profileName);
    });
  });
});
