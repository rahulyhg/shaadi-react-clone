/* eslint camelcase: 0 */
import apiProfilePhotoUpload from '../apiProfilePhotoUpload';

export default (uid, args, params, history) => payload => {
  const pageURL = window.location.href;
  // hard-coding tpe in meta after having discussion with Karan Author: shivamsupr
  const metadata = {
    tpe: {
      tpe_photo_track: 'Y',
      tpe_photo_bucket: '',
      tpe_photo_entry_point_referrer: '',
      tpe_photo_previous_page_url: '',
      tpe_photo_landing_page_url: pageURL,
      tpe_photo_landing_page_name: params.source,
      tpe_photo_platform: '0',
      memberlogin: uid,
      posted_url: '',
      photo_track: 'Y',
      bucket: 'B',
      entry_point_referrer: '',
      previous_page_url: '',
      landing_page_url: pageURL,
      landing_page_name: params.source,
      medium: 'desktop - ajax',
    },
  };
  const { photos } = payload;
  const successData = { data: { photos }, metadata };
  apiProfilePhotoUpload(params, successData);
  return null;
};
