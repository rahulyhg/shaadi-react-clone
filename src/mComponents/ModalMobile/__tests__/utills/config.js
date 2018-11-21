const filtersType = {
  connect_pending: [
    {
      id: 'All',
      label: 'All',
      mobileLabel: 'All Invitations',
      title: 'All',
      name: 'custom',
      value: 'all',
    },
    {
      id: 'Premium Invitations',
      label: 'Premium Invitations',
      title: 'Premium Invitations',
      name: 'custom',
      value: 'premium',
    },
    {
      id: 'Matching Preferences',
      label: 'Matching Preferences',
      title: 'Matching Preferences',
      name: 'custom',
      value: 'most_preferred',
    },
    {
      id: 'Expiring Soon',
      label: 'Expiring Soon',
      title: 'Expiring Soon',
      name: 'custom',
      value: 'pending_interest_expiring',
    },
  ],
};

const getFilter = type => filtersType[type];

it('should export theDefaultState,payloadProps', () => {
  expect(Object.keys(filtersType).length).toEqual(1);
});

export { getFilter };
