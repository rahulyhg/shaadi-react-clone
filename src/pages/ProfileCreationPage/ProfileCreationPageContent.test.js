import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProfileCreationPageContent } from './ProfileCreationPageContent';
import Stepper from '../../components/Common/FormElements/Stepper';
import pageHeadingTexts from './pageHeadingTexts';
import getPageSubHeadings from './getPageSubHeadings';
import initializeStore from '../../store';
import getContext from './utils/sampleContext';
import ContextProvider from '../../components/Common/Context';
import api from '../../api';

jest.mock('../../components/HOC/withDeviceInfo.js');

api.get = () =>
  new Promise((resolve, reject) => {
    resolve({ data: [{ id: 'Other', text: 'Other' }] });
  });

const store = initializeStore();

const reqdProps = {
  isMobile: () => false,
  getPageHeading: () => '',
  getPageSubHeading: () => '',
  getFormName: () => '',
  getButtonText: () => 'Continue',
  getButtonWidth: () => '',
  getCompletedStepNumber: () => 0,
  onOptionSelection: () => 0,
  canShowStepper: () => false,
  doDomActions: () => false,
  stepNumber: 1,
  match: {
    params: {},
    path: '',
    url: '',
    isExact: false,
  },
  isSuspendedUser: false,
  isReturningUser: false,
  isFormSubmitting: false,
  formSubmitFailed: false,
  session: {
    areExperimentsFetched: false,
    isLoggedIn: true,
    isLoggedOut: false,
    isNative: false,
    isStoppage: false,
    canShowSkip: false,
    nextUrl: '',
  },
  showExitIntentLayer() {},
  isUserExiting: false,
  canShowExitIntentLayer: false,
  closeExitIntentLayerModal() {},
  exitIntentLayerProfiles: [],
  onFormSubmit() {},
  multiLang: {
    slang: '',
    litem: '',
  },
  navigateTo() {},
  ...getContext(),
};

const view = {
  height: 600,
  layout: 'desktop',
};

const userWithAddressBy = {
  adddressByActive() {},
  adddressByPassive() {},
};

const getMatchProps = ({ stepNumber = 1 }) => ({
  params: { stepNumber },
});

const expectCommonComponents = (component, options = {}) => {
  const { buttonText } = options;
  it('should have a stepper', () => {
    expect(component.find(Stepper)).toHaveLength(1);
  });
  it('should have a page heading', () => {
    expect(component.find('h1')).toHaveLength(1);
  });
  it('should have a page sub heading', () => {
    expect(component.find('h2')).toHaveLength(1);
  });
  it('should have a button to move to next page', () => {
    expect(component.find('button')).toHaveLength(1);
  });
  it(`should have a button with text ${buttonText}`, () => {
    expect(component.find('button').text()).toEqual(buttonText);
  });
};

describe('Profile Creation Step 1 (Default)', () => {
  const component = mount(
    <Provider store={store}>
      <ContextProvider view={view} history={getContext().history}>
        <Router>
          <ProfileCreationPageContent {...reqdProps} getFormName={() => 'basics'} match={getMatchProps({ stepNumber: '1' })} />
        </Router>
      </ContextProvider>
    </Provider>,
  );
  expectCommonComponents(component, {
    buttonText: 'Continue',
    pageHeading: pageHeadingTexts(1),
    pageSubHeading: getPageSubHeadings(1, { user: userWithAddressBy }),
  });
  it('should show step 1 (Basics) field set', () => {
    expect(component.find('form[name="basics"]')).toHaveLength(1);
  });
  it('should not show step 2 (BioData) field set', () => {
    expect(component.find('form[name="biodata"]')).toHaveLength(0);
  });
  it('should not show step 3 (LifeStyle) field set', () => {
    expect(component.find('form[name="lifestyle"]')).toHaveLength(0);
  });
  it('should not show step 4 (Details) field set', () => {
    expect(component.find('form[name="details"]')).toHaveLength(0);
  });
});

