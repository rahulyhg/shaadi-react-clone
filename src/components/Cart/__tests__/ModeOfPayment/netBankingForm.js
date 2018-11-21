import React from 'react';
import { mount } from 'enzyme';
import NetBankingForm from '../../ModeOfPayment/NetBanking/NetBankingForm';
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
    const props = {
      ...factory.modeofPaymentProps,
      totalPayableProps: { ...factory.totalPayableProps },
      cartSubmitProps: { ...factory.cartSubmitProps, mopId: 4, mopName: 'Net Banking' },
      onTabClick,
      handleUserInput,
      placeOrder,
      onBankClick,
      paymentActionHandler,
    };

    describe('NetBanking Form Elements Without Error', () => {
      const netBankingProps = {
        ...props,
        formErrors: { ...props.formErrors, bankName: true },
      };
      it('Form should have Elements Without Error', () => {
        const netBanking = mount(<NetBankingForm {...netBankingProps} />);
        expect(netBanking.find('NetBankingForm').exists()).toBe(true);
        expect(netBanking.find('NetBankingForm').find('input[name="bankname"]').length).toEqual(6);
        expect(netBanking.find('NetBankingForm').text()).toContain('Select Bank');
        expect(
          netBanking
            .find('NetBankingForm')
            .find('select[name="bank_code"]')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('NetBankingForm')
            .find('HdfcIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('NetBankingForm')
            .find('IciciIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('NetBankingForm')
            .find('AxisIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('NetBankingForm')
            .find('SbiIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('NetBankingForm')
            .find('IdbiIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('NetBankingForm')
            .find('PunjabIcon')
            .exists(),
        ).toBe(true);
        expect(netBanking.find('BankWrapper').exists()).toBe(true);
        expect(placeOrder).not.toHaveBeenCalled();
        netBanking.find('button[type="button"]').simulate('click');
        netBanking.update();
      });
    });

    describe('NetBanking Form Elements With Error', () => {
      const netBankingProps = {
        ...props,
        bankName: '',
        selectedBank: '',
        formErrors: {
          bankName: '',
        },
        isFormSubmit: false,
        isVisibleLoader: false,
      };
      it('Form should have Elements With Error', () => {
        const netBanking = mount(<NetBankingForm {...netBankingProps} />);
        netBanking.setState({
          formErrors: {
            bankName: false,
          },
        });
        expect(netBanking.text()).toContain('Please select prefered Bank.');
        const selectBank = netBanking.find('NetBankingForm').find('input[name="bankname"]');
        selectBank.at(0).simulate('click', { target: { name: 'bankname', value: 'SBI' } });
        netBanking.find('button[type="button"]').simulate('click');
        netBanking.update();
      });
    });
  });
});
