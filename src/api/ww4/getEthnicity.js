import getLookUp from './getLookUp';

export default ({ motherTongue: mother_tongue, religion, country }) =>
  getLookUp({
    fieldset: 'ethnicity',
    fq: {
      ethnicity: {
        mother_tongue,
        religion,
        country,
      },
    },
  });
