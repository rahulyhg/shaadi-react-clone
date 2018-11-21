import getLookUp from './getLookUp';

export default ({ motherTongue: mother_tongue, religion }) =>
  getLookUp({
    fieldset: 'caste',
    fq: {
      caste: {
        mother_tongue,
        religion,
      },
    },
  });
