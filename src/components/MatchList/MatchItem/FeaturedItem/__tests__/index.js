import React from 'react';
import { shallow } from 'enzyme';
import FeaturedItem from '../../FeaturedItem';
import factory from './utils/factory';

describe('<FeaturedItem />', () => {
  const onAction = jest.fn();
  it('should render <ProfilePhoto /> components', () => {
    const props = {
      ...factory.props,
      onAction,
      onChatNow: onAction,
      onMouseEnter: onAction,
      onMouseLeave: onAction,
      onShowContactDetails: onAction,
      onShowWatermarkInfo: onAction,
      onEoiTooltipClose: onAction,
      onPhotoTooltipClose: onAction,
      onRequestPhoto: onAction,
      onCallConsultantInvited: onAction,
    };
    const wrapper = shallow(<FeaturedItem {...props} />);
    expect(wrapper.find('ProfilePhoto')).toHaveLength(1);
  });

  it('should render <Eoi /> components', () => {
    const props = {
      ...factory.props,
      onAction,
      onChatNow: onAction,
      onMouseEnter: onAction,
      onMouseLeave: onAction,
      onShowContactDetails: onAction,
      onShowWatermarkInfo: onAction,
      onEoiTooltipClose: onAction,
      onPhotoTooltipClose: onAction,
      onRequestPhoto: onAction,
      onCallConsultantInvited: onAction,
    };
    const wrapper = shallow(<FeaturedItem {...props} />);
    expect(wrapper.find('Eoi')).toHaveLength(1);
  });
});
