const ProfileInfo = {
  '8SH66196208': {
    uid: '8SH66196208',
    himHer: 'Her',
    hisHer: 'Her',
    heShe: 'She',
    memberlogin: 'SH66196208',
    display_name: 'Simaran S',
    gender: 'female',
    age: '25yrs',
    height: '5\' 9"',
    mother_tongue: 'Hindi',
    is_nri: true,
    is_saarc: false,
    hidden_reason: 'self_deleted',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
    },
    photo_details: {
      photos: [
        {
          small: '/imgs/profiles/60-request-photo-f.gif',
          domain_name: 'https://img2.shaadi.com',
        },
      ],
      status: 'photo_request',
    },
    account: {
      memberlogin: 'GSH04028286',
      status: 'Active',
      is_premium: false,
      membership_tag: 'free',
      is_bold_listed: false,
      is_both_party_pay: false,
      is_hidden: false,
      membership: ['gold plus member'],
    },
    connect: {
      status: 'not_contacted',
      from: '8SH66196208',
      to: '5SH66196208',
      filtered: false,
      viewed: true,
      record_date: 20180202145951,
      viewed_date: 20180202151012,
    },
    career: {
      education: 'Masters - Commerce',
      profession: 'Company Secretary',
      annual_income: 'GBP 125K to 150K',
    },
    flags: {
      connectionStatus: 'theyContacted',
    },
    base: {
      profileInfo: [
        {
          key: 'info-0',
          label: 'Age / Height',
          value: `27 yrs, 5'6"`,
        },
        {
          key: 'info-1',
          label: 'mother_tongue',
          value: 'Hindi',
        },
        {
          key: 'info-2',
          label: 'location',
          value: 'Delhi',
        },
        {
          key: 'info-3',
          label: 'Profession',
          value: 'Doctor',
        },
      ],
    },
  },
  '8SH66196209': {
    uid: '8SH66196208',
    himHer: 'Her',
    hisHer: 'Her',
    heShe: 'She',
    memberlogin: 'SH66196208',
    display_name: 'Simaran S',
    gender: 'female',
    age: '25yrs',
    height: '5\' 9"',
    mother_tongue: 'Hindi',
    is_nri: true,
    is_saarc: false,
    hidden_reason: 'self_deleted',
    location: {
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
    },
    photo_details: {
      photos: [
        {
          small: '/imgs/profiles/60-request-photo-f.gif',
          domain_name: 'https://img2.shaadi.com',
        },
      ],
      status: 'photo_request',
    },
    account: {
      memberlogin: 'GSH04028286',
      status: 'Active',
      is_premium: false,
      membership_tag: 'free',
      is_bold_listed: false,
      is_both_party_pay: false,
      is_hidden: false,
      membership: ['gold plus member'],
    },
    connect: {
      status: 'not_contacted',
      from: '8SH66196208',
      to: '5SH66196208',
      filtered: false,
      viewed: true,
      record_date: 20180202145951,
      viewed_date: 20180202151012,
    },
    career: {
      education: 'Masters - Commerce',
      profession: 'Company Secretary',
      annual_income: 'GBP 125K to 150K',
    },
  },
};
const ItemInfo = {
  actionType: '',
  eoiClose: false,
  eoiLoadingStyle: 'none',
  justNow: false,
};
const listInfo = {
  data: [{ ...ItemInfo, uid: '8SH66196208' }, { ...ItemInfo, uid: '8SH66196209' }],
  request_count: 200,
  paginator: { key: 'abc' },
};
const response = {
  discovery_recent_visitors: listInfo,
  discovery_premium: listInfo,
  'recently-joined': listInfo,
};

export default {
  inbox: {
    meta: {
      counts: {
        total: {
          connect_pending: 2,
          connect_filtered: 1,
          connect_pending_new: 3,
          request_accepted: 4,
          request_pending: 6,
          connect_accepted: 7,
        },
      },
    },
  },
  profiles: {
    self: {
      gender: 'M',
      uid: 'SH12348765',
      name: 'Bhaat Daphak',
      photo: 'https://example.com/image.png',
    },
  },
  shaadiDashBoard: { results: response },
  session: { settings: {} },
  chat: { settings: {} },
  view: { topSpace: '' },
};
export { response, ProfileInfo };
it('factory', () => {});
