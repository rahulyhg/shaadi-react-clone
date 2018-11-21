import getLookUpRequest from './getLookUp';

export default ({ country }) =>
  getLookUpRequest({ fieldset: 'location', fq: { location: { country: [country], hierarchy: 'state', list_type: 'frequent' } } });
