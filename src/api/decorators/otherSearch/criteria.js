/* eslint camelcase: 0 */
const baseValue = {};

const inchesToFeet = inches => `${Math.floor(inches / 12)}ft ${Math.round(inches % 12)}in`;
const inchesToCm = inches => `${Math.floor(inches * 2.54)}`;
const uniq = a => a.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
const extract = (hash, key, def) => (hash[key] && !['null', 'undefined'].includes(hash[key]) ? hash[key] : def || null);

const mapForPhotostatus = arr =>
  arr && uniq(arr.filter(item => Object.keys(PhotoStatusValues).indexOf(item) >= 0).map(item => PhotoStatusValues[item]));

const mapForYesNo = { Y: 'Yes', N: 'No', None: 'No' };

const mapForEducation = arr => arr && uniq(arr.map(item => item.split(' -')[0]).filter(item => item && item !== '-')).sort();

const ucFirst = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const PhotoStatusValues = {
  visible: 'Visible to all',
  protected: 'Protected Photo',
};

const takeFromOperands = str => str.operands || str;

export default (baseline = baseValue, search = {}, criteria = {}) => {
  const userCriteria = criteria.operands;
  const searchCriteria = {};
  const annualincome = userCriteria.annualincome || [];
  const processedAnnualIncome = {};
  annualincome.map(item => { // eslint-disable-line
    const curr = item
      .replace('Above ', '')
      .replace('Upto ', '')
      .replace('Dont want to specify', '')
      .split(' ')[0];
    if (!processedAnnualIncome[curr]) {
      processedAnnualIncome[curr] = [];
    }
    processedAnnualIncome[curr].push(item);
  });

  let hasUpto = '';
  let hasAbove = '';
  let finalMap = [];

  Object.keys(processedAnnualIncome).map(item => { // eslint-disable-line
    hasUpto = '';
    hasAbove = '';
    finalMap = [];
    processedAnnualIncome[item].map(i => { // eslint-disable-line
      hasAbove = (i.toLowerCase().indexOf('above') >= 0 && i) || hasAbove;
      hasUpto = (i.toLowerCase().indexOf('upto') >= 0 && i) || hasUpto;
    });
    hasUpto = hasUpto.replace(`Upto ${item} `, '').replace('K', ',000');
    hasAbove = hasAbove
      .replace(' & above', '')
      .replace('Above ', '')
      .replace(`${item} `, '')
      .replace('K', ',000');
    if (hasUpto && hasAbove) {
      finalMap.push(`${item} less than ${hasUpto}`);
      finalMap.push(`greater than ${hasAbove}`);
    } else if (hasUpto) {
      hasUpto = processedAnnualIncome[item]
        .pop()
        .split(' ')
        .pop()
        .replace('K', ',000');
      finalMap.push(`Upto ${item} ${hasUpto}`);
    } else if (hasAbove) {
      hasAbove = processedAnnualIncome[item][0]
        .replace(`${item} `, '')
        .split(' ')[0]
        .replace('K', ',000');
      finalMap.push(`Above ${item} ${hasAbove}`);
    } else if (item) {
      hasAbove = processedAnnualIncome[item][0]
        .replace(`${item} `, '')
        .split(' ')[0]
        .replace('K', ',000');
      hasUpto = processedAnnualIncome[item]
        .pop()
        .split(' ')
        .pop()
        .replace('K', ',000');
      finalMap.push(`${item} ${hasAbove}`);
      finalMap.push(`${item} ${hasUpto}`);
    } else {
      finalMap = processedAnnualIncome[item];
    }
    processedAnnualIncome[item] = (finalMap[1] && `${finalMap[0]} to ${finalMap[1]}`) || finalMap[0];
  });

  const CasteNoBar = extract(userCriteria, 'caste_no_bar', 'No')[0];

  const matchCount = {
    key: 'searchfor-count',
    term: 'count',
    value: `${search.count} profiles found : `,
  };

  const gender = {
    key: 'searchfor-gender',
    term: 'Gender',
    value: extract(userCriteria, 'gender', [])[0],
  };

  let astro = {};
  if (search.search_type === 'astrology_search') {
    astro = {
      key: 'searchfor-astro',
      term: 'Matches score on',
      value: `${ucFirst(extract(userCriteria, 'ashta_dasha', []))} Search`,
    };
  }

  const photostatus = {
    key: 'searchfor-photostatus',
    term: 'Photo Settings',
    value: mapForPhotostatus(extract(userCriteria, 'photostatus', [])).join(', '),
  };

  const astroProfile = {
    key: 'searchfor-astroProfile',
    term: 'Astro data',
    value: mapForYesNo[extract(userCriteria, 'astroprofile', [])[0]],
  };

  const age = {
    key: 'searchfor-age',
    term: 'Age',
    value: takeFromOperands(extract(userCriteria, 'age', [])).join(' - '),
  };

  const height = {
    key: 'searchfor-height',
    term: 'Height',
    value: takeFromOperands(extract(userCriteria, 'height', []))
      .map(p => `${inchesToFeet(p)} - ${inchesToCm(p)}`)
      .join(' to '),
  };

  let caste = {
    key: 'searchfor-caste',
    term: 'Religion / Community',
    value: extract(userCriteria, 'caste', [])
      .filter(p => p !== null && p !== undefined)
      .map(p => {
        if (p.religion && p.religion.toLowerCase() !== p.caste.toLowerCase()) {
          return `${p.religion}:${p.caste}`;
        }
        return p.caste;
      })
      .join(', '),
  };

  if (!caste.value.length) {
    caste = {
      key: 'searchfor-caste',
      term: 'Religion / Community',
      value: extract(userCriteria, 'religion', []).join(', '),
    };
  }

  if (CasteNoBar === 'Yes') {
    caste.value += ', (Caste No Bar)';
  }

  const Education = {
    key: 'searchfor-education',
    term: 'Education',
    value: mapForEducation(extract(userCriteria, 'education', [])).join(', '),
  };

  const WorkingWith = {
    key: 'searchfor-working',
    term: 'Working With',
    value: takeFromOperands(extract(userCriteria, 'working_with', [])).join(', '),
  };

  const occupationArea = {
    key: 'searchfor-occupationarea',
    term: 'Profession Area',
    value: extract(userCriteria, 'occupation_area', []).join(', '),
  };

  const WorkingAs = {
    key: 'searchfor-workingAs',
    term: 'Working As',
    value: extract(userCriteria, 'occupation', []).join(', '),
  };

  const annualIncome = {
    key: 'searchfor-annualIncome',
    term: 'Annual Income',
    value:
      (processedAnnualIncome &&
        Object.keys(processedAnnualIncome)
          .reduce((acc, k) => `${acc + processedAnnualIncome[k]},`, '')
          .slice(0, -1)) ||
      '',
  };

  const marital_status = {
    key: 'searchfor-maritalStatus',
    term: 'Marital Status',
    value: extract(userCriteria, 'maritalstatus', []).join(', '),
  };

  const children = {
    key: 'searchfor-children',
    term: 'Have Children',
    value: extract(userCriteria, 'children', []).join(', '),
  };

  const country = {
    key: 'searchfor-country',
    term: 'Country Living in',
    value: extract(userCriteria, 'countryofresidence', []).join(', '),
  };

  const state = {
    key: 'searchfor-state',
    term: 'State Living in',
    value: extract(userCriteria, 'stateofresidence', []).join(', '),
  };

  const city = {
    key: 'searchfor-city',
    term: 'City',
    value: extract(userCriteria, 'nearest_city', []).join(', '),
  };

  const residencyStatus = {
    key: 'searchfor-residencyStatus',
    term: 'Residency Status',
    value: extract(userCriteria, 'residencystatus', []).join(', '),
  };

  const complextion = {
    key: 'searchfor-complextion',
    term: 'Skin Tone',
    value: extract(userCriteria, 'complexion', []).join(', '),
  };

  const body_type = {
    key: 'searchfor-bodytype',
    term: 'Body Type',
    value: extract(userCriteria, 'bodytype', []).join(', '),
  };

  const smoke = {
    key: 'searchfor-smoke',
    term: 'Smoke',
    value: extract(userCriteria, 'smoke', []).join(' / '),
  };

  const drink = {
    key: 'searchfor-drink',
    term: 'Drink',
    value: extract(userCriteria, 'drink', []).join(' / '),
  };

  const diet = {
    key: 'searchfor-diet',
    term: 'Diet',
    value: extract(userCriteria, 'diet', []).join(', '),
  };

  const mother_tongue = {
    key: 'searchfor-motherTongue',
    term: 'Mother Tongue',
    value: extract(userCriteria, 'mothertongue', []).join(', '),
  };

  const specialCases = {
    key: 'searchfor-specialCases',
    term: 'Special Cases',
    value: extract(userCriteria, 'specialcases', []).join(', '),
  };

  specialCases.value = mapForYesNo[specialCases.value] || specialCases.value;

  const keyword = {
    key: 'searchfor-keyword',
    term: 'Keyword',
    value: extract(userCriteria, 'alltext_otherinfo', []).join(', '),
  };

  const ignoredProfiles =
    extract(userCriteria, 'ignored', [])[0] === 'N'
      ? extract(userCriteria, 'viewed', [])[0] === 'N' ? 'Profiles that I have already Viewed and Ignored' : 'Profiles that I have Ignored'
      : 'Profiles that I have Ignored';
  const filteroutProfiles = extract(userCriteria, 'isFilteredMember', [])[0] === 'N' ? 'Profiles that have Filtered me out,' : '';
  const doNotShowProfiles = {
    key: 'searchfor-doNotShowProfiles',
    term: 'Do Not Show',
    value: [filteroutProfiles, ignoredProfiles].join(''),
  };

  const postedBy = {
    key: 'searchfor-postedBy',
    term: 'Posted By',
    value: extract(userCriteria, 'relationship', []).join(', '),
  };

  const grewup_in = {
    key: 'searchfor-grewupIn',
    term: 'Country Grew up in',
    value: extract(userCriteria, 'grew_up_in', []).join(', '),
  };

  const gothra = {
    key: 'searchfor-gothra',
    term: 'Gothra/ Gothram',
    value: (userCriteria.gotra && "Don't include my Gothra") || '',
  };

  const accType = {
    key: 'searchfor-accType',
    term: 'Account Type',
    value: `Doesn't Matter`,
  };

  searchCriteria.items = [
    matchCount,
    gender,
    astro,
    photostatus,
    astroProfile,
    age,
    height,
    caste,
    Education,
    WorkingWith,
    occupationArea,
    WorkingAs,
    annualIncome,
    marital_status,
    children,
    country,
    gothra,
    state,
    city,
    residencyStatus,
    complextion,
    body_type,
    smoke,
    drink,
    diet,
    mother_tongue,
    specialCases,
    keyword,
    doNotShowProfiles,
    postedBy,
    grewup_in,
    accType,
  ];

  return searchCriteria;
};
