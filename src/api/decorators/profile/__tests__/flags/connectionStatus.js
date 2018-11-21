import profileDecorator from '../../../profile';
import factory from '../utils/factory';

describe('profile decorator/flags', () => {
  describe('connectionStatus', () => {
    it('should have profile0 as ignored', () => {
      const [profile, extra] = factory.profileArgs(factory.profile0Response);
      const result = profileDecorator(undefined, profile, extra);
      expect(result.flags.connectionStatus).toEqual('ignored');
    });

    it('should have profile1 as default', () => {
      const [profile, extra] = factory.profileArgs(factory.profile1Response);
      const result = profileDecorator(undefined, profile, extra);
      expect(result.flags.connectionStatus).toEqual('default');
    });
  });
});
