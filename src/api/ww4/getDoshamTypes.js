import getList from './getList';

export default ({ motherTongue: mother_tongue }) =>
  getList({
    fieldset: 'dosham',
    fq: {
      dosham: {
        mother_tongue,
      },
    },
  });