describe('Profile Creation Page Step 2', () => {
  const component = mount(
    <Provider store={store}>
      <ContextProvider view={view} history={getContext().history}>
        <Router>
          <ProfileCreationPageContent {...reqdProps} getFormName={() => 'biodata'} match={getMatchProps({ stepNumber: '2' })} />
        </Router>
      </ContextProvider>
    </Provider>,
  );
  expectCommonComponents(component, {
    buttonText: 'Continue',
    pageHeading: pageHeadingTexts(2),
    pageSubHeading: getPageSubHeadings(2, { user: userWithAddressBy }),
  });
  it('should show step 1 (Basics) field set', () => {
    expect(component.find('form[name="basics"]')).toHaveLength(0);
  });
  it('should not show step 2 (BioData) field set', () => {
    expect(component.find('form[name="biodata"]')).toHaveLength(1);
  });
  it('should not show step 3 (LifeStyle) field set', () => {
    expect(component.find('form[name="lifestyle"]')).toHaveLength(0);
  });
  it('should not show step 4 (Details) field set', () => {
    expect(component.find('form[name="details"]')).toHaveLength(0);
  });
});

describe('Profile Creation Page Step 3', () => {
  const component = mount(
    <Provider store={store}>
      <ContextProvider view={view} history={getContext().history}>
        <Router>
          <ProfileCreationPageContent {...reqdProps} getFormName={() => 'lifestyle'} match={getMatchProps({ stepNumber: '3' })} />
        </Router>
      </ContextProvider>
    </Provider>,
  );
  expectCommonComponents(component, {
    buttonText: 'Continue',
    pageHeading: pageHeadingTexts(3),
    pageSubHeading: getPageSubHeadings(3, { user: userWithAddressBy }),
  });
  it('should show step 1 (Basics) field set', () => {
    expect(component.find('form[name="basics"]')).toHaveLength(0);
  });
  it('should not show step 2 (BioData) field set', () => {
    expect(component.find('form[name="biodata"]')).toHaveLength(0);
  });
  it('should not show step 3 (LifeStyle) field set', () => {
    expect(component.find('form[name="lifestyle"]')).toHaveLength(1);
  });
  it('should not show step 4 (Details) field set', () => {
    expect(component.find('form[name="details"]')).toHaveLength(0);
  });
});

describe('Profile Creation Page Step 4', () => {
  const component = mount(
    <Provider store={store}>
      <ContextProvider view={view} history={getContext().history}>
        <Router>
          <ProfileCreationPageContent
            {...reqdProps}
            getButtonText={() => 'Create Profile'}
            getFormName={() => 'details'}
            match={getMatchProps({ stepNumber: '4' })}
          />
        </Router>
      </ContextProvider>
    </Provider>,
  );
  expectCommonComponents(component, {
    buttonText: 'Create Profile',
    pageHeading: pageHeadingTexts(4),
    pageSubHeading: getPageSubHeadings(4, { user: userWithAddressBy }),
  });
  it('should show step 1 (Basics) field set', () => {
    expect(component.find('form[name="basics"]')).toHaveLength(0);
  });
  it('should not show step 2 (BioData) field set', () => {
    expect(component.find('form[name="biodata"]')).toHaveLength(0);
  });
  it('should not show step 3 (LifeStyle) field set', () => {
    expect(component.find('form[name="lifestyle"]')).toHaveLength(0);
  });
  it('should not show step 4 (Details) field set', () => {
    expect(component.find('form[name="details"]')).toHaveLength(1);
  });
});

describe('Profile Creation of Suspended User', () => {
  const component = mount(
    <Provider store={store}>
      <ContextProvider view={view} history={getContext().history}>
        <Router>
          <ProfileCreationPageContent {...reqdProps} match={getMatchProps({ stepNumber: '1' })} isSuspendedUser />
        </Router>
      </ContextProvider>
    </Provider>,
  );
  expectCommonComponents(component, {
    pageHeading: 'Welcome back! One last thing...',
    pageSubHeading: getPageSubHeadings(1, { user: userWithAddressBy }),
    buttonText: 'Continue',
  });
});

describe('Profile Creation of Returning User', () => {
  const component = mount(
    <Provider store={store}>
      <ContextProvider view={view} history={getContext().history}>
        <Router>
          <ProfileCreationPageContent {...reqdProps} match={getMatchProps({ stepNumber: '1' })} isReturningUser />
        </Router>
      </ContextProvider>
    </Provider>,
  );
  expectCommonComponents(component, {
    pageHeading: 'Your email has been verified! Let’s continue..',
    pageSubHeading: getPageSubHeadings(1, { user: userWithAddressBy }),
    buttonText: 'Continue',
  });
});
