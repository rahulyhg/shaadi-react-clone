export default () => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  const isIE = msie > 0 || !!ua.match(/Trident.*rv\:11\./); // eslint-disable-line no-useless-escape
  // const IEversion = isIE && parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  return isIE;
};
