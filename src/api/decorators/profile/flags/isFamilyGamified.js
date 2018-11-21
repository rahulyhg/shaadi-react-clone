import { strnorm } from '../../utils';

export default family => {
  const familyFields = [['about_father', 'father_profession'], ['about_mother', 'mother_profession'], ['brothers'], ['sisters']];
  return familyFields.some(fields => fields.every(key => !strnorm(family[key])));
};
