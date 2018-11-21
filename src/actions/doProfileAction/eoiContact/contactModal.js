import types from '../../../action_types';
import { either } from '../../../utils';

const getProfileCreatedBy = summary => summary.profileCreatedBy;

const getAlbumStatus = flags => flags.albumStatus;

const getCanCommunicateStatus = flags => flags.canCommunicate;

const getMembershipTags = flags => flags.membershipTags;

export default (uid, params, details) => {
  const { dispatch, getState, source, history } = params;
  const profile = getState().profiles[uid] || { uid, name: uid, hisHer: 'Their', heShe: 'They' };
  const { name, heShe, hisHer, himHer, photo, photoBlur, summary, flags, thumbnail, thumbnailBlur } = profile;
  const profileCreatedBy = either(getProfileCreatedBy(summary), '');
  const profileAlbumStatus = either(getAlbumStatus(flags), '');
  const canCommunicate = either(getCanCommunicateStatus(flags), false);
  const membershipTags = either(getMembershipTags(flags), 'free');
  const { isMisuseReported, getSMSText } = getState().modal.contactDetails;
  const isLoggerMobileVerified = getState().session.settings.isMobileVerified;
  const loggerMembership = getState().session.membership;

  const payload = {
    modal: 'contactDetails',
    source,
    disabled: false,
    loading: false,
    flash: null,
    uid,
    name,
    heShe,
    hisHer,
    himHer,
    history,
    photo,
    photoBlur,
    thumbnail,
    thumbnailBlur,
    profileAlbumStatus,
    profileCreatedBy,
    isMisuseReported,
    getSMSText,
    isLoggerMobileVerified,
    canCommunicate,
    membershipTags,
    loggerMembership,
    ...details,
  };
  dispatch({ type: types.MODAL_SHOW, payload });
  return true;
};
