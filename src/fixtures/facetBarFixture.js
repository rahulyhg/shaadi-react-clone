const facet = (props = {}) => ({
  key: props.id || 'sample-id',
  isMulti: props.isMulti || false,
  title: props.title || 'Recently Viewed',
  value: props.value || 'All',
  options: props.options || [
    {
      id: 1,
      label: 'Unviewed Matches',
      value: 'Unviewed Matches',
      isSelected: true,
    },
    {
      id: 2,
      label: 'Viewed Matches',
      value: 'Viewed Matches',
    },
  ],
});

const facets = [
  facet(),
  facet({ title: 'Matces' }),
  facet({ title: 'Photo Setttings', isMulti: true, value: 'Visible to All' }),
  facet({ title: 'Active Members' }),
  facet({ title: 'Recently Joined', value: 'Multiple Selected' }),
];

const props = {
  facets,
  onAction: () => {},
};

export default props;
