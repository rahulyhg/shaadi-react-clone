import { inchesToFeet, sunSign, strnorm } from '../../utils';

export default payload => {
  const { doctrine, basic, location, origin, profession, appearance, family, health_info, derived_text } = payload; // eslint-disable-line camelcase
  const derivedText = derived_text; // eslint-disable-line camelcase
  const ignoreValArr = [
    'other',
    'others',
    '(Others)',
    '-',
    'null',
    'not specified',
    'will tell you later',
    '',
    null,
    0,
    undefined,
    'undefined',
  ];
  const indianishCountries = ['India', 'Afghanistan', 'Bangladesh', 'Bhutan', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'];
  const isNri = !indianishCountries.includes(location.country);

  const isSpecialProfile = health_info.special_cases !== 'None';
  const childtext = family.no_of_kids > '1' ? 'Children' : 'Child';
  const doctrineCaste = doctrine.caste !== doctrine.religion ? doctrine.caste : '';

  const casteAndSubCaste = doctrineCaste !== '' ? ', ' : '';
  const mapItems = [
    {
      key: 'info-0',
      icon: 'height_sunsign',
      value: `${basic.age} yrs, ${inchesToFeet(appearance.height)}, ${sunSign(basic.date_of_birth)}`,
    },
    {
      key: 'info-1',
      icon: 'marital_status',
      value: `${basic.marital_status} ${
        family.no_of_kids !== '' && basic.marital_status !== 'Never Married'
          ? family.no_of_kids !== '0' ? `(${family.no_of_kids} ${childtext}, ${family.children.split('.')[1]})` : ' (No Children)'
          : ''
      }`,
    },
    {
      key: 'info-2',
      icon: 'profile_religion',
      value: `${doctrine.religion}, ${doctrine.mother_tongue}`,
    },
    {
      key: 'info-3',
      icon: 'profile_community',
      value: `${doctrineCaste}${!ignoreValArr.includes(doctrine.sub_caste) ? casteAndSubCaste + doctrine.sub_caste : ''}`, //eslint-disable-line
    },
    {
      key: 'info-5',
      icon: 'profile_profession',
      value: `${profession.occupation.replace('(Others)', '')}`,
    },
    {
      key: 'info-6',
      icon: 'profile_living_in',
      value: `Lives in ${location.city && !ignoreValArr.includes(location.city) ? `${location.city}, ` : ''}${
        location.country && !ignoreValArr.includes(location.country) ? location.country : ''
      }`,
    },
  ];

  if (isNri === true) {
    mapItems.push({
      key: 'info-7',
      icon: 'profile_born_detail',
      value: `Grew up in ${origin.grewup_in.join(', ')}`,
    });
  } else if (derivedText && !ignoreValArr.includes(derivedText.education)) {
    mapItems.push({
      key: 'info-4',
      icon: 'edu_qualification',
      value: `${derivedText.education}`,
    });
  }
  if (isSpecialProfile) {
    mapItems.push({
      key: 'info-8',
      icon: 'profile_special_cases',
      value: `Has ${health_info.special_cases}`,
    });
  }
  return mapItems.filter(item => strnorm(item.value));
};
