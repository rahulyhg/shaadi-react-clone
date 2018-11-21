import { Reducer } from 'redux-testkit';
import saveSearchBox from '../../modal/saveSearchBox';
import factory from './utils/saveSearchBoxFactory';

describe('reducer savesearchbox', () => {
  it('Should generate default state on no action', () => {
    const state = Reducer(saveSearchBox).execute({});
    expect(state).toEqual(factory.theDefaultState);
  });
});
