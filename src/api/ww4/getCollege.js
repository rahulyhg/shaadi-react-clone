import getLookUp from './getLookUp';

export default ({ college }) =>
  getLookUp({
    fieldset: 'colleges',
    fq: {
      colleges: {
        full_name: `LIKE:%${college}%`,
        alias: `LIKE:%${college}%`,
        acronym: `LIKE:%${college}%`,
      },
    },
  });
