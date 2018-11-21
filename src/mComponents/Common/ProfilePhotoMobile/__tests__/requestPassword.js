import React from 'react';
import { createMount } from '../../../../test-utils';
import ProfilePhotoMobile from '../../ProfilePhotoMobile';
import fixtureProps from '../../../../fixtures/profilePhotoMobileFixture';

describe('ProfilePhotoMobile albumStatus: requestPassword', () => {
  const onAction = jest.fn();
  const profilePhototProps = (albumStatus, uid) => ({ ...fixtureProps, albumStatus, uid, onAction });
  const mount = createMount();
  let profilePhotoMobile;
  beforeAll(() => {
    const props = profilePhototProps('requestPassword', 'sample-uid');
    profilePhotoMobile = mount(<ProfilePhotoMobile {...props} />);
  });

  beforeEach(() => {
    onAction.mockClear();
  });

  const buttonsSet = [
    { index: 0, type: 'request photo password', text: 'Request Photo Password', onClickArgs: ['request_password_mobile'] },
  ];

  it('should have correct number of buttons', () => {
    const buttons = profilePhotoMobile.find('button');
    expect(buttons.length).toBe(1);
    expect(onAction).not.toHaveBeenCalled();
  });

  it('should have correct message', () => {
    expect(profilePhotoMobile.text()).toContain('Password Protected');
  });

  it('should show lock icon', () => {
    expect(profilePhotoMobile.styles).toContain('/assets/mobile/lock_grayshadow.png');
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
