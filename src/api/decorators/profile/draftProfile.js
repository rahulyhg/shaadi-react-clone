import ProfileDataHelper from '../../../helpers/ProfileDataHelper';

export default response => {
  const { data } = response || {};
  if (!data) {
    return response;
  }
  const memberlogin = Object.keys(data)[0];
  if (!memberlogin) {
    return response;
  }
  return new ProfileDataHelper(memberlogin, data[memberlogin]).getOutput();
};
