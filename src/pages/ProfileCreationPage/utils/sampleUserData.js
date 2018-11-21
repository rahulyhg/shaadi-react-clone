import profile from '../../../helpers/profile';

const defaultData = {
  gender: 'Male',
  dob: '19950303',
  maritalStatus: 'Divorced',
  firstName: 'Gsyshs',
  lastName: 'Usually',
  country: 'India',
  religion: 'Hindu',
  motherTongue: 'Hindi',
};

export default data => {
  const dataPopulate = { ...defaultData, ...data };
  return profile({
    uid: '0SH06132224',
    basic: {
      gender: dataPopulate.gender,
      date_of_birth: dataPopulate.dob,
      marital_status: dataPopulate.maritalStatus,
      first_name: dataPopulate.firstName,
      last_name: dataPopulate.lastName,
    },
    family_details: [],
    account: {
      posted_by: 'Sibling',
      status: 'Incomplete',
    },
    metadata: {
      domain: 'www.shaadi.com',
    },
    family: {
      children: 'Yes. Living together',
      no_of_kids: '2',
      father_profession: '',
      mother_profession: '',
      brothers_unmarried: '',
      brothers_married: '',
      sisters_unmarried: '',
      sisters_married: '',
      located: '',
      type: '',
      family_income: '',
      family_values: '',
    },
    appearance: {
      complexion: 'Very Fair',
      built: 'Slim',
      height: '59',
    },
    health_info: {
      special_cases: 'None',
    },
    doctrine: {
      religion: dataPopulate.religion,
      mother_tongue: dataPopulate.motherTongue,
      caste: 'Chandravanshi Kahar',
      sub_caste: '',
      gotra: '',
      caste_no_bar: '',
    },
    'astro-details': {
      birth_star_nakshatra: '',
      moon_sign: '',
      manglik: '',
      other_dosham: '',
      suddha_jadhagam: '',
    },
    education: {
      education: 'Doctorate',
      education_stream: 'Architecture',
      college_1: 'Albertian Institute of Management|IIT',
      education_alias: '',
      education_field: '',
    },
    profession: {
      occupation: 'Banking Professional',
      working_with: 'Private Company',
      employer: 'Glaxo Smith Kline',
      income: 'USD 150K to 200K',
      industry: 'Accounting, Banking & Finance',
    },
    lifestyle: {
      diet: 'Veg',
      drink: 'No',
      smoke: 'No',
    },
    location: {
      country: dataPopulate.country,
      state: 'Ardabil',
      district: 'Ardabil',
      residency_status: 'Permanent Resident',
      zip_code: '',
      zip_status: 'Y',
      google_city_id: 0,
      living_since: '',
      city: 'Ardabil',
    },
    origin: {
      native_place: '',
      ethnicity: 'India',
      grewup_in: ['Australia'],
    },
    trait: {
      about_me: '',
      personality: [],
    },
    'contact-details': {
      mobile_country: 'Iran',
      mobile_isd: '+98',
      mobile_std: '',
      mobile: '8812391283',
      tel_std: '',
      telephone: '',
      contact_settings: '',
    },
    error: {
      error: 'Y',
      error_page_name: '#reg2_4',
    },
    interests_and_more: {
      interests: [],
    },
  });
};
