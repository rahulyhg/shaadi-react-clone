import constants from '../../../constants/constants';
import getPhotoOptions from './getPhotoOptions';

export default (options = {}, extras) => {
  const {
    profileFieldSet = [],
    photo,
    getAstro,
    getContact,
    getShortList,
    getRelationshipActions = false,
    getChatDetails = false,
    getMatchingData = false,
    getFamilyDetails = false,
    getHoroscopeDetails = false,
    getIncome = false,
    getLifestyle = false,
    getLocation = false,
    getPreferenceMatches = false,
    matchCount = 0,
  } = options;
  const photoOpts = getPhotoOptions(photo, extras);
  const validProfileFieldSet = profileFieldSet.filter(val => constants.validProfileFieldSet.indexOf(val) > -1);
  const opts = {
    profile: {
      fieldset: validProfileFieldSet,
    },
  };
  if (photoOpts) {
    opts.photo = photoOpts;
  }

  if (getAstro) {
    opts.astro = { fieldset: ['details'] };
  }

  if (getContact) {
    opts.contact = { fieldset: ['details'] };
  }

  if (getShortList) {
    opts.shortlist = { fieldset: ['count'] };
  }

  const derivedFieldSet = [];
  if (getRelationshipActions) {
    derivedFieldSet.push('relationship_actions');
  }
  if (getChatDetails) {
    derivedFieldSet.push('chat_details');
  }

  if (derivedFieldSet.length) {
    opts.derived = { fieldset: derivedFieldSet };
  }

  const derivedTextFieldSet = [];

  if (getMatchingData) {
    derivedTextFieldSet.push('matching_data');
  }
  if (getFamilyDetails) {
    derivedTextFieldSet.push('family_details');
  }
  if (getHoroscopeDetails) {
    derivedTextFieldSet.push('horoscope_details');
  }
  if (getIncome) {
    derivedTextFieldSet.push('income');
  }
  if (getLifestyle) {
    derivedTextFieldSet.push('lifestyle');
  }
  if (getLocation) {
    derivedTextFieldSet.push('location');
  }
  if (getPreferenceMatches) {
    derivedTextFieldSet.push('preference_matches');
  }

  if (derivedFieldSet.length) {
    opts.derived_text = { fieldset: derivedTextFieldSet };
    if (matchCount) {
      opts.derived_text.match_count = matchCount;
    }
  }

  return opts;
};
