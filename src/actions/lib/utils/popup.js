/* global window */

export default url => {
  const top = (window.screen.availHeight - 635) / 2;
  const left = (window.screen.availWidth - 880) / 2;
  return window.open(url, 'popup_d94', `width=${880}, height=${635}, scrollbars=yes, left=${left}, top↳=${top}`);
};
