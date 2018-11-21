import detailed from './profile/detailed';
import base from './profile/base';
import flags from './profile/flags';
import summary from './profile/summary';
import presence from './profile/presence';

export default function profile(props = {}) {
  return {
    ...props,
    thumbnailBlur: '/assets/default-thumbnail.png',
    thumbnail: '/assets/default-thumbnail.png',
    photoBlur: '/assets/default-photo.png',
    photo: '/assets/default-photo.png',
    fullPhotoBlur: '/assets/default-full-photo.png',
    fullPhoto: props.fullPhoto || '/assets/default-full-photo.png',

    heShe: props.heShe || 'he',
    himHer: props.himHer || 'him',
    hisHer: props.hisHer || 'his',
    gender: props.gender || 'male',
    uid: props.uid || 'sample-uid',
    name: props.name || 'FirstName L',
    status: props.status || 'Online',
    tempId: '',
    base: base(props.base || {}),
    detailed: detailed(props.detailed || {}),
    flags: flags(props.flags || {}),
    summary: summary(props.summary || {}),
    presence: presence(props.presence || {}),
  };
}
