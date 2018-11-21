import getList from './getList';

export default ({ listType: list_type }) => getList({ fieldset: 'grewup_in', fq: { grewup_in: { list_type } } });
