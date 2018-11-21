import getLookUp from './getLookUp';

export default ({ motherTongue: mother_tongue, religion, listType: list_type }) =>
  getLookUp({
    fieldset: 'caste',
    fq: {
      caste: {
        mother_tongue,
        religion,
        list_type,
      },
    },
  });
