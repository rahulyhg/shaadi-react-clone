import React from 'react';
import { createMount } from '../../../test-utils';
import EoiMobile from '../../EoiMobile';
import fixtureProps from '../../../fixtures/eoiMobileFixture';

jest.mock('../../Common/Link');

describe('EoiMobile connectionStatus: misuseReported', () => {
  const onAction = jest.fn();
  const eoiProps = (connectionStatus, uid) => ({ ...fixtureProps, connectionStatus, uid, onAction });
  const mount = createMount();
  let eoiMobile;
  beforeAll(() => {
    const props = eoiProps('misuseReported', 'sample-uid');
    eoiMobile = mount(<EoiMobile {...props} />);
  });

  beforeEach(() => {
    global.ShaadiDataLayer = [];
    onAction.mockClear();
  });

  const buttonsSet = [{ index: 0, type: 'connect now', text: 'Unblock him', onClickArgs: ['unblock_mobile'] }];

  it('should have correct number of buttons', () => {
    const buttons = eoiMobile.find('button');
    expect(buttons.length).toBe(1);
    expect(onAction).not.toHaveBeenCalled();
  });

  it('should have correct title and description', () => {
    const p = eoiMobile.find('p');
    expect(p.length).toBe(2);
    expect(p.at(0).text()).toEqual('Blocked Member');
    expect(p.at(1).text()).toEqual('Changed your mind? Unblock him');
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
