/* eslint-disable camelcase, max-len */

const F_PAY_drink = { No: 29, Occasionally: 1 };
const F_EXP_drink = {
  id: 'drink',
  label: 'Drinking',
  isMulti: true,
  isNested: false,
  options: [
    { id: 'All', label: 'All', count: '', isSelected: true, order: 0, vOrder: 0, vGroup: null },
    { id: 'No', label: 'No', count: '29', isSelected: false, order: 1, vOrder: 1, vGroup: null },
    { id: 'Occasionally', label: 'Occasionally', count: '1', isSelected: false, order: 2, vOrder: 2, vGroup: null },
  ],
};

const F_PAY_caste = [
  { religion: 'Hindu', caste: 'Scheduled Caste (SC)', count: 27 },
  { religion: 'Hindu', caste: 'Kshatriya', count: 27 },
  { religion: 'Hindu', caste: 'Thakur', count: 24 },
  { religion: 'Hindu', caste: 'Other', count: 20 },
  { religion: 'Hindu', caste: 'Agarwal', count: 16 },
  { religion: 'Hindu', caste: 'Kashyap', count: 13 },
  { religion: 'Hindu', caste: 'Vishwakarma', count: 11 },
  { religion: 'Hindu', caste: 'Baniya', count: 11 },
  { religion: 'Hindu', caste: 'Valmiki', count: 9 },
  { religion: 'Hindu', caste: 'Nai', count: 9 },
];

const F_CRI_caste = [
  { religion: 'Hindu', caste: 'Agarwal' },
  { religion: 'Hindu', caste: 'Baniya' },
  { religion: 'Hindu', caste: 'Barnwal' },
];

const F_EXP_caste = {
  id: 'caste',
  isMulti: true,
  isNested: true,
  label: 'Community',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', order: 0, vOrder: 0, vGroup: null },
    {
      count: '27',
      id: 'Scheduled Caste (SC)',
      isSelected: false,
      label: 'Scheduled Caste (SC)',
      order: 1,
      vOrder: 1,
      vGroup: null,
      religion: 'Hindu',
    },
    { count: '27', id: 'Kshatriya', isSelected: false, label: 'Kshatriya', order: 2, vOrder: 2, vGroup: null, religion: 'Hindu' },
    { count: '24', id: 'Thakur', isSelected: false, label: 'Thakur', order: 3, vOrder: 3, vGroup: null, religion: 'Hindu' },
    { count: '20', id: 'Other', isSelected: false, label: 'Other', order: 4, vOrder: 4, vGroup: null, religion: 'Hindu' },
    { count: '16', id: 'Agarwal', isSelected: false, label: 'Agarwal', order: 5, vOrder: 5, vGroup: null, religion: 'Hindu' },
    { count: '13', id: 'Kashyap', isSelected: false, label: 'Kashyap', order: 6, vOrder: 6, vGroup: null, religion: 'Hindu' },
    { count: '11', id: 'Vishwakarma', isSelected: false, label: 'Vishwakarma', order: 7, vOrder: 7, vGroup: null, religion: 'Hindu' },
    { count: '11', id: 'Baniya', isSelected: false, label: 'Baniya', order: 8, vOrder: 8, vGroup: null, religion: 'Hindu' },
    { count: '9', id: 'Valmiki', isSelected: false, label: 'Valmiki', order: 9, vOrder: 9, vGroup: null, religion: 'Hindu' },
    { count: '9', id: 'Nai', isSelected: false, label: 'Nai', order: 10, vOrder: 10, vGroup: null, religion: 'Hindu' },
  ],
};

const F_PAY_annualincome = {
  INR: {
    'Upto INR 1 L': 58,
    'INR 1 L to 2 L': 32,
    'INR 2 L to 4 L': 26,
    'INR 4 L to 7 L': 12,
    'INR 7 L to 10 L': 8,
    'INR 10 L to 15 L': 2,
    'INR 15 L to 20 L': 1,
  },
  USD: {
    'Upto USD 40K': 1,
    'USD 60K to 80K': 2,
    'USD 80K to 100K': 1,
    'USD 100K to 125K': 1,
    'USD 125K to 150K': 1,
    'USD 250K to 350K': 1,
  },
  'Dont want': { 'Dont want': 30 },
};

const F_CRI_annualincome = ['Upto INR 1 L', 'INR 1 L to 2 L', 'INR 2 L to 4 L', 'Dont want'];

