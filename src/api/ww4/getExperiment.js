import getConfig from './getConfig';

export default (uid, extras = {}) => getConfig(uid, { params: { fieldset: 'experiment' } });
