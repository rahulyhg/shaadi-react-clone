export default payload => {
  const { education, profession, derived_text } = payload; // eslint-disable-line camelcase
  const derivedText = derived_text; // eslint-disable-line camelcase
  if (!profession || !education || !derivedText) {
    return null;
  }
  const hasCollegeOrEmployer =
    (education.college_1 && education.college_1 !== 'null') ||
    (education.college_2 && education.college_2 !== 'null') ||
    (profession.employer && profession.employer !== 'null');
  const ignoreValArr = ['-', 'null', '', null, 0, undefined, 'undefined'];
  return {
    items: [
      {
        key: 'education-item-0',
        icon: 'edu_qualification',
        desc: `${derivedText && !ignoreValArr.includes(derivedText.education) ? derivedText.education : ''}`,
      },
      {
        key: 'education-item-1',
        icon: 'profession',
        desc: `${derivedText && !ignoreValArr.includes(derivedText.career) ? derivedText.career : ''}`,
      },
      {
        key: 'education-item-5',
        icon: 'income',
        desc: `${derivedText && !ignoreValArr.includes(derivedText.annualincome) ? derivedText.annualincome : ''}`,
      },
    ],
    hasCollegeOrEmployer,
  };
};
