import React from 'react';
import { mount } from 'enzyme';
import SearchByProfileId from './index';
import getMockedHistory from '../../../__tests__/factory/utils/getMockedHistory';

const props = {
  history: getMockedHistory(),
};

const component = mount(<SearchByProfileId.WrappedComponent {...props} />);

describe('Search By Profile Id form', () => {
  it('should have an input for the profile Id search', () => {
    expect(component.find('input').first().length).toBe(1);
  });

  it('should have a link to perform search', () => {
    expect(component.find('#search-by-profile-id').at(0)).toHaveLength(1);
    component
      .find('#search-by-profile-id')
      .at(0)
      .simulate('click');
  });

  it('on input change', () => {
    component.instance().profileInInput = 'SH14416845';
    expect(component.find('#profile-id-input').at(0)).toHaveLength(1);
  });

  describe('on search', () => {
    it('with no profile id', () => {
      expect(component.find('#search-by-profile-id').at(0)).toHaveLength(1);
      component
        .find('#search-by-profile-id')
        .at(0)
        .simulate('click');
    });
    it('with profile id', () => {
      component.setState({
        profileId: 'asd',
      });
      component
        .find('#search-by-profile-id')
        .at(0)
        .simulate('click');
    });
    it('with a call back funtion', () => {
      component.setProps({
        onAction: jest.fn(),
      });
      component
        .find('#search-by-profile-id')
        .at(0)
        .simulate('click');
    });
  });
});
