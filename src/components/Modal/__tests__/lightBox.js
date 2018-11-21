import React from 'react';
import { mount } from 'enzyme';
import LightBox from '../lightBox';
import factory from './utils/lightBox';

jest.mock('../../Common/Link');

describe('Modal LightBox', () => {
  it(`Should Show correct active slide status `, () => {
    const lightBox = mount(<LightBox {...factory.albumProps} />);

    const status = lightBox.find('div').filterWhere(item => item.prop('id') === 'slideNumber');
    const lightBoxState = lightBox.state();
    const slideNumber = lightBoxState.activeSlide + 1;
    expect(status.text()).toContain(`${slideNumber}/${factory.albumProps.data.album.albumInfo.photosCount}`);
  });
  it(`Should show proper trigger `, () => {
    const lightBox = mount(<LightBox {...factory.albumProps} />);

    lightBox.find('span').filterWhere(item => {
      if (['navNext', 'navPrev'].includes(item.prop('id'))) {
        item.simulate('click');
      }
    });
    lightBox.find('div').filterWhere(item => {
      if (['thumbNavPrev', 'thumbNavNext'].includes(item.prop('id'))) {
        item.simulate('click');
      }
    });
  });
});
