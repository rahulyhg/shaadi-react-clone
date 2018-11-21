export default membershipTags => {
  const MemberShipHash = {
    solitaire: 'platinum_plus',
    solitaire_plus: 'platinum_plus',
  };
  return MemberShipHash[membershipTags] || membershipTags || 'free';
};
