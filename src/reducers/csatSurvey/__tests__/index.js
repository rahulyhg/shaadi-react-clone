import csatSurvey from '../index';
import types from '../../../action_types';

describe('csatReducer', () => {
  const questionsData = {
    loading: false,
    questions: [
      {
        id: '1',
        display_order: '1',
        type: 'multichoice',
        title: 'What do you like about Shaadi.com?',
        isRequired: 'true',
        choices: {
          '12': 'Easy to Use',
          '13': 'Quality of Matches',
          '14': 'Lots of Matches',
        },
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
      },
      {
        id: '2',
        display_order: '3',
        type: 'textarea',
        title: 'Can you tell us what can we do better?',
        placeHolder: 'Write your feedback here',
        isRequired: 'true',
      },
    ],
  };

  const initialState = {
    loading: true,
  };

  it('on csat data request get loading true', () => {
    expect(csatSurvey({}, { type: types.CSAT_DATA_REQUEST, payload: {} })).toEqual(initialState);
  });

  it('fetches and sets the questions for survey', () => {
    expect(csatSurvey({}, { type: types.CSAT_DATA_SUCCESS, payload: questionsData })).toEqual(questionsData);
  });
});
