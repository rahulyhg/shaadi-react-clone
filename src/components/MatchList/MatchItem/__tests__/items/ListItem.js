import React from 'react';
import { shallow } from 'enzyme';
import ListItem from '../../ListItem';
import factory from '../utils/factory';

describe('ListItem Masking', () => {
  it('should render <OverLay /> components', () => {
    const props = { ...factory.listItemMaskProps };
    const wrapper = shallow(<ListItem {...props} />);

    expect(props.profile.flags.isMaskedProfile).toBe(true);
    expect(wrapper.find('OverLay')).toHaveLength(1);
  });

  it('should not render <OverLay /> components', () => {
    const propsArr = { ...factory.listItemMaskProps };

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
    const wrapper = shallow(<ListItem {...props} />);

    expect(props.profile.flags.isMaskedProfile).toBe(false);
    expect(wrapper.find('OverLay')).toHaveLength(0);
  });

  it('should render <BoldListing /> component', () => {
    const propsArr = { ...factory.listItemMaskProps };

    const props = {
      ...propsArr,
      profile: {
        ...propsArr.profile,
        flags: {
          ...propsArr.profile.flags,
          isMaskedProfile: false,
          isBoldListing: true,
        },
      },
    };
    const wrapper = shallow(<ListItem {...props} />);
    expect(wrapper.find('BoldListing')).toHaveLength(1);
  });

  it('should not render <BoldListing /> component', () => {
    const propsArr = { ...factory.listItemMaskProps };

    const props = {
      ...propsArr,
      profile: {
        ...propsArr.profile,
        flags: {
          ...propsArr.profile.flags,
          isMaskedProfile: false,
          isBoldListing: false,
        },
      },
    };
    const wrapper = shallow(<ListItem {...props} />);
    expect(wrapper.find('BoldListing')).toHaveLength(0);
  });
});
