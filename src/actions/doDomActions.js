export default params => (dispatch, getReduxState) => {
  const { type } = params || {};
  switch (type) {
    case 'appendScript': {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = params.script;
      document.body.appendChild(s);
      break;
    }
    default:
      break;
  }
};
