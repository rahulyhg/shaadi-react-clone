const parameterize = str => str.replace(/ /g, '');
const premiumPlans = ['Special Member', 'Gold Member', 'Platinum Member', 'Diamond Member', 'Solitaire Member'].map(parameterize);
const premiumPlusPlans = [
  'Special Plus Member',
  'Gold Plus Member',
  'Platinum Plus Member',
  'Diamond Plus Member',
  'Solitaire Plus Member',
].map(parameterize);

export default membership => {
  const membershipFiltered = membership.filter(i => i.toLowerCase().indexOf('was ') === -1);
  if (membership && membership.length && membership.length === membershipFiltered.length) {
    return membership.includes('Shaadi Select')
      ? 'Select'
      : membership.includes('Shaadi Vip')
        ? 'PremiumPlus'
        : premiumPlans.indexOf(parameterize(membership[0])) !== -1
          ? 'Premium'
          : premiumPlusPlans.indexOf(parameterize(membership[0])) !== -1 ? 'PremiumPlus' : 'Free';
  }
  return 'Free';
};
