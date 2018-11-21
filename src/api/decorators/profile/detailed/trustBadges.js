/* eslint camelcase: 0 */
export default (trustBadge = {}, data = {}) => {
  const badges = [];

  const { contact, id_proof, social } = trustBadge;
  const { mobileVerified } = data;

  if ((contact || {}).email === 'Y' || (contact || {}).mobile === 'Y') {
    let label = 'Contact Info Verified';
    if (!mobileVerified) {
      label = 'Phone verification awaited';
    }

    let category;
    if (contact.email === 'Y' && contact.mobile === 'Y') {
      category = 'Mobile & Email';
    } else {
      category = 'Mobile';
    }

    const badge = {
      key: 'trustbadge-info-item-0',
      label,
      category,
      icon: 'contact',
    };
    badges.push(badge);
  } else if (!mobileVerified) {
    const badge = {
      key: 'trustbadge-info-item-0',
      label: 'Phone verification awaited',
      category: '',
      icon: '',
    };
    badges.push(badge);
  }

  if ((social || {}).facebook === 'Y' || (social || {}).linkedin === 'Y') {
    let category;
    if (social.facebook === 'Y' && social.linkedin === 'Y') {
      category = 'Facebook & LinkedIn';
    } else if (social.facebook === 'Y') {
      category = (social.facebook_badge_by && `${social.facebook_badge_by}'s Facebook`) || `Facebook`;
    } else {
      category = 'LinkedIn';
    }

    const badge = {
      key: 'trustbadge-info-item-1',
      label: 'Social Profile Connected',
      category,
      icon: 'social',
    };
    badges.push(badge);
  }

  if ((id_proof || {}).driving_license === 'Y' || (id_proof || {}).passport === 'Y' || ((id_proof || {}).others || []).length > 0) {
    const proofs = [id_proof.driving_license === 'Y' ? 'Driving License' : null, id_proof.passport === 'Y' ? 'Passport' : null]
      .concat(trustBadge.id_proof.others)
      .filter(f => f)
      .filter((item, pos, self) => self.indexOf(item) === pos);

    const badge = {
      key: 'trustbadge-info-item-2',
      label: 'Offline ID provided',
      category: proofs.join(', '),
      icon: 'offline',
    };
    badges.push(badge);
  }

  return badges;
};
