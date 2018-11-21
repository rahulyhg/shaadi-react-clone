import React from 'react';
import { mount } from 'enzyme';
import NetBanking from '../../ModeOfPayment/NetBanking';
import factory from '../utils/factory';

describe('Net Banking', () => {
  const onTabClick = jest.fn();
  const handleUserInput = jest.fn();
  const placeOrder = jest.fn();
  const onBankClick = jest.fn();
  const paymentActionHandler = jest.fn();
  describe('should render', () => {
    beforeEach(() => {
      onTabClick.mockClear();
      handleUserInput.mockClear();
      placeOrder.mockClear();
      paymentActionHandler.mockClear();
    });
    const props = { ...factory.modeofPaymentProps, onTabClick, handleUserInput, placeOrder, onBankClick, paymentActionHandler };

    describe('NetBanking : ', () => {
      const netBankingProps = {
        ...props,
        mopId: 4,
        mopName: 'Net Banking',
        formErrors: { ...props.formErrors, bankName: true },
        juspayNetBankingAB: 'A',
      };
      it('Form should Be Redirect', () => {
        const netBanking = mount(<NetBanking {...netBankingProps} />);
        expect(netBanking.find('#net_banking').exists()).toBe(true);
      });
    });
  });
});
