/* eslint-disable prettier/prettier */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { mount } from 'enzyme';

import LazyLoadImage from '../index';

const DefaultDiv = () => <div />;

describe('LazyLoadImage', () => {
  it('should mount without errors', () => {
    mount(<LazyLoadImage
      src={'/wow.png'}
      height={100}
      image={DefaultDiv}
    />);
  });

  xit('should call MyImg with default src and error', () => {
    const MyImg = jest.fn(DefaultDiv);
    mount(<LazyLoadImage
      src={'/hello/wow.png'}
      height={100}
      duration={0}
      delay={0}
      image={MyImg}
    />);

    expect(MyImg).toBeCalledWith({ src: '', error: null });
  });

  it('should mount placeholder as default', () => {
    const Placeholder = DefaultDiv;
    const node = mount(<LazyLoadImage
      src={'/wow.png'}
      height={100}
      placeholder={<Placeholder />}
      image={DefaultDiv}
    />);

    expect(node.find(Placeholder)).toHaveLength(1);
  });
});
