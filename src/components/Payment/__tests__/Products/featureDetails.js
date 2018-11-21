import React from 'react';
import { mount } from 'enzyme';
import FeatureDetails from '../../Products/featureDetails';

describe('FeatureDetails', () => {
  const featuresProps = {
    benefit: {
      description: 'Profile Highlighter',
      icon: 'get-highlighted',
      applicable: false,
      tooltip: 'Priority in search results|Premium tag for more responses|Be shown in the featured section',
      new_badge: false,
    },
    membershipId: 'SSP_G3',
    index: 1,
  };
  describe('Should display feature', () => {
    it('should show Feature', () => {
      const feature = mount(<FeatureDetails {...featuresProps} />);
      expect(feature.text()).toContain('Profile Highlighter');
    });
  });

  describe('Feature should have tooltip', () => {
    it('should show tooltip icon if feature has tooltip', () => {
      const feature = mount(<FeatureDetails {...featuresProps} />);
      expect(feature.find('span[data-test-selector="feature_tooltip"]').exists()).toBe(true);
    });

    it('should not show tooltip icon if feature has no tooltip', () => {
      const featuresPropsNew = {
        ...featuresProps,
        benefit: {
          ...featuresProps.benefit,
          tooltip: '',
        },
      };
      const feature = mount(<FeatureDetails {...featuresPropsNew} />);
      expect(feature.find('span[data-test-selector="feature_tooltip"]').exists()).toBe(false);
    });
  });
  describe('Feature should have New badge Tag', () => {
    it('should not show new badge tag if feature is not new', () => {
      const featuresPropsNew = {
        ...featuresProps,
        benefit: {
          ...featuresProps.benefit,
          new_badge: false,
        },
      };
      const feature = mount(<FeatureDetails {...featuresPropsNew} />);
      expect(feature.find('span[data-test-selector="feature_new_badge"]').exists()).toBe(false);
    });
  });
});
