import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import ProfileNameSection from '../../ProfileNameSection';
import initializeStore from '../../../store';
import factory from './utils/factory';
import ProfileContactNote from '../../Common/ProfileContactNote';

const store = initializeStore();

describe('ProfileNameSection', () => {
  describe('Name Section component mounted', () => {
    it('should mount', () => {
      const props = factory.allData;
      const nameSection = mount(
        <Provider store={store}>
          <Router>
            <ProfileNameSection {...props} />
          </Router>
        </Provider>,
      );
      expect(nameSection.text().indexOf('Mafaz K')).toBe(50);
    });
    it('Should not show status when automoved', () => {
      const props = factory.allData;
      const nameSection = mount(
        <Provider store={store}>
          <Router>
            <ProfileNameSection {...props} automove />
          </Router>
        </Provider>,
      );
      expect(nameSection.find(ProfileContactNote).length).toBe(0);
    });
  });
});
