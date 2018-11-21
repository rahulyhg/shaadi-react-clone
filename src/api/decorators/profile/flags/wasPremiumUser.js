const parameterize = str => str.replace(/ /g, '');
const premiumPlans = ['Gold Member', 'Platinum Member', 'Diamond Member', 'Bold Listing', 'Solitaire Member'].map(parameterize);
const premiumPlusPlans = ['Gold Plus Member', 'Platinum Plus Member', 'Diamond Plus Member', 'Solitaire Plus Member'].map(parameterize);

export default membership => {
  console.log('membership', membership);
  if (membership && membership.length) {
    return membership.includes('Shaadi Select')
      ? 'Select'
      : premiumPlans.indexOf(parameterize(membership[0])) !== -1
        ? 'Premium'
        : premiumPlusPlans.indexOf(parameterize(membership[0])) !== -1 ? 'PremiumPlus' : 'Free';
  }
  return null;
};
