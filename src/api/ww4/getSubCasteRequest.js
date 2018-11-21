import getList from './getList';

export default ({ motherTongue: mother_tongue, caste }) =>
  getList({
    fieldset: 'subcaste',
    fq: {
      subcaste: {
        caste,
        mother_tongue,
      },
    },
  });
