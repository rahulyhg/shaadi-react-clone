import profileDecorator from '../../../profile';
import factory from '../utils/factory';

describe('profile decorator/detailed', () => {
  describe('preferences', () => {
    it('should have correct preferences for profile0', () => {
      const [profile, extra] = factory.profileArgs(factory.profile0Response);
      const result = profileDecorator(undefined, profile, extra);
      expect(result.detailed.preferences).toMatchObject(factory.EXP_profile0Preferences);
      expect(factory.EXP_profile0Preferences).toMatchObject(result.detailed.preferences);
    });

    it('should have correct preferences for profile1', () => {
      const [profile, extra] = factory.profileArgs(factory.profile1Response);
      const result = profileDecorator(undefined, profile, extra);
      expect(result.detailed.preferences).toMatchObject(factory.EXP_profile1Preferences);
      expect(factory.EXP_profile1Preferences).toMatchObject(result.detailed.preferences);
    });
  });
});
