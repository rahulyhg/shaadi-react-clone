import facetDecorator from '../../dailyRecommendations/';
import factory from './utils/factory';

describe('dailyRecommendations decorator/index', () => {
  describe('DR', () => {
    it('should generate the DR queue', () => {
      const result = facetDecorator(undefined, factory.F_PAY_dr);
      expect(result).toMatchObject(factory.F_EXP_dr);
    });
  });
});
