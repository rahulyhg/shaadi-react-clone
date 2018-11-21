import React from 'react';
import { mount } from 'enzyme';
import EoiRequest from '../../../Eoi/EoiRequest';
import factory from '../utils/factory';

jest.mock('../../../Link');

describe('Eoi Inbox connectionStatus: requested', () => {
  const onAction = jest.fn();

  it('should render phone requests button', () => {
    const props = {
      reqType: 'contact',
      type: 'inbox',
      isHovered: false,
      isMemberHidden: false,
      listType: 'request_pending',
      onAction,
      profile: { ...factory.profiles[0] },
    };
    const eoi = mount(<EoiRequest {...props} />);
    const buttons = eoi.find(`[title="Verify Phone No."]`).at(1);
    expect(buttons.length).toBe(1);
  });

  it('should render phone requests text', () => {
    const props = {
      reqType: 'contact',
      type: 'inbox',
      isHovered: false,
      isMemberHidden: false,
      listType: 'request_pending',
      onAction,
      profile: { ...factory.profiles[0] },
    };
    const eoi = mount(<EoiRequest {...props} />);
    expect(eoi.text()).toBe('Verify Phone No.');
  });

  it('should render add photo requests button', () => {
    const props = {
      reqType: 'photo',
      type: 'inbox',
      isHovered: false,
      isMemberHidden: false,
      listType: 'request_pending',
      onAction,
      profile: { ...factory.profiles[0] },
    };
    const eoi = mount(<EoiRequest {...props} />);
    const buttons = eoi.find(`[title="Add Photo"]`).at(1);
    expect(buttons.length).toBe(1);
  });

  it('should render add photo requests text', () => {
    const props = {
      reqType: 'photo',
      type: 'inbox',
      isHovered: false,
      isMemberHidden: false,
      listType: 'request_pending',
      onAction,
      profile: { ...factory.profiles[0] },
    };
    const eoi = mount(<EoiRequest {...props} />);
    expect(eoi.text()).toBe('Add Photo');
  });

  it('should render request member hidden text', () => {
    const props = {
      reqType: 'photo',
      type: 'inbox',
      flags: { connectionStatus: 'default' },
      justNow: false,
      listType: 'request_pending',
      profile: { ...factory.profiles[0] },
      isMemberHidden: true,
      onAction,
    };

    const eoi = mount(<EoiRequest {...props} />);
    expect(eoi.text()).toBe(`Please unhide your profile to Connect with this Member.`);
  });
});
