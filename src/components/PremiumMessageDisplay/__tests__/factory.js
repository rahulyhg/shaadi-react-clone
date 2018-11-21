const props = {
  item: {
    connectMessages: [
      {
        message_id: 'connect-ISH79311668-kSH85654205-3657-6515-1539672595',
        message: 'Hello, I found your profile to be interesting and would like to connect with you. If you like my profile too',
        type: 'connect',
        media_url: '',
        fullDate: '16 Oct 2018',
        category: 'received',
      },
    ],
    contact: {
      profileid: 'ISH79311668',
      convenient_time: '',
      from_time_hours: 0,
      from_time_min: 0,
      last_update_date: 20180801164507,
      mobile_country: 'India',
      mobile_verified: 'Y',
      name: '',
      relation: '',
      telephone_country: 'India',
      telephone_verified: 'N',
      timezone: '',
      to_time_hours: 0,
      to_time_min: 0,
      contact_details_status: 'free_member',
      contact_details_title_status: 'hide_my_number',
      country_code: '+91',
      std_code: '',
      contact_number: '9989XXXXXX',
      email: '9989XXXXXX',
    },
  },
  profile: {
    name: 'Ankush M',
  },
  settings: {
    isBothPartyPayUser: true,
    isPaidUser: false,
  },
};

const factory = { props };

it('should export props for Premium Message Display', () => {
  expect(factory.props).not.toBeFalsy();
});

export default factory;
