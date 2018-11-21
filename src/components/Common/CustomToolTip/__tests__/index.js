import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import CustomToolTip from '../../CustomToolTip';
import ContextProvider from '../../Context';
import TooltipBox from '../../TooltipBox';
import TooltipQuestionMark from '../../../../theme/TooltipQuestionMark';
import initializeStore from '../../../../store';

const store = initializeStore();

const props = {
  canShowTooltip: false,
  layout: '',
  top: '',
  children: '',
};

const getContext = ({ layout = 'desktop' } = {}) => ({
  view: {
    layout,
    height: '',
  },
});

describe('[desktop] Tooltip show and hide on hover in and out', () => {
  const component = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <CustomToolTip {...props} />
      </Provider>
    </ContextProvider>,
  );
  component.instance().tooltipElement = component.find(TooltipQuestionMark);
  component.find(TooltipQuestionMark).simulate('mouseover', { type: 'mouseover' });
  it('tool tip should be visible', () => {
    expect(component.find(TooltipBox).exists()).toBeTruthy();
  });
  component.find(TooltipQuestionMark).simulate('mouseout', { target: '' });
  it('tool tip should be hidden', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 250; // eslint-disable-line no-undef
    setTimeout(() => {
      done();
      expect(component.find(TooltipBox).exists()).toBeFalsy();
    }, 1);
  });
});

describe('[mobile] Tooltip show and hide on hover in and out', () => {
  const component = mount(
    <ContextProvider {...getContext({ layout: 'mobile' })}>
      <Provider store={store}>
        <CustomToolTip {...props} />
      </Provider>
    </ContextProvider>,
  );
  component.instance().tooltipElement = component.find(TooltipQuestionMark);
  component.find(TooltipQuestionMark).simulate('click', { type: 'click' });
  it('tool tip should be visible', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 250; // eslint-disable-line no-undef
    setTimeout(() => {
      done();
      expect(component.find(TooltipBox).exists()).toBeTruthy();
    }, 1);
  });
  component.find(TooltipQuestionMark).simulate('click', { type: 'click' });
  it('tool tip should be hidden', () => {
    expect(component.find(TooltipBox).exists()).toBeFalsy();
  });
});
