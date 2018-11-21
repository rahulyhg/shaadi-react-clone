import getList from './getList';

export default ({ country }) =>
  getList({
    fieldset: 'phone_country',
    fq: {
      phone_country: {
        country,
      },
    },
  });
