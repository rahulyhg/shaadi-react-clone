export default form => ({
  education: {
    education: form.educationLevel.value,
    education_stream: form.educationField.value,
    // @todo have the API accept a different field like colleges as an array of strings
    college_1: `${form.college1.value}${form.college2.value ? `|${form.college2.value}` : ''}`,
  },
  profession: {
    occupation: form.workingAs.value,
    // @todo have API take working with Non Working value as Not Working or vice-versa
    working_with: form.workingWith.value === 'Not Working' ? 'Non Working' : form.workingWith.value,
    employer: form.employer.value,
    income: form.income.value,
  },
});
