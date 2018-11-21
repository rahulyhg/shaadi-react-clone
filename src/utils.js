import React from 'react';

const ucword = str => {
  const newstr = str.toLowerCase();
  return newstr.replace(/(^([a-zA-Z]))|([ -][a-zA-Z])/g, s => s.toUpperCase());
};
const calculateAspectRatio = ({ width, height }, ref, refType = 'height') => {
  let ImgHeight;
  let imgWidth;
  switch (refType) {
    case 'height': {
      imgWidth = width / height * ref;
      ImgHeight = ref;
      return { width: imgWidth, height: ImgHeight };
    }
    case 'width': {
      ImgHeight = height / width * ref;
      imgWidth = ref;
      return { width: imgWidth, height: ImgHeight };
    }
    default: {
      return { width, height };
    }
  }
};
const either = (val, fallback) => (val === undefined ? fallback : val);
const shouldShowAlbum = ({ isPaidUser, hasUploadedPhoto }, connectionStatus) =>
  isPaidUser || hasUploadedPhoto || ['theyAccepted', 'theyContacted', 'accepted'].includes(connectionStatus);
const reduceObj = (attrNameArr, AttrMap) => {
  if (!AttrMap) return {};
  return attrNameArr.reduce((accum, attrName) => {
    accum[attrName] = AttrMap[attrName] || '';
    return accum;
  }, {});
};

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const openWindowPopUp = (width, height, url, alignment = 'center') => {
  let top = 0;
  let left = 0;
  const widowWidth = window.screen.availWidth / 2;
  const windowHeight = window.screen.availHeight / 2;
  const popUpWidth = width / 2;
  const popUpHeight = height / 2;
  switch (alignment) {
    case 'center':
      left = widowWidth - popUpWidth;
      top = windowHeight - popUpHeight;
      break;
    default: {
      top = 0;
      left = 0;
    }
  }

  window.open(url, '', `height=${height},width=${width},left=${left},top=${top},scrollbar=yes`);
};

const formatText = (text, values, regex, jsxText) => {
  if (!values.length) return text;

  return (
    <div>
      {text.split(regex).reduce((prev, current, i) => {
        if (!i) return [current];

        return prev.concat(values.includes(current) ? jsxText : current);
      }, [])}
    </div>
  );
};

export { ucword, either, calculateAspectRatio, shouldShowAlbum, reduceObj, encode64, openWindowPopUp, formatText };
