import facetDecorator from '../../preferredMatches/facets';
import factory from './utils/factory';

describe('preferredMatches decorator/facets', () => {
  describe('facets', () => {
    it('should generate the drink facet', () => {
      const result = facetDecorator({ drink: factory.F_PAY_drink });
      expect(result[0]).toMatchObject(factory.F_EXP_drink);
    });

    it('should generate the caste facet', () => {
      const result = facetDecorator({ caste: factory.F_PAY_caste }, factory.F_CRI_caste);
      expect(result[0]).toMatchObject(factory.F_EXP_caste);
    });

    it('should generate the manglik facet', () => {
      const result = facetDecorator({ manglik: factory.F_PAY_manglik }, factory.F_CRI_manglik);
      expect(result[0]).toMatchObject(factory.F_EXP_manglik);
    });

    it('should generate the recently_joined facet', () => {
      const result = facetDecorator({ recently_joined: factory.F_PAY_recently_joined }, factory.F_CRI_recently_joined);
      expect(result[0]).toMatchObject(factory.F_EXP_recently_joined);
    });

    it('should generate the annualincome facet', () => {
      const result = facetDecorator({ annualincome: factory.F_PAY_annualincome }, factory.F_CRI_annualincome);
      expect(result[0]).toMatchObject(factory.F_EXP_annualincome);
    });
  });
});
