import React from 'react';
import { shallow } from 'enzyme';
import StopPage, { mapStateToProps } from '../responsive';
import doProfileAction from '../../../actions/doProfileAction';
import doCsatSurvey from '../../../actions/doCsatSurvey';
import doPrivacySettings from '../../../actions/doPrivacySettings';

const mockHistoryPush = jest.fn();
const reduxState = {
  history: {
    location: {
      search: '',
    },
    push: mockHistoryPush,
    match: {
      params: {
        pageName: 'id-verification',
      },
      path: '/stop-page/id-verification',
      url: 'http://app.shaadi.com/stop-page/id-verification',
      isExact: true,
    },
  },
  view: {
    layout: 'desktop',
  },
  config: {
    app: {
      appKey: '69c3f1c1ea31d60aa5516a439bb65949cf3f8a1330679fa7ff91fc9a5681b564',
      chatAppKey: '69c3f1c1ea31d60aa5516a439bb65949cf3f8a1330679fa7ff91fc9a5681b564',
      platform: 'web',
      wwwBaseUrl: `https://www.shaadi.com`,
      accessToken: '',
      autologinToken: '',
      authHistoryToken: '',
      uid: '',
      hasWebpSupport: false,
    },
  },
  csatSurvey: {
    loading: false,
    questions: [
      {
        id: '1',
        display_order: '1',
        type: 'multichoice',
        title: 'abc',
        choices: {},
        placeHolder: '',
      },
    ],
  },
  privacySettings: {},
  modal: {
    profilePhotoUpload: {},
  },
  session: {
    user: {
      uid: '7SH123553',
      gender: 'male',
      photos: {
        hasPhotos: true,
        photos: [
          {
            domain_name: '',
            '120X120': '',
          },
        ],
      },
    },
    nextUrl: '',
    isLoggedOut: false,
    isNative: false,
  },
};

const props = {
  ...mapStateToProps(reduxState, reduxState.history),
  doTrustBadgeAction() {},
  doHeaderAction() {},
  phoneSettings: {
    memberShipPlan: '',
    preference: '',
    loading: false,
    list: [
      {
        id: '',
        text: '',
        tooltip: '',
      },
    ],
  },
};
props.doProfileAction = doProfileAction;
props.doCsatSurvey = doCsatSurvey;
props.doPrivacySettings = doPrivacySettings;
props.history = reduxState.history;
props.match = reduxState.match;

describe('StopPage test suite', () => {
  describe('logged out case access', () => {
    const StopPageShallow = shallow(<StopPage.WrappedComponent {...props} isLoggedOut />);
    StopPageShallow.instance().componentDidMount();
    it('user redirected to login page', () => {
      expect(mockHistoryPush).toHaveBeenCalled();
    });
  });
  describe('logged out case while on page due to cookie expiry or so', () => {
    const StopPageShallow = shallow(<StopPage.WrappedComponent {...props} isLoggedOut />);
    StopPageShallow.instance().componentDidUpdate();
    it('user redirected to login page', () => {
      expect(mockHistoryPush).toHaveBeenCalled();
    });
  });
});

// nivedita
describe('Survey test suite', () => {
  describe('Logged in User', () => {
    it('should mount survey component', () => {
      const newProps = { ...props, pageName: 'csat-survey' };
      // modify the props to call CsatSurvey
      const StopPageComp = shallow(<StopPage.WrappedComponent {...newProps} isLoggedOut />);
      expect(StopPageComp.find('CsatSurvey')).toHaveLength(1);
    });
  });
});

// vaishali
describe('Phone Setting onboarding test suite', () => {
  describe('Logged in User', () => {
    it('should mount phone setting component', () => {
      const newProps = { ...props, pageName: 'phone-setting' };
      // // modify the props to call OnBoardingPhoneSetting
      const StopPageComp = shallow(<StopPage.WrappedComponent {...newProps} isLoggedOut />);
      expect(StopPageComp.find('OnBoardingPhoneSetting')).toHaveLength(1);
    });
  });
});
