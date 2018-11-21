import getLookUp from './getLookUp';

export default ({ employer }) =>
  getLookUp({
    fieldset: 'employers',
    fq: {
      employers: {
        full_name: `LIKE:%${employer}%`,
        acronym: `LIKE:%${employer}%`,
      },
    },
  });
