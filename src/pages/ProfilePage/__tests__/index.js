import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import initializeStore from '../../../store';
import ProfilePage from '../desktop'; //eslint-disable-line
import OverLay from '../../../components/Common/OverLay';
import factory from './utils/factory';

const store = initializeStore();

describe('ProfilePage', () => {
  describe('OverLay component mounted', () => {
    it('should mount if profile is a MaskedProfile', () => {
      const props = factory.props;

      const profilePage = mount(
        <Provider store={store}>
          <Router>
            <ProfilePage.WrappedComponent {...props} />
          </Router>
        </Provider>,
      );
      expect(profilePage.find(OverLay)).toHaveLength(1);
    });

    it('should not mount if profile is a MaskedProfile', () => {
      const maskedFalse = {
        ...factory.props,
        profiles: {
          ...factory.props.profiles,
          gSH77642635: {
            ...factory.props.profiles.gSH77642635,
            flags: {
              ...factory.props.profiles.gSH77642635.flags,
              isMaskedProfile: false,
            },
          },
        },
      };

      const profilePage = mount(
        <Provider store={store}>
          <Router>
            <ProfilePage.WrappedComponent {...maskedFalse} />
          </Router>
        </Provider>,
      );
      expect(profilePage.find(OverLay)).toHaveLength(0);
    });
  });
});
