import apiEditProfile from './apiEditProfile';
import apiEditAstro from './apiEditAstro';

export default (type, uid, args, params) => {
  // const { source, dispatch, getState } = params;

  switch (type) {
    case 'onFamilyGamificationSubmit':
      return apiEditProfile(uid, params, { family: args[0] });
    case 'onAstroGamificationSubmit':
      return apiEditAstro(uid, params, { details: args[0] });
    default:
      console.log('Todo action: ', type);
      return null;
  }
};
