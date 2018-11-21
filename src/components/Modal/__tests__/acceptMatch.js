import React from 'react';
import { mount } from 'enzyme';
import AcceptMatch from '../acceptMatch';

jest.mock('../../Common/Link');

describe('AcceptMatch popup', () => {
  const onAction = jest.fn();

  describe('AcceptMatch can mount', () => {
    it('should mount', () => {
      const props = {
        onModalClose: onAction,
        doModalAction: onAction,
        doProfileAction: onAction,
        // saveSearchBox: {savedSuccess:[]},
        name: 'Ranjeet S',
        himHer: 'Him',
        hisHer: 'His',
        uid: 'eSH25162570',
        selfPhoto: '/assets/60-add-ph-female-v2.gif',
        profilePhoto: 'https://img1.shaadi.com/2017/06/07/eSH25162570-596ca1.jpg',
        type: 'received',
        settings: {
          canSendPasswordOnConnect: false,
          canConnectWithMessage: false,
          hasUploadedPhoto: false,
          showUpgradeBanner: false,
          wasPaidUser: false,
          isPaidUser: false,
        },
      };
      const acceptMatch = mount(<AcceptMatch {...props} />);
      expect(
        acceptMatch
          .find('span')
          .first()
          .text(),
      ).toContain('Ranjeet S');
    });
  });
});