const F_EXP_annualincome = {
  id: 'annualincome',
  isMulti: true,
  isNested: false,
  label: 'Annual Income',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', order: 0, vGroup: null, vOrder: 0 },
    { count: '58', id: 'Upto INR 1 L', isSelected: false, label: 'Upto INR 1 L', order: 1, vGroup: 'INR', vOrder: 1 },
    { count: '32', id: 'INR 1 L to 2 L', isSelected: false, label: 'INR 1 L to 2 L', order: 2, vGroup: 'INR', vOrder: 2 },
    { count: '30', id: 'Dont want', isSelected: false, label: 'Dont want', order: 3, vGroup: 'Dont want', vOrder: 14 },
    { count: '26', id: 'INR 2 L to 4 L', isSelected: false, label: 'INR 2 L to 4 L', order: 4, vGroup: 'INR', vOrder: 3 },
    { count: '12', id: 'INR 4 L to 7 L', isSelected: false, label: 'INR 4 L to 7 L', order: 5, vGroup: 'INR', vOrder: 4 },
    { count: '8', id: 'INR 7 L to 10 L', isSelected: false, label: 'INR 7 L to 10 L', order: 6, vGroup: 'INR', vOrder: 5 },
    { count: '2', id: 'USD 60K to 80K', isSelected: false, label: 'USD 60K to 80K', order: 7, vGroup: 'USD', vOrder: 9 },
    { count: '2', id: 'INR 10 L to 15 L', isSelected: false, label: 'INR 10 L to 15 L', order: 8, vGroup: 'INR', vOrder: 6 },
    { count: '1', id: 'INR 15 L to 20 L', isSelected: false, label: 'INR 15 L to 20 L', order: 9, vGroup: 'INR', vOrder: 7 },
    { count: '1', id: 'USD 80K to 100K', isSelected: false, label: 'USD 80K to 100K', order: 10, vGroup: 'USD', vOrder: 10 },
    { count: '1', id: 'USD 100K to 125K', isSelected: false, label: 'USD 100K to 125K', order: 11, vGroup: 'USD', vOrder: 11 },
    { count: '1', id: 'USD 125K to 150K', isSelected: false, label: 'USD 125K to 150K', order: 12, vGroup: 'USD', vOrder: 12 },
    { count: '1', id: 'USD 250K to 350K', isSelected: false, label: 'USD 250K to 350K', order: 13, vGroup: 'USD', vOrder: 13 },
    { count: '1', id: 'Upto USD 40K', isSelected: false, label: 'Upto USD 40K', order: 14, vGroup: 'USD', vOrder: 8 },
  ],
};

const F_PAY_manglik = { No: 10, "Don't Know": 28 };

const F_EXP_manglik = {
  id: 'manglik',
  label: 'Manglik / Chevvai Dosham',
  isMulti: true,
  isNested: false,
  options: [
    { id: 'All', label: 'All', count: '', isSelected: true, order: 0, vOrder: 0, vGroup: null },
    { id: 'No', label: 'No', count: '10', isSelected: false, order: 1, vOrder: 2, vGroup: null },
    { id: "Don't Know", label: "Don't Know", count: '28', isSelected: false, order: 2, vOrder: 1, vGroup: null },
  ],
};

const F_PAY_recently_joined = { '1 Day': 1, '1 Week': 4, '1 Month': 15 };
const F_EXP_recently_joined = {
  id: 'recently_joined',
  label: 'Recently Joined',
  isMulti: false,
  isNested: false,
  options: [
    { id: 'All', label: 'All', count: '', isSelected: true, order: 0, vOrder: 0, vGroup: null },
    { id: '1 Day', label: 'Within a day', count: '1', isSelected: false, order: 1, vOrder: 1, vGroup: null },
    { id: '1 Week', label: 'Within a week', count: '4', isSelected: false, order: 2, vOrder: 2, vGroup: null },
    { id: '1 Month', label: 'Within a month', count: '15', isSelected: false, order: 3, vOrder: 3, vGroup: null },
  ],
};

const factory = {
  F_PAY_drink,
  F_EXP_drink,
  F_PAY_caste,
  F_CRI_caste,
  F_EXP_caste,
  F_PAY_annualincome,
  F_EXP_annualincome,
  F_CRI_annualincome,
  F_PAY_manglik,
  F_EXP_manglik,
  F_PAY_recently_joined,
  F_EXP_recently_joined,
};

it('should export profiles and props', () => {
  expect(Object.keys(factory).length).toEqual(12);
});

export default factory;
