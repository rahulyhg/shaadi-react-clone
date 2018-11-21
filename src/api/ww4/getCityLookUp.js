import getLookUpRequest from './getLookUp';

export default ({ state, country }) =>
  getLookUpRequest({
    fieldset: 'location',
    fq: { location: { country: [country], state: [state], hierarchy: 'city', list_type: 'frequent' } },
  });
