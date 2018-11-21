import getList from './getList';

export default ({ country: country_id }) =>
  getList({
    fieldset: 'income',
    fq: {
      income: {
        country_id,
      },
    },
  });
