/* eslint-disable camelcase */
import getUnixToFormat from '../../../helpers/getUnixToFormat';

const baseValue = {};

const isValidPayload = payload => ['banner_details', 'account', 'basic', 'photo_details', 'other'].every(k => payload[k]);

const img = (photo, size, suffix) => {
  const path = photo[`${size}${suffix}`];
  const domain = photo[`domain_name${suffix}`] || photo.domain_name;
  return path ? `${domain}${path}` : null;
};

const defaultPhotos = {
  Male: '/assets/60-add-ph-male-v2.gif',
  Female: '/assets/60-add-ph-female-v2.gif',
};

export default (baseline = baseValue, payload = {}) => {
  if (isValidPayload(payload)) {
    const { banner_details, basic, photo_details } = payload;
    const banner_action_date = getUnixToFormat(banner_details.action_date_uts, 'DD MMM');
    const photos = (photo_details || {}).photos || [];
    const photo = photos.filter(ph => ph.profilePhoto)[0] || photos.filter(ph => ph.photo_order === 0)[0] || photos[0] || {};

    return {
      actionDate: banner_action_date,
      profileDisplayName: basic.display_name,
      profilePhotoPath: img(photo, 'medium', '_nb') || defaultPhotos[basic.gender],
      bannerType: banner_details.banner_type,
      contactPartial: banner_details.contact_partial,
      heShe: basic.gender === 'Male' ? 'He' : 'She',
      himHer: basic.gender === 'Male' ? 'Him' : 'Her',
      hisHer: basic.gender === 'Male' ? 'His' : 'Her',
      profileCount: payload.total_count || 0,
    };
  }
  return baseline;
};
