const orderDetails = {
  orderSuccess: {
    order_status: 'Received',
    order_id: '152222237468',
    mode_of_payment: 'Cash at ICICI Bank',
    shaadi_care_amount: '20',
    crm_no: '1860-200-3456',
    product: 'Gold',
    duration: '3 months',
    amount: '3,802',
    currency: 'INR',
    contact_details: '+91-7854154165',
    sub_text: "Your order id is '152222237468', We will activate your order within 2 days of your payment.",
    sub_sections: [],
    order_details: [],
    loading: false,
    errorMsg: '',
  },
  wwwBaseUrl: 'www.shaadi.com',
};

const payAtBanknotes = {
  sub_sections: [
    {
      title: 'Complete your payment at ICICI Bank',
      details: [
        {
          label: '',
          text:
            'Visit any ICICI Bank Branch, fill up the Cash Depost Slip and submit it at the Cash Counter. Make sure you have filled the following information in the slip.',
        },
        {
          label: 'Account Name',
          text: 'People Interactive (I) Pvt. Ltd',
        },
        {
          label: 'Account Number',
          text: '041405001516',
        },
        {
          label: 'Payable Amount',
          text: '3,782',
        },
        {
          label: 'Order Id',
          text: '152316979153',
        },
        {
          label: 'Profile ID',
          text: 'SH27475068',
        },
      ],
    },
  ],
};

const shaadiCentreNotes = {
  sub_sections: [
    {
      title: 'Visit The Shaadi Centre',
      details: [
        {
          label: '',
          text:
            'Ground floor , 99  Niranjan building, Opp Parsi Gym Khana  Near Marine lines Railway Station Marine Line (west)  Mumbai - 400002',
        },
        {
          label: 'Contact Person',
          text: 'Swapnil Bhuwad',
        },
        {
          label: 'Payable Amount',
          text: '3,782',
        },
        {
          label: 'Contact Number',
          text: '+91 - 7715885665 / 8779561848 ',
        },
      ],
    },
    {
      title: 'How To Pay at Shaadi Centre',
      details: [
        {
          text:
            'Orders paid by Cash or Credit Card will be activated instantly. All other payments will be activated within 2 days of clearance.',
        },
        {
          text: 'In favour of : People Interactive (I) Pvt. Ltd., Payable at : Mumbai',
        },
        {
          text: 'Please mention your Profile ID "SH27475068" and Order ID "151809078175" on the reverse side of the Cheque / Demand Draft',
        },
      ],
    },
  ],
};

const factory = {
  orderDetails,
  payAtBanknotes,
  shaadiCentreNotes,
};

it('should export order props', () => {
  expect(factory.orderDetails).not.toBeFalsy();
  expect(factory.payAtBanknotes).not.toBeFalsy();
  expect(factory.shaadiCentreNotes).not.toBeFalsy();
});

export default factory;
