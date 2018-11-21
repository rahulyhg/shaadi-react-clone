const items = [
  {
    lastMessage: 'Hello',
    lastMessageDate: '23/01/2018',
    lastMessageT: 1516716440000,
    name: 'Amit Hadwal',
    source: 'api',
    status: 'none',
    thumbnail: 'https://img1.shaadi.com//2017/04/04/4SH65544226-df6c18.jpg',
    uid: '4SH65544226',
    unreadCount: 0,
  },
];

const profiles = {
  '4SH65544226': {
    base: {
      detailList: [
        { key: 'age-height', value: `33, 5' 9"` },
        { key: 'religion-caste', value: 'Muslim, Sunni' },
        { key: 'profession', value: 'CxO / Chairman / Director / President' },
        { key: 'location', value: 'Kolhapur, India' },
      ],
    },
    flags: {
      albumStatus: 'default',
    },
  },
};

const props = {
  items,
  profiles,
  onChatInit: () => {},
};

export default props;
