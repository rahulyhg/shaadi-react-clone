import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import initializeStore from '../../../store';
import DailyRecommendationsPage from '../desktop';
import ProfileNameSection from '../../../components/ProfileNameSection';
import DrQueue from '../../../components/Common/DrQueue';
import factory from './utils/factory';

const store = initializeStore();

describe('DailyRecommendationsPage', () => {
  describe('Name Section component mounted', () => {
    it('should mount', () => {
      const props = factory.allData;
      // const Component = () => <DailyRecommendationsPage.WrappedComponent />
      // const WrappedComponent = withRouter(Component)

      const drpage = mount(
        <Provider store={store}>
          <Router>
            <DailyRecommendationsPage.WrappedComponent {...props} />
          </Router>
        </Provider>,
      );

      expect(drpage.find(ProfileNameSection)).toHaveLength(1);
      expect(drpage.find(DrQueue)).toHaveLength(1);

      // let a = {...props, {location: {search : '&from=test'},item: {pageTitle: '',uid: null}}}
      drpage.setProps({ location: { search: '&from=test' } });

      expect(drpage.find(ProfileNameSection)).toHaveLength(1);
    });
  });
});

describe('DailyRecommendationsPage Thank you page', () => {
  describe('flash component mounted', () => {
    it('should mount', () => {
      const props = factory.noItemData;
      // const Component = () => <DailyRecommendationsPage.WrappedComponent />
      // const WrappedComponent = withRouter(Component)

      const drpage = mount(
        <Provider store={store}>
          <Router>
            <DailyRecommendationsPage.WrappedComponent {...props} />
          </Router>
        </Provider>,
      );

      expect(drpage.text()).toBe('Loading...');
      // expect(drpage.find(s.dayilyRecommendationWrapper)).toHaveLength(1);
      // expect(drpage.find(DrQueue)).toHaveLength(1);
      // expect(drpage.find(ProfileNameSection)).toHaveLength(1);
    });

    it('should mount', () => {
      const props = factory.noItemDataWithParam;
      // const Component = () => <DailyRecommendationsPage.WrappedComponent />
      // const WrappedComponent = withRouter(Component)

      const drpage = mount(
        <Provider store={store}>
          <Router>
            <DailyRecommendationsPage.WrappedComponent {...props} />
          </Router>
        </Provider>,
      );

      expect(drpage.text()).toContain("You've reviewed today's recommendations!");
    });
  });
});
