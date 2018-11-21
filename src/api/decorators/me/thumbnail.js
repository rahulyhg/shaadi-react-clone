const baseValue = {
  small: '',
  medium: '',
};

export default function(base = baseValue, payload) {
  const photos = (payload.photo_details || {}).photos || [];
  const photo = photos[0] || {};
  if (!photo.domain_name_nb || photos[0]) {
    return base;
  }
  return {
    ...base,
    small: `${photo.domain_name_nb}${photo.small_nb}`,
    medium: `${photo.domain_name_nb}${photo.medium_nb}`,
  };
}
