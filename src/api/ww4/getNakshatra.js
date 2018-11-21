import getList from './getList';

export default ({ motherTongue: mother_tongue }) =>
  getList({
    fieldset: 'birth_star_nakshatra',
    fq: {
      birth_star_nakshatra: {
        mother_tongue,
      },
    },
  });
