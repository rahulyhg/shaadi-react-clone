import React from 'react';
import { mount } from 'enzyme';
import ScentTrailCases from '../../TopBand/ScentTrailCases';
import factory from '../utils/factory';

jest.mock('../../../Common/Link');

describe('Scent Trail Cases', () => {
  describe('should render', () => {
    const props = { ...factory.scentTrailCasesProps };
    describe('Scent Trail Cases : With profile send mail', () => {
      const scentTrailProps = { ...props, type: 'profile_sendemail' };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').exists()).toBe(true);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Wish to chat with Test ID? Upgrade to any of our Premium Plans28, 5\' 3", Hindu, Rajput, Delhi-NCR, India',
        );
      });
    });
    describe('Scent Trail Cases : With both party case', () => {
      const scentTrailProps = { ...props, type: 'bothpartypay_message' };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          "To view Test ID's message and reply to him,Upgrade to any of our Plans & start a conversation.",
        );
      });
    });
    describe('Scent Trail Cases : With single accept', () => {
      const scentTrailProps = { ...props, type: 'accept_stop_page', acceptCount: 1 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID has accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With two accepts', () => {
      const scentTrailProps = { ...props, type: 'accept_stop_page', acceptCount: 2 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID and 1 Member have accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With multiple accepts', () => {
      const scentTrailProps = { ...props, type: 'accept_stop_page', acceptCount: 5 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID and 4 others have accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With single accept from stoppage', () => {
      const scentTrailProps = { ...props, type: 'stoppage_accept', acceptCount: 1 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID has accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With two accepts from stoppage', () => {
      const scentTrailProps = { ...props, type: 'stoppage_accept', acceptCount: 2 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID and 1 Member have accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With multiple accepts from stoppage', () => {
      const scentTrailProps = { ...props, type: 'stoppage_accept', acceptCount: 5 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID and 4 others have accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With single accept from stoppage mailer', () => {
      const scentTrailProps = { ...props, type: 'stoppage_accept_mailer', acceptCount: 1 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID has accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With two accepts from stoppage mailer', () => {
      const scentTrailProps = { ...props, type: 'stoppage_accept_mailer', acceptCount: 2 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID and 1 Member have accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With multiple accepts from stoppage mailer', () => {
      const scentTrailProps = { ...props, type: 'stoppage_accept_mailer', acceptCount: 5 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID and 4 others have accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With single accept from accept mailer', () => {
      const scentTrailProps = { ...props, type: 'mailer_accept', acceptCount: 1 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID has accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With two accepts from accept mailer', () => {
      const scentTrailProps = { ...props, type: 'mailer_accept', acceptCount: 2 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID and 1 Member have accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
    describe('Scent Trail Cases : With multiple accepts from accept mailer', () => {
      const scentTrailProps = { ...props, type: 'mailer_accept', acceptCount: 5 };
      it('Top band Message with Scent Trail', () => {
        const scentTrailBand = mount(<ScentTrailCases {...scentTrailProps} />);
        expect(scentTrailBand.find('ScentTrailWrap').text()).toContain(
          'Test ID and 4 others have accepted your invite.Upgrade & start a conversation via Email, Chat & Phone.',
        );
      });
    });
  });
});
