import React from 'react';
import { shallow } from 'enzyme';
import GridItem from '../../GridItem';
import factory from '../utils/factory';

describe('GridItem Masking', () => {
  it('should render <OverLay /> components', () => {
    const props = { ...factory.listItemMaskProps };
    const wrapper = shallow(<GridItem {...props} />);

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
    const wrapper = shallow(<GridItem {...props} />);

    expect(props.profile.flags.isMaskedProfile).toBe(false);
    expect(wrapper.find('OverLay')).toHaveLength(0);
  });
});
