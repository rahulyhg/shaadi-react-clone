/* eslint camelcase: 0 */
import { inchesToFeet, inchesToCm } from '../../utils';

const extract = (hash, key, def) => (hash[key] && !['null', 'undefined'].includes(hash[key]) ? hash[key] : def || null);
const uniq = a => a.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
const mapForEducation = arr =>
  arr && uniq(arr.filter(item => Object.keys(EducationsValues).indexOf(item) >= 0).map(item => EducationsValues[item]));
const mapForDiet = arr => arr && uniq(arr.filter(item => Object.keys(DietValues).indexOf(item) >= 0).map(item => DietValues[item]));
const mapForSkinTone = arr =>
  arr && uniq(arr.filter(item => Object.keys(SkinToneValues).indexOf(item) >= 0).map(item => SkinToneValues[item]));

const EducationsValues = {
  Doctorate: 'Doctorate',
  Masters: 'Masters',
  Bachelors: 'Bachelors / Undergraduate',
  'Associates degree': 'Associate Degree / Diploma',
  Diploma: 'Associate Degree / Diploma',
  Undergraduate: 'Bachelors / Undergraduate',
  'High School': 'High School',
  'Less than high school': 'High school and below',
};

const smokeMaster = {
  No: "Don't include profiles who smoke",
};

const drinksMaster = {
  No: 'Never Drinks',
  Occasionally: 'Drinks Occasionally',
};

const DietValues = {
  Veg: 'Veg',
  'Non-Veg': 'Non-Veg',
  'Occasionally Non-Veg': 'Non-Veg',
  Eggetarian: 'Include profiles who are Eggetarian',
  Jain: 'Jain',
  Vegan: 'Vegan',
};

const SkinToneValues = {
  'Very Fair': 'Fair',
  Fair: 'Fair',
  Wheatish: 'Wheatish',
  'Wheatish Medium': 'Wheatish',
  'Wheatish Brown': 'Wheatish',
  Dark: 'Dark',
};

