import React from 'react';
import { shallow } from 'enzyme';
import PremiumCarouselItem from '../../PremiumCarouselItem';
import factory from '../utils/factory';

jest.mock('../../../../Common/Link');

describe('<PremiumCarouselItem />', () => {
  it('should render <ProfilePhoto /> components', () => {
    const props = {
      ...factory.gridItemsProps,
      profile: {
        ...factory.gridItemsProps.profile,
        flags: {
          ...factory.gridItemsProps.profile.flags,
          isNri: true,
        },
      },
    };
    const wrapper = shallow(<PremiumCarouselItem {...props} />);
    expect(wrapper.find('ProfilePhoto')).toHaveLength(1);
    expect(wrapper.html()).toContain('28 yrs, 5&#x27; 6');
    expect(wrapper.html()).toContain('Mumbai, India');
  });

  it('should render <Eoi /> components', () => {
    const props = { ...factory.gridItemsProps };
    const wrapper = shallow(<PremiumCarouselItem {...props} />);
    expect(wrapper.find('Eoi')).toHaveLength(1);
  });
});
