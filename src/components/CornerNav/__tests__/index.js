import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import factory from './factory';
import CornerNav from '../index';
import initializeStore from '../../../store';

const store = initializeStore();
const onAction = jest.fn();

describe('Top Band Tests', () => {
  beforeEach(() => {
    onAction.mockClear();
  });
  it('should show Renew Premium if Premium membership is getting expired in 15 days ', () => {
    const CornerNavMount = mount(
      <Provider store={store}>
        <Router>
          <CornerNav {...factory} />
        </Router>
      </Provider>,
    );
    expect(CornerNavMount.text()).toContain('Renew Membership');
  });

  it('should show Upgrade now if member is FREE', () => {
    const membership = {
      ...factory.membership,
      accountType: 'FREE',
      plan: 'Free',
      planExpiryDate: '',
      planDaysToExpiry: 0,
      headerUpgradeLink: '/payment?source=top_navbar_upgrade',
      callSmsViewed: 0,
      callSmsBalance: 0,
      services: [],
      wasPaidUser: false,
      upgradeType: 'upgrade',
    };
    const freeUser = { ...factory, membership };

    const CornerNavMount = mount(
      <Provider store={store}>
        <Router>
          <CornerNav {...freeUser} />
        </Router>
      </Provider>,
    );
    expect(CornerNavMount.text()).toContain('Upgrade Now');
  });

  it('should show Premium if member is PAID', () => {
    const membership = {
      ...factory.membership,
      accountType: 'PAID',
      plan: 'Platinum Plus',
      planExpiryDate: '04-Sep-19',
      planDaysToExpiry: 335,
      headerUpgradeLink: '/payment?source=top_navbar_upgrade',
      callSmsViewed: 13,
      callSmsBalance: 647,
      services: [
        {
          name: 'Spotlight',
          valid_till: '20190904235900',
        },
      ],
      wasPaidUser: false,
      upgradeType: 'extend',
    };
    const paidUser = { ...factory, membership };

    const CornerNavMount = mount(
      <Provider store={store}>
        <Router>
          <CornerNav {...paidUser} />
        </Router>
      </Provider>,
    );
    expect(CornerNavMount.text()).toContain('Premium');
  });

  it('should show Renew Premium if membership has expired', () => {
    const membership = {
      ...factory.membership,
      accountType: 'FREE',
      plan: 'was Gold Plus',
      planExpiryDate: '',
      planDaysToExpiry: 0,
      headerUpgradeLink: '/payment?source=top_navbar_upgrade',
      callSmsViewed: 150,
      callSmsBalance: 0,
      services: [
        {
          name: 'Spotlight',
          valid_till: '20180919235900',
        },
      ],
      wasPaidUser: true,
      upgradeType: 'renew',
    };
    const lapsedUser = { ...factory, membership };

    const CornerNavMount = mount(
      <Provider store={store}>
        <Router>
          <CornerNav {...lapsedUser} />
        </Router>
      </Provider>,
    );
    expect(CornerNavMount.text()).toContain('Renew Premium');
  });
});
