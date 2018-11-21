import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import initializeStore from '../../../store';
import ContactSummaryPage from '../desktop';
import factory from './utils/factory';

const store = initializeStore();

describe('Contact Summary Page', () => {
  it('should mount', () => {
    const props = { ...factory.props };
    const callSmsWrapper = mount(
      <Provider store={store}>
        <Router>
          <ContactSummaryPage.WrappedComponent {...props} />
        </Router>
      </Provider>,
    );
    expect(callSmsWrapper.debug().length).toBeGreaterThan(0);
    expect(callSmsWrapper.text()).toContain('History of calls initiated & SMSs sent');
  });

  it('should render loader if meta loading true', () => {
    const propsArr = { ...factory.props };
    const props = {
      ...propsArr,
      meta: {
        ...propsArr.meta,
        loading: true,
      },
    };
    const callSmsWrapper = mount(
      <Provider store={store}>
        <Router>
          <ContactSummaryPage.WrappedComponent {...props} />
        </Router>
      </Provider>,
    );
    expect(props.meta.loading).toBe(true);
    expect(callSmsWrapper.text()).toContain('Loading...');
  });

  it('should render no result condition', () => {
    const propsArr = { ...factory.props };
    const props = {
      ...propsArr,
      items: { items: [] },
    };

    const callSmsWrapper = mount(
      <Provider store={store}>
        <Router>
          <ContactSummaryPage.WrappedComponent {...props} />
        </Router>
      </Provider>,
    );
    expect(props.items.items).toHaveLength(0);
    expect(callSmsWrapper.text()).toContain('No calls done / SMSs sent');
  });
  it('should render contactSummaryitem', () => {
    const props = { ...factory.props };
    const callSmsWrapper = mount(
      <Provider store={store}>
        <Router>
          <ContactSummaryPage.WrappedComponent {...props} />
        </Router>
      </Provider>,
    );
    expect(props.items.items.length).toBeGreaterThan(0);
    expect(callSmsWrapper.text().length).toBeGreaterThan(0);
  });
});
