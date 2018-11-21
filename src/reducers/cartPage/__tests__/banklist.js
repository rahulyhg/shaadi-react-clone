import { Reducer } from 'redux-testkit';
import bankList from '../../cartPage/bankList';
import factory from './utils/factory';

describe('reducer bank list', () => {
  describe('bank list', () => {
    it('should generate the default state on no action', () => {
      const state = Reducer(bankList).execute({});
      expect(state).toMatchObject({ topBanks: expect.any(Array) });
      expect(state).toMatchObject({ otherBanks: expect.any(Array) });
      expect(state).toHaveProperty('loading');
      expect(state).toEqual(factory.theDefaultBankListState);
    });

    it('should generate the modified state on SUCCESS BANKLIST API response', () => {
      const state = bankList(factory.theDefaultBankListState, {
        type: 'BANKLIST_SUCCESS',
        ...factory.bankListProps,
      });
      expect(state).toMatchObject({
        topBanks: expect.any(Array),
        otherBanks: expect.any(Array),
        loading: false,
      });
      expect(state.topBanks.length).toEqual(9);
      expect(state.otherBanks.length).toEqual(9);
    });

    it('should generate the modified state on DETAILS BANKLIST API requested', () => {
      const state = bankList(factory.theDefaultBankListState, {
        type: 'BANKLIST_REQUEST',
        action: { response: { data: { data: {} } } },
      });
      expect(state).toMatchObject({ topBanks: expect.any(Array) });
      expect(state).toMatchObject({ otherBanks: expect.any(Array) });
      expect(state).toHaveProperty('loading');
      expect(state.topBanks.length).toEqual(0);
      expect(state.otherBanks.length).toEqual(0);
      expect(state).toEqual(factory.theDefaultBankListState);
    });
  });
});
