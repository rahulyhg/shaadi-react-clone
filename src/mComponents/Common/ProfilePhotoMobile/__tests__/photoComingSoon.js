import React from 'react';
import { createMount } from '../../../../test-utils';
import ProfilePhotoMobile from '../../ProfilePhotoMobile';
import fixtureProps from '../../../../fixtures/profilePhotoMobileFixture';

describe('ProfilePhotoMobile albumStatus: photoComingSoon', () => {
  const onAction = jest.fn();
  const profilePhototProps = (albumStatus, uid) => ({ ...fixtureProps, albumStatus, uid, onAction });
  const mount = createMount();
  let profilePhotoMobile;
  beforeAll(() => {
    const props = profilePhototProps('photoComingSoon', 'sample-uid');
    profilePhotoMobile = mount(<ProfilePhotoMobile {...props} />);
  });

  beforeEach(() => {
    onAction.mockClear();
  });

  // const buttonsSet = [{ index: 0, type: 'request photo', text: 'Request a Photo', onClickArgs: ['request_photo'] }];
  //
  // it('should have correct number of buttons', () => {
  //   const buttons = profilePhotoMobile.find('button');
  //   expect(buttons.length).toBe(1);
  //   expect(onAction).not.toHaveBeenCalled();
  // });

  it('should have correct message', () => {
    expect(profilePhotoMobile.text()).toContain('Photo coming soon');
  });

  it('should contain default male image', () => {
    expect(profilePhotoMobile.styles).toContain('/assets/mobile/male_results.png');
  });

  // buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
  //   it(`has a working ${type} button without history`, () => {
  //     const button = profilePhotoMobile.find('button').at(index);
  //     expect(button.text()).toEqual(text);
  //     button.simulate('click');
  //     expect(onAction).toHaveBeenCalledWith(...onClickArgs);
  //   });
  // });
});
