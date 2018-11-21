import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

it('renders without crashing', () => {
  document.cookie = 'abc=randomstring|test00';
  window.ga = () => {};
  const app = mount(<App />);
  expect(app.props()).toEqual({});
});
