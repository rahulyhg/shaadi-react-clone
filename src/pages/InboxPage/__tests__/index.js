import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import initializeStore from '../../../store';
import InboxPage from '../desktop';
import NoResult from '../../../components/Common/NoResult';
import factory from './utils/factory';

const store = initializeStore();

describe('InboxPage', () => {
  const onAction = jest.fn();
  const location = {
    hash: '',
    pathname: '',
    search: '',
  };
  factory.pages.forEach(page => {
    describe(page.pageName, () => {
      it('should mount', () => {
        const props = {
          ...page.data,
          onInboxInit: onAction,
          doProfileAction: onAction,
          location,
        };
        const inboxPage = mount(
          <Provider store={store}>
            <Router>
              <InboxPage.WrappedComponent {...props} />
            </Router>
          </Provider>,
        );
        expect(inboxPage.text()).toContain(page.toContain);
      });
    });

    describe(`No ${page.pageName}`, () => {
      it('should mount', () => {
        const props = {
          ...page.data,
          results: {
            ...page.data.results,
            items: [],
          },
          onInboxInit: onAction,
          doProfileAction: onAction,
          location,
        };
        const inboxPage = mount(
          <Provider store={store}>
            <Router>
              <InboxPage.WrappedComponent {...props} />
            </Router>
          </Provider>,
        );
        expect(inboxPage.find(NoResult).length).toBe(1);
      });
    });
  });
});
