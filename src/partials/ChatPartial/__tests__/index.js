import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import initializeStore from '../../../store';
import ChatPartial from '../desktop';
import factory from './utils/factory';

const store = initializeStore();

describe('<ChatPartial />', () => {
  it('should mount', () => {
    const props = { ...factory.chatProps };
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ChatPartial.WrappedComponent {...props} />
        </Router>
      </Provider>,
    );
    expect(wrapper.debug().length).toBeGreaterThan(0);
    expect(wrapper.find('ChatPartial')).toHaveLength(1);
    expect(wrapper.find('ChatWidget')).toHaveLength(1);
  });
});
