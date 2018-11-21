/* eslint camelcase: 0 */

const theDefaultFacet = [
  {
    id: 'recentlyViewed',
    isMulti: false,
    title: 'Recently Viewed',
    options: [
      {
        id: 'Unviewed Matches',
        label: 'Unviewed Matches',
        title: 'Unviewed Matches',
        name: 'viewed',
        value: 'N',
        count: null,
        isSelected: true,
      },
      {
        id: 'Viewed Matches',
        label: 'Viewed Matches',
        title: 'Viewed Matches',
        name: 'viewed',
        value: 'Y',
        count: null,
        isSelected: false,
      },
    ],
  },
  {
    id: 'matches',
    isMulti: false,
    title: 'Matches',
    options: [
      { id: 'All', label: 'All', name: 'All', title: 'All', value: 'preferred', count: null, isSelected: true },
      {
        id: '2-way Matches',
        label: '2-way Matches',
        title: '2-way Matches',
        name: '2-way Matches',
        value: '2-way',
        count: null,
        isSelected: false,
      },
    ],
  },
];

const FA_photo_status = {
  id: 'photostatus',
  label: 'Photo Settings',
  isMulti: true,
  isNested: false,
  options: [
    {
      id: 'All',
      label: 'All',
      count: '',
      isSelected: true,
      order: 0,
      vOrder: 0,
      vGroup: null,
    },
    {
      id: 'visible',
      label: 'Visible to all',
      count: '4000+',
      isSelected: false,
      order: 1,
      vOrder: 1,
      vGroup: null,
    },
    {
      id: 'protected',
      label: 'Protected Photo',
      count: '380',
      isSelected: false,
      order: 2,
      vOrder: 2,
      vGroup: null,
    },
  ],
};

const EXP_photo_status = {
  count: null,
  selected: 'All',
  hasAllOption: true,
  id: 'photostatus',
  isMulti: true,
  label: '',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', name: 'All', title: 'All', value: 'All', vOrder: 0, vGroup: null },
    {
      count: '4000+',
      id: 'visible',
      isSelected: false,
      label: 'Visible to all',
      name: 'Visible to all',
      title: 'Visible to all',
      value: 'visible',
      vOrder: 1,
      vGroup: null,
    },
    {
      count: '380',
      id: 'protected',
      isSelected: false,
      label: 'Protected Phot...',
      name: 'Protected Photo',
      title: 'Protected Photo',
      value: 'protected',
      vOrder: 2,
      vGroup: null,
    },
  ],
  title: 'Photo Settings',
};

const FA_recently_joined = {
  id: 'recently_joined',
  label: 'Recently Joined',
  isMulti: false,
  isNested: false,
  options: [
    {
      id: 'All',
      label: 'All',
      count: '',
      isSelected: true,
      order: 0,
      vOrder: 0,
      vGroup: null,
    },
    {
      id: '1 Day',
      label: 'Within a day',
      count: '21',
      isSelected: false,
      order: 1,
      vOrder: 1,
      vGroup: null,
    },
    {
      id: '1 Week',
      label: 'Within a week',
      count: '126',
      isSelected: false,
      order: 2,
      vOrder: 2,
      vGroup: null,
    },
    {
      id: '1 Month',
      label: 'Within a month',
      count: '339',
      isSelected: false,
      order: 3,
      vOrder: 3,
      vGroup: null,
    },
  ],
};
const EXP_recently_joined = {
  selected: 'All',
  count: null,
  hasAllOption: true,
  id: 'recently_joined',
  isMulti: false,
  label: '',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', name: 'All', title: 'All', value: 'All', vOrder: 0, vGroup: null },
    {
      count: '21',
      id: '1 Day',
      isSelected: false,
      label: 'Within a day',
      name: 'Within a day',
      title: 'Within a day',
      value: '1 Day',
      vOrder: 1,
      vGroup: null,
    },
    {
      count: '126',
      id: '1 Week',
      isSelected: false,
      label: 'Within a week',
      name: 'Within a week',
      title: 'Within a week',
      value: '1 Week',
      vOrder: 2,
      vGroup: null,
    },
    {
      count: '339',
      id: '1 Month',
      isSelected: false,
      label: 'Within a month',
      name: 'Within a month',
      title: 'Within a month',
      value: '1 Month',
      vOrder: 3,
      vGroup: null,
    },
  ],
  title: 'Recently Joined',
};

