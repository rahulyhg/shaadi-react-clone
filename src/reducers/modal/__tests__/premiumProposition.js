import { Reducer } from 'redux-testkit';
import premiumProposition from '../../modal/premiumProposition';
import premiumPropositionFactory from './utils/premiumPropositionFactory';

describe('reducer premiumProposition', () => {
  describe('premiumProposition', () => {
    it('should generate the default state', () => {
      const state = Reducer(premiumProposition).execute({});
      expect(state).toHaveProperty('display_uid');
      expect(state).toHaveProperty('display_name');
      expect(state).toHaveProperty('display_photo');
      expect(state).toHaveProperty('offer_details');
      expect(state).toEqual(premiumPropositionFactory.theDefaultState);
    });
  });

  describe('profile data from payload', () => {
    it('should set data in modal only if premiumProposition', () => {
      const action = premiumPropositionFactory.onModalShowAction({ ...premiumPropositionFactory.payloadProps });
      const state = Reducer(premiumProposition).execute(action);
      expect(state).toMatchObject(premiumPropositionFactory.expPayloadProps);
    });

    it('should set default data if not premiumProposition ', () => {
      const action = premiumPropositionFactory.onModalShowAction({ ...premiumPropositionFactory.payloadProps, modal: '' });
      const state = Reducer(premiumProposition).execute(action);
      expect(state).toMatchObject(premiumPropositionFactory.theDefaultState);
    });
  });
});
