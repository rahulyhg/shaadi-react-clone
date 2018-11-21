import React from 'react';
import { shallow } from 'enzyme';
import CarouselItem from '../../CarouselItem';
import factory from '../utils/factory';

describe('CarouselItem Masking', () => {
  it('should render <OverLay /> components', () => {
    const props = { ...factory.carouselMaskProps };
    const wrapper = shallow(<CarouselItem {...props} />);

    expect(props.profile.flags.isMaskedProfile).toBe(true);
    expect(wrapper.find('OverLay')).toHaveLength(1);
  });

  it('should not render <OverLay /> components', () => {
    const propsArr = { ...factory.carouselMaskProps };

    const props = {
      ...propsArr,
      profile: {
        ...propsArr.profile,
        flags: {
          ...propsArr.profile.flags,
          isMaskedProfile: false,
        },
      },
    };
    const wrapper = shallow(<CarouselItem {...props} />);

    expect(props.profile.flags.isMaskedProfile).toBe(false);
    expect(wrapper.find('OverLay')).toHaveLength(0);
  });

  it('should show chat icon and Online status if profile is hidden/deleted', () => {
    const propsArr = { ...factory.carouselMaskProps };
    const props = {
      ...propsArr,
      profile: {
        ...propsArr.profile,
        flags: {
          ...propsArr.profile.flags,
          isMaskedProfile: false,
          isHidden: false,
        },
      },
    };
    const wrapper = shallow(<CarouselItem {...props} />);

    expect(props.profile.flags.isHidden).toBe(false);
    expect(wrapper.find('ChatIcon')).toHaveLength(1);
  });

  it('should not show chat icon and Online status if profile is hidden/deleted', () => {
    const propsArr = { ...factory.carouselMaskProps };

    const props = {
      ...propsArr,
      profile: {
        ...propsArr.profile,
        flags: {
          ...propsArr.profile.flags,
          isMaskedProfile: false,
          isHidden: true,
        },
      },
    };
    const wrapper = shallow(<CarouselItem {...props} />);

    expect(props.profile.flags.isHidden).toBe(true);
    expect(wrapper.find('ChatIcon')).toHaveLength(0);
  });
});