const FA_search_v3 = {
  id: 'search_v3_relevance',
  label: 'Active Members',
  isMulti: false,
  isNested: false,
  options: [
    {
      id: 'All',
      label: 'All',
      count: '',
      isSelected: true,
      order: 0,
      vOrder: 0,
      vGroup: null,
    },
    {
      id: '1 Day',
      label: 'Within a day',
      count: '2000+',
      isSelected: false,
      order: 1,
      vOrder: 1,
      vGroup: null,
    },
    {
      id: '1 Week',
      label: 'Within a week',
      count: '3000+',
      isSelected: false,
      order: 2,
      vOrder: 2,
      vGroup: null,
    },
    {
      id: '1 Month',
      label: 'Within a month',
      count: '4000+',
      isSelected: false,
      order: 3,
      vOrder: 3,
      vGroup: null,
    },
  ],
};

const EXP_search_v3 = {
  selected: 'All',
  count: null,
  hasAllOption: true,
  id: 'search_v3_relevance',
  isMulti: false,
  label: '',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', name: 'All', title: 'All', value: 'All', vOrder: 0, vGroup: null },
    {
      count: '2000+',
      id: '1 Day',
      isSelected: false,
      label: 'Within a day',
      name: 'Within a day',
      title: 'Within a day',
      value: '1 Day',
      vOrder: 1,
      vGroup: null,
    },
    {
      count: '3000+',
      id: '1 Week',
      isSelected: false,
      label: 'Within a week',
      name: 'Within a week',
      title: 'Within a week',
      value: '1 Week',
      vOrder: 2,
      vGroup: null,
    },
    {
      count: '4000+',
      id: '1 Month',
      isSelected: false,
      label: 'Within a month',
      name: 'Within a month',
      title: 'Within a month',
      value: '1 Month',
      vOrder: 3,
      vGroup: null,
    },
  ],
  title: 'Active Members',
};

const FA_annual_income = {
  id: 'annualincome',
  label: 'Annual Income',
  isMulti: true,
  isNested: false,
  options: [
    {
      id: 'All',
      label: 'All',
      count: '',
      isSelected: true,
      order: 0,
      vOrder: 0,
      vGroup: null,
    },
    {
      id: 'INR 2 Lakh to 4 Lakh',
      label: 'INR 2 Lakh to 4 Lakh',
      count: '1000+',
      isSelected: false,
      order: 1,
      vOrder: 1,
      vGroup: 'INR',
    },
    {
      id: 'Dont want to specify',
      label: 'Dont want to specify',
      count: '500+',
      isSelected: false,
      order: 2,
      vOrder: 2,
      vGroup: 'Dont want to specify',
    },
    {
      id: 'Upto INR 2 Lakh',
      label: 'Upto INR 2 Lakh',
      count: '169',
      isSelected: false,
      order: 3,
      vOrder: 3,
      vGroup: 'INR',
    },
    {
      id: 'INR 4 Lakh & above',
      label: 'INR 4 Lakh & above',
      count: '13',
      isSelected: false,
      order: 4,
      vOrder: 4,
      vGroup: 'INR',
    },
  ],
};

