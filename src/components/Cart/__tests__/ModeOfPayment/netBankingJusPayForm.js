import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import NetBankingJusPayForm from '../../ModeOfPayment/NetBanking/JusPayForm/NetBankingJusPayForm';
import factory from '../utils/factory';
import initializeStore from '../../../../store';

const store = initializeStore();

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
      bankList: {
        otherBanks: [
          {
            bank_name: 'State Bank of India',
            bank_code: 'NB_SBI',
            vendor: 'juspay',
          },
        ],
        topBanks: [
          {
            bank_name: 'State Bank of India',
            bank_code: 'NB_SBI',
            vendor: 'juspay',
          },
        ],
      },
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
        const netBanking = mount(
          <Provider store={store}>
            <NetBankingJusPayForm {...netBankingProps} />
          </Provider>,
        );
        expect(netBanking.find('#juspay_netbanking_form').exists()).toBe(true);
        expect(netBanking.find('#juspay_netbanking_form').find('input[name="bankname"]').length).toEqual(6);
        expect(netBanking.find('#juspay_netbanking_form').text()).toContain('Select Bank');
        expect(
          netBanking
            .find('#juspay_netbanking_form')
            .find('select[name="bank_code"]')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('#juspay_netbanking_form')
            .find('HdfcIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('#juspay_netbanking_form')
            .find('IciciIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('#juspay_netbanking_form')
            .find('AxisIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('#juspay_netbanking_form')
            .find('SbiIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('#juspay_netbanking_form')
            .find('IdbiIcon')
            .exists(),
        ).toBe(true);
        expect(
          netBanking
            .find('#juspay_netbanking_form')
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
        const netBanking = mount(
          <Provider store={store}>
            <NetBankingJusPayForm {...netBankingProps} />
          </Provider>,
        );
        netBanking.setState({
          formErrors: {
            bankName: false,
          },
        });
        netBanking.find('button[type="button"]').simulate('click');
        expect(netBanking.text()).toContain('Please select prefered Bank.');
        const selectBank = netBanking.find('#juspay_netbanking_form').find('input[name="bankname"]');
        selectBank.at(0).simulate('click', { target: { name: 'bankname', value: 'NB_SBI' } });
        netBanking.find('button[type="button"]').simulate('click');
        netBanking.update();
      });
      it('Form Submit With Error', () => {
        const netBanking = mount(
          <Provider store={store}>
            <NetBankingJusPayForm {...netBankingProps} />
          </Provider>,
        );
        netBanking.setState({
          formErrors: {
            bankName: false,
          },
          isFormSubmit: true,
        });
        const selectBank = netBanking.find('#juspay_netbanking_form').find('select');
        selectBank
          .find('option')
          .at(1)
          .simulate('change', { target: { name: 'bankname', value: 'NB_SBI' } });
        netBanking.props().children.props.orderId.id = '12345';
        netBanking.update();
      });
    });
  });
});
