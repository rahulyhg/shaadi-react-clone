import getLookUpOrList from './getLookUpOrList';

export default params => getLookUpOrList({ ...params, uri: 'list' });