const EXP_annual_income = {
  selected: 'All',
  count: null,
  hasAllOption: true,
  id: 'annualincome',
  isMulti: true,
  label: '',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', name: 'All', title: 'All', value: 'All', vOrder: 0, vGroup: null },
    {
      count: '1000+',
      id: 'INR 2 Lakh to 4 Lakh',
      isSelected: false,
      label: 'INR 2 Lakh to ...',
      name: 'INR 2 Lakh to 4 Lakh',
      title: 'INR 2 Lakh to 4 Lakh',
      value: 'INR 2 Lakh to 4 Lakh',
      vOrder: 1,
      vGroup: 'INR',
    },
    {
      count: '500+',
      id: 'Dont want to specify',
      isSelected: false,
      label: 'Dont want to s...',
      name: 'Dont want to specify',
      title: 'Dont want to specify',
      value: 'Dont want to specify',
      vOrder: 2,
      vGroup: 'Dont want to specify',
    },
    {
      count: '169',
      id: 'Upto INR 2 Lakh',
      isSelected: false,
      label: 'Upto INR 2 Lak...',
      name: 'Upto INR 2 Lakh',
      title: 'Upto INR 2 Lakh',
      value: 'Upto INR 2 Lakh',
      vOrder: 3,
      vGroup: 'INR',
    },
    {
      count: '13',
      id: 'INR 4 Lakh & above',
      isSelected: false,
      label: 'INR 4 Lakh & a...',
      name: 'INR 4 Lakh & above',
      title: 'INR 4 Lakh & above',
      value: 'INR 4 Lakh & above',
      vOrder: 4,
      vGroup: 'INR',
    },
  ],
  title: 'Annual Income',
};

const FA_marital_status = {
  id: 'maritalstatus',
  label: 'Marital Status',
  isMulti: true,
  isNested: false,
  options: [
    {
      id: 'All',
      label: 'All',
      count: '',
      isSelected: false,
      order: 0,
      vOrder: 0,
      vGroup: null,
    },
    {
      id: 'Never Married',
      label: 'Never Married',
      count: '5000+',
      isSelected: true,
      order: 1,
      vOrder: 1,
      vGroup: null,
    },
    {
      id: 'Divorced',
      label: 'Divorced',
      count: '500+',
      isSelected: false,
      order: 2,
      vOrder: 2,
      vGroup: null,
    },
    {
      id: 'Awaiting Divorce',
      label: 'Awaiting Divorce',
      count: '193',
      isSelected: false,
      order: 3,
      vOrder: 3,
      vGroup: null,
    },
    {
      id: 'Widowed',
      label: 'Widowed',
      count: '36',
      isSelected: false,
      order: 4,
      vOrder: 4,
      vGroup: null,
    },
    {
      id: 'Annulled',
      label: 'Annulled',
      count: '35',
      isSelected: false,
      order: 5,
      vOrder: 5,
      vGroup: null,
    },
  ],
};

const EXP_marital_status = {
  selected: 'Never Married',
  count: null,
  hasAllOption: true,
  id: 'maritalstatus',
  isMulti: true,
  label: '',
  options: [
    { count: '', id: 'All', isSelected: false, label: 'All', name: 'All', title: 'All', value: 'All', vOrder: 0, vGroup: null },
    {
      count: '5000+',
      id: 'Never Married',
      isSelected: true,
      label: 'Never Married',
      name: 'Never Married',
      title: 'Never Married',
      value: 'Never Married',
      vOrder: 1,
      vGroup: null,
    },
    {
      count: '500+',
      id: 'Divorced',
      isSelected: false,
      label: 'Divorced',
      name: 'Divorced',
      title: 'Divorced',
      value: 'Divorced',
      vOrder: 2,
      vGroup: null,
    },
    {
      count: '193',
      id: 'Awaiting Divorce',
      isSelected: false,
      label: 'Awaiting Divor...',
      name: 'Awaiting Divorce',
      title: 'Awaiting Divorce',
      value: 'Awaiting Divorce',
      vOrder: 3,
      vGroup: null,
    },
    {
      count: '36',
      id: 'Widowed',
      isSelected: false,
      label: 'Widowed',
      name: 'Widowed',
      title: 'Widowed',
      value: 'Widowed',
      vOrder: 4,
      vGroup: null,
    },
    {
      count: '35',
      id: 'Annulled',
      isSelected: false,
      label: 'Annulled',
      name: 'Annulled',
      title: 'Annulled',
      value: 'Annulled',
      vOrder: 5,
      vGroup: null,
    },
  ],
  title: 'Marital Status',
};

