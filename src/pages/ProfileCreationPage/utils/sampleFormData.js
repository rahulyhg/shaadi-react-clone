const defaultData = {
  zipStatus: false,
  state: '',
  city: '',
  livingSince: '',
  maritalStatus: '',
  haveChildren: '',
  caste: 'Chandravanshi Kahar',
  subCaste: '',
  gotra: '',
  nakshatra: '',
  rashi: '',
  workingWith: 'Private Company',
  educationLevel: '',
  countryCode: '',
  mobileNumber: '',
  suddhaJadhagam: '',
  dosham: '',
};

export default data => {
  const dataPopulate = { ...defaultData, ...data };
  return {
    updateInputValue: () => () => {},
    updateInputState: () => () => {},
    onOptionSelection: () => () => {},
    afterBlur: () => () => {},
    afterTextBlur: () => () => {},
    zip: {
      code: '',
      value: '',
      googleCityId: 0,
    },
    zipStatus: {
      checked: dataPopulate.zipStatus,
    },
    state: {
      value: dataPopulate.state,
      showDependencyErrMsg: false,
      requiredErrorMsg: 'Oops! You seem to have missed this',
      dependencyErroMsg: 'Please fill this first',
      onOptionSelection: () => {},
    },
    city: {
      value: dataPopulate.city,
      onOptionSelection: () => {},
    },
    district: {
      value: '',
      onOptionSelection: () => {},
    },
    livingSince: {
      isVisible: false,
      value: dataPopulate.livingSince,
      onOptionSelection: () => {},
    },
    grewUpIn: {
      values: 'Australia',
      value: '',
      default: false,
      onOptionSelection: () => {},
    },
    residencyStatus: {
      value: 'Permanent Resident',
      onOptionSelection: () => {},
    },
    maritalStatus: {
      value: dataPopulate.maritalStatus,
      onOptionSelection: () => {},
    },
    haveChildren: {
      value: dataPopulate.haveChildren,
    },
    noOfChildren: {
      value: '2',
    },
    caste: {
      value: dataPopulate.caste,
      religion: 'Hindu',
      onOptionSelection: () => {},
    },
    subCaste: {
      value: dataPopulate.subCaste,
      onOptionSelection: () => {},
    },
    subCasteOther: {
      value: '',
    },
    casteNoBar: {
      checked: false,
    },
    gotra: {
      value: dataPopulate.gotra,
      onOptionSelection: () => {},
    },
    gotraOther: {
      value: '',
    },
    nakshatra: {
      value: dataPopulate.nakshatra,
      actualValue: '',
      onOptionSelection: () => {},
    },
    rashi: {
      value: dataPopulate.rashi,
      actualValue: '',
      onOptionSelection: () => {},
    },
    suddhaJadhagam: {
      value: dataPopulate.suddhaJadhagam,
    },
    dosham: {
      value: dataPopulate.dosham,
    },
    doshamTypes: {
      value: '',
    },
    ethnicity: {
      value: 'India',
      isVisible: false,
      onOptionSelection: () => {},
    },
    regionalSite: {
      value: 'Shaadi.com',
      url: 'www.shaadi.com',
      onOptionSelection: () => {},
    },
    educationLevel: {
      label: 'His education level',
      value: dataPopulate.educationLevel,
      isRequired: true,
      onOptionSelection: () => {},
    },
    educationField: {
      label: 'His education field',
      value: 'Architecture',
      isRequired: true,
      onOptionSelection: () => {},
    },
    college1: {
      value: 'IIT',
      onOptionSelection: () => {},
      updateInputValue: () => {},
    },
    college2: {
      value: 'Albertian Institute of Management',
      onOptionSelection: () => {},
      updateInputValue: () => {},
    },
    workingWith: {
      value: dataPopulate.workingWith,
      label: 'He work with',
      onOptionSelection: () => {},
    },
    workingAs: {
      value: 'Banking Professional',
      industry: 'Accounting, Banking & Finance',
      onOptionSelection: () => {},
    },
    employer: {
      value: 'Glaxo Smith Kline',
      onOptionSelection: () => {},
      updateInputValue: () => {},
    },
    income: {
      value: 'USD 150K to 200K',
      isRequired: true,
      onOptionSelection: () => {},
      updateInputValue: () => {},
    },
    diet: {
      value: 'Veg',
      label: 'His diet',
      onOptionSelection: () => {},
    },
    height: {
      label: 'His height',
      value: '4ft 11in - 149cm',
      inches: 59,
      isRequired: true,
      onOptionSelection: () => {},
    },
    skinTone: {
      value: 'Very Fair',
    },
    bodyType: {
      value: 'Slim',
    },
    smokeHabbit: {
      value: 'No',
      label: 'Does he smoke?',
      isRequired: true,
    },
    drinkHabbit: {
      value: 'No',
      label: 'Does he drink?',
      isRequired: true,
    },
    description: {
      value: '',
      uid: '0SH06132224',
      suggestedValue: '',
      showAboutMeEngagingModal: false,
      isRequired: true,
    },
    countryCode: {
      value: dataPopulate.countryCode,
      country: 'Iran',
      isd: '+98',
      onOptionSelection: () => {},
      updateInputState: () => {},
    },
    mobileNumber: {
      value: dataPopulate.mobileNumber,
    },
    disability: {
      checked: true,
    },
  };
};
