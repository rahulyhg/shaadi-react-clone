const items = {
  accepted: [
    {
      name: 'Japtej S',
      platform: 'mobile',
      thumbnail: 'https://img1.shaadi.com//2016/02/07/2SH20667572-742a21.jpg',
      uid: '4SH65544226',
    },
  ],
  matches: [
    {
      name: 'Jasandeep S',
      platform: 'web',
      thumbnail: 'https://img1.shaadi.com//2018/01/28/hSH46809942-21e8eb-male.webp',
      uid: '4SH65544227',
    },
  ],
  shortlisted: [
    {
      name: 'Jigar G',
      platform: 'mobile',
      uid: '4SH65544228',
    },
  ],
};

const profiles = {
  '4SH65544226': {
    flags: {
      albumStatus: true,
    },
    gender: 'Male',
    thumbnail: 'https://img1.shaadi.com//2017/12/29/uSH76103922-3386dd-male.webp',
    base: {
      detailList: [
        { key: 'age-height', value: `33, 5' 9"` },
        { key: 'religion-caste', value: 'Muslim, Sunni' },
        { key: 'profession', value: 'CxO / Chairman / Director / President' },
        { key: 'location', value: 'Kolhapur, India' },
      ],
    },
  },
  '4SH65544227': {
    flags: {
      albumStatus: true,
    },
    gender: 'Male',
    thumbnail: 'https://img1.shaadi.com//2018/01/28/hSH46809942-21e8eb-male.webp',
    base: {
      detailList: [
        { key: 'age-height', value: `33, 5' 9"` },
        { key: 'religion-caste', value: 'Muslim, Sunni' },
        { key: 'profession', value: 'CxO / Chairman / Director / President' },
        { key: 'location', value: 'Kolhapur, India' },
      ],
    },
  },
  '4SH65544228': {
    flags: {
      albumStatus: true,
    },
    gender: 'Male',
    thumbnail: 'https://img1.shaadi.com//2016/02/07/2SH20667572-742a21.jpg',
    base: {
      detailList: [
        { key: 'age-height', value: `33, 5' 9"` },
        { key: 'religion-caste', value: 'Muslim, Sunni' },
        { key: 'profession', value: 'CxO / Chairman / Director / President' },
        { key: 'location', value: 'Kolhapur, India' },
      ],
    },
  },
};

const props = {
  items,
  profiles,
  onChatInit: () => {},
};

export default props;
