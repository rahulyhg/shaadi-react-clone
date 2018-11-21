import React from 'react';
import { createMount } from '../../../test-utils';
import EoiMobile from '../../EoiMobile';
import fixtureProps from '../../../fixtures/eoiMobileFixture';

describe('EoiMobile connectionStatus: theyDeclined', () => {
  const eoiProps = (connectionStatus, uid) => ({ ...fixtureProps, connectionStatus, uid });
  const mount = createMount();
  let eoiMobile;
  beforeAll(() => {
    const props = eoiProps('theyDeclined', 'sample-uid');
    eoiMobile = mount(<EoiMobile {...props} />);
  });

  it('should have correct title and description', () => {
    const p = eoiMobile.find('p');
    expect(p.length).toBe(2);
    expect(p.at(0).text()).toEqual('He Declined your invitation');
    expect(p.at(1).text()).toEqual('You cannot contact this Member on Shaadi.com. We will notify you if he changes his mind. ');
  });
});
