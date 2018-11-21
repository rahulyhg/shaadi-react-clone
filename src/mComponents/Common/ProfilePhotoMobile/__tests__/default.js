import React from 'react';
import { createMount } from '../../../../test-utils';
import ProfilePhotoMobile from '../../ProfilePhotoMobile';
import fixtureProps from '../../../../fixtures/profilePhotoMobileFixture';

describe('ProfilePhotoMobile albumStatus: default with photoCount', () => {
  const onAction = jest.fn();
  const profilePhototProps = (albumStatus, uid) => ({ ...fixtureProps, albumStatus, uid, onAction });
  const mount = createMount();
  let profilePhotoMobile;
  beforeAll(() => {
    const props = profilePhototProps('default', 'sample-uid');
    profilePhotoMobile = mount(<ProfilePhotoMobile {...props} photoCount={3} />);
  });

  beforeEach(() => {
    onAction.mockClear();
  });

  const buttonsSet = [{ index: 0, type: 'photo count button', text: '3', onClickArgs: ['show_album_mobile'] }];

  it('should have correct number of buttons', () => {
    const buttons = profilePhotoMobile.find('button');
    expect(buttons.length).toBe(1);
    expect(onAction).not.toHaveBeenCalled();
  });

  it('should have correct message', () => {
    expect(profilePhotoMobile.text()).toContain(3);
  });

  it('should show correct photoCount', () => {
    expect(profilePhotoMobile.html()).toContain(3);
  });

  buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
    it(`has a working ${type} button without history`, () => {
      const button = profilePhotoMobile.find('button').at(index);
      expect(button.text()).toEqual(text);
      button.simulate('click');
      expect(onAction).toHaveBeenCalledWith(...onClickArgs);
    });
  });
});
