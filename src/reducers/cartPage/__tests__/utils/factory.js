const theDefaultState = {
  cartData: {
    errorMsg: '',
    cart_details: {},
    extra_products: [],
    mode_of_payment: [],
    settings: {
      isShaadiCare: false,
      isProfileBooster: false,
      isPersonalisedPlan: false,
      shaadiCareAmount: 0,
      profileBoosterAmount: 0,
      offerDiscountPerc: 0,
      offerDiscountAmount: 0,
      price: 0,
      discountedPrice: 0,
      yourPrice: 0,
      isCreditCardMop: false,
      isDebitCardMop: false,
      isPaypalMop: false,
      isNetBankingMop: false,
      isPayAtDoorStepMop: false,
      isPaymentAtBankMop: false,
      isShaadiCentreMop: false,
      isCashPaymentMop: false,
      ccConvertedAmount: {},
      dcConvertedAmount: {},
      paypalConvertedAmount: {},
      netBankingConvertedAmount: {},
      payAtDoorConvertedAmount: {},
      paymentAtBankConvertedAmount: {},
      shaadiCenterConvertedAmount: {},
      cashPaymentConvertedAmount: {},
      mopIds: {
        creditCardId: 0,
        debitCardId: 0,
        paypalId: 0,
        netBankingId: 0,
        payAtDoorStepId: 0,
        paymentAtBankId: 0,
        shaadiCenterId: 0,
        cashPaymentId: 0,
      },
    },
  },
  loading: true,
};
const payloadProps = {
  data: {
    cartData: {
      cart_details: {
        id: 151599440222826,
        product_code: 'SSP_GPlus',
        product_name: 'Gold Plus',
        duration: 3,
        price: '5550.00',
        country: 'India',
        currency: 'INR',
        display_currency: 'Rs.',
        offer_details: [],
        discounted_amount: '',
      },
      extra_products: [
        {
          name: 'Shaadi Care Donation',
          description: 'Shaadi Care Donation',
          amount: 20,
        },
      ],
      mode_of_payment: [
        {
          id: 1,
          category: 'Credit Card',
          mode: 'Credit Card Online',
          type: 'online',
          order_amount: {
            currency: 'INR',
            value: 5550,
            shaadi_care: '20.00',
          },
        },
        {
          id: 64,
          category: 'Debit Card',
          mode: 'Debit Card Online',
          type: 'online',
          order_amount: {
            currency: 'INR',
            value: 5550,
            shaadi_care: '20.00',
          },
        },
        {
          id: 4,
          category: 'Net banking',
          mode: 'Bill Desk',
          type: 'online',
          order_amount: {
            currency: 'INR',
            value: 5550,
            shaadi_care: '20.00',
          },
        },
        {
          id: 21,
          category: 'Doorstep Collection',
          mode: 'Cheque/Demand Draft Pickup',
          type: 'offline',
          order_amount: {
            currency: 'INR',
            value: 5550,
            shaadi_care: '20.00',
          },
        },
        {
          id: 34,
          category: 'Payment at Bank',
          mode: 'Cash at ICICI Bank',
          type: 'offline',
          order_amount: {
            currency: 'INR',
            value: 5550,
            shaadi_care: '20.00',
          },
        },
        {
          id: 23,
          category: 'Shaadi.com Centre',
          mode: 'Shaadi.com Collection Centre',
          type: 'offline',
          order_amount: {
            currency: 'INR',
            value: 5550,
            shaadi_care: '20.00',
          },
        },
      ],
      customer_details: {
        name: 'Salman Kapde',
        mobile: '+1-6812297799',
        city: 'Mumbai',
        ip: '203.197.78.162',
      },
    },
  },
};
const bankListProps = {
  isJusPay: false,
  topBankCodes: ['SBI', 'HDF', 'ICI', 'UTI', 'IDB', '162', 'PNB', 'UBI', 'BBR', 'IOB'],
  response: {
    data: {
      data: {
        netbanking_banks: [
          {
            bank_name: 'Axis Bank',
            bank_code: 'UTI',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Bank of Bahrain and Kuwait',
            bank_code: 'BBK',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Bank of Baroda',
            bank_code: 'BBR',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Bank of Maharashtra',
            bank_code: 'BOM',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Central Bank of India',
            bank_code: 'CBI',
            vendor: 'bill desk',
          },
          {
            bank_name: 'City Union Bank',
            bank_code: 'CUB',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Corporation Bank',
            bank_code: 'CRP',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Deutsche Bank',
            bank_code: 'DBK',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Development Credit Bank',
            bank_code: 'DCB',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Dhanlakshmi Bank',
            bank_code: 'DLB',
            vendor: 'bill desk',
          },
          {
            bank_name: 'Federal Bank',
            bank_code: 'FBK',
            vendor: 'bill desk',
          },
          {
            bank_name: 'HDFC Bank',
            bank_code: 'HDF',
            vendor: 'bill desk',
          },
          {
            bank_name: 'ICICI Bank',
            bank_code: 'ICI',
            vendor: 'bill desk',
          },
          {
            bank_name: 'IDBI Bank',
            bank_code: 'IDB',
            vendor: 'bill desk',
          },
        ],
      },
    },
  },
};
const doorStepProps = {
  response: {
    data: {
      data: {
        pickup_cities: [
          {
            display_name: 'Abohar',
            city_name: 'Abohar',
            new: 'N',
            frequently_use: 0,
            status: 'Y',
          },
          {
            display_name: 'Adilabad',
            city_name: 'Adilabad',
            new: 'N',
            frequently_use: 0,
            status: 'Y',
          },
          {
            display_name: 'Chennai',
            city_name: 'Chennai',
            new: 'N',
            frequently_use: 0,
            status: 'Y',
          },
          {
            display_name: 'Chennai',
            city_name: 'Chennai',
            new: 'N',
            frequently_use: 1,
            status: 'Y',
          },
        ],
      },
    },
  },
};
const shaadiCentersProps = {
  response: {
    data: {
      data: {
        collection_centres: [
          {
            id: 157,
            type: 'SCC',
            country: 'India',
            state: 'Delhi',
            city: 'New Delhi',
            address1: 'C10 / 2nd flr, Lajpat Nagar - 2,',
            address2: 'Adjacent to lajpat nager metro station & Bikaner Wala,',
            address3: 'New Delhi - 110024',
            title: 'Shaadi.com office',
            payment_mode: '',
            no: '+91 - 7065568042 / 8860237470',
            contact_person: 'Jogender ',
            timing: '',
            status: 'Y',
          },
          {
            id: 158,
            type: 'SCC',
            country: 'India',
            state: 'Maharashtra',
            city: 'Mumbai',
            address1: 'Ground floor , 99  Niranjan building,',
            address2: 'Opp Parsi Gym Khana  Near Marine lines Railway Station',
            address3: 'Marine Line (west)  Mumbai - 400002',
            title: 'Shaadi Centre',
            payment_mode: '',
            no: '+91 - 7715885665 / 8779561848 ',
            contact_person: 'Swapnil Bhuwad',
            timing: '',
            status: 'Y',
          },
          {
            id: 160,
            type: 'SCC',
            country: 'India',
            state: 'Maharashtra',
            city: 'Mumbai',
            address1: 'Dsouza Bunglow,',
            address2: 'Bhavani Shankar Road,Opp. Brahmin Seva Mandal, Near Kabootar khaana, Dadar,',
            address3: 'Mumbai (Maharashtra) - 400028',
            title: 'Shaadi.com office',
            payment_mode: '',
            no: '+91- 9594623742',
            contact_person: 'Sharat Shetty',
            timing: '',
            status: 'Y',
          },
        ],
      },
    },
  },
};
const uaeCitiesProps = {
  response: {
    data: {
      data: {
        collection_centres: [
          {
            id: 214,
            type: 'UAEX',
            country: 'United Arab Emirates',
            state: '',
            city: 'Abu Dhabi',
            address1: 'Shaikh Hamdan Street Branch, Omari Bin',
            address2: 'Yousuf & Sons Bldg., P.O. Box No. 170',
            address3: 'Abu Dhabi, UAE',
            title: 'null',
            payment_mode: 'null',
            no: '(02) 6322166',
            contact_person: 'Mr. Rajan John',
            timing: '8AM-2PM, 4PM-9.30PM (Sat-Thu)\r\n9AM-11.30AM,3.30PM-9.30PM(Fri)',
            status: 'Y',
          },
          {
            id: 215,
            type: 'UAEX',
            country: 'United Arab Emirates',
            state: '',
            city: 'Abu Dhabi',
            address1: 'Bada Zayed Branch',
            address2: 'P.O. Box No. 58355, Western Region',
            address3: 'Abu Dhabi, UAE',
            title: 'null',
            payment_mode: 'null',
            no: '(02) 8844288',
            contact_person: 'Mr. Vijay Kumar',
            timing: '8AM-1PM & 4.30PM-9.30PM (Sat-Thu)\r\n8.30AM-11.30AM & 4PM-9.30PM(Fri)',
            status: 'Y',
          },
          {
            id: 216,
            type: 'UAEX',
            country: 'United Arab Emirates',
            state: '',
            city: 'Abu Dhabi',
            address1: 'Abu Dhabi Old Souk Branch, Al Sayegh',
            address2: 'Centre, Hamdan Street, P.O. Box No. 170',
            address3: 'Abu Dhabi, UAE',
            title: 'null',
            payment_mode: 'null',
            no: '(02) 6105666',
            contact_person: 'Ms. Bharathi / Ms. Elizabeth',
            timing: '8AM-10PM (Sat-Thu)\r\n9AM-11.30AM & 3.30PM-10PM (Friday)',
            status: 'Y',
          },
        ],
      },
    },
  },
};
const otpGenerationProps = {
  response: {
    data: {
      data: {
        attempt: 2,
      },
    },
  },
};
const otpVerificationProps = {
  response: {
    data: {
      data: {
        success: true,
      },
    },
  },
};
const otpGenerationErrorProps = {
  error: {
    response: {
      data: {
        code: 'OTP Generation Failed',
      },
    },
  },
};
const otpVerificationErrorProps = {
  error: {
    response: {
      data: {
        code: 'OTP Verification Failed',
      },
    },
  },
};
const verifiedMobileProps = {
  response: {
    data: {
      data: {
        lSH15375360: {
          details: {
            profileid: 'lSH15375360',
            mob_isd: '+91',
            mob_std: '',
            mobile: '6812297799',
            mobile_country: 'India',
            mobile_verified: 'Y',
            name: '',
            relation: '',
            tel_isd: '+1',
            tel_std: '',
            telephone: '',
            telephone_country: 'India',
            telephone_verified: 'N',
          },
        },
      },
    },
  },
};
const orderIdGenerationProps = {
  response: {
    data: {
      data: {
        status_code: 200,
        order_id: '11211',
      },
    },
  },
};
const orderIdGenerationWithoutSuccessCodeProps = {
  response: {
    data: {
      data: {
        status_code: 202,
        order_id: '11211',
      },
    },
  },
};
const orderIdGenerationErrorProps = {
  error: {
    response: {
      data: {
        code: 'Order Id Generation Failed',
      },
    },
  },
};
const orderIdGenerationWithoutCodeErrorProps = {
  error: {
    response: {
      data: {},
    },
  },
};
const theDefaultBankListState = {
  topBanks: [],
  otherBanks: [],
  loading: true,
};
const theDefaultDoorStepState = {
  frequentlyUsedCities: [],
  moreCities: [],
  loading: true,
};
const theDefaultShaadiCentersState = {
  cities: [],
  centers: [],
  loading: true,
};
const theDefaultUaeCitiesState = {
  cities: [],
  centers: [],
  loading: true,
};
const theDefaultOtpGenerationState = {
  attempt: 0,
  errorMsg: '',
  loading: true,
};
const theDefaultOtpVerificationState = {
  success: false,
  errorMsg: '',
  loading: true,
};
const theDefaultVerifiedMobileState = {
  isVerifiedMobile: false,
  mobile: '',
  country: '',
  countryCode: '',
};
const requestProps = {
  data: {
    cartData: {},
  },
};
const theDefaultOrderIdState = {
  id: '',
  errorMsg: '',
  loading: true,
};

const factory = {
  theDefaultState,
  theDefaultBankListState,
  theDefaultDoorStepState,
  theDefaultShaadiCentersState,
  theDefaultUaeCitiesState,
  theDefaultOtpGenerationState,
  theDefaultOtpVerificationState,
  theDefaultVerifiedMobileState,
  payloadProps,
  requestProps,
  bankListProps,
  doorStepProps,
  shaadiCentersProps,
  uaeCitiesProps,
  otpGenerationProps,
  otpVerificationProps,
  verifiedMobileProps,
  otpGenerationErrorProps,
  otpVerificationErrorProps,
  theDefaultOrderIdState,
  orderIdGenerationProps,
  orderIdGenerationErrorProps,
  orderIdGenerationWithoutCodeErrorProps,
  orderIdGenerationWithoutSuccessCodeProps,
};

it('should export theDefaultState, payloadProps, requestProps', () => {
  expect(Object.keys(factory).length).toEqual(24);
});

export default factory;
