import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AboutMeField from './index';
import AboutMeEditDrawerField from './AboutMeEditDrawerField';
import Color from '../../../theme/Color';
import s from '../styles';
import getContext from '../utils/sampleContext';
import ContextProvider from '../../../components/Common/Context';
import initializeStore from '../../../store';

const store = initializeStore();
const correctLenValue = 'asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd';

const requiredProps = {
  uid: 'SH12312321',
  id: 'aboutMe',
  name: 'aboutMe',
  about: '',
  value: '',
  showAboutMeEngagingModal: false,
  onAboutMeEngagingModalClose() {},
  updateAboutMe() {},
  history: {
    block() {},
    createHref() {},
    go() {},
    goBack() {},
    goForward() {},
    listen() {},
    push() {},
    replace() {},
    action: '',
    length: 0,
    location: {
      pathname: '/profile-creation/step/1',
      search: '',
      hash: '',
    },
  },
};

const view = { height: 600, layout: 'mobile' };

describe('About Me Field', () => {
  const component = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <AboutMeField {...requiredProps} />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should have a textarea', () => {
    expect(
      component
        .find(AboutMeField)
        .find('textarea')
        .exists(),
    ).toBeTruthy();
  });
  it('should show help me write this link', () => {
    expect(
      component
        .find(AboutMeField)
        .find(s.helpwrapper)
        .exists(),
    ).toBeTruthy();
  });
});

describe('About Me Field having value less than minimum', () => {
  const component = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <AboutMeField {...requiredProps} value={correctLenValue} />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  component
    .find('textarea#aboutMe')
    .at(0)
    .simulate('focus');
  component
    .find('textarea#aboutMe')
    .at(0)
    .simulate('change', { target: { value: 'a' } });
  it('should show current count in red color as there is no value', () => {
    expect(
      component
        .find(AboutMeField)
        .find(Color)
        .props().color,
    ).toEqual('#e53a41');
  });
});

describe('About Me Field having value between minimum and maximum characters', () => {
  const component = mount(
    <ContextProvider {...getContext()}>
      <Provider store={store}>
        <Router>
          <AboutMeField {...requiredProps} value={correctLenValue} />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  it('should show current count in green', () => {
    expect(
      component
        .find(AboutMeField)
        .find(Color)
        .props().color,
    ).toEqual('#7ac142');
  });
});

describe('Msite About Me Field', () => {
  const component = mount(
    <ContextProvider {...getContext()} view={view}>
      <Provider store={store}>
        <Router>
          <AboutMeField {...requiredProps} />
        </Router>
      </Provider>
    </ContextProvider>,
  );
  const inputField = component.find(AboutMeField).find('textarea#aboutMe');
  inputField.simulate('mousedown');
  component.setProps({
    history: {
      ...requiredProps.history,
      location: {
        ...requiredProps.history.location,
        hash: '#drawer-aboutMe-edit',
      },
    },
    value: 'test',
  });
  xit('should not have input focus on click or tap', () => {
    expect(inputField.matchesElement(document.activeElement)).toBeFalsy();
  });
  xit('should open about me edit drawer on click or tap', () => {
    expect(
      component
        .find(AboutMeEditDrawerField)
        .find('textarea#about-me-edit')
        .exists(),
    ).toBeTruthy();
  });
  xit('should show button text as done', () => {
    expect(
      component
        .find(AboutMeEditDrawerField)
        .find('button')
        .find('button#btn-about-me-cta')
        .text(),
    ).toEqual('Done');
  });
  /* component
    .find(AboutMeField)
    .find('#about-me-edit-help')
    .simulate('mousedown'); */
  xit('should open about me suggested drawer on tap of Help me write this link', () => {
    expect(
      component
        .find(AboutMeField)
        .find('textarea#about-me-suggested')
        .exists(),
    ).toBeTruthy();
  });
  xit('should open about me suggested drawer on tap of Help me write this link', () => {
    expect(
      component
        .find(AboutMeEditDrawerField)
        .find('button')
        .find('#btn-about-me-cta')
        .text(),
    ).toEqual('Copy this');
  });
  xit('should open about me suggested drawer on tap of Help me write this link', () => {
    expect(
      component
        .find(AboutMeEditDrawerField)
        .find(s.helpwrapper)
        .exists(),
    ).toBeFalsy();
  });
});
