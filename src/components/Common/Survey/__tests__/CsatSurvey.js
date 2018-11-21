import React from 'react';
import { mount } from 'enzyme';
import CsatSurvey from '../CsatSurvey';

const props = {
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
  csatSurvey: {
    loading: false,
    questions: [
      {
        id: '1',
        display_order: '1',
        type: 'multichoice',
        title: 'What do you like about Shaadi.com?',
        choices: {
          '12': 'Easy to Use',
          '13': 'Quality of Matches',
          '14': 'Lots of Matches',
        },
        show: true,
      },
      {
        id: '3',
        display_order: '2',
        type: 'rating',
        title: 'Please rate your Experience with us',
        choices: {
          '1': "It's ok!",
          '2': "It's ok!",
          '3': "It's ok!",
          '4': 'Loved It!',
          '5': 'Loved It!',
        },
        show: true,
      },
      {
        id: '2',
        display_order: '3',
        type: 'textarea',
        title: 'Can you tell us what can we do better?',
        placeHolder: 'Write your feedback here',
        show: false,
      },
    ],
  },
  wwwBaseUrl: 'http://www.shaadi.com',
  doCsatSurvey() {},
  history: { length: 2, action: 'POP', location: { pathname: '/stop-page/csat-survey', search: '', hash: '' } },
};

describe('Csat survey', () => {
  const wrapper = mount(<CsatSurvey {...props} />);
  it('Should show survey', () => {
    expect(wrapper.find('Survey').exists()).toBe(true);
  });

  it('should show heading', () => {
    expect(wrapper.html()).toContain('We love to hear from you');
  });

  describe('Submit Button Test Cases', () => {
    it('Should be clickable if rating is selected', () => {
      const answers = [{ id: '3', answer: '2' }];
      wrapper.instance().storeAnswers(answers);
      expect(wrapper.state()).toEqual({ answers, enableSubmit: true, formSubmit: false, questions: [] });
    });
  });

  describe('Comment Question Scenarios', () => {
    beforeEach(() => {
      const { questions } = props.csatSurvey;
      wrapper.setState({ questions });
    });

    it('Should be shown if user rate 1,2 or 3', () => {
      wrapper.setState({ answers: [{ id: '3', answer: '5' }] });
      expect(wrapper.find('Comment').exists()).toBe(true);
    });
  });

  it('should show Thankyou message when form is submitted', () => {
    wrapper.setState({
      answers: [
        {
          id: '2',
          answer: 'I am happy',
        },
      ],
      formSubmit: true,
    });
    expect(wrapper.find('ThankyouMsg').exists()).toBe(true);
  });
});
