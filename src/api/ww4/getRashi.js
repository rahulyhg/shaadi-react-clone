import getList from './getList';

export default ({ nakshatra: birth_star_nakshatra, motherTongue: mother_tongue }) =>
  getList({
    fieldset: 'moon_sign',
    fq: {
      moon_sign: {
        birth_star_nakshatra,
        mother_tongue,
      },
    },
  });
