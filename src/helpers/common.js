const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const and = (fn1, fn2) => (...args) => fn1(...args) && fn2(...args);
const or = (fn1, fn2) => (...args) => fn1(...args) || fn2(...args);
const isNotMemberType = (flags, type) => flags !== type;
const addBlankSpace = (string, after) => {
  const v = string.replace(/[^\dA-Z]/g, '');
  const regex = new RegExp(`.{${after}}`, 'g');
  return v.replace(regex, a => `${a} `);
};

const htmlDecode = input => {
  const e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
};

export { encode64, and, or, isNotMemberType, addBlankSpace, htmlDecode };