const FA_smoke = {
  id: 'smoke',
  label: 'Smoking',
  isMulti: true,
  isNested: false,
  options: [
    {
      id: 'All',
      label: 'All',
      count: '',
      isSelected: true,
      order: 0,
      vOrder: 0,
      vGroup: null,
    },
    {
      id: 'No',
      label: 'No',
      count: '5000+',
      isSelected: false,
      order: 1,
      vOrder: 1,
      vGroup: null,
    },
    {
      id: 'Occasionally',
      label: 'Occasionally',
      count: '144',
      isSelected: false,
      order: 2,
      vOrder: 2,
      vGroup: null,
    },
    {
      id: 'Yes',
      label: 'Yes',
      count: '65',
      isSelected: false,
      order: 3,
      vOrder: 3,
      vGroup: null,
    },
  ],
};

const EXP_smoke = {
  selected: 'All',
  count: null,
  hasAllOption: true,
  id: 'smoke',
  isMulti: true,
  label: '',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', name: 'All', title: 'All', value: 'All', vOrder: 0, vGroup: null },
    { count: '5000+', id: 'No', isSelected: false, label: 'No', name: 'No', title: 'No', value: 'No', vOrder: 1, vGroup: null },
    {
      count: '144',
      id: 'Occasionally',
      isSelected: false,
      label: 'Occasionally',
      name: 'Occasionally',
      title: 'Occasionally',
      value: 'Occasionally',
      vOrder: 2,
      vGroup: null,
    },
    { count: '65', id: 'Yes', isSelected: false, label: 'Yes', name: 'Yes', title: 'Yes', value: 'Yes', vOrder: 3, vGroup: null },
  ],
  title: 'Smoking',
};

const FA_drink = {
  id: 'drink',
  label: 'Drinking',
  isMulti: true,
  isNested: false,
  options: [
    {
      id: 'All',
      label: 'All',
      count: '',
      isSelected: true,
      order: 0,
      vOrder: 0,
      vGroup: null,
    },
    {
      id: 'No',
      label: 'No',
      count: '4000+',
      isSelected: false,
      order: 1,
      vOrder: 1,
      vGroup: null,
    },
    {
      id: 'Occasionally',
      label: 'Occasionally',
      count: '500+',
      isSelected: false,
      order: 2,
      vOrder: 2,
      vGroup: null,
    },
    {
      id: 'Yes',
      label: 'Yes',
      count: '42',
      isSelected: false,
      order: 3,
      vOrder: 3,
      vGroup: null,
    },
  ],
};

const EXP_drink = {
  count: null,
  hasAllOption: true,
  id: 'drink',
  isMulti: true,
  selected: 'All',
  label: '',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', name: 'All', title: 'All', value: 'All', vOrder: 0, vGroup: null },
    { count: '4000+', id: 'No', isSelected: false, label: 'No', name: 'No', title: 'No', value: 'No', vOrder: 1, vGroup: null },
    {
      count: '500+',
      id: 'Occasionally',
      isSelected: false,
      label: 'Occasionally',
      name: 'Occasionally',
      title: 'Occasionally',
      value: 'Occasionally',
      vOrder: 2,
      vGroup: null,
    },
    { count: '42', id: 'Yes', isSelected: false, label: 'Yes', name: 'Yes', title: 'Yes', value: 'Yes', vOrder: 3, vGroup: null },
  ],
  title: 'Drinking',
};

