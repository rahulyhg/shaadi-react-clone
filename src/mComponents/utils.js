const getDownloadAppLink = () => {
  const linkInfo = {
    platform: `android`,
    link: 'https://play.google.com/store/apps/details?id=com.shaadi.android&hl=en',
  };
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    linkInfo.platform = `apple`;
    linkInfo.link = 'https://itunes.apple.com/in/app/shaadi-com/id480093204?mt=8';
  }
  return linkInfo;
};

export { getDownloadAppLink };
