import getLookUp from './getLookUp';

export default ({ state, country, listType: list_type }) =>
  getLookUp({ fieldset: 'location', fq: { location: { country: [country], state: [state], hierarchy: 'district', list_type } } });
