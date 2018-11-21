export default autologinToken => ({
  method: 'post',
  relative_url: '/users/login',
  body: {
    data: {
      token: autologinToken,
    },
  },
});
