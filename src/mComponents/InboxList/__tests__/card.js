/* eslint-disable import/no-named-as-default */
import React from 'react';
import { createMount } from '../../../test-utils';
import CardItems from './utils/factory';
import { Card } from '../../InboxList/Card';

import { MemberShipTag, Time, ProfilePic, ProfileName, UserInfo } from '../styles';

const buttonTypeMap = {
  connect_pending: ['Accept', 'Decline'],
  connect_accepted: ['View Contact', 'Write Message'],
  connect_awaiting: ['Cancel', 'Remind'],
  connect_filtered: ['Accept', 'Decline'],
  request_pending: ['Add Photo'],
};
describe('invite', () => {
  Object.keys(CardItems.listType).forEach(lType => {
    const ListItems = CardItems.listType[lType];
    const { profiles, results, requestType } = ListItems;
    const Props = {
      item: results.items[0],
      profile: profiles[results.items[0].uid],
      onAction: jest.fn(),
      getProfileUrl: jest.fn(),
      isBothPartyPayUser: CardItems.settings.isBothPartyPayUser,
      history: {},
      isPaidUser: CardItems.settings.isPaidUser,
      memberHidden: false,
      gaEventActionLabel: 'profile&inbox_pending',
    };
    const InviteCard = createMount()(<Card {...Props} />);
    const { type, action } = requestType;
    describe(`viewing ${lType}`, () => {
      it('tag on card , as per membership plans', () => {
        expect(InviteCard.find(MemberShipTag).children().length).toEqual(1);
      });
      it('Received Time', () => {
        const { actionDate } = Props.item.requests[`${type}_${action}`];
        expect(InviteCard.find(Time).text()).toBe(actionDate);
      });
      it('Profile pic ', () => {
        expect(InviteCard.find(ProfilePic).children().length).toEqual(1);
      });
      it('Profile Name ', () => {
        expect(
          InviteCard.find(ProfileName)
            .children()
            .text(),
        ).toEqual(Props.profile.name);
      });
      describe('user info', () => {
        const summaryIndex = Props.profile.flags.isIndianDiaspora ? 'infoIndian' : 'infoIndianNri';
        const UserInfoElem = InviteCard.find(UserInfo)
          .childAt(0)
          .childAt(0);
        it(`should have ${Props.profile.summary[summaryIndex].length} lines of User info`, () => {
          expect(UserInfoElem.children().length).toBe(Props.profile.summary[summaryIndex].length);
        });

        it('age ,height ,Religion/caste', () => {
          expect(UserInfoElem.childAt(0).text()).toBe(Props.profile.summary[summaryIndex][0].value);
        });
        it('city ,country ,education', () => {
          expect(UserInfoElem.childAt(1).text()).toBe(Props.profile.summary[summaryIndex][1].value);
        });
        it('Profession', () => {
          expect(UserInfoElem.childAt(2).text()).toBe(Props.profile.summary[summaryIndex][2].value);
        });
      });
      describe('Call to action', () => {
        describe('Hidden user', () => {
          const HiddenProps = {
            ...Props,
            profile: { ...Props.profile, flags: { ...Props.profile.flags, isHidden: true, hiddenReason: 'selfDeleted' } },
          };
          const HiddenMemgberCard = createMount()(<Card {...HiddenProps} />);
          if (['connect_deleted', 'connect_awaiting'].includes(lType)) {
            it('Should Not provide any action', () => {
              expect(HiddenMemgberCard.find('button').length).toBe(0);
            });
          } else {
            it('can have delete options Only', () => {
              expect(HiddenMemgberCard.find('button').length).toBe(1);
              expect(HiddenMemgberCard.find('button').text()).toBe('Delete');
            });
          }
        });
        describe('Active User', () => {
          if (buttonTypeMap[lType] && buttonTypeMap[lType].length) {
            it(`can have ${buttonTypeMap[lType].join(' and/or ')} options`, () => {
              const ButtonElem = InviteCard.find('button');
              expect(ButtonElem.length).toBe(buttonTypeMap[lType].length);
            });
          }
        });
      });
    });
  });
});
