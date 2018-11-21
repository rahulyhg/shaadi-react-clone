import { Reducer } from 'redux-testkit';
import firstStep from '../../modal/firstStep';
import factory from './utils/factory';

describe('reducer firstStep', () => {
  describe('firstStep', () => {
    it('should generate the default state on no action', () => {
      const state = Reducer(firstStep).execute({});
      expect(state).toHaveProperty('name');
      expect(state).toHaveProperty('source');
      expect(state).toHaveProperty('type');
      expect(state).toHaveProperty('himHer');
      expect(state).toHaveProperty('nextProfileLink');
      expect(state).toHaveProperty('connectionType');
      expect(state).toHaveProperty('discount');
      expect(state).toHaveProperty('offerDetails');
      expect(state).not.toHaveProperty('msg');
      expect(state).toEqual(factory.theDefaultState);
    });

    it('should generate the modified state on offerdetails with type = {perc}', () => {
      const state = firstStep(factory.requiredState, {
        type: 'MODAL_SHOW',
        payload: { ...factory.payloadProps, offerDetails: [{ type: 'perc', value: 50 }] },
      });
      expect(state).toHaveProperty('source');
      expect(state).toHaveProperty('type');
      expect(state).toHaveProperty('himHer');
      expect(state).toHaveProperty('nextProfileLink');
      expect(state).toHaveProperty('connectionType');
      expect(state).toHaveProperty('discount');
      expect(state).toHaveProperty('offerDetails');
      expect(state).toHaveProperty('msg');
      expect(state).toHaveProperty('msg', 'Save upto 50% today!');
    });

    it('should generate the modified state on offerdetails with type = {days}', () => {
      const state = firstStep(factory.requiredState, {
        type: 'MODAL_SHOW',
        payload: { ...factory.payloadProps, offerDetails: [{ type: 'days', value: 30 }] },
      });
      expect(state).toHaveProperty('source');
      expect(state).toHaveProperty('type');
      expect(state).toHaveProperty('himHer');
      expect(state).toHaveProperty('nextProfileLink');
      expect(state).toHaveProperty('connectionType');
      expect(state).toHaveProperty('discount');
      expect(state).toHaveProperty('offerDetails');
      expect(state).toHaveProperty('msg');
      expect(state).toHaveProperty('msg', '');
    });

    it('should generate the modified state on offerdetails with type = {amount}', () => {
      const state = firstStep(factory.requiredState, {
        type: 'MODAL_SHOW',
        payload: { ...factory.payloadProps, offerDetails: [{ type: 'amount', value: 8000, currency: 'INR' }] },
      });
      expect(state).toHaveProperty('source');
      expect(state).toHaveProperty('type');
      expect(state).toHaveProperty('himHer');
      expect(state).toHaveProperty('nextProfileLink');
      expect(state).toHaveProperty('connectionType');
      expect(state).toHaveProperty('discount');
      expect(state).toHaveProperty('offerDetails');
      expect(state).toHaveProperty('msg');
      expect(state).toHaveProperty('msg', '');
    });

    it('should generate the modified state on offerdetails with type = {days,amount}', () => {
      const state = firstStep(factory.requiredState, {
        type: 'MODAL_SHOW',
        payload: { ...factory.payloadProps, offerDetails: [{ type: 'days', value: 30 }, { type: 'amount', value: 8000, currency: 'INR' }] },
      });
      expect(state).toHaveProperty('source');
      expect(state).toHaveProperty('type');
      expect(state).toHaveProperty('himHer');
      expect(state).toHaveProperty('nextProfileLink');
      expect(state).toHaveProperty('connectionType');
      expect(state).toHaveProperty('discount');
      expect(state).toHaveProperty('offerDetails');
      expect(state).toHaveProperty('msg');
      expect(state).toHaveProperty('msg', '');
    });

    it('should generate the modified state on offerdetails with type = {days,perc}', () => {
      const state = firstStep(factory.requiredState, {
        type: 'MODAL_SHOW',
        payload: { ...factory.payloadProps, offerDetails: [{ type: 'days', value: 30 }, { type: 'perc', value: 60 }] },
      });
      expect(state).toHaveProperty('source');
      expect(state).toHaveProperty('type');
      expect(state).toHaveProperty('himHer');
      expect(state).toHaveProperty('nextProfileLink');
      expect(state).toHaveProperty('connectionType');
      expect(state).toHaveProperty('discount');
      expect(state).toHaveProperty('offerDetails');
      expect(state).toHaveProperty('msg');
      expect(state).toHaveProperty('msg', 'Save upto 60% today!');
    });
  });
});