const FA_diet = {
  id: 'diet',
  label: 'Eating habits',
  isMulti: true,
  isNested: false,
  options: [
    {
      id: 'All',
      label: 'All',
      count: '',
      isSelected: true,
      order: 0,
      vOrder: 0,
      vGroup: null,
    },
    {
      id: 'Veg',
      label: 'Veg',
      count: '4000+',
      isSelected: false,
      order: 1,
      vOrder: 1,
      vGroup: null,
    },
    {
      id: 'Occasionally Non-Veg',
      label: 'Occasionally Non-Veg',
      count: '447',
      isSelected: false,
      order: 2,
      vOrder: 2,
      vGroup: null,
    },
    {
      id: 'Eggetarian',
      label: 'Eggetarian',
      count: '258',
      isSelected: false,
      order: 3,
      vOrder: 3,
      vGroup: null,
    },
    {
      id: 'Non-Veg',
      label: 'Non-Veg',
      count: '234',
      isSelected: false,
      order: 4,
      vOrder: 4,
      vGroup: null,
    },
    {
      id: 'Jain',
      label: 'Jain',
      count: '14',
      isSelected: false,
      order: 5,
      vOrder: 5,
      vGroup: null,
    },
    {
      id: 'Vegan',
      label: 'Vegan',
      count: '11',
      isSelected: false,
      order: 6,
      vOrder: 6,
      vGroup: null,
    },
  ],
};

const EXP_diet = {
  selected: 'All',
  count: null,
  hasAllOption: true,
  id: 'diet',
  isMulti: true,
  label: '',
  options: [
    { count: '', id: 'All', isSelected: true, label: 'All', name: 'All', title: 'All', value: 'All', vOrder: 0, vGroup: null },
    { count: '4000+', id: 'Veg', isSelected: false, label: 'Veg', name: 'Veg', title: 'Veg', value: 'Veg', vOrder: 1, vGroup: null },
    {
      count: '447',
      id: 'Occasionally Non-Veg',
      isSelected: false,
      label: 'Occasionally N...',
      name: 'Occasionally Non-Veg',
      title: 'Occasionally Non-Veg',
      value: 'Occasionally Non-Veg',
      vOrder: 2,
      vGroup: null,
    },
    {
      count: '258',
      id: 'Eggetarian',
      isSelected: false,
      label: 'Eggetarian',
      name: 'Eggetarian',
      title: 'Eggetarian',
      value: 'Eggetarian',
      vOrder: 3,
      vGroup: null,
    },
    {
      count: '234',
      id: 'Non-Veg',
      isSelected: false,
      label: 'Non-Veg',
      name: 'Non-Veg',
      title: 'Non-Veg',
      value: 'Non-Veg',
      vOrder: 4,
      vGroup: null,
    },
    { count: '14', id: 'Jain', isSelected: false, label: 'Jain', name: 'Jain', title: 'Jain', value: 'Jain', vOrder: 5, vGroup: null },
    { count: '11', id: 'Vegan', isSelected: false, label: 'Vegan', name: 'Vegan', title: 'Vegan', value: 'Vegan', vOrder: 6, vGroup: null },
  ],
  title: 'Eating habits',
};

const createProfileSuccessAction = payload => ({
  type: 'PREFERRED_SEARCH_SUCCESS',
  payload: {
    profiles: payload.profiles || [],
    meta: payload.meta || {},
    facets: payload.facets || [],
    permalink: payload.permalink || '/search/partner',
  },
});

const factory = {
  theDefaultFacet,
  createProfileSuccessAction,
  FA_diet,
  FA_drink,
  FA_smoke,
  FA_marital_status,
  FA_annual_income,
  FA_search_v3,
  FA_recently_joined,
  FA_photo_status,
  EXP_diet,
  EXP_drink,
  EXP_smoke,
  EXP_marital_status,
  EXP_annual_income,
  EXP_search_v3,
  EXP_recently_joined,
  EXP_photo_status,
};

it('should export profiles and props', () => {
  expect(Object.keys(factory).length).toEqual(18);
});

export default factory;
