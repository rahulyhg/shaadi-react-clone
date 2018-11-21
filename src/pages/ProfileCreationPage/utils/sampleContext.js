import form from './sampleFormData';
import user from './sampleUserData';
import history from './sampleHistoryData';

export default (...params) => ({
  form: form(...params),
  user: user(...params),
  history: history(...params),
});
