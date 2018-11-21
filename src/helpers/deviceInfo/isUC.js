// ref: https://stackoverflow.com/questions/38089868/javascript-how-to-detect-if-the-user-is-using-uc-browser-mini
export default () => window.navigator.userAgent.indexOf(' UCBrowser/') >= 0;
