import React from 'react';
import { mount } from 'enzyme';
import factory from './utils/factory';
import ProfileAdditionalInfo from '../../ProfileAdditionalInfo';
import ContactCard from '../../ProfileAdditionalInfo/ContactCard';

jest.mock('../../Common/Link');

describe('ProfileAdditionalInfo : ', () => {
  const onAction = jest.fn();
  const daTracking = jest.fn();
  const props = { ...factory.profileAdditionalInfoProps, onAction, daTracking };

  describe('ContactCard : Render', () => {
    it('Contact Card For A Bucket : ', () => {
      const profileAdditionalInfoProps = { ...props, profileContactCard: 'A' };
      const profileAdditionalInfo = mount(<ProfileAdditionalInfo {...profileAdditionalInfoProps} />);
      console.log(profileAdditionalInfo);
      expect(profileAdditionalInfo.contains('ContactCard')).toBe(false);
    });

    it('Contact Card For B Bucket : ', () => {
      const contactCardProps = { contactEmail: '', connectionStatus: '' };
      const profileAdditionalInfoProps = { ...props, ...contactCardProps, profileContactCard: 'B' };
      const profileAdditionalInfo = mount(<ProfileAdditionalInfo {...profileAdditionalInfoProps} />);
      expect(profileAdditionalInfo.contains(ContactCard)).toBe(true);
    });
  });
});
