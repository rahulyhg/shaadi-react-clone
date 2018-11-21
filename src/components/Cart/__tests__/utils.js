import {
  paymentFormURL,
  getApproxCurrencyValue,
  monthArr,
  yearArr,
  doorStepAndAtBankValidation,
  shaadiAndUaeCentreValidation,
  ccAndDcJusPayFormValidation,
  jusPayEventHandler,
  netBankingFormValidation,
} from '../utils';

describe('Utils Functions', () => {
  describe('should render', () => {
    describe('paymentFormURL', () => {
      expect(paymentFormURL).toBe('https://pay.shaadi.com/placeorder');
    });
    describe('Shaadi Care & Profile Booster Checkboxes', () => {
      it('Both Checked', () => {
        const output1 = getApproxCurrencyValue('500', true, true, '300', '200');
        expect(output1).toEqual(1000);
      });
      it('Only Profile Booster Checked', () => {
        const output2 = getApproxCurrencyValue('500', false, true, '300', '200');
        expect(output2).toEqual(700);
      });
      it('Only Shaadi Care Checked', () => {
        const output3 = getApproxCurrencyValue('500', true, false, '300', '200');
        expect(output3).toEqual(800);
      });
      it('Both Unchecked', () => {
        const output4 = getApproxCurrencyValue('500', false, false, '300', '200');
        expect(output4).toEqual(500);
      });
    });
    describe('Month Array in Credit Card', () => {
      it('Month from 1 to 12', () => {
        const array1 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        const output1 = monthArr(1, 12);
        expect(output1).toEqual(array1);
      });
      it('Month from 1 to 9', () => {
        const array2 = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
        const output2 = monthArr(1, 9);
        expect(output2).toEqual(array2);
      });
    });
    describe('Year Array in Credit Card', () => {
      it('Year from 2018 to 2036', () => {
        const array1 = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036];
        const output1 = yearArr(2036, 2018);
        expect(output1).toEqual(array1);
      });
      it('Only Year 2018', () => {
        const array2 = [2018];
        const output2 = yearArr(2018, 2018);
        expect(output2).toEqual(array2);
      });
    });
    describe('Door Step And Pay At Bank Validation', () => {
      it('city validation', () => {
        const output = doorStepAndAtBankValidation(
          true,
          {
            city: 'Thane',
            contactPersonName: 'Test',
            personPhoneNo: '999999999',
            address: 'test',
          },
          {
            city: '',
            contactPersonName: '',
            personPhoneNo: '',
            address: '',
          },
          'cust_city',
          'Indore',
        );
        const { formfield, formErrors } = output;
        expect(formfield.city).toEqual('Indore');
        expect(formErrors.city).toEqual(true);
      });
      it('contactPersonName validation', () => {
        const output = doorStepAndAtBankValidation(
          true,
          {
            city: 'Thane',
            contactPersonName: 'Test',
            personPhoneNo: '999999999',
            address: 'test',
          },
          {
            city: '',
            contactPersonName: '',
            personPhoneNo: '',
            address: '',
          },
          'cust_name',
          'Test 2',
        );
        const { formfield, formErrors } = output;
        expect(formfield.contactPersonName).toEqual('Test 2');
        expect(formErrors.contactPersonName).toEqual(true);
      });
      it('personPhoneNo validation', () => {
        const output = doorStepAndAtBankValidation(
          true,
          {
            city: 'Thane',
            contactPersonName: 'Test',
            personPhoneNo: '999999999',
            address: 'test',
          },
          {
            city: '',
            contactPersonName: '',
            personPhoneNo: '',
            address: '',
          },
          'cust_phone',
          '8888888888',
        );
        const { formfield, formErrors } = output;
        expect(formfield.personPhoneNo).toEqual('8888888888');
        expect(formErrors.personPhoneNo).toEqual(true);
      });
      it('personPhoneNo length validation', () => {
        const output = doorStepAndAtBankValidation(
          true,
          {
            city: 'Thane',
            contactPersonName: 'Test',
            personPhoneNo: 'y',
            address: 'test',
          },
          {
            city: '',
            contactPersonName: '',
            personPhoneNo: '',
            address: '',
          },
          'cust_phone',
          '8888888888',
        );
        const { formfield, formErrors } = output;
        expect(formfield.personPhoneNo).toEqual('8888888888');
        expect(formErrors.personPhoneNo).toEqual(true);
      });
      it('address validation', () => {
        const output = doorStepAndAtBankValidation(
          true,
          {
            city: 'Thane',
            contactPersonName: 'Test',
            personPhoneNo: '999999999',
            address: 'test',
          },
          {
            city: '',
            contactPersonName: '',
            personPhoneNo: '',
            address: '',
          },
          'cust_address1',
          'Address Test',
        );
        const { formfield, formErrors } = output;
        expect(formfield.address).toEqual('Address Test');
        expect(formErrors.address).toEqual(true);
      });
    });
    describe('Shaadi Center And Uae Centre Validation', () => {
      it('shaadiCentre -> city validation', () => {
        const output = shaadiAndUaeCentreValidation(
          true,
          {
            city: 'Thane',
            shaadiCentre: 'Test',
          },
          {
            city: '',
            centre: '',
          },
          'shaadiCenterCity',
          'Test City',
        );
        const { formfield, formErrors } = output;
        expect(formfield.city).toEqual('Test City');
        expect(formErrors.city).toEqual(true);
      });
      it('shaadiCentre -> centre validation', () => {
        const output = shaadiAndUaeCentreValidation(
          true,
          {
            city: 'Thane',
            shaadiCentre: 'Test',
          },
          {
            city: '',
            centre: '',
          },
          'centreadd',
          'Test Centre',
        );
        const { formfield, formErrors } = output;
        expect(formfield.shaadiCentre).toEqual('Test Centre');
        expect(formErrors.centre).toEqual(true);
      });
      it('UaeCentre -> city validation', () => {
        const output = shaadiAndUaeCentreValidation(
          false,
          {
            city: 'Thane',
            uaeCentre: 'Test',
          },
          {
            city: '',
            centre: '',
          },
          'shaadiCenterCity',
          'Test City',
        );
        const { formfield, formErrors } = output;
        expect(formfield.city).toEqual('Test City');
        expect(formErrors.city).toEqual(true);
      });
      it('UaeCentre -> centre validation', () => {
        const output = shaadiAndUaeCentreValidation(
          false,
          {
            city: 'Thane',
            uaeCentre: 'Test',
          },
          {
            city: '',
            centre: '',
          },
          'centreadd',
          'Test Centre',
        );
        const { formfield, formErrors } = output;
        expect(formfield.uaeCentre).toEqual('Test Centre');
        expect(formErrors.centre).toEqual(true);
      });
    });
    describe('Credit Card And Debit Card JusPay Form Validation', () => {
      it('cardNum validation', () => {
        const output = ccAndDcJusPayFormValidation(
          {
            cardNum: '',
            cardMonth: '',
            cardYear: '',
            cvv: '',
            cardHolderName: '',
          },
          'cardNum',
          '5123456789012',
        );
        const { formErrors } = output;
        expect(formErrors.cardNum).toEqual(true);
        expect(formErrors.trySubmit).toEqual(true);
      });
      it('cardMonth validation', () => {
        const output = ccAndDcJusPayFormValidation(
          {
            cardNum: '',
            cardMonth: '',
            cardYear: '',
            cvv: '',
            cardHolderName: '',
          },
          'cardMonth',
          '09',
        );
        const { formErrors } = output;
        expect(formErrors.cardMonth).toEqual(true);
        expect(formErrors.trySubmit).toEqual(true);
      });
      it('cardYear validation', () => {
        const output = ccAndDcJusPayFormValidation(
          {
            cardNum: '',
            cardMonth: '',
            cardYear: '',
            cvv: '',
            cardHolderName: '',
          },
          'cardYear',
          '19',
        );
        const { formErrors } = output;
        expect(formErrors.cardYear).toEqual(true);
        expect(formErrors.trySubmit).toEqual(true);
      });
      it('cvv validation', () => {
        const output = ccAndDcJusPayFormValidation(
          {
            cardNum: '',
            cardMonth: '',
            cardYear: '',
            cvv: '',
            cardHolderName: '',
          },
          'cvv',
          '123',
        );
        const { formErrors } = output;
        expect(formErrors.cvv).toEqual(true);
        expect(formErrors.trySubmit).toEqual(true);
      });
      it('cardHolderName validation', () => {
        const output = ccAndDcJusPayFormValidation(
          {
            cardNum: '',
            cardMonth: '',
            cardYear: '',
            cvv: '',
            cardHolderName: '',
          },
          'cardHolderName',
          'test',
        );
        const { formErrors } = output;
        expect(formErrors.cardHolderName).toEqual(true);
        expect(formErrors.trySubmit).toEqual(true);
      });
    });
    describe('JusPay Event Handler', () => {
      describe('Card Number Validation', () => {
        it('MASTERCARD -> Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: '',
              empty: true,
              valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual('');
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('');
          expect(cardBrand).toEqual('');
        });
        it('MASTERCARD -> Not Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: 'MASTERCARD',
              empty: false,
              valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual('');
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
        it('MASTERCARD -> Not Empty & Valid True', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: 'MASTERCARD',
              empty: false,
              valid: true,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual(true);
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
        it('VISA -> Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: 'VISA',
              empty: true,
              valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual('');
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('');
          expect(cardBrand).toEqual('VISA');
        });
        it('VISA -> Not Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: 'VISA',
              empty: false,
              valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual('');
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('visa_card');
          expect(cardBrand).toEqual('VISA');
        });
        it('VISA -> Not Empty & Valid True', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: 'VISA',
              empty: false,
              valid: true,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual(true);
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('visa_card');
          expect(cardBrand).toEqual('VISA');
        });
        it('MAESTRO -> Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: 'MAESTRO',
              empty: true,
              valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual('');
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('');
          expect(cardBrand).toEqual('MAESTRO');
        });
        it('MAESTRO -> Not Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: 'MAESTRO',
              empty: false,
              valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual('');
          expect(formErrors.cardMonth).toEqual(true);
          expect(formErrors.cardYear).toEqual(true);
          expect(formErrors.cvv).toEqual(true);
          expect(cardImage).toEqual('maestro_card');
          expect(cardBrand).toEqual('MAESTRO');
        });
        it('MAESTRO -> Not Empty & Valid True', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              card_brand: 'MAESTRO',
              empty: false,
              valid: true,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardNum).toEqual(true);
          expect(formErrors.cardMonth).toEqual(true);
          expect(formErrors.cardYear).toEqual(true);
          expect(formErrors.cvv).toEqual(true);
          expect(cardImage).toEqual('maestro_card');
          expect(cardBrand).toEqual('MAESTRO');
        });
      });
      describe('Card Month & Year Validation', () => {
        it('Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_exp_month',
              empty: true,
              expiry_valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            'master_card',
            'MASTERCARD',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
        it('Not Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              empty: false,
              expiry_valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(cardImage).toEqual('');
          expect(cardBrand).toEqual('');
        });
        it('Not Empty & Valid True', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'card_number',
              empty: false,
              expiry_valid: true,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            '',
            '',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardMonth).toEqual('');
          expect(formErrors.cardYear).toEqual('');
          expect(cardImage).toEqual('');
          expect(cardBrand).toEqual('');
        });
      });
      describe('Cvv Validation', () => {
        it('Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'security_code',
              empty: true,
              valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            'master_card',
            'MASTERCARD',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
        it('Not Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'security_code',
              empty: false,
              valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            'master_card',
            'MASTERCARD',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cvv).toEqual('');
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
        it('Not Empty & Valid True', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'security_code',
              empty: false,
              valid: true,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            'master_card',
            'MASTERCARD',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cvv).toEqual(true);
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
      });
      describe('Card Holder Name Validation', () => {
        it('Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'name_on_card',
              empty: true,
              expiry_valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            'master_card',
            'MASTERCARD',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardHolderName).toEqual('');
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
        it('Not Empty & Valid False', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'name_on_card',
              empty: false,
              expiry_valid: false,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            'master_card',
            'MASTERCARD',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardHolderName).toEqual('');
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
        it('Not Empty & Valid True', () => {
          const output = jusPayEventHandler(
            {
              target_element: 'name_on_card',
              empty: false,
              expiry_valid: true,
            },
            {
              cardNum: '',
              cardMonth: '',
              cardYear: '',
              cvv: '',
              cardHolderName: '',
            },
            'master_card',
            'MASTERCARD',
          );
          const { formErrors, cardImage, cardBrand } = output;
          expect(formErrors.cardHolderName).toEqual('');
          expect(cardImage).toEqual('master_card');
          expect(cardBrand).toEqual('MASTERCARD');
        });
      });
    });
    describe('Net Banking Form Validation', () => {
      it('bank name validation -> Empty Case', () => {
        const output = netBankingFormValidation(
          {
            bankName: '',
          },
          '',
          {
            current: {
              options: [{ text: 'bank 1' }, { text: 'bank 2' }],
              selectedIndex: 1,
            },
          },
        );
        const { formErrors, selectedBank, bankName, isFormSubmit } = output;
        expect(formErrors.bankName).toEqual(false);
        expect(selectedBank).toEqual('bank 2');
        expect(bankName).toEqual('');
        expect(isFormSubmit).toEqual(false);
      });
      it('bank name validation -> Not Empty Case', () => {
        const output = netBankingFormValidation(
          {
            bankName: '',
          },
          'bank 1',
          {
            current: {
              options: [{ text: 'bank 1' }, { text: 'bank 2' }],
              selectedIndex: 0,
            },
          },
        );
        const { formErrors, selectedBank, bankName, isFormSubmit } = output;
        expect(formErrors.bankName).toEqual(true);
        expect(selectedBank).toEqual('bank 1');
        expect(bankName).toEqual('bank 1');
        expect(isFormSubmit).toEqual(true);
      });
    });
  });
});
