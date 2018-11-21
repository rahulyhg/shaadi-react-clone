const savedSearchListDecorator = savedSearchItem => ({
  id: savedSearchItem.id,
  name: savedSearchItem.savedsearch_name,
  frequency: savedSearchItem.frequency,
});
export default (payload = {}) => (payload || []).map(listItem => savedSearchListDecorator(listItem.details));
