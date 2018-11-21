export default (key, { user }) =>
  ({
    1: `Let's create ${user.addressUserByPassive} Profile`,
    2: 'Please add education & career details',
    3: 'Please provide some lifestyle information',
    4: `Describe ${user.addressUserByActive} in a few words`,
  }[key]);