export default (score, extra) => {
  const preferencesMatch = score.partner;
  const userPreferences = extra.preferences.partner;
  const filteredPreferences = ['age', 'height', ...Object.keys(userPreferences).filter(p => userPreferences[p] !== 'null')];
  const preferences = {};
  const m_status = userPreferences.marital_status;
  const includeChildren = !(m_status && m_status.length === 1 && m_status.indexOf('Never Married') !== -1);
  const age = {
    key: 'preference-age',
    preferenceKey: 'age',
    term: 'Age',
    desc: `${userPreferences.age_from} to ${userPreferences.age_to}`,
    isMatch: !!preferencesMatch.age,
  };
  const height = {
    key: 'preference-height',
    preferenceKey: 'height',
    term: 'Height',
    desc: `${inchesToFeet(userPreferences.height_from)}(${inchesToCm(userPreferences.height_from)}cm) to ${inchesToFeet(
      userPreferences.height_to,
    )}(${inchesToCm(userPreferences.height_to)}cm)`,
    isMatch: !!preferencesMatch.height,
  };
  const marital_status = {
    key: 'preference-maritalStatus',
    preferenceKey: 'marital_status',
    term: 'Marital Status',
    desc: extract(userPreferences, 'marital_status', []).join(', '),
    isMatch: !!preferencesMatch.marital_status,
  };
  const manglik = {
    key: 'preference-manglik',
    preferenceKey: 'manglik',
    term: 'Manglik / Chevvai dosham',
    desc: extract(userPreferences, 'manglik', [])[0] === 'Yes' ? 'Only Mangliks' : 'No Mangliks',
    isMatch: !!preferencesMatch.manglik,
  };
  const gotra = {
    key: 'preference-gotra',
    preferenceKey: 'gotra',
    term: 'Gothra / Gothram',
    desc: "Don't include my Gothra",
    isMatch: !!preferencesMatch.gotra,
  };
  const children = {
    key: 'preference-children',
    preferenceKey: 'children',
    term: 'Children',
    desc: includeChildren ? extract(userPreferences, 'children', []).join(', ') : '',
    isMatch: !!preferencesMatch.children,
  };
  const caste = {
    key: 'preference-match-2',
    preferenceKey: 'caste',
    term: 'Religion / Community',
    desc: extract(userPreferences, 'caste', [])
      .filter(p => p !== null && p !== undefined)
      .map(p => {
        if (p.religion && p.religion.toLowerCase() !== p.caste.toLowerCase()) {
          return `${p.religion}: ${p.caste}`;
        }
        return p.caste;
      })
      .join(', '),
    isMatch: !!preferencesMatch.caste,
  };
  const mother_tongue = {
    key: 'preference-motherTongue',
    preferenceKey: 'mother_tongue',
    term: 'Mother Tongue',
    desc: extract(userPreferences, 'mother_tongue', []).join(', '),
    isMatch: !!preferencesMatch.mother_tongue,
  };
  const country = {
    key: 'preference-country',
    preferenceKey: 'country',
    term: 'Country Living in',
    desc: extract(userPreferences, 'country', []).join(', '),
    isMatch: !!preferencesMatch.country,
  };
  const state = {
    key: 'preference-state',
    preferenceKey: 'state',
    term: 'State Living in',
    desc: extract(userPreferences, 'state', []).join(', '),
    isMatch: !!preferencesMatch.state,
  };
  const district = {
    key: 'preference-district',
    preferenceKey: 'district',
    term: 'City Living in',
    desc: extract(userPreferences, 'district', []).join(', '),
    isMatch: !!preferencesMatch.district,
  };
  const grewup_in = {
    key: 'preference-grewupIn',
    preferenceKey: 'grewup_in',
    term: 'Country Grew up in',
    desc: extract(userPreferences, 'grewup_in', []).join(', '),
    isMatch: !!preferencesMatch.grewup_in,
  };
  const education = {
    key: 'preference-education',
    preferenceKey: 'education',
    term: 'Education',
    desc: mapForEducation(extract(userPreferences, 'education', [])).join(', '),
    isMatch: !!preferencesMatch.education,
  };
  const working_with = {
    key: 'preference-workingWith',
    preferenceKey: 'working_with',
    term: 'Working With',
    desc: extract(userPreferences, 'working_with', []).join(', '),
    isMatch: !!preferencesMatch.working_with,
  };
  const industry = {
    key: 'preference-industry',
    preferenceKey: 'industry',
    term: 'Profession Area',
    desc: extract(userPreferences, 'industry', []).join(', '),
    isMatch: !!preferencesMatch.industry,
  };
  const occupation = {
    key: 'preference-occupation',
    preferenceKey: 'occupation',
    term: 'Working As',
    desc: extract(userPreferences, 'occupation', []).join(', '),
    isMatch: !!preferencesMatch.occupation,
  };
  const income = {
    key: 'preference-income',
    preferenceKey: 'income',
    term: 'Annual Income',
    desc: extract(userPreferences, 'income_range', [])
      .filter(p => p.from.indexOf('less') === -1 || p.to.indexOf('greater') === -1)
      .map(p => {
        if (p.from.indexOf('less') >= 0) {
          return `Upto ${p.currency} ${p.to}`;
        } else if (p.to.indexOf('greater') >= 0) {
          return `Above ${p.currency} ${p.from}`;
        }
        return `${p.currency} ${p.from} to ${p.to}`;
      })
      .join(', '),
    isMatch: !!preferencesMatch.income,
  };
  const diet = {
    key: 'preference-match-11',
    preferenceKey: 'diet',
    term: 'Diet',
    desc: mapForDiet(extract(userPreferences, 'diet', [])).join(', '),
    isMatch: !!preferencesMatch.diet,
  };
  const smoke = {
    key: 'preference-match-5',
    preferenceKey: 'smoke',
    term: 'Smoke',
    desc: extract(userPreferences, 'smoke', [])
      .map(s => smokeMaster[s])
      .join(' / '),
    isMatch: !!preferencesMatch.smoke,
  };
  const drink = {
    key: 'preference-match-12',
    preferenceKey: 'drink',
    term: 'Drink',
    desc: extract(userPreferences, 'drink', [])
      .map(s => drinksMaster[s])
      .join(' / '),
    isMatch: !!preferencesMatch.drink,
  };
  const body_type = {
    key: 'preference-match-13',
    preferenceKey: 'body_type',
    term: 'Body Type',
    desc: extract(userPreferences, 'body_type', []).join(', '),
    isMatch: !!preferencesMatch.body_type,
  };
  const complexion = {
    key: 'preference-match-14',
    preferenceKey: 'complexion',
    term: 'Skin Tone',
    desc: mapForSkinTone(extract(userPreferences, 'complexion', [])).join(', '),
    isMatch: !!preferencesMatch.complexion,
  };
  const residency_status = {
    key: 'preference-residencyStatus',
    preferenceKey: 'residency_status',
    term: 'Residency Status',
    desc: extract(userPreferences, 'residency_status', []).join(' / '),
    isMatch: !!preferencesMatch.residency_status,
  };

  const preferenceItems = [age, height, marital_status,  gotra, children, //eslint-disable-line
    caste, mother_tongue, manglik, country, state, residency_status, district, grewup_in, education, working_with, //eslint-disable-line
    industry, occupation, income, diet, smoke, drink, body_type, complexion]; //eslint-disable-line

  preferences.items = preferenceItems.filter(i => filteredPreferences.includes(i.preferenceKey) && i.desc !== '');
  preferences.matchCount = preferences.items.filter(p => p.isMatch).length;
  return preferences;
};
