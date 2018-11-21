import React from 'react';
import { shallow } from 'enzyme';
import CardItem from '../../CardItem';
import factory from './utils/factory';

const CardItemAddPhoto = jest.spyOn(CardItem.prototype, 'handleDaTracking');

describe('CardItem generic', () => {
  it('should render <CardItem /> components', () => {
    const props = { ...factory.cardItemProps };
    const wrapper = shallow(<CardItem {...props} />);
    expect(props.isExtended).toBe(false);
    expect(wrapper.find('OptionA')).toHaveLength(1);
  });
  it('should render <CardItem /> components', () => {
    const props = { ...factory.cardItemProps, isExtended: true };
    const wrapper = shallow(<CardItem {...props} />);
    expect(wrapper.find('OptionB')).toHaveLength(1);
  });

  it('should add photo to be called', () => {
    const props = { ...factory.cardItemProps };
    const wrapper = shallow(<CardItem {...props} />);
    wrapper.find('#addPhotoPC').simulate('click');
    expect(CardItemAddPhoto).toHaveBeenCalled();
  });
});
