import facetDecorator from '../../otherSearch/criteria';
import factory from './utils/factory';

describe('otherSearch decorator/criteria', () => {
  describe('criteria', () => {
    it('should generate the gender criteria', () => {
      const result = facetDecorator(undefined, {}, factory.C_PAY_criteria);
      expect(result).toMatchObject(factory.C_EXP_criteria);
    });
  });
});
