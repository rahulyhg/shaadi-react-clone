import React from 'react';
import { createMount } from '../../../test-utils';
import EoiMobile from '../../EoiMobile';
import fixtureProps from '../../../fixtures/eoiMobileFixture';

describe('EoiMobile connectionStatus: default', () => {
  const onAction = jest.fn();
  const eoiProps = (connectionStatus, uid) => ({ ...fixtureProps, connectionStatus, uid, onAction });
  const mount = createMount();
  let eoiMobile;

  beforeAll(() => {
    const props = eoiProps('default', 'sample-uid');
    eoiMobile = mount(<EoiMobile {...props} />);
  });

  beforeEach(() => {
    global.ShaadiDataLayer = [];
    onAction.mockClear();
  });

  const buttonsSet = [
    { index: 0, type: 'view contact', text: 'View Contact', onClickArgs: ['contact_mobile_confirm'] },
    { index: 1, type: 'write message', text: 'Write Message', onClickArgs: ['chatNow'] },
    { index: 2, type: 'connect now', text: 'Connect Now', onClickArgs: ['connect_mobile'] },
  ];

  it('should have correct number of buttons', () => {
    const buttons = eoiMobile.find('button');
    expect(buttons.length).toBe(3);
    expect(onAction).not.toHaveBeenCalled();
  });

  buttonsSet.forEach(({ index, type, text, onClickArgs }) => {
    it(`has a working ${type} button without history`, () => {
      const button = eoiMobile.find('button').at(index);
      expect(button.text()).toEqual(text);
      button.simulate('click');
      expect(onAction).toHaveBeenCalledWith(...onClickArgs);
    });
    it(`should fire a GA event for ${type}`, () => {
      const button = eoiMobile.find('button').at(index);
      button.simulate('click');
      expect(global.ShaadiDataLayer.length).toEqual(1);
    });
  });
});
