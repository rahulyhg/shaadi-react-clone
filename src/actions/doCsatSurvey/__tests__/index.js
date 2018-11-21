import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import types from '../../../action_types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockResponse = {
  questions: [
    {
      id: '1',
      display_order: '1',
      type: 'multichoice',
      title: 'What do you like about Shaadi.com?',
      isRequired: 'true',
      choices: {
        '12': 'Easy to Use',
        '13': 'Quality of MatexpectedActionsches',
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

function fetchCsatSurveySuccess(resp) {
  return {
    type: types.CSAT_DATA_SUCCESS,
    payload: resp,
  };
}

function fetchCsatSurveyRequest() {
  return {
    type: types.CSAT_DATA_REQUEST,
    payload: {},
  };
}

function doCsatSurvey() {
  const promise = Promise.resolve({ data: mockResponse });
  return dispatch => {
    dispatch(fetchCsatSurveyRequest());
    return promise.then(resp => dispatch(fetchCsatSurveySuccess(resp.data)));
  };
}

it('should execute fetch data', () => {
  const store = mockStore({});

  // Return the promise
  const expectedOnRequest = { type: 'CSAT_DATA_REQUEST', payload: {} };
  return store.dispatch(doCsatSurvey()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedOnRequest);
    expect(actions[1]).toEqual(fetchCsatSurveySuccess(mockResponse));
  });
});
