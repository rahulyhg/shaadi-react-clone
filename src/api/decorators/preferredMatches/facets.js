const names = {
  mothertongue: 'Mother Tongue',
  countryofresidence: 'Country Living in',
  maritalstatus: 'Marital Status',
  stateofresidence: 'State Living in',
  nearest_city: 'City Living in',
  religion: 'Religion',
  caste: 'Community',
  loggerchatstatus: 'Available for chat',
  photostatus: 'Photo Settings',
  specialcases: 'Special cases',
  occupation: 'Working As',
  occupation_area: 'Profession Area',
  working_with: 'Working With',
  education: 'Education',
  residencystatus: 'Residency Status',
  smoke: 'Smoking',
  drink: 'Drinking',
  diet: 'Eating habits',
  bodytype: 'Body type',
  complexion: 'Complexion',
  annualincome: 'Annual Income',
  grew_up_in: 'Country Grew up in',
  relationship: 'Profile Created by',
  search_v3_relevance: 'Active Members',
  recently_joined: 'Recently Joined',
  manglik: 'Manglik / Chevvai Dosham',
  a_valid: 'Account Type',
  featured: 'Featured',
};

const sortOrder = {
  photostatus: 10,
  recently_joined: 12,
  search_v3_relevance: 14,
  annualincome: 20,
  maritalstatus: 30,
  religion: 40,
  caste: 50,
  mothertongue: 60,
  manglik: 70,
  countryofresidence: 80,
  stateofresidence: 90,
  nearest_city: 95,
  grew_up_in: 100,
  education: 110,
  working_with: 120,
  occupation_area: 130,
  relationship: 140,
  smoke: 150,
  drink: 160,
  diet: 170,
};

const translations = {
  photostatus: {
    visible: 'Visible to all',
    protected: 'Protected Photo',
  },
  recently_joined: {
    '1 Day': 'Within a day',
    '1 Week': 'Within a week',
    '1 Month': 'Within a month',
  },
  search_v3_relevance: {
    '1 Day': 'Within a day',
    '1 Week': 'Within a week',
    '1 Month': 'Within a month',
  },
  annualincome: {
    NA: null,
    na: null,
    null: null,
    undefined: null,
  },
};

const idRemap = {};

const t = (cat, field) => ((translations[cat] || translations)[field] === undefined ? field : (translations[cat] || translations)[field]);

const tId = (cat, field) => ((idRemap[cat] || idRemap)[field] === undefined ? field : (idRemap[cat] || idRemap)[field]);
const isRadio = {
  recently_joined: true,
  search_v3_relevance: true,
};

const displayFormat = {
  '0': { lower: 0, upper: 499 },
  '500': { lower: 500, upper: 799 },
  '1000': { lower: 800, upper: 999 },
  '2000': { lower: 1000, upper: 1999 },
  '5000': { lower: 2000, upper: 4999 },
  '10000': { lower: 5000, upper: 9999 },
  '25000': { lower: 10000, upper: 24999 },
  '50000': { lower: 25000, upper: 49999 },
  '75000': { lower: 50000, upper: 74999 },
  '100000': { lower: 75000, upper: 0 },
};

const readableNumber = n => {
  if (!n) {
    return '';
  }
  let displayValue = '';

  for (const key in displayFormat) {
    if (Object.prototype.hasOwnProperty.call(displayFormat, key)) {
      const obj = displayFormat[key];
      for (const prop in obj) {
        if (prop === 'upper' && n < obj[prop]) {
          displayValue = `${key}`;
          break;
        }
      }
      if (displayValue) {
        break;
      }
    }
  }

  if (displayValue === '0') {
    displayValue = n;
  }

  if (!displayValue) {
    displayValue = '100000';
  }

  if (displayValue > displayFormat['0'].upper) {
    displayValue = `${displayValue}+`;
  }
  return `${displayValue}`;
};

const option = (facetId, order, name, count, isSelected, vOrder, vGroup) => ({
  id: tId(facetId, name),
  label: t(facetId, name),
  count: readableNumber(count),
  isSelected: !!isSelected,
  order,
  vOrder: vOrder === undefined ? order : vOrder,
  vGroup: vGroup || null,
});

// eslint-disable-next-line prettier/prettier
const sortBy = (id, n, reverse) => (n + (id.charCodeAt(0) / 1000)) * (reverse ? -1 : 1);

const facet = (name, payload, criteria = []) => {
  const all = option(name, 0, 'All', null, criteria.length === 0);
  if (name === 'annualincome') {
    const counts = Object.keys(payload).reduce((acc, grp) => ({ ...acc, ...payload[grp] }), {});
    const orderedKeys = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    let v = 0;
    const opts = Object.keys(payload).reduce((acc, grp) => {
      Object.keys(payload[grp]).forEach(k => {
        v += 1;
        acc[k] = option(name, orderedKeys.indexOf(k) + 1, k, payload[grp][k], criteria.includes ? criteria.includes(k) : false, v, grp);
      });
      return acc;
    }, {});
    return {
      id: name,
      label: names[name],
      isMulti: !isRadio[name],
      isNested: false,
      options: [all].concat(orderedKeys.map(k => opts[k]).filter(o => o.label)),
    };
  }

  if (name === 'caste') {
    const selected = h => {
      if (!criteria.filter || !h) {
        return false;
      }
      return criteria.filter(c => c && c.caste === h.caste && c.religion === h.religion).length > 0;
    };
    return {
      id: name,
      label: names[name],
      isMulti: !isRadio[name],
      isNested: true,
      options: [all].concat(
        payload.sort((a, b) => sortBy(b.caste, b.count) - sortBy(a.caste, a.count)).map((h, i) => ({
          ...option(name, i + 1, h.caste, h.count, selected(h)),
          religion: h.religion,
        })),
      ),
    };
  }
  return {
    id: name,
    label: names[name],
    isMulti: !isRadio[name],
    isNested: false,
    options: [all].concat(
      Object.keys(payload)
        .sort((a, b) => (t(name, a) < t(name, b) ? -1 : t(name, a) > t(name, b) ? 1 : payload[a] - payload[b]))
        .map((k, i) => [k, i + 1])
        .sort(
          ([a, aOrder], [b, bOrder]) =>
            sortBy(b, ['manglik'].includes(name) ? bOrder : payload[b], ['recently_joined', 'search_v3_relevance'].includes(name)) -
            sortBy(a, ['manglik'].includes(name) ? aOrder : payload[a], ['recently_joined', 'search_v3_relevance'].includes(name)),
        )
        .map(([k, vOrder], i) =>
          option(
            name,
            i + 1,
            k,
            payload[k],
            criteria.includes ? criteria.includes(k) : false,
            ['recently_joined', 'search_v3_relevance'].includes(name) ? undefined : vOrder,
          ),
        )
        .filter(o => o.label),
    ),
  };
};

export default (payload = {}, criteria = {}) =>
  Object.keys(payload)
    .map(f => facet(f, payload[f], (criteria.operands || {})[f]))
    .filter(f => f.options.length > 1)
    .sort((a, b) => (sortOrder[a.id] || 1000) - (sortOrder[b.id] || 1000));
